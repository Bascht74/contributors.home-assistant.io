---
title: "Coordinator"
description: "A helper that fetches data for many entities at once, on a schedule, so a device or API is asked once instead of once per entity."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "data update coordinator"
    - "update coordinator"
  code:
    - "DataUpdateCoordinator"
    - "CoordinatorEntity"
  related:
    - "polling"
    - "entity"
    - "unavailable"
  autolink:
    - "data update coordinator"
---

Entities that get their data from a coordinator update together, when it has new data. The coordinator also handles errors in one place: when fetching fails, its entities become [unavailable](/glossary/unavailable/).
