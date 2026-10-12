---
title: Connect Core to a Supervisor
description: Run Home Assistant Core from your development environment against a real Supervisor, to work on the hassio integration.
sidebarGroup: Guides
order: 3
---

Home Assistant Core talks to the Supervisor through the `hassio` integration, in `homeassistant/components/hassio/`. To work on that integration, you need Core from your development environment talking to a real Supervisor. The [Core development environment](/core/development/environment/) has the first half. This page adds the Supervisor.

## Get access to the Supervisor API

The Supervisor API needs a token. The **Remote API proxy** app gives you one, and makes the API reachable from outside the device:

1. Add the [development apps repository](https://github.com/home-assistant/apps-development) to the app store of the device running the Supervisor. That can be a test device, or the [Supervisor development container](/os/supervisor/development/).
2. Install the **Remote API proxy** app, and select **Start**.
3. The token shows up in the log of the app.

The app needs to keep running while you work. It listens on port 8880 of the host.

The proxy token has slightly fewer rights than the token Core gets in production. If you need the real one, get it on the host shell, see [debug the host](/os/operating-system/debugging/):

```shell
docker inspect homeassistant | grep SUPERVISOR_TOKEN
```

Either token can change after a reboot or an update.

## Start Core against it

The `hassio` integration finds the Supervisor through two environment variables. Set them when you start Core:

```shell
SUPERVISOR=192.168.1.100:8880 SUPERVISOR_TOKEN=abcdefgh1234 hass
```

- `SUPERVISOR` is the address of the device, with the port of the proxy app.
- `SUPERVISOR_TOKEN` is the token from the app log.

Your Core now loads the `hassio` integration, and shows the apps, backups, and system settings of that device.

## The frontend

The frontend reaches the Supervisor through Core, which proxies the Supervisor API for admin users. So with Core connected like this, a [frontend development setup](/frontend/) pointed at your Core works with the Supervisor too.
