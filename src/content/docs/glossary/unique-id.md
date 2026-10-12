---
title: "Unique ID"
description: "An ID that an integration gives an entity or config entry, which never changes, so Home Assistant recognizes it after a restart."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "unique IDs"
  code:
    - "unique_id"
    - "_attr_unique_id"
  related:
    - "entity"
    - "registry"
    - "config-entry"
    - "entity-id"
  autolink:
    - "unique ID"
    - "unique IDs"
---

An entity with a unique ID gets an entry in the entity registry. Only then can users change its name, area, icon, and entity ID in the UI.

A unique ID comes from something that does not change, like a serial number or a MAC address. Not a name, IP address, or host name: those can change.
