---
title: Number entity
description: Build a number entity that lets people set a numeric value on a device, like a target level or a timeout.
sidebarLabel: Number
sidebarGroup: Inputs and helpers
---

A number entity lets people set a numeric value: a volume level, a timeout in seconds, a temperature offset, or the maximum charge current of a car charger. Inherit from `NumberEntity` in `homeassistant.components.number`.

Use it for values people _set_. A value that the device only reports is a [sensor](/core/entities/sensor/). And when a richer platform exists, use that one: the target temperature of a thermostat belongs on a [climate](/core/entities/climate/) entity, the brightness of a bulb on a [light](/core/entities/light/).

For how the frontend shows a number, see the [number more-info view](/design/more-info/number/).

## Properties

Every property that carries a value starts with `native_`. You return values in the unit the device uses, and the base class converts them to the unit the user wants. See [units and conversion](#units-and-conversion).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `native_value` | `float \| None` | `None` | The current value, in `native_unit_of_measurement`. |
| `native_min_value` | `float` | `0.0` | The lowest value that is accepted, inclusive. |
| `native_max_value` | `float` | `100.0` | The highest value that is accepted, inclusive. |
| `native_step` | `float \| None` | `None` | The smallest change between two values. When `None`, the base class picks one from the range, see below. |
| `native_unit_of_measurement` | `str \| None` | `None` | The unit the values are in. Leave it out when you translate the unit instead. |
| `mode` | `NumberMode` | `NumberMode.AUTO` | How the frontend shows the control. |
| `device_class` | `NumberDeviceClass \| None` | `None` | What the number measures. See [device classes](#device-classes). |

Without `native_step`, the step starts at `1.0`. When the range between minimum and maximum is `1.0` or smaller, the base class divides the step by 10 until it fits.

The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/). Don't set `unit_of_measurement`, `min_value`, `max_value`, `step`, or `value`: those are final and calculated by the base class from the `native_` properties.

## Supported features

This entity has no supported features.

## Modes

| Constant | Description |
| --- | --- |
| `NumberMode.AUTO` | Let the frontend pick between a slider and an input box. Use this unless you have a reason not to. |
| `NumberMode.BOX` | Always show an input box. |
| `NumberMode.SLIDER` | Always show a slider. |

## Device classes

The number device classes are the same as the [sensor device classes](/core/entities/sensor/), except `date`, `enum`, `timestamp`, and `uptime`. They are the `NumberDeviceClass` enum in `homeassistant/components/number/const.py`, for example `NumberDeviceClass.TEMPERATURE`, `NumberDeviceClass.POWER`, or `NumberDeviceClass.DURATION`.

When you set a device class, return a unit that the device class accepts. The accepted units are in `DEVICE_CLASS_UNITS`, in the same file. A number with a device class and no name of its own gets the translated name of its device class, like "Temperature". See [naming entities](/core/entities/naming/).

## Units and conversion

For a lot of device classes, the base class converts between units: you work in the native unit, the user sees their own. The device classes with conversion are the keys of `UNIT_CONVERTERS` in `homeassistant/components/number/const.py`.

- A `temperature` number with a native unit of °C or °F shows in the temperature unit of the Home Assistant configuration.
- Users can pick another unit for a number in its entity settings, as long as the device class supports conversion and both units are valid for it.
- The minimum and maximum are converted too. The minimum rounds down and the maximum rounds up, so the range never gets narrower. The step is not converted: a `native_step` you set is used as is in the user's unit. Without one, the step is derived from the converted range.
- When someone sets a value, you get it back in your native unit.

If the unit is text that should be translated, like "presses", leave `native_unit_of_measurement` out and give the unit in `strings.json` under the translation key of the entity. Setting both raises an error. See [making your strings translatable](/translate/guides/developers/).

## Methods

### Set value

Called when someone changes the value in the UI, or an automation or script calls the `number.set_value` action. The value is in your native unit. Implement one of the two.

```python
class MyNumber(NumberEntity):
    # Implement one of these methods.

    def set_native_value(self, value: float) -> None:
        """Set a new value."""

    async def async_set_native_value(self, value: float) -> None:
        """Set a new value."""
```

Don't implement `set_value` or `async_set_value`. They are final and from an old API; a subclass that overrides them gets a warning in the log.

## States

The state is `native_value`, converted to the unit of the user when that differs from the native unit. A converted value keeps the number of decimals of the native value. It is `unknown` when `native_value` is `None`.

The minimum, maximum, step, and mode are capability attributes: they are written to the [entity registry](/core/entities/registry/), and left out of the recorder history.

## Restoring the value

If your number keeps its value in Home Assistant, not on a device, it needs to come back after a restart. Inherit from `RestoreNumber` instead of `NumberEntity` and `RestoreEntity`. `RestoreEntity` stores the converted state; `RestoreNumber` stores the `native_` values, so you restore what you set.

```python
from homeassistant.components.number import RestoreNumber


class MyNumber(RestoreNumber):
    async def async_added_to_hass(self) -> None:
        """Restore the last value."""
        await super().async_added_to_hass()
        if (data := await self.async_get_last_number_data()) is not None:
            self._attr_native_value = data.native_value
```

`async_get_last_number_data()` returns the last `native_value`, `native_min_value`, `native_max_value`, `native_step`, and `native_unit_of_measurement`, or `None` when there is nothing to restore. See [the entity lifecycle](/core/entities/lifecycle/) for when `async_added_to_hass` runs.

## Example

```python
from homeassistant.components.number import (
    NumberDeviceClass,
    NumberEntity,
    NumberMode,
)
from homeassistant.const import EntityCategory, UnitOfElectricCurrent


class ExampleChargeCurrent(NumberEntity):
    """The maximum charge current of a car charger."""

    _attr_has_entity_name = True
    _attr_translation_key = "max_charge_current"
    _attr_device_class = NumberDeviceClass.CURRENT
    _attr_entity_category = EntityCategory.CONFIG
    _attr_mode = NumberMode.SLIDER
    _attr_native_min_value = 6
    _attr_native_max_value = 32
    _attr_native_step = 1
    _attr_native_unit_of_measurement = UnitOfElectricCurrent.AMPERE

    def __init__(self, device: ExampleCharger) -> None:
        """Initialize the number."""
        self._device = device
        self._attr_unique_id = f"{device.serial}_max_charge_current"
        self._attr_native_value = device.max_current

    async def async_set_native_value(self, value: float) -> None:
        """Set the maximum charge current."""
        await self._device.set_max_current(int(value))
        self._attr_native_value = value
        self.async_write_ha_state()
```
