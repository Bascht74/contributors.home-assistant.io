---
title: Remote entity
description: Send commands to other devices, like the buttons on a universal remote, and switch between activities.
sidebarLabel: Remote
sidebarGroup: Remotes and signals
---

A remote entity sends commands to a device, the way the buttons on a remote control do. It can be a physical remote or hub, like a universal remote that blasts infrared codes, or a virtual one that talks to a TV or a set-top box over the network. On top of single commands, a remote can know activities: a "Watch TV" macro that turns on the TV and the receiver and picks the right input.

Inherit from `RemoteEntity`, imported from `homeassistant.components.remote`. It builds on `ToggleEntity`, so it has an on and off state like a [switch](/core/entities/switch/). Use a remote entity when your users want to send arbitrary named commands. If you only transmit raw signals for other integrations to use, look at the [infrared](/core/entities/infrared/) and [radio frequency](/core/entities/radio-frequency/) entities instead.

## Properties

These properties are specific to remote entities. The generic properties every entity has are on [the entity class](/core/entities/entity-class/).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `is_on` | `bool \| None` | `None` | Whether the remote, or the device it controls, is on. `None` means unknown. |
| `current_activity` | `str \| None` | `None` | The activity that is running right now. |
| `activity_list` | `list[str] \| None` | `None` | The activities the user can pick from. |
| `supported_features` | `RemoteEntityFeature` | `RemoteEntityFeature(0)` | The features this remote supports. See below. |

`current_activity` and `activity_list` only end up in the state attributes when the entity supports `RemoteEntityFeature.ACTIVITY`.

## Supported features

Combine the flags of `RemoteEntityFeature` with the bitwise or (`|`) operator.

| Flag | Description |
| --- | --- |
| `LEARN_COMMAND` | The remote can learn new commands from another remote. Implement `learn_command`. |
| `DELETE_COMMAND` | The remote can delete commands it learned. Implement `delete_command`. |
| `ACTIVITY` | The remote has activities. Implement `current_activity` and `activity_list`, and handle the `activity` argument when turning on. |

## Activities

An activity is a predefined macro on the remote, like "Watch TV" or "Listen to music". Starting one puts several devices in a known state at once.

The `remote.turn_on`, `remote.turn_off`, and `remote.toggle` actions take an optional `activity`. It arrives in `kwargs` of your methods as `kwargs.get("activity")` (the constant is `ATTR_ACTIVITY` in `homeassistant.components.remote`). Report the activity that is running with `current_activity`, so users can see and automate on it.

## Methods

Each method has a sync and an async variant. Implement one of them.

### Turn on, turn off, and toggle

```python
class MyRemote(RemoteEntity):
    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn the remote on, optionally starting an activity."""

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn the remote off."""
```

The sync variants are `turn_on` and `turn_off`. Toggle comes for free from `ToggleEntity`: it calls turn on or turn off based on `is_on`. Only implement `async_toggle` if your device has a real toggle command.

### Send command

Called by the `remote.send_command` action. `command` is a list of command names. `kwargs` holds `num_repeats` (default `1`) and `hold_secs` (default `0`), and, when the user gives them, `device` and `delay_secs`. When the user leaves out `delay_secs`, use your own default (the constant `DEFAULT_DELAY_SECS` is `0.4`).

```python
class MyRemote(RemoteEntity):
    async def async_send_command(
        self, command: Iterable[str], **kwargs: Any
    ) -> None:
        """Send commands to a device."""
```

The sync variant is `send_command`.

### Learn command

Only for remotes with `RemoteEntityFeature.LEARN_COMMAND`. Called by the `remote.learn_command` action, which can pass `device`, `command`, `command_type`, `alternative`, and `timeout` in `kwargs`.

```python
class MyRemote(RemoteEntity):
    async def async_learn_command(self, **kwargs: Any) -> None:
        """Learn a command from a device."""
```

The sync variant is `learn_command`.

### Delete command

Only for remotes with `RemoteEntityFeature.DELETE_COMMAND`. Called by the `remote.delete_command` action, with `command` and an optional `device` in `kwargs`.

```python
class MyRemote(RemoteEntity):
    async def async_delete_command(self, **kwargs: Any) -> None:
        """Delete a learned command."""
```

The sync variant is `delete_command`.

## States

The state comes from `is_on`.

| State | When |
| --- | --- |
| `on` | `is_on` is `True`. |
| `off` | `is_on` is `False`. |
| `unknown` | `is_on` is `None`. |

## Example

A network remote for a media hub with activities.

```python
from collections.abc import Iterable
from typing import Any

from homeassistant.components.remote import (
    ATTR_ACTIVITY,
    RemoteEntity,
    RemoteEntityFeature,
)


class MyHubRemote(RemoteEntity):
    """Remote for a media hub."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_supported_features = RemoteEntityFeature.ACTIVITY

    def __init__(self, hub: MyHub) -> None:
        """Initialize the remote."""
        self._hub = hub
        self._attr_unique_id = hub.serial
        self._attr_activity_list = hub.activities

    @property
    def is_on(self) -> bool:
        """Return if an activity is running."""
        return self._hub.current_activity is not None

    @property
    def current_activity(self) -> str | None:
        """Return the running activity."""
        return self._hub.current_activity

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Start an activity, or the default one."""
        activity = kwargs.get(ATTR_ACTIVITY) or self._hub.default_activity
        await self._hub.start_activity(activity)

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Stop the running activity."""
        await self._hub.power_off()

    async def async_send_command(
        self, command: Iterable[str], **kwargs: Any
    ) -> None:
        """Send one or more commands."""
        for _ in range(kwargs.get("num_repeats", 1)):
            for single_command in command:
                await self._hub.press(single_command)
```
