---
title: Authentication API
description: How an app logs in to a Home Assistant instance with OAuth 2, refreshes and revokes tokens, and makes authenticated requests.
sidebarGroup: Authentication
order: 22
---

Every Home Assistant instance belongs to someone, so there is no central place to register an app. Instead, Home Assistant uses [OAuth 2](https://datatracker.ietf.org/doc/html/rfc6749) with the [IndieAuth](https://indieauth.spec.indieweb.org/) approach to clients: your app is identified by its own website. This page walks through the flow your app goes through to get tokens for a user's instance.

If you write JavaScript, the [home-assistant-js-websocket](https://github.com/home-assistant/home-assistant-js-websocket) library implements this flow for you. The frontend uses it too.

## Your client ID

Your client ID is the URL of your app's website, like `https://www.my-application.io/`. The redirect URI you send the user back to must have the same host and port, like `https://www.my-application.io/auth_callback`.

Need a redirect URI on another host, for example a custom scheme for a native app? Declare it on your website, and Home Assistant fetches the page at your client ID to find it. It reads the first 10 KB, and accepts either:

- A link tag in the HTML:

  ```html
  <link rel="redirect_uri" href="hass://auth" />
  ```

- A JSON [OAuth client ID metadata document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) served at the client ID URL, with a `redirect_uris` list:

  ```json
  {
    "client_id": "https://www.my-application.io/oauth/metadata.json",
    "redirect_uris": ["https://oauth.my-application.io/hass/auth_callback"]
  }
  ```

Home Assistant only reads the metadata document when the page has no link tags. It then only accepts the document when the client ID is an `https` URL with a path, the response is a direct `200 OK` (no redirect), the `client_id` in the document is exactly the URL it was fetched from, and every entry in `redirect_uris` is an absolute URI.

Home Assistant describes what it supports at `/.well-known/oauth-authorization-server`, as defined in [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414). Clients that discover endpoints dynamically can start there.

## Step 1: send the user to authorize

Send the user to `/auth/authorize` on their instance, with your `client_id` and `redirect_uri` as query parameters:

```text
https://homeassistant.local:8123/auth/authorize
  ?client_id=https%3A%2F%2Fwww.my-application.io%2F
  &redirect_uri=https%3A%2F%2Fwww.my-application.io%2Fauth_callback
  &state=abc123
```

The line breaks are only for reading. Optional parameters:

- `state`: comes back unchanged in the redirect. A good place for the URL of the instance the user is logging in to.
- `code_challenge` and `code_challenge_method`: for PKCE ([RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)). The only supported method is `S256`. Use PKCE whenever you can, and always in a native app.

The user logs in and approves. Home Assistant then redirects to your redirect URI with a `code` and your `state`:

```text
https://www.my-application.io/auth_callback?code=12345&state=abc123
```

## Step 2: exchange the code for tokens

POST to `/auth/token`, with the body encoded as `application/x-www-form-urlencoded`. Use the exact same `client_id` as in step 1:

```text
grant_type=authorization_code
&code=12345
&client_id=https%3A%2F%2Fwww.my-application.io%2F
```

With PKCE, add `code_verifier`. The response:

```json
{
  "access_token": "ABCDEFGH",
  "expires_in": 1800,
  "refresh_token": "IJKLMNOPQRST",
  "token_type": "Bearer",
  "ha_auth_provider": "homeassistant"
}
```

The access token is valid for `expires_in` seconds. Store the refresh token safely: it is what keeps the user logged in.

On a bad request, you get status 400 with an error like `{"error": "invalid_request", "error_description": "Invalid code"}`. If the user is not allowed to log in, for example because the user is inactive, you get status 403 with the error `access_denied`.

## Step 3: refresh the access token

When the access token expires, POST to `/auth/token` again:

```text
grant_type=refresh_token
&refresh_token=IJKLMNOPQRST
&client_id=https%3A%2F%2Fwww.my-application.io%2F
```

You get a new `access_token` with its `expires_in`. If the refresh token no longer works, the user is logged out: clear what you stored and start the flow again.

A refresh token expires when it has not been used for 90 days.

## Revoke a token

To log out, POST the refresh token to `/auth/revoke`, encoded as `application/x-www-form-urlencoded`:

```text
token=IJKLMNOPQRST
```

This revokes the refresh token and every access token it ever created. The response is always status 200 with an empty body, whether or not the token existed. The older form, posting `token` and `action=revoke` to `/auth/token`, still works but is deprecated.

## Make authenticated requests

For HTTP, send the access token in the `Authorization` header:

```shell
curl \
  -H "Authorization: Bearer ABCDEFGH" \
  https://homeassistant.local:8123/api/
```

For the WebSocket API, send it in the [auth message](/core/internals/websocket-api/#authentication). Over HTTP, an expired or invalid token gets status 401. Over the WebSocket API, you get `auth_invalid` and the server closes the connection. Either way: refresh the token and try again.

## Long-lived access tokens

For scripts and services that cannot go through a login flow, users can create a long-lived access token on their profile, under **Security**. Those are valid for 10 years, and are used exactly like an access token.

An app with a WebSocket connection can also create one for the current user with `auth/long_lived_access_token`. The `lifespan` is in days:

```json
{
  "id": 11,
  "type": "auth/long_lived_access_token",
  "client_name": "GPS Logger",
  "lifespan": 365
}
```

The result is the token. Home Assistant does not store it, so it cannot be shown again.

## Signed paths

Sometimes a user needs to open a URL without the `Authorization` header, like a download link. A signed path is a normal path with a signature added, like `/api/states?authSig=ABCDEFGH`. Whoever opens it is authorized as the refresh token that created it.

Over the WebSocket API, create one with `auth/sign_path`. `expires` is in seconds and defaults to 30:

```json
{
  "id": 12,
  "type": "auth/sign_path",
  "path": "/api/states",
  "expires": 20
}
```

The result holds the `path` to use. In an integration, use `async_sign_path` from `homeassistant.components.http.auth`. It uses the refresh token of the current HTTP request or WebSocket connection, and falls back to a special content user when there is none, like in an automation.

Keep in mind:

- A signed path stops working when its refresh token is deleted, when the user is deleted, and when Home Assistant restarts.
- The signature is checked when the request arrives. A download that takes longer than the expiry time still finishes.
