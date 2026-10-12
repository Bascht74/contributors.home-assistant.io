---
title: Add new devices automatically
description: "Gold rule dynamic-devices: devices that appear after setup are added without a reload."
sidebarLabel: dynamic-devices
sidebarGroup: Gold
order: 12
---

This is a Gold rule. In `quality_scale.yaml`, it is called `dynamic-devices`.

When a new device shows up after the integration is set up, like a new light paired to a hub or a new device added to a cloud account, the integration creates its entities by itself. The user does not have to reload the integration or restart Home Assistant.

## Why it matters

Users add a device to their hub or account, and expect it to show up in Home Assistant. Having to know that a reload is needed, and where to find it, is the kind of friction that Gold is about removing.

This is the other side of [stale-devices](/core/quality-scale/stale-devices/): devices come and go, and Home Assistant follows.

## Example

With a [coordinator](/glossary/coordinator/), keep track of the devices the platform already knows. A listener on the coordinator runs after every update, and adds entities for the new devices:

```python
async def async_setup_entry(
    hass: HomeAssistant,
    entry: MyConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the sensors of My integration."""
    coordinator = entry.runtime_data
    known_devices: set[str] = set()

    @callback
    def _add_new_devices() -> None:
        new_devices = set(coordinator.data) - known_devices
        if not new_devices:
            return

        known_devices.update(new_devices)
        async_add_entities(
            MySensor(coordinator, device_id) for device_id in new_devices
        )

    _add_new_devices()
    entry.async_on_unload(coordinator.async_add_listener(_add_new_devices))
```

The listener is removed when the config entry unloads, through `entry.async_on_unload`.

In this example, `known_devices` only grows while the entry is loaded. When the integration also removes devices that are gone, like [stale-devices](/core/quality-scale/stale-devices/) describes, a device that comes back later is still in `known_devices`, and its entities are not added again until the entry reloads. Drop removed devices from `known_devices` as well, so they are treated as new when they return.

## How it is checked

Checked in review.

## Exceptions

Integrations with a single, fixed device per config entry, that lives and goes with the config entry, are exempt from this rule.

## Related rules

- [stale-devices](/core/quality-scale/stale-devices/): remove stale devices.
