---
title: Energy by distance units
description: A new ENERGY_DISTANCE device class for representing energy per distance is now available for number and sensor entities, together with automatic unit conversion based on the unit system.
date: 2025-01-31
authors:
  - Jakob Schlyter
areas:
  - core
---

### Summary of changes

A new `ENERGY_DISTANCE` device class for representing energy per distance is now available for number and sensor entities, together with automatic unit conversion based on the unit system. 
This new device class can be used, for example, on entities that show the amount of electric energy consumed by an electric car. A corresponding `UnitOfEnergyDistance` unit enumerator, and `EnergyDistanceConverter` converter class have been added to support the new device class.

The following units are available:

- kWh/100km
- mi/kWh
- km/kWh

More details can be found in the [Number documentation](/core/entities/number/#device-classes) and [Sensor documentation](/core/entities/sensor/#device-classes)


### Inverse Units

Implementing `EnergyDistanceConverter` has also resulted in support for inverse units in `BaseUnitConverter`. This simplifies adding new units that are inverses of one another, e.g., kWh/100km and km/kWh.
