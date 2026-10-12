---
title: "Domain"
description: "The short, unique identifier of an integration, like `hue` or `light`. It is also the first part of every entity ID."
sidebarGroup: "Core and integrations"
term:
  code:
    - "DOMAIN"
    - "\"domain\" in manifest.json"
  related:
    - "integration"
    - "entity-id"
    - "platform"
  autolink:
    - "domain"
    - "domains"
---

The domain is the name of the integration's folder, and the `domain` key in its manifest. It is lowercase, with underscores between words, and never changes once an integration is released.

Entities have a domain too: the type of entity, like `light` in `light.kitchen`. That is the domain of the integration that defines the entity type, not of the integration that provides the entity. A Hue lamp is `light.living_room`, not `hue.living_room`.
