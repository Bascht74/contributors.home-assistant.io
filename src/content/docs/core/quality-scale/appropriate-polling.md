---
title: Poll at an appropriate interval
description: "Bronze rule appropriate-polling: a polling integration uses an interval that fits its data."
sidebarLabel: appropriate-polling
sidebarGroup: Bronze
order: 2
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `appropriate-polling`.

If the integration [polls](/glossary/polling/) a device or service, it sets a polling interval that fits the data. The interval is a choice you make as the developer, for the majority of users. It is not a field in the config flow.

## Why it matters

In an ideal world, every device would push its updates. Many devices and services cannot, so Home Assistant has to ask. Asking too often wastes resources on both ends, and can get users rate limited by a cloud service.

What is appropriate depends on the data. An air quality sensor does not change every 5 seconds: polling once a minute is fine for nearly everyone. A cloud service that updates solar production once an hour gains nothing from being polled every minute.

Users who really need a different interval can [define their own polling interval](https://www.home-assistant.io/common-tasks/general/#defining-a-custom-polling-interval) with an automation.

## Example

With a [coordinator](/glossary/coordinator/), pass `update_interval` when you create it:

```python
class MyCoordinator(DataUpdateCoordinator[MyData]):
    """Fetch data for My integration."""

    config_entry: MyConfigEntry

    def __init__(self, hass: HomeAssistant, entry: MyConfigEntry) -> None:
        """Initialize the coordinator."""
        super().__init__(
            hass,
            LOGGER,
            config_entry=entry,
            name=DOMAIN,
            update_interval=timedelta(minutes=1),
        )
```

Entities that poll by themselves, with `should_poll` set to `True`, use the `SCAN_INTERVAL` constant of their platform module:

```python
SCAN_INTERVAL = timedelta(minutes=1)


class MySensor(SensorEntity):
    """A sensor that polls by itself."""

    _attr_should_poll = True
```

## How it is checked

- Pylint warns when a config flow asks for a polling interval, like `CONF_SCAN_INTERVAL` or `update_interval` (`home-assistant-config-flow-polling-field`).
- Whether the interval itself is appropriate is checked in review. Be ready to explain your choice.

## Exceptions

If the integration does not poll, for example because the device pushes its updates, this rule does not apply.

## Related rules

- [parallel-updates](/core/quality-scale/parallel-updates/): set the number of parallel updates.
