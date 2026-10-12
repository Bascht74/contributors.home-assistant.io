---
title: Air quality entity
description: The deprecated air quality entity, and what to use instead.
sidebarLabel: Air quality
sidebarGroup: Sensors and status
---

The air quality entity bundles several air quality readings, like particulate matter and ozone, into one entity. It is derived from `AirQualityEntity`, imported from `homeassistant.components.air_quality`.

> [!WARNING]
> The air quality entity is deprecated. Do not use it in new code. Create a [sensor](/core/entities/sensor/) for each reading instead, with a device class like `PM25`, `OZONE`, `CO2`, or `AQI`. Integrations that still use the air quality entity should move to sensors.

Separate sensors get unit conversion, long-term statistics, and their own history, which this entity never had.

## Properties

This entity does not support the `_attr_` shorthand. Implement each value as a property.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `particulate_matter_2_5` | `str \| int \| float \| None` | Required | Particulate matter of 2.5 μm or smaller. This is the state. |
| `particulate_matter_10` | `str \| int \| float \| None` | `None` | Particulate matter of 10 μm or smaller. |
| `particulate_matter_0_1` | `str \| int \| float \| None` | `None` | Particulate matter of 0.1 μm or smaller. |
| `air_quality_index` | `str \| int \| float \| None` | `None` | The air quality index. |
| `ozone` | `str \| int \| float \| None` | `None` | Ozone (O3). |
| `carbon_monoxide` | `str \| int \| float \| None` | `None` | Carbon monoxide (CO). |
| `carbon_dioxide` | `str \| int \| float \| None` | `None` | Carbon dioxide (CO2). |
| `sulphur_dioxide` | `str \| int \| float \| None` | `None` | Sulphur dioxide (SO2). |
| `nitrogen_oxide` | `str \| int \| float \| None` | `None` | Nitrous oxide (N2O). |
| `nitrogen_monoxide` | `str \| int \| float \| None` | `None` | Nitrogen monoxide (NO). |
| `nitrogen_dioxide` | `str \| int \| float \| None` | `None` | Nitrogen dioxide (NO2). |

Every value that is not `None` becomes a state attribute. The generic properties every entity has are on [the entity class](/core/entities/entity-class/).

## Supported features

This entity has no supported features.

## Methods

There are no methods to implement. Keep the properties current in `update` or `async_update`.

## States

The state is `particulate_matter_2_5`, and the unit is always µg/m³.

## Example

Instead of an air quality entity, describe each reading as a sensor:

```python
from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import UnitOfDensity

SENSORS = (
    SensorEntityDescription(
        key="pm25",
        device_class=SensorDeviceClass.PM25,
        state_class=SensorStateClass.MEASUREMENT,
        native_unit_of_measurement=UnitOfDensity.MICROGRAMS_PER_CUBIC_METER,
    ),
    SensorEntityDescription(
        key="aqi",
        device_class=SensorDeviceClass.AQI,
        state_class=SensorStateClass.MEASUREMENT,
    ),
)
```

See the [sensor entity](/core/entities/sensor/) for the full picture.
