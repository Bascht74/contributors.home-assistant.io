---
title: Date entity
description: Build a date entity that lets people set a calendar date on a device, like the start of a holiday mode.
sidebarLabel: Date
sidebarGroup: Inputs and helpers
---

A date entity lets people set a calendar date, without a time, on a device or service. Think of the date a holiday mode starts, or the next date a filter needs replacing. Inherit from `DateEntity` in `homeassistant.components.date`.

Need a time of day too? Use a [date and time](/core/entities/datetime/) entity. Only a time of day? Use a [time](/core/entities/time/) entity. Is the date something the device only reports, like the date it was installed? That is a [sensor](/core/entities/sensor/) with the `date` device class.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `native_value` | `datetime.date \| None` | Required | The current date. |

A date entity has no device class and no state attributes: both are final and always `None`. The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/).

## Supported features

This entity has no supported features.

## Methods

### Set value

Called when someone picks a date in the UI, or an automation or script calls the `date.set_value` action. Implement one of the two.

```python
class MyDate(DateEntity):
    # Implement one of these methods.

    def set_value(self, value: date) -> None:
        """Set a new date."""

    async def async_set_value(self, value: date) -> None:
        """Set a new date."""
```

## States

The state is `native_value` in ISO 8601 format, like `2026-12-24`. It is `unknown` when `native_value` is `None`.

## Example

```python
from datetime import date

from homeassistant.components.date import DateEntity
from homeassistant.const import EntityCategory


class ExampleHolidayStart(DateEntity):
    """The first day of the holiday mode."""

    _attr_has_entity_name = True
    _attr_translation_key = "holiday_start"
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, device: ExampleDevice) -> None:
        """Initialize the date entity."""
        self._device = device
        self._attr_unique_id = f"{device.serial}_holiday_start"
        self._attr_native_value = device.holiday_start

    async def async_set_value(self, value: date) -> None:
        """Set the first day of the holiday mode."""
        await self._device.set_holiday_start(value)
        self._attr_native_value = value
        self.async_write_ha_state()
```
