---
title: "Supported features"
description: "A number an entity sets to say which features of its type it supports, like a cover that can be set to a position."
sidebarGroup: "Entities and devices"
term:
  code:
    - "supported_features"
    - "CoverEntityFeature"
    - "LightEntityFeature"
  related:
    - "entity"
    - "action"
  autolink:
    - "supported features"
---

Each feature is a bit, from an enum like `CoverEntityFeature`. The frontend only shows the controls for supported features, and Home Assistant only allows the matching actions.
