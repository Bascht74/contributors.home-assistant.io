---
title: "Platform"
description: "How an integration provides one type of entity, like the `light` platform of the Hue integration. Also used for integration platforms, files that plug into another integration."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "platforms"
    - "entity platform"
    - "integration platform"
  code:
    - "Platform.LIGHT"
    - "light.py"
  related:
    - "integration"
    - "entity"
    - "domain"
  autolink:
    - "entity platform"
    - "integration platform"
---

An **entity platform** is the part of an integration that provides one type of entity. The Hue integration has a `light.py` for its lights and a `sensor.py` for its sensors: its `light` and `sensor` platforms.

An **integration platform** is a file that lets an integration plug into another one, like `diagnostics.py` for [diagnostics](/glossary/diagnostics/) or `repairs.py` for repairs.
