---
title: "Supervisor plugin"
description: "A container the Supervisor runs for the system itself, like DNS or audio, that Home Assistant Core and apps share."
sidebarGroup: "Installation and system"
term:
  aliases:
    - "plugin"
    - "plugins"
  code:
    - "supervisor/plugins/"
    - "plugin-dns"
    - "plugin-audio"
  related:
    - "supervisor"
    - "home-assistant-os"
  autolink:
    - "Supervisor plugin"
    - "Supervisor plugins"
---

There are five: DNS, audio, the command line (CLI), multicast, and the observer. Each has its own repository, like home-assistant/plugin-dns. Users don't install or remove them, and the Supervisor keeps them updated. See [Plugins](/os/supervisor/plugins/).
