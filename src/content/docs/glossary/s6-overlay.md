---
title: "S6 overlay"
description: "The init system in the Home Assistant base images. It starts, watches, and stops the programs of an app inside its container."
sidebarGroup: "Installation and system"
term:
  aliases:
    - "s6-overlay"
    - "S6"
  code:
    - "/init"
    - "/etc/s6-overlay/s6-rc.d/"
  related:
    - "app"
    - "bashio"
  autolink:
    - "S6 overlay"
---

Docker runs one command per container. [S6 overlay](https://github.com/just-containers/s6-overlay) lets an app run several, in the right order: a setup step first, then the programs, restarted when they crash. The base images make its `/init` the entrypoint, so an app only adds its service definitions. See [Run services with S6 overlay](/apps/guides/s6-overlay/).
