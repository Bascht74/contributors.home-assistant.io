---
title: Geolocation entity
description: Show events from an external feed that have a location, like earthquakes or wildfires, on the map.
sidebarLabel: Geolocation
sidebarGroup: Sensors and status
---

A geolocation entity represents an external event with a location: an earthquake, a wildfire, a flood warning, or another point of interest from a feed. Each entity has coordinates, and the frontend shows it as a marker on the map. Inherit from `GeolocationEvent`, imported from `homeassistant.components.geo_location`.

Unlike most entities, a geolocation entity does not stand for a device. It lives as long as the event is in the feed.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `source` | `str` | Required | Where the event comes from, usually the domain of your integration. |
| `distance` | `float \| None` | `None` | The distance from the home location to the event, in `unit_of_measurement`. This is the state. |
| `latitude` | `float \| None` | `None` | The latitude of the event. |
| `longitude` | `float \| None` | `None` | The longitude of the event. |

Set the unit of the distance with the generic `unit_of_measurement` property. The `source`, `latitude`, and `longitude` become state attributes, with the coordinates rounded to five decimals. The generic properties every entity has are on [the entity class](/core/entities/entity-class/).

## Supported features

This entity has no supported features.

## Managing events

Integrations add and remove geolocation entities as the feed changes. A common pattern is a manager that subscribes to feed updates, and on each update:

1. Adds an entity for every new event.
2. Updates the entities of events that are still there.
3. Removes the entities of events that are gone, by calling `await entity.async_remove(force_remove=True)`.

The `force_remove` flag removes the state completely. Without it, a registered entity stays behind as unavailable. If your entities have a unique ID, also remove their entry from the [entity registry](/core/entities/registry/).

The [GDACS integration](https://github.com/home-assistant/core/blob/dev/homeassistant/components/gdacs/geo_location.py) follows this pattern, and the [demo platform](https://github.com/home-assistant/core/blob/dev/homeassistant/components/demo/geo_location.py) is a minimal version of it.

## Methods

There are no methods to implement. Update the properties and call `async_write_ha_state` when the feed changes. See [updating state](/core/entities/state-updates/) and [the entity lifecycle](/core/entities/lifecycle/).

## States

The state is `distance`, rounded to one decimal, or `unknown` when there is no distance. The base class sets it: do not set `state` yourself.

## Example

An entity for one earthquake from a feed:

```python
from homeassistant.components.geo_location import GeolocationEvent
from homeassistant.const import UnitOfLength


class ExampleQuakeEvent(GeolocationEvent):
    """An earthquake from the example feed."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_source = "example_quakes"
    _attr_unit_of_measurement = UnitOfLength.KILOMETERS

    def __init__(self, quake: ExampleQuake) -> None:
        """Initialize the event."""
        self._attr_unique_id = quake.id
        self._attr_name = quake.title
        self.update_from_feed(quake)

    def update_from_feed(self, quake: ExampleQuake) -> None:
        """Copy the latest data from the feed."""
        self._attr_distance = quake.distance_km
        self._attr_latitude = quake.latitude
        self._attr_longitude = quake.longitude
```

The name comes from the feed, so it is not translated. See [naming](/core/entities/naming/).
