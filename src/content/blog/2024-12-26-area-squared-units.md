---
title: New area device class
description: More details can be found in the Number documentation and Sensor documentation
date: 2024-12-26
authors:
  - Michael Arthur
areas:
  - core
---

### Summary of changes
A new `AREA` device class is now available for number and sensor entities, together with automatic unit conversion based on the unit system.
A corresponding `UnitOfArea` unit enumerator, and `AreaConverter` converter class have been added to support the new device class.

### Backward compatibility
The `AREA_SQUARE_METERS` constant has been deprecated and will be removed in Home Assistant `2025.12`.
Custom integrations should be adjusted to use `UnitOfArea.SQUARE_METERS`.

More details can be found in the [Number documentation](/core/entities/number/#device-classes) and [Sensor documentation](/core/entities/sensor/#device-classes)
