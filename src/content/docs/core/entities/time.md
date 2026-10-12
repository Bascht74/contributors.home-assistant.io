---
title: Time entity
description: Build a time entity that lets people set a time of day on a device, like a wake-up time.
sidebarLabel: Time
sidebarGroup: Inputs and helpers
---

A time entity lets people set a time of day, without a date, on a device or service. Think of the time an alarm clock goes off, or when a heating schedule switches to night mode. Inherit from `TimeEntity` in `homeassistant.components.time`.

Need a specific moment, with a date? Use a [date and time](/core/entities/datetime/) entity. Only a date? Use a [date](/core/entities/date/) entity.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `native_value` | `datetime.time \| None` | `None` | The current time of day. |

A time entity has no device class and no state attributes: both are final and always `None`. The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/).

## Supported features

This entity has no supported features.

## Methods

### Set value

Called when someone picks a time in the UI, or an automation or script calls the `time.set_value` action. Implement one of the two.

```python
class MyTime(TimeEntity):
    # Implement one of these methods.

    def set_value(self, value: time) -> None:
        """Set a new time."""

    async def async_set_value(self, value: time) -> None:
        """Set a new time."""
```

## States

The state is `native_value` in ISO 8601 format, like `07:30:00`. It is `unknown` when `native_value` is `None`.

## Example

```python
from datetime import time

from homeassistant.components.time import TimeEntity
from homeassistant.const import EntityCategory


class ExampleWakeUpTime(TimeEntity):
    """The time the alarm clock goes off."""

    _attr_has_entity_name = True
    _attr_translation_key = "wake_up_time"
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, device: ExampleDevice) -> None:
        """Initialize the time entity."""
        self._device = device
        self._attr_unique_id = f"{device.serial}_wake_up_time"
        self._attr_native_value = device.wake_up_time

    async def async_set_value(self, value: time) -> None:
        """Set the wake-up time."""
        await self._device.set_wake_up_time(value)
        self._attr_native_value = value
        self.async_write_ha_state()
```
