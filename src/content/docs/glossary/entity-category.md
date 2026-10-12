---
title: "Entity category"
description: "Marks an entity as configuration or diagnostic, so it does not show up next to the main controls of a device."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "entity categories"
  code:
    - "EntityCategory.CONFIG"
    - "EntityCategory.DIAGNOSTIC"
  ui: "Configuration, Diagnostic"
  related:
    - "entity"
    - "device"
  autolink:
    - "entity category"
    - "entity categories"
---

A setting of a device, like the brightness of its status LED, is a configuration entity. Information for troubleshooting, like the signal strength, is a diagnostic entity. Entities without a category are the main controls and sensors.
