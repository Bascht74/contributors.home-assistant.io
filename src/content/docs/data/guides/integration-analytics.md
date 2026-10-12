---
title: Analytics in your integration
description: For developers, how your integration shows up in analytics, and how to keep devices or entities out of the device database.
order: 4
---

Most integrations do not need to do anything for analytics. Home Assistant reports which integrations are used, and, for the device database, collects device information from the device and entity registries. This page is for the cases where you want control over that.

## What is reported about your integration

- **Usage analytics** reports the domain of your integration when it is in use. Custom integrations are reported with their domain and the version from their manifest.
- **The device database** only includes built-in integrations with an `integration_type` of `device` or `hub` in their manifest. Devices with the entry type `service` are always left out.

For each device, the snapshot contains the manufacturer, model, model ID, hardware and software version, whether there is a configuration URL, and the device it connects through. For each entity, it contains the domain, original device class, entity category, unit of measurement, whether it has an entity name, and whether its state is assumed. See [How analytics works](/data/how-it-works/#the-device-database).

## Leave devices or entities out

Sometimes the device information of an integration says nothing about real hardware, or would be misleading in the device database. An integration can then add an `analytics.py` platform, with an `async_modify_analytics` function. Home Assistant calls it with the device IDs and entity IDs of the integration, and uses the answer to filter the snapshot.

Leave out the whole integration:

```python
"""Analytics platform."""

from homeassistant.components.analytics import (
    AnalyticsInput,
    AnalyticsModifications,
)
from homeassistant.core import HomeAssistant


async def async_modify_analytics(
    hass: HomeAssistant, analytics_input: AnalyticsInput
) -> AnalyticsModifications:
    """Modify the analytics."""
    return AnalyticsModifications(remove=True)
```

Or leave out only some devices or entities, with `DeviceAnalyticsModifications` and `EntityAnalyticsModifications`:

```python
"""Analytics platform."""

from homeassistant.components.analytics import (
    AnalyticsInput,
    AnalyticsModifications,
    EntityAnalyticsModifications,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er


async def async_modify_analytics(
    hass: HomeAssistant, analytics_input: AnalyticsInput
) -> AnalyticsModifications:
    """Leave out entities that only exist for diagnostics."""
    entity_registry = er.async_get(hass)
    entities = {}

    for entity_id in analytics_input.entity_ids:
        entry = entity_registry.async_get(entity_id)
        if entry and entry.translation_key == "debug_info":
            entities[entity_id] = EntityAnalyticsModifications(remove=True)

    return AnalyticsModifications(entities=entities)
```

Removing a device also removes its entities.

If the function raises an exception or returns something else than `AnalyticsModifications`, Home Assistant leaves out the whole integration, and logs an error.

## Examples in core

ESPHome, mobile app, and WLED have an analytics platform. Look at their `analytics.py` in the [core repository](https://github.com/home-assistant/core/tree/dev/homeassistant/components) for real examples.

For everything else about building integrations, see [Core and integrations](/core/).
