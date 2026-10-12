---
title: Disable noisy or less popular entities
description: "Gold rule entity-disabled-by-default: entities that few users need are disabled by default."
sidebarLabel: entity-disabled-by-default
sidebarGroup: Gold
order: 15
---

This is a Gold rule. In `quality_scale.yaml`, it is called `entity-disabled-by-default`.

Entities that most users do not need, or that change their state very often, are disabled by default. Users who want them can enable them in the entity settings.

There is no fixed list of which entities those are. It depends on the device. The signal strength of a Bluetooth temperature sensor is of little use to most people, so it is disabled by default. For a device that exists to measure signal strength, the same entity is the main feature, and stays enabled.

## Why it matters

Home Assistant records the history of every enabled entity. Each state change costs a bit of CPU, memory, and disk space, and noisy entities change a lot. Multiply that by the number of devices in a home, and it adds up, especially on small hardware like a Raspberry Pi.

Disabling those entities by default means only the users who need them pay that cost. It also keeps the list of entities manageable for everyone else.

## Example

```python
class MySignalStrengthSensor(SensorEntity):
    """The signal strength of My device."""

    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_device_class = SensorDeviceClass.SIGNAL_STRENGTH
    _attr_native_unit_of_measurement = SIGNAL_STRENGTH_DECIBELS_MILLIWATT
    _attr_entity_registry_enabled_default = False
```

With entity descriptions, set `entity_registry_enabled_default=False` on the description instead.

The setting only applies when the entity is added to the entity registry for the first time. Changing it later does not disable entities that users already have.

## How it is checked

Checked in review.

## Exceptions

If the integration has no entities, or none of its entities are noisy or rarely used, this rule does not apply.

## Related rules

- [appropriate-polling](/core/quality-scale/appropriate-polling/): poll at an appropriate interval.
