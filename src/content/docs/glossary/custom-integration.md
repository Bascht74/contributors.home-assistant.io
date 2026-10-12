---
title: "Custom integration"
description: "An integration that is not part of Home Assistant Core, installed by the user in the `custom_components` folder."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "custom integrations"
    - "custom component"
  code:
    - "custom_components/"
  related:
    - "integration"
    - "backward-incompatible-change"
    - "custom-card"
    - "marketplace"
  autolink:
    - "custom integration"
    - "custom integrations"
---

Anyone can write a custom integration, and it works like any other integration. The project does not review them, and changes in Home Assistant Core can break them, which is why backward-incompatible changes for developers are announced on the blog.

A custom integration needs a `version` in its manifest. Users find and install many of them through the [Marketplace](/glossary/marketplace/), built into Home Assistant starting with 2026.11. Before that, the Marketplace was [HACS](/glossary/hacs/), a custom integration itself. To publish one, see [custom integrations](/marketplace/guides/integrations/) in the Marketplace area. It is also the recommended way to start a new integration, see [does it belong in core](/core/integrations/create/#does-it-belong-in-core).
