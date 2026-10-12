---
title: "Ingress"
description: "A way for an app to show its web interface inside Home Assistant, behind the Home Assistant login, without opening a port."
sidebarGroup: "Installation and system"
term:
  code:
    - "ingress"
    - "ingress_port"
    - "ingress_panel"
  related:
    - "app"
    - "supervisor"
    - "panel"
  autolink:
    - "ingress"
---

An app turns it on with `ingress: true` in its configuration, and serves its web interface on the ingress port, 8099 unless it sets another one. The Supervisor passes the requests on to the app, only for users who are logged in to Home Assistant. With `ingress_panel`, the app also gets its own [panel](/glossary/panel/) in the sidebar. See [Add a web interface with ingress](/apps/guides/ingress/).
