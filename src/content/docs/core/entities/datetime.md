---
title: Date and time entity
description: Build a date and time entity that lets people set a moment in time on a device, like when a charging session starts.
sidebarLabel: Date and time
sidebarGroup: Inputs and helpers
---

A date and time entity lets people set a full moment in time, a date with a time of day, on a device or service. Think of the moment a charging session starts, or when a dishwasher must be done. Inherit from `DateTimeEntity` in `homeassistant.components.datetime`.

Only need a date? Use a [date](/core/entities/date/) entity. Only a time of day that repeats every day, like a wake-up time? Use a [time](/core/entities/time/) entity. Is the moment something the device only reports, like when it last booted? That is a [sensor](/core/entities/sensor/) with the `timestamp` device class.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `native_value` | `datetime.datetime \| None` | Required | The current date and time. It must include a time zone. |

A date and time entity has no device class and no state attributes: both are final and always `None`. The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/).

## Supported features

This entity has no supported features.

## Methods

### Set value

Called when someone picks a date and time in the UI, or an automation or script calls the `datetime.set_value` action. Implement one of the two.

```python
class MyDateTime(DateTimeEntity):
    # Implement one of these methods.

    def set_value(self, value: datetime) -> None:
        """Set a new date and time."""

    async def async_set_value(self, value: datetime) -> None:
        """Set a new date and time."""
```

The value you get always has a time zone. When the action gets a date and time without one, it uses the time zone of the Home Assistant configuration.

## States

The state is `native_value`, converted to UTC, in ISO 8601 format with seconds, like `2026-12-24T17:30:00+00:00`. It is `unknown` when `native_value` is `None`.

A `native_value` without a time zone raises a `ValueError` when the state is written. Use the helpers in `homeassistant.util.dt` to get time zone aware values, like `dt_util.as_local()` or `dt_util.utcnow()`.

## Example

```python
from datetime import datetime

from homeassistant.components.datetime import DateTimeEntity


class ExampleChargeStart(DateTimeEntity):
    """When the next charging session starts."""

    _attr_has_entity_name = True
    _attr_translation_key = "charge_start"

    def __init__(self, charger: ExampleCharger) -> None:
        """Initialize the date and time entity."""
        self._charger = charger
        self._attr_unique_id = f"{charger.serial}_charge_start"
        self._attr_native_value = charger.charge_start

    async def async_set_value(self, value: datetime) -> None:
        """Set when the next charging session starts."""
        await self._charger.set_charge_start(value)
        self._attr_native_value = value
        self.async_write_ha_state()
```
