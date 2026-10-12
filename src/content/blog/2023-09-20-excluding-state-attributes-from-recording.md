---
title: New way of excluding state attributes from recording
description: The way in which state attributes are excluded from recording has changed
date: 2023-09-20
authors:
  - Erik Montnémery
areas:
  - core
---

The way in which state attributes are excluded from recording has changed

The recorder platforms have been replaced with two new attributes which can be set in classes derived from `Entity`:
- `_entity_component_unrecorded_attributes: frozenset[str]` - This should be set by base component entity classes, e.g. `LightEntity`
- `_unrecorded_attributes: frozenset[str]` - This should be set by derived platform classes, e.g. `HueLight` to exclude 
additional, integration specific, attributes from recording.


More details can be found in the [entity documentation](/core/entities/state-attributes/#keep-attributes-out-of-the-history).

Background for the change is in [architecture discussion #964](https://github.com/home-assistant/architecture/discussions/964).
