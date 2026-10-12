---
title: "Supervisor API"
description: "The REST API of the Supervisor, that Home Assistant Core, the command line, and apps use to manage the system, apps, backups, and updates."
sidebarGroup: "Installation and system"
term:
  code:
    - "http://supervisor/"
    - "SUPERVISOR_TOKEN"
    - "hassio_api"
  related:
    - "supervisor"
    - "app"
    - "bashio"
  autolink:
    - "Supervisor API"
---

Inside an app, the API is at `http://supervisor/`, and the Supervisor gives every app its own token in the `SUPERVISOR_TOKEN` environment variable. What an app may call depends on what it asks for in its configuration, like `hassio_api: true`.

Many paths still use the old name of apps, like `/addons`. See the [Supervisor API reference](/apps/supervisor-api/).
