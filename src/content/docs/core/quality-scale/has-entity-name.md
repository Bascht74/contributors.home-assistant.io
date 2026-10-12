---
title: Use has_entity_name
description: "Bronze rule has-entity-name: entities set has_entity_name to True, and are named in context of their device."
sidebarLabel: has-entity-name
sidebarGroup: Bronze
order: 16
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `has-entity-name`.

Every entity of the integration must set `has_entity_name` to `True`. The name of the entity then only describes what it is, like "Temperature", and Home Assistant puts the name of the [device](/glossary/device/) in front of it where that is needed. The main feature of a device gets the name `None`, so it takes the name of the device itself.

## Why it matters

With `has_entity_name`, Home Assistant knows which part of the name is the device and which part is the entity. It can show "Temperature" on the device page, where the device is obvious, and "Living room sensor Temperature" in a list of all entities. Naming works the same way in every integration, and users who rename a device see the new name on all its entities.

It is also the base for translated entity names, which are a Gold rule.

## Example

A sensor on a device named "My device", called "My device Temperature":

```python
class MyTemperatureSensor(SensorEntity):
    """Temperature sensor of a device."""

    _attr_has_entity_name = True
    _attr_translation_key = "temperature"

    def __init__(self, device: MyDevice) -> None:
        """Initialize the sensor."""
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device.serial_number)},
            name=device.name,
        )
```

The lock that is the main feature of a device, called "My device":

```python
class MyLock(LockEntity):
    """The lock of the device."""

    _attr_has_entity_name = True
    _attr_name = None
```

Set `_attr_has_entity_name` once, in the base entity in `entity.py`, and all your entities follow.

## How it is checked

Pylint, when the rule is `done`: `home-assistant-missing-has-entity-name` warns when an entity class does not always set `has_entity_name` to `True`, either on the class, at the start of a method, or through an entity description. A value that depends on a condition does not count.

## Exceptions

If the integration does not have any entities, this rule does not apply.

## Related rules

- [entity-translations](/core/quality-scale/entity-translations/): translate entity names.
- [entity-device-class](/core/quality-scale/entity-device-class/): use device classes.
- [devices](/core/quality-scale/devices/): create devices.
