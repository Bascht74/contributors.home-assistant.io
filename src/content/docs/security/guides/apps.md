---
title: Secure apps
description: What the advisories about apps and the Supervisor teach, on top of the security guide of the apps area.
sidebarLabel: Apps
order: 3
---

An [app](/glossary/app/) runs in its own container, next to Home Assistant and the [Supervisor](/glossary/supervisor/). The apps area already covers how to keep an app safe: [Secure your app](/apps/guides/security/) explains what to ask for, AppArmor, protection mode, API roles, and logins, and the [security rating](/apps/reference/security-rating/) shows how users see your choices. Start there.

This page adds the lessons from the [past advisories](/security/reference/advisories/#apps-and-the-supervisor) that are about apps and the Supervisor.

## Do not trust the network alone

A common pattern in apps: run on the host network, and serve an endpoint without a login on the internal network of the Supervisor, `hassio`. The idea was that only other containers could reach that address. In 2026, an advisory showed that this [was not true](https://github.com/home-assistant/core/security/advisories/GHSA-gh5m-4m97-c95h). A device on the local network could add a route to the internal address through the host, and reach those endpoints directly. The advisory names a shell in a terminal app, and the WebSocket APIs of two others.

Supervisor 2026.03.2 fixed this for every installation: it adds firewall rules on the host that drop traffic to the gateway address of that network, unless it comes from that network itself or from the host.

The lesson goes beyond that one fix. Where an endpoint listens is not a login.

- Put a login on every endpoint that can change something, or that shows something private. Use [Home Assistant users](/apps/guides/security/#use-home-assistant-users) for that, instead of your own.
- For a web interface, use [ingress](/apps/guides/ingress/), and only accept connections from the Supervisor at `172.30.32.2`. Home Assistant then handles the login.
- Only use the host network when your app really needs it. It also lowers the [security rating](/apps/reference/security-rating/).

## The Supervisor API bypass

In 2023, an advisory showed that attackers could bypass authentication and reach the [Supervisor API](https://github.com/home-assistant/core/security/advisories/GHSA-2j8f-h4mr-qr25) through Home Assistant, remotely. That API can install updates, and manage apps and backups. The [announcement](https://www.home-assistant.io/blog/2023/03/08/supervisor-security-disclosure/) says the problem had been there since the Supervisor was introduced in 2017.

The fixes in Core and the Supervisor show two patterns that apply to any app that forwards requests:

- **Forward only what is on a list.** The proxy for the Supervisor API in Core now only forwards paths that match an explicit list, with one list for requests without a login and one for admins. Everything else gets refused.
- **Decode before you check.** Core refuses a path that changes when it is decoded. The Supervisor decodes paths and query strings, as often as needed, before it checks them for patterns like `../`.

A related advisory from the same year showed a path built from outside data: the `addon` field of the `hassio.addon_stdin` action ended up in the path of a [Supervisor API request](https://github.com/home-assistant/core/security/advisories/GHSA-4r74-h49q-rr3h). Core now checks that field against a strict pattern for a slug. If your app builds a URL or a path from input, check that input the same way.

## Ask for the smallest role

The Supervisor API protects itself, but your app holds a token for it. If your app is ever taken over, the attacker gets what that token allows. Pick the lowest [API role](/apps/guides/security/#api-roles) that works, and only turn on `hassio_api`, `homeassistant_api`, or `auth_api` when you call them.

## Related

- [Secure your app](/apps/guides/security/): the full guide in the apps area.
- [Security rating](/apps/reference/security-rating/): how each choice changes the rating.
- [Past advisories](/security/reference/advisories/): every advisory, grouped by kind.
