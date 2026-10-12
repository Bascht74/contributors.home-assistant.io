---
title: Use device classes
description: "Gold rule entity-device-class: entities use a device class wherever one fits."
sidebarLabel: entity-device-class
sidebarGroup: Gold
order: 14
---

This is a Gold rule. In `quality_scale.yaml`, it is called `entity-device-class`.

Entities use a [device class](/glossary/device-class/) wherever one fits. A temperature sensor uses `SensorDeviceClass.TEMPERATURE`, a door contact `BinarySensorDeviceClass.DOOR`, a firmware update `UpdateDeviceClass.FIRMWARE`. The [entity pages](/core/entities/) list the device classes of each platform.

## Why it matters

A device class tells Home Assistant what an entity measures or represents, and a lot builds on that:

- Users can switch a sensor to another unit, like from °C to °F, only when the device class is known.
- Assist can answer "what is the temperature in the living room?".
- Google Assistant and Amazon Alexa know how to expose the entity.
- The frontend picks a fitting icon, and shows the state in the right way, like "Open" instead of "On" for a door.
- Entities can be named after their device class, so they need no translation of their own.

## Example

This sensor uses the temperature device class. It has no name of its own, so it is named after the device class: "My device Temperature".

```python
class MyTemperatureSensor(SensorEntity):
    """The temperature of My device."""

    _attr_has_entity_name = True
    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS

    def __init__(self, device: MyDevice) -> None:
        """Initialize the sensor."""
        self._attr_unique_id = f"{device.serial}_temperature"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device.serial)},
            name="My device",
        )
```

## How it is checked

- Pylint warns when a translation key only repeats the name the device class already provides (`home-assistant-redundant-translation-key`).
- Whether a device class fits, and whether one is missing, is checked in review.

## Exceptions

If the integration has no entities, or its entities are on platforms that have no device classes, like `light`, `tts`, or `conversation`, this rule does not apply.

## Related rules

- [has-entity-name](/core/quality-scale/has-entity-name/): use has_entity_name.
- [entity-translations](/core/quality-scale/entity-translations/): translate entity names.
- [icon-translations](/core/quality-scale/icon-translations/): use icon translations.
