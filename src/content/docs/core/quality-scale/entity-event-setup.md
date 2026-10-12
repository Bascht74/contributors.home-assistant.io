---
title: Subscribe to events in the entity lifecycle
description: "Bronze rule entity-event-setup: entities subscribe in async_added_to_hass and unsubscribe when removed."
sidebarLabel: entity-event-setup
sidebarGroup: Bronze
order: 14
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `entity-event-setup`.

When an [entity](/glossary/entity/) subscribes to events, for example to updates pushed by the library of the integration, it must subscribe in `async_added_to_hass`, and unsubscribe when it is removed. Do not subscribe in `__init__`.

## Why it matters

Home Assistant calls `async_added_to_hass` after the entity platform has registered the entity. From that moment on, the entity has everything it needs, like `self.hass` and `self.async_write_ha_state`. A callback that fires before that point, and tries to write a state, fails.

Unsubscribing matters just as much. An entity that is removed, or whose config entry is unloaded, but is still subscribed, keeps receiving events. That leaks memory and can write states for an entity that no longer exists.

## Example

The easiest way is `async_on_remove`. It takes the unsubscribe function, and calls it when the entity is removed, so you do not have to keep track of it yourself:

```python
class MySensor(SensorEntity):
    """A sensor that gets pushed updates."""

    def __init__(self, client: MyClient) -> None:
        """Initialize the sensor."""
        self.client = client

    async def async_added_to_hass(self) -> None:
        """Subscribe to updates when added to Home Assistant."""
        await super().async_added_to_hass()
        self.async_on_remove(
            self.client.events.subscribe("update", self._handle_update)
        )

    @callback
    def _handle_update(self, event: MyEvent) -> None:
        """Handle an update from the device."""
        self._attr_native_value = event.value
        self.async_write_ha_state()
```

If you need more control, unsubscribe in `async_will_remove_from_hass` instead. Entities based on `CoordinatorEntity` already do this for their coordinator, so you only need it for subscriptions of your own.

## How it is checked

Checked in review.

## Exceptions

If the entities of the integration do not subscribe to events, this rule does not apply.

## Related rules

- [config-entry-unloading](/core/quality-scale/config-entry-unloading/): support unloading the config entry.
