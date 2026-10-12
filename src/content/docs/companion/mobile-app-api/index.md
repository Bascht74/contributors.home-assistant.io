---
title: Mobile app API
description: How an app connects to Home Assistant through the mobile_app integration. Registration, the webhook, sensors, location, notifications, and the web view.
order: 4
---

The official companion apps talk to Home Assistant through the `mobile_app` integration in Core. It is a public API: any app can use it to show up in Home Assistant as a device, report sensors and location, and receive notifications. This section describes it, for people working on the official apps and for anyone building their own.

## How it fits together

1. **Find and log in.** The app finds the instance, and the user logs in with OAuth 2. The app gets access and refresh tokens.
2. **Register.** With those tokens, the app registers itself with `mobile_app`. Home Assistant creates a device for it, and returns a webhook ID, and optionally a secret for encryption and URLs for Home Assistant Link.
3. **Send data.** From then on, the app sends sensor updates, its location, and other requests to the webhook. Webhook requests need no token: the webhook ID is the credential.
4. **Receive notifications.** Home Assistant pushes notifications over the WebSocket connection, or through a push service of the app.
5. **Show the frontend.** The app shows the frontend in a web view, and hands it a token, so the user doesn't log in twice.

The [companion apps architecture](/architecture/platform/companion-apps/) has the bigger picture.

## Pages

- [Connect and register](/companion/mobile-app-api/setup/): discovery, logging in, and the registration call.
- [Send data](/companion/mobile-app-api/sending-data/): the webhook, its URLs, the request format, and every request type.
- [Encryption](/companion/mobile-app-api/encryption/): encrypting webhook traffic with libsodium.
- [Sensors](/companion/mobile-app-api/sensors/): registering and updating sensors, and keeping their enabled state in sync.
- [Notifications](/companion/mobile-app-api/notifications/): WebSocket push, cloud push, and the contract for a push server.
- [Web view](/companion/mobile-app-api/webview/): showing the frontend without a second login.

## In the code

The integration lives in [`homeassistant/components/mobile_app/`](https://github.com/home-assistant/core/tree/dev/homeassistant/components/mobile_app) in Core:

| File | What it does |
| --- | --- |
| `http_api.py` | The registration endpoint |
| `webhook.py` | The webhook and most request types |
| `helpers.py` | Encryption and responses |
| `websocket_api.py` | The WebSocket push channel |
| `notify.py` | Sending notifications |
| `live_activity/` | Live Activity tokens for iOS, and their two request types |

When the code and this documentation disagree, the code wins. Changes to the integration follow the normal [Core contribution process](/core/).
