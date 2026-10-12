---
title: "Integration"
description: "A package of code that connects Home Assistant to a device, service, or protocol, or adds a feature like automations."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "integrations"
  code:
    - "homeassistant/components/<domain>/"
  formerly:
    - "component"
  related:
    - "domain"
    - "manifest"
    - "config-entry"
    - "platform"
    - "custom-integration"
  autolink:
    - "integration"
    - "integrations"
---

Almost all of Home Assistant Core is integrations. Some connect to something outside Home Assistant, like Philips Hue or Z-Wave. Others are building blocks that other integrations use, like `light`, `sensor`, or `automation`.

Every integration lives in its own folder, named after its [domain](/glossary/domain/), and describes itself in a [manifest](/glossary/manifest/). Users add most integrations in the UI, with a [config flow](/glossary/config-flow/).

The code still uses the old name in places: integrations live in `homeassistant/components/`, and some functions say component. In text, always say integration.
