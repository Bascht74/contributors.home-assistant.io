---
title: Remove stale devices
description: "Gold rule stale-devices: devices that are gone are removed, or can be removed by the user."
sidebarLabel: stale-devices
sidebarGroup: Gold
order: 21
---

This is a Gold rule. In `quality_scale.yaml`, it is called `stale-devices`.

When a device is removed from the hub or account the integration connects to, the integration removes it from Home Assistant too. Only remove a device when you are sure it is gone, for example because the hub returns a full list of devices and it is no longer on it.

When the integration cannot know for sure, it implements `async_remove_config_entry_device`, so users can delete the device themselves from the device page.

## Why it matters

A device that no longer exists, but still shows up in Home Assistant with unavailable entities, is clutter. It shows up in device lists, in dashboards, and in Assist, and users have no way to get rid of it.

Removing a device also removes its entities, so the integration cleans up after itself completely.

## Example

When the service returns all devices, compare the new list with the previous one, and remove the devices that disappeared. Start `previous_devices` as an empty set in the coordinator's `__init__`, so the first refresh has something to compare with:

```python
def __init__(
    self, hass: HomeAssistant, config_entry: MyConfigEntry, client: MyClient
) -> None:
    """Initialize the coordinator."""
    super().__init__(
        hass,
        _LOGGER,
        config_entry=config_entry,
        name=DOMAIN,
        update_interval=timedelta(minutes=1),
    )
    self.client = client
    self.previous_devices: set[str] = set()

async def _async_update_data(self) -> dict[str, MyDevice]:
    """Fetch the devices, and remove the ones that are gone."""
    try:
        data = await self.client.get_devices()
    except MyConnectionError as err:
        raise UpdateFailed(
            translation_domain=DOMAIN,
            translation_key="update_failed",
        ) from err

    if stale_devices := self.previous_devices - set(data):
        device_registry = dr.async_get(self.hass)
        for device_id in stale_devices:
            if device := device_registry.async_get_device_by_identifier(
                (DOMAIN, device_id), self.config_entry.entry_id
            ):
                device_registry.async_remove_device(device.id)

    self.previous_devices = set(data)
    return data
```

The set lives in memory, so it starts empty every time the config entry loads. A device that disappeared while Home Assistant was stopped is not in it, and this comparison does not remove it. To catch those too, compare the list with the devices of the config entry in the device registry, for example from `dr.async_entries_for_config_entry`.

When the integration only gets updates for devices, and no full list, let users remove a device that has gone quiet. Home Assistant shows the delete option on the device page when `__init__.py` has `async_remove_config_entry_device`. Return `True` to allow the removal:

```python
async def async_remove_config_entry_device(
    hass: HomeAssistant,
    entry: MyConfigEntry,
    device_entry: dr.DeviceEntry,
) -> bool:
    """Allow removing a device that no longer reports."""
    known_devices = entry.runtime_data.data
    return not any(
        identifier[0] == DOMAIN and identifier[1] in known_devices
        for identifier in device_entry.identifiers
    )
```

## How it is checked

Checked in review.

## Exceptions

Integrations with a single, fixed device per config entry, that lives and goes with the config entry, are exempt from this rule.

## Related rules

- [dynamic-devices](/core/quality-scale/dynamic-devices/): add new devices automatically.
