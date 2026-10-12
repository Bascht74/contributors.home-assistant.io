---
title: How the pieces talk
description: The APIs between Home Assistant Core and everything around it, and how everyone who connects proves who they are.
order: 20
---

Home Assistant Core is never alone. The frontend, the companion apps, voice satellites, the Supervisor, and Home Assistant Link all talk to it. They do that over a handful of APIs, all served by Core's own web server, on port 8123 by default.

## The connections at a glance

| Who | Talks to Core over | To do what |
| --- | --- | --- |
| The frontend, in a browser or an app | The [WebSocket API](/core/internals/websocket-api/) | Everything: states, actions, settings, live updates |
| Companion apps | The WebSocket API, and a webhook | Show the frontend, and send sensor data and location |
| Scripts and other software | The [REST API](/core/internals/rest-api/), or the WebSocket API | Read states, perform actions |
| Devices and services on the internet | Webhooks | Push data to an integration |
| The Supervisor | Its own API, and Core's APIs | Manage Core, apps, and backups, see [the Supervisor](/architecture/platform/supervisor/) |

## The WebSocket API

The WebSocket API is the main way in. Unlike a REST API, the connection stays open, so Home Assistant can push every change the moment it happens: a light that turns on shows as on, right away, on every screen. The frontend uses it for almost everything, through the [home-assistant-js-websocket](https://github.com/home-assistant/home-assistant-js-websocket) library. Integrations can add their own commands.

The REST API covers the basics, like reading states and performing actions, for software that wants something simple.

## Logging in

Every connection, except a webhook, starts with proving who you are. Users log in with an OAuth 2 flow, and get tokens: a refresh token that stays, and access tokens that last 30 minutes. Scripts use long-lived access tokens, which users make in their profile. See [how authentication works](/core/internals/auth/) and [permissions](/core/internals/permissions/).

The line that matters most is between administrators and everyone else: changing settings, adding integrations, and anything that reveals something sensitive is admin-only. See [how Home Assistant handles trust](/security/how-it-works/).

## Webhooks

A webhook is the one way in without logging in: a URL, `/api/webhook/<webhook_id>`, that anyone can send data to. That is safe because the ID is a random 64-character value: knowing it is the permission. Unknown IDs get the same answer as known ones, so nobody can find out whether one exists, and an integration can make a webhook only accept requests from the home network.

Webhooks exist for things that can't log in, like a service that sends updates, or a phone that sends its location in the background. With Home Assistant Link, a webhook also gets a public URL through the cloud, so it works away from home without opening Home Assistant to the internet.

## Behind a proxy

Core can serve HTTPS itself, but many people put a reverse proxy in front, or use Home Assistant Link. Behind a proxy, Core only trusts forwarded addresses from proxies the user configured, so nobody can pretend to be on the home network.

## Work on this

- New to Core? Start with [your first contribution to Core](/core/first-contribution/). The APIs are part of Core.
- [WebSocket API](/core/internals/websocket-api/) and [REST API](/core/internals/rest-api/): every message and endpoint.
- [Add a WebSocket command](/frontend/extending/websocket-api/): for when the frontend needs something new from Core.
- [How authentication works](/core/internals/auth/): tokens, users, and permissions.
