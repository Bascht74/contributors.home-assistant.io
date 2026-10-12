---
title: Button entity
description: Build a button entity that triggers a single action on a device or service, like a restart.
sidebarLabel: Button
sidebarGroup: Inputs and helpers
---

A button entity triggers one action on a device or service: restart a device, identify it by blinking a light, reset a filter counter, or brew a cup of coffee. It has no on or off state of its own. Inherit from `ButtonEntity` in `homeassistant.components.button`.

A button is a virtual button inside Home Assistant. It is not the right fit for everything that looks like a button:

- Something that stays on or off after you press it is a [switch](/core/entities/switch/).
- A physical button that people press on a device is an [event](/core/entities/event/) entity. A button entity can't report presses that happen outside Home Assistant.
- Installing firmware belongs in an [update](/core/entities/update/) entity.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `device_class` | `ButtonDeviceClass \| None` | `None` | What the button does. See [device classes](#device-classes). |

A button has no platform specific state properties. The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/). A button doesn't poll: `should_poll` is `False` by default.

## Supported features

This entity has no supported features.

## Device classes

| Constant | Description |
| --- | --- |
| `ButtonDeviceClass.IDENTIFY` | Identifies the device, for example by blinking a light or making a sound. |
| `ButtonDeviceClass.RESTART` | Restarts the device. |
| `ButtonDeviceClass.UPDATE` | Updates the software of the device. Avoid it: use an [update](/core/entities/update/) entity instead. |

A button with a device class and no name of its own gets the translated name of its device class, like "Restart". See [naming entities](/core/entities/naming/).

An identify button is usually not the main feature of a device. Give it the `EntityCategory.DIAGNOSTIC` [entity category](/glossary/entity-category/).

## Methods

### Press

Called when someone presses the button in the UI, or an automation or script calls the `button.press` action. Implement one of the two.

```python
class MyButton(ButtonEntity):
    # Implement one of these methods.

    def press(self) -> None:
        """Handle the button press."""

    async def async_press(self) -> None:
        """Handle the button press."""
```

## States

The state of a button is the timestamp of the last time it was pressed from Home Assistant, as an ISO 8601 string in UTC. It is `unknown` until the first press. The base class sets it right before it calls your press method, and restores it after a restart. You can't set it yourself: `state` is final.

## Example

```python
from homeassistant.components.button import (
    ButtonDeviceClass,
    ButtonEntity,
)
from homeassistant.const import EntityCategory


class ExampleRestartButton(ButtonEntity):
    """Restart the device."""

    _attr_has_entity_name = True
    _attr_device_class = ButtonDeviceClass.RESTART
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, device: ExampleDevice) -> None:
        """Initialize the button."""
        self._device = device
        self._attr_unique_id = f"{device.serial}_restart"

    async def async_press(self) -> None:
        """Restart the device."""
        await self._device.restart()
```

Because of the device class, this button is named "Restart" without you giving it a name or a translation key.
