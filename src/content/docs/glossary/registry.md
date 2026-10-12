---
title: "Registry"
description: "Where Home Assistant keeps what it knows about entities, devices, areas, floors, and labels, and what users changed about them."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "registries"
    - "entity registry"
    - "device registry"
  code:
    - "er.async_get"
    - "dr.async_get"
    - "entity_registry"
    - "device_registry"
  related:
    - "unique-id"
    - "device"
    - "area"
    - "label"
  autolink:
    - "entity registry"
    - "device registry"
    - "area registry"
---

There is one registry for each: the entity registry, the device registry, the area registry, and so on. They are stored in `.storage` and survive restarts.

Users' changes live in the registries, not in integrations. When a user renames an entity, the integration does not need to know.
