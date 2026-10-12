---
title: External authentication
description: How an app that embeds the frontend, like the companion apps, keeps the login itself and hands the access token to the frontend.
order: 3
---

Normally the frontend handles its own login: it shows the login page, stores the tokens, and refreshes them. An app that embeds the frontend in a web view, like the [companion apps](/companion/), wants to keep the login itself, and give the frontend only an access token when it needs one. That is what external authentication is for.

## Turn it on

Load the frontend with `?external_auth=1` in the URL. The frontend then expects one of these bridges to be defined on `window`:

- `window.externalAppV2`: Android, the recommended bridge. It needs a web view that supports [`WebViewFeature.WEB_MESSAGE_LISTENER`](https://developer.android.com/reference/androidx/webkit/WebViewCompat.WebMessageListener).
- `window.externalApp`: Android, the fallback for web views without that feature.
- `window.webkit.messageHandlers`: iOS and macOS.

When more than one is there, the frontend uses them in this order. Without any of them, the frontend fails to start.

## Get an access token

The frontend asks for a token when it loads, and again whenever its token has expired. It sends a payload with the name of the callback to answer with, and `force: true` when it needs a new token even if the old one has not expired yet:

```js
// Android, V2
window.externalAppV2.postMessage(
  JSON.stringify({
    type: "getExternalAuth",
    payload: { callback: "externalAuthSetToken", force: true },
  })
);

// Android, V1
window.externalApp.getExternalAuth(
  JSON.stringify({ callback: "externalAuthSetToken", force: true })
);

// iOS and macOS
window.webkit.messageHandlers.getExternalAuth.postMessage({
  callback: "externalAuthSetToken",
  force: true,
});
```

On Android the payload is a JSON string, on iOS and macOS an object.

The app answers by calling the callback with whether it succeeded, and the token with the number of seconds it stays valid:

```js
window.externalAuthSetToken(true, {
  access_token: "ABCDEFGH",
  expires_in: 1800,
});

// When the app can't get a token
window.externalAuthSetToken(false);
```

## Revoke the token

When the user logs out in their profile, the frontend asks the app to log out. The app has to revoke its refresh token with the [auth API](/core/internals/auth-api/) of Core, and log the user out:

```js
// Android, V2
window.externalAppV2.postMessage(
  JSON.stringify({
    type: "revokeExternalAuth",
    payload: { callback: "externalAuthRevokeToken" },
  })
);

// Android, V1
window.externalApp.revokeExternalAuth(
  JSON.stringify({ callback: "externalAuthRevokeToken" })
);

// iOS and macOS
window.webkit.messageHandlers.revokeExternalAuth.postMessage({
  callback: "externalAuthRevokeToken",
});
```

When it is done, the app calls the callback:

```js
window.externalAuthRevokeToken(true);

// When the app could not log out
window.externalAuthRevokeToken(false);
```

## The callback names

The callback names, `externalAuthSetToken` and `externalAuthRevokeToken`, never change. The app should check that the callback in a request is the one it expects, so a forged request can't make it call something else.

Everything else the app and the frontend tell each other goes over the [external bus](/frontend/reference/external-bus/).
