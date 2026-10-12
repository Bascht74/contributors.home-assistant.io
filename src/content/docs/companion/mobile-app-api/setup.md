---
title: Connect and register
description: Find a Home Assistant instance, log the user in with OAuth 2, and register the app with the mobile_app integration.
order: 1
---

Before an app can send anything, it needs to find the instance, log the user in, and register itself. You do this once per server.

## Find the instance

Home Assistant announces itself on the local network with zeroconf, as `_home-assistant._tcp.local.`. Browse for that service to offer the user a list of instances. If nothing is found, ask for the URL. See [instance discovery](/core/internals/instance-discovery/) for what the service announces.

## Log the user in

Home Assistant uses OAuth 2 with the [IndieAuth](https://indieauth.spec.indieweb.org/) extension for clients. There is no client registration: the client ID is the URL of your app's website, and the redirect URI must have the same scheme, host, and port.

A native app needs a redirect URI like `myapp://auth-callback`, which is on a different host. To allow it, add a link tag to the page at your client ID. Home Assistant reads the first 10 kB of that page:

```html
<link rel="redirect_uri" href="myapp://auth-callback">
```

Instead of a link tag, that page can also be an OAuth client ID metadata document: a JSON object with your `client_id` and a `redirect_uris` list.

The flow:

1. Open `/auth/authorize` in a browser, with `client_id`, `redirect_uri`, and optionally `state` as query parameters.
2. The user logs in. Home Assistant redirects to your redirect URI with a `code`.
3. Exchange the code for tokens with a POST to `/auth/token`, form encoded, with `grant_type=authorization_code`, the `code`, and the same `client_id`.

You get an access token, valid for 30 minutes, and a refresh token to get new access tokens. See [authentication](/core/internals/auth-api/) for how tokens work.

> [!NOTE]
> The official apps use fixed client IDs, `https://home-assistant.io/iOS` and `https://home-assistant.io/android`, with the `homeassistant://auth-callback` redirect, and two Wear OS callbacks for Android. Core allows those without fetching the website, so login also works without internet access. Use your own client ID for your own app.

## Make sure mobile_app is loaded

`mobile_app` is part of `default_config`, so it is loaded on most installations. If a user removed `default_config`, they need to add `mobile_app:` to their `configuration.yaml` and restart.

To check, call `GET /api/config` with the access token and look for `mobile_app` in `components`. If registration returns a 404, the integration is not loaded.

## Register the app

Send an authenticated POST to `/api/mobile_app/registrations`:

```json
{
  "device_id": "ABCDEFGH",
  "app_id": "awesome_home",
  "app_name": "Awesome Home",
  "app_version": "1.2.0",
  "device_name": "Robbie's iPhone",
  "manufacturer": "Apple",
  "model": "iPhone X",
  "os_name": "iOS",
  "os_version": "17.4",
  "supports_encryption": true,
  "app_data": {
    "push_websocket_channel": true
  }
}
```

| Key | Required | Type | Description |
| --- | --- | --- | --- |
| `app_id` | Yes | string | A unique identifier for your app |
| `app_name` | Yes | string | The name of your app |
| `app_version` | Yes | string | The version of your app |
| `device_name` | Yes | string | The name of the device. Used to name the device and its entities |
| `manufacturer` | Yes | string | The manufacturer of the device |
| `model` | Yes | string | The model of the device |
| `os_name` | Yes | string | The name of the operating system |
| `os_version` | No, but send it | string | The version of the operating system. The device in Home Assistant uses it as its software version. The registration call accepts a request without it, but setting up the registration then fails, and its webhook doesn't work |
| `device_id` | No, but send it | string | A stable, unique identifier for the device. Without it, Home Assistant generates a random one |
| `supports_encryption` | No | boolean | Whether the app [encrypts](/companion/mobile-app-api/encryption/) its webhook traffic. Defaults to `false` |
| `app_data` | No | object | App specific data. Used to enable [notifications](/companion/mobile-app-api/notifications/) |

Together, `app_id` and `device_id` identify the registration. Registering again with the same pair replaces the old registration: you get a new webhook ID and secret, and the old ones stop working. Without a `device_id`, every registration is a new one.

Home Assistant answers with `201 Created`. Store the response permanently, it is the only time you get it:

```json
{
  "cloudhook_url": "https://hooks.nabu.casa/randomlongstring123",
  "remote_ui_url": "https://randomlongstring123.ui.nabu.casa",
  "secret": "qwerty",
  "webhook_id": "abcdefgh"
}
```

| Key | Description |
| --- | --- |
| `webhook_id` | The ID of the webhook to [send data](/companion/mobile-app-api/sending-data/) to |
| `secret` | The key for encryption. Only set when you sent `supports_encryption` |
| `cloudhook_url` | A webhook URL through Home Assistant Link. Only set when the instance has an active subscription and is connected to the cloud, and the user is not local only |
| `remote_ui_url` | The remote URL of the instance through Home Assistant Link. Same conditions, except the cloud connection |

Values that don't apply are `null`.

After registration, Home Assistant has a new device for your app, with a device tracker for its location. That tracker is added to the person of the user who registered. Sensors appear as you [register them](/companion/mobile-app-api/sensors/).
