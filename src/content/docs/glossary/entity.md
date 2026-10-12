---
title: "Entity"
description: "One thing Home Assistant can show, measure, or control, like a light, a temperature sensor, or a switch. Every entity has a state."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "entities"
  code:
    - "Entity"
    - "entity_id"
  related:
    - "entity-id"
    - "state"
    - "device"
    - "platform"
    - "unique-id"
  autolink:
    - "entity"
    - "entities"
---

Entities are what users see and use: on dashboards, in automations, and by voice. An integration creates them, usually several per [device](/glossary/device/).

Each entity has a type, like `light` or `sensor`, which decides what it can do and how it looks. Its [state](/glossary/state/) is its current value, like `on` or `21.5`.
