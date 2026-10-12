---
title: "Device"
description: "A physical device, or a service, that one or more entities belong to, like a thermostat with a temperature sensor and a humidity sensor."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "devices"
  code:
    - "DeviceInfo"
    - "device_registry"
    - "device_id"
  related:
    - "entity"
    - "registry"
    - "area"
---

Integrations describe their devices with `DeviceInfo`: a name, manufacturer, model, and versions. Home Assistant keeps them in the device registry, where users can rename them and put them in an [area](/glossary/area/).

A device can also be a service, like a weather forecast, so its entities are grouped together.
