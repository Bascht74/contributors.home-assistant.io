---
title: The entity class
description: The Entity base class every entity builds on, the three ways to set its properties, and the generic properties every entity has.
sidebarLabel: Entity class
sidebarGroup: Basics
order: 1
---

Every entity in Home Assistant is a Python object that inherits from `Entity` in `homeassistant.helpers.entity`. You almost never inherit from `Entity` directly, though. You inherit from the base class of an entity platform, like `SwitchEntity` or `SensorEntity`. That class adds the properties and methods of its domain on top of the generic ones described here.

## A minimal entity

This switch keeps its state in memory. It is the main feature of its device, so it takes the name of the device.

```python
from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.helpers.device_registry import DeviceInfo

from .const import DOMAIN


class ExampleSwitch(SwitchEntity):
    """A switch that remembers if it is on."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_is_on = False

    def __init__(self, serial: str) -> None:
        """Initialize the switch."""
        self._attr_unique_id = serial
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, serial)},
            name="Garden pump",
        )

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn the switch on."""
        self._attr_is_on = True
        self.async_write_ha_state()

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the switch off."""
        self._attr_is_on = False
        self.async_write_ha_state()
```

The rest of this page, and the other pages in this group, explain each part of that example.

## Setting properties

Home Assistant reads the properties of your entity every time it writes the state. You can provide a property in three ways. They all end up in the same place, so pick the one that reads best.

### Attributes with the `_attr_` prefix

Most properties have a default implementation in the base class that returns an attribute with the same name and an `_attr_` prefix. The `device_class` property returns `self._attr_device_class`, the `is_on` property of a switch returns `self._attr_is_on`, and so on. Set them as class attributes when they never change, or as instance attributes when they do.

```python
class ExampleSwitch(SwitchEntity):
    _attr_icon = "mdi:water-pump"

    def __init__(self, serial: str) -> None:
        self._attr_unique_id = serial
```

This is the most common style. When your own code needs a value, read the property (`self.available`), not the attribute (`self._attr_available`). Not every platform property has an `_attr_` attribute: the page of each platform says so when it doesn't.

### Property methods

When a value has to be calculated, override the property itself.

```python
class ExampleSwitch(SwitchEntity):
    @property
    def is_on(self) -> bool:
        """Return if the pump is running."""
        return self._device.pump_speed > 0
```

> [!IMPORTANT]
> Properties must return data from memory. Never do I/O in a property, like a network request or reading a file. Fetch data in your update method or in a [coordinator](/glossary/coordinator/), and let the properties read what is already there. Properties are called on every state write, so keep them cheap.

### Entity descriptions

An [entity description](/glossary/entity-description/) is a frozen dataclass that holds the static properties of one kind of entity. Every platform has its own subclass, like `SensorEntityDescription`. Set it as `self.entity_description`, and the base class reads properties like `device_class`, `translation_key`, and `entity_category` from it.

The only required field is `key`, a string that is unique within your platform. It is a good building block for the unique ID.

Descriptions shine when one class serves many entities that only differ in their settings. You declare them in a tuple, and loop over it during setup.

```python
from collections.abc import Callable
from dataclasses import dataclass

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.const import UnitOfTemperature
from homeassistant.helpers.typing import StateType


@dataclass(frozen=True, kw_only=True)
class ExampleSensorEntityDescription(SensorEntityDescription):
    """Describes an Example sensor."""

    value_fn: Callable[[ExampleDevice], StateType]


SENSORS: tuple[ExampleSensorEntityDescription, ...] = (
    ExampleSensorEntityDescription(
        key="water_temperature",
        translation_key="water_temperature",
        device_class=SensorDeviceClass.TEMPERATURE,
        native_unit_of_measurement=UnitOfTemperature.CELSIUS,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda device: device.water_temperature,
    ),
)


class ExampleSensor(SensorEntity):
    """A sensor of an Example device."""

    entity_description: ExampleSensorEntityDescription
    _attr_has_entity_name = True

    def __init__(
        self,
        device: ExampleDevice,
        description: ExampleSensorEntityDescription,
    ) -> None:
        """Initialize the sensor."""
        self._device = device
        self.entity_description = description
        self._attr_unique_id = f"{device.serial}_{description.key}"

    @property
    def native_value(self) -> StateType:
        """Return the value from the device."""
        return self.entity_description.value_fn(self._device)
```

An `_attr_` attribute wins over the description. So you can share a description and still override one value for a single entity.

## Generic properties

These properties exist on every entity. All of them are optional.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `assumed_state` | `bool` | `False` | `True` when the state is a guess, because the device can't report it. The frontend then shows separate on and off buttons instead of a toggle. See [assumed state](/core/entities/state-updates/#assumed-state). |
| `attribution` | `str \| None` | `None` | Branding text the data provider requires you to show. |
| `available` | `bool` | `True` | `False` when Home Assistant can't read or control the device. The state becomes `unavailable`. See [updating state](/core/entities/state-updates/#availability). |
| `device_class` | `str \| None` | `None` | What the entity is or measures, from the list of its domain. See [device class](/glossary/device-class/). |
| `device_info` | `DeviceInfo \| ChildDeviceInfo \| None` | `None` | The device this entity belongs to. See [the entity registry](/core/entities/registry/#linking-to-a-device). |
| `entity_category` | `EntityCategory \| None` | `None` | Marks a configuration or diagnostic entity. See [the entity registry](/core/entities/registry/#entity-categories). |
| `entity_picture` | `str \| None` | `None` | URL of a picture to show instead of the icon. |
| `entity_registry_enabled_default` | `bool` | `True` | Whether the entity starts enabled when it is first registered. |
| `entity_registry_visible_default` | `bool` | `True` | Whether the entity starts visible when it is first registered. |
| `extra_state_attributes` | `Mapping[str, Any] \| None` | `None` | Extra attributes of your integration. See [state and attributes](/core/entities/state-attributes/). |
| `force_update` | `bool` | `False` | Write every update to the state machine, even when nothing changed. See [updating state](/core/entities/state-updates/#force-update). |
| `has_entity_name` | `bool` | `False` | `True` when `name` only describes the entity, not the device. Required for new integrations. See [naming entities](/core/entities/naming/). |
| `icon` | `str \| None` | `None` | A fixed icon. Prefer icon translations. See [icons](/core/entities/icons/). |
| `name` | `str \| None` | Not set | The name of the entity. `None` means the entity is the main feature of its device. See [naming entities](/core/entities/naming/). |
| `should_poll` | `bool` | `True` | Whether Home Assistant polls the entity. Set to `False` for push. See [updating state](/core/entities/state-updates/). |
| `supported_features` | `int \| None` | `None` | Bit flags of the features the entity supports, from the `EntityFeature` enum of its domain. See [supported features](/glossary/supported-features/). |
| `translation_key` | `str \| None` | `None` | Key for the translated name, states, state attributes, and icons in `strings.json` and `icons.json`. |
| `translation_placeholders` | `Mapping[str, str]` | `{}` | Values for placeholders in the translated name. |
| `unique_id` | `str \| None` | `None` | A stable ID, unique within your integration and domain. Required to use the registry. See [the entity registry](/core/entities/registry/#unique-id). |

Leave `name` unset when the entity should get its name from its translation key or its device class. Setting `_attr_name = None` is not the same thing: it explicitly says "this entity has no name of its own".

### Changing capabilities

You may change `device_class`, `supported_features`, and the capability attributes of a domain while the entity runs, but do it rarely. Every change updates the entity registry, and some consumers, like voice assistants, resynchronize with their cloud service when they see it. Home Assistant logs a warning when an entity updates its capabilities more than 100 times in an hour.

## Properties you don't override

Some properties belong to the platform base class or to Home Assistant itself.

| Name | Type | Description |
| --- | --- | --- |
| `state` | `StateType` | The state written to the state machine. Every platform base class implements it from its own properties, like `is_on` or `native_value`. Only set it yourself in a direct `Entity` subclass. |
| `state_attributes` | `dict[str, Any] \| None` | The standard attributes of the domain, like the brightness of a light. Implemented by the platform base class. |
| `capability_attributes` | `dict[str, Any] \| None` | Attributes that describe what the entity can do, like the list of effects. They are stored in the entity registry too. Implemented by the platform base class. |
| `unit_of_measurement` | `str \| None` | The unit of the state. Platforms like `sensor` and `number` calculate it from their own `native_unit_of_measurement`. |
| `enabled` | `bool` | `True` unless the registry entry is disabled. Managed by Home Assistant. |

## Proposing changes to an entity model

The properties, features, and states of each domain are shared by every integration that implements it, so changing them is a bigger deal than changing one integration. If you want to add something to a domain, propose it first in the [architecture discussions](https://github.com/home-assistant/architecture/discussions). Additions are considered when they are common across several brands, not when they serve one device.
