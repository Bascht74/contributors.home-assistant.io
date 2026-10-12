---
title: Event entity
description: Turn things that happen in the physical world, like a button press or a doorbell ring, into an entity you can automate on.
sidebarLabel: Event
sidebarGroup: Sensors and status
---

An event entity captures something that happens at a moment in time: a button on a remote is pressed, a doorbell rings, a motion sensor fires. It has no lasting state of its own. You fire events, and Home Assistant keeps track of the last one. Inherit from `EventEntity`, imported from `homeassistant.components.event`.

Use an event entity for momentary signals that have no on or off state. If the thing stays on for a while, like detected motion that clears after a minute, a [binary sensor](/core/entities/binary-sensor/) fits better.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `event_types` | `list[str]` | Required | The event types this entity can fire. |
| `device_class` | `EventDeviceClass \| None` | `None` | What kind of events these are. See [device classes](#device-classes). |

The generic properties every entity has, like `name` or `available`, are on [the entity class](/core/entities/entity-class/). The `event_types` list is a capability attribute and is not recorded in history.

## Supported features

This entity has no supported features.

## Device classes

| Device class | Use it for |
| --- | --- |
| `EventDeviceClass.BUTTON` | A button on a remote or a wall switch was pressed. |
| `EventDeviceClass.DOORBELL` | A button that is a doorbell. |
| `EventDeviceClass.MOTION` | A motion sensor detected motion. |

An event entity with a device class and no name is named after its device class. See [naming](/core/entities/naming/).

### Standard event types

Some device classes have standard event types, so one automation works no matter which integration provides the entity. They are enums in `homeassistant.components.event`.

A `DOORBELL` entity must support `DoorbellEventType.RING`. Home Assistant logs a warning when it does not, and from Home Assistant 2027.4 that will stop working.

A `BUTTON` entity can use these `ButtonEventType` values. None of them are mandatory: only use the ones your hardware can produce.

| Event type | Meaning |
| --- | --- |
| `PRESS_START` | The button was pressed down. |
| `PRESS_END` | The button was released after a short press. |
| `LONG_PRESS_START` | The button was held past a threshold. |
| `LONG_PRESS_END` | The button was released after a long press. |
| `MULTI_PRESS_ONGOING` | A press in a series of presses was detected, and the series is not done. |
| `MULTI_PRESS_END` | A series of presses is done. |

Both multi press types include a `multi_press_count` attribute (the `ATTR_MULTI_PRESS_COUNT` constant) with the number of presses. If a device sends only one event per interaction, without a separate press and release, use the matching end type, like `PRESS_END` for a short press. For a button that reports a direction from one source, like an up and down rocker, prefer one entity per direction. A non-standard `direction` attribute is acceptable when separate entities are not practical. Other, non-standard event types are allowed too.

## Methods

You do not implement any methods. You fire events by calling `_trigger_event`, and then write the state.

### `_trigger_event`

```python
def _trigger_event(
    self, event_type: str, event_attributes: dict[str, Any] | None = None
) -> None:
```

`event_type` must be in `event_types`, or the call raises a `ValueError`. The optional `event_attributes` are added to the state attributes, next to `event_type`. Call `self.async_write_ha_state()` right after to publish the event.

The event entity restores its last event after a restart by itself: it is a `RestoreEntity`.

## States

The state is the time the last event fired, as an ISO 8601 timestamp with milliseconds. Before the first event, it is `unknown`. The `event_type` attribute holds the type of the last event, along with any attributes you passed.

When two events fire in the same millisecond, the base class moves the second one forward by a millisecond, so each event is its own state change.

## Example

A doorbell button that listens to a device:

```python
from homeassistant.components.event import (
    DoorbellEventType,
    EventDeviceClass,
    EventEntity,
)
from homeassistant.core import callback


class ExampleDoorbell(EventEntity):
    """Doorbell button of an example device."""

    _attr_has_entity_name = True
    _attr_device_class = EventDeviceClass.DOORBELL
    _attr_event_types = [DoorbellEventType.RING]

    def __init__(self, device: ExampleDevice) -> None:
        """Initialize the event entity."""
        self._device = device
        self._attr_unique_id = f"{device.serial}_doorbell"

    async def async_added_to_hass(self) -> None:
        """Listen for rings."""
        self.async_on_remove(self._device.on_ring(self._handle_ring))

    @callback
    def _handle_ring(self) -> None:
        """Handle a ring from the device."""
        self._trigger_event(DoorbellEventType.RING)
        self.async_write_ha_state()
```

Registering the listener with `async_on_remove` makes sure it is removed again with the entity. See [the entity lifecycle](/core/entities/lifecycle/).
