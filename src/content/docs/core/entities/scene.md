---
title: Scene entity
description: Build a scene entity for a scene that lives on a device or hub, so people can activate it from Home Assistant.
sidebarLabel: Scene
sidebarGroup: Inputs and helpers
---

A [scene](/glossary/scene/) entity activates a set of states for a group of devices in one go, like "Movie night" on a lighting hub. Your integration implements a scene entity when the scenes live on the device or the service, and Home Assistant only needs to tell it to activate one. Inherit from `Scene` in `homeassistant.components.scene`.

The scenes people make themselves, in the scene editor or in YAML, are handled by Home Assistant itself. You don't need a scene entity for those.

A scene has no on or off state. If something stays on until you turn it off, use a [switch](/core/entities/switch/).

For how the frontend shows a scene, see the [scene more-info view](/design/more-info/scene/).

## Properties

A scene has no platform specific properties. The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/). A scene doesn't poll: `should_poll` is `False` by default.

## Supported features

This entity has no supported features.

## Methods

### Activate

Called when someone activates the scene in the UI, or an automation or script calls the `scene.turn_on` action. Implement one of the two.

```python
class MyScene(Scene):
    # Implement one of these methods.

    def activate(self, **kwargs: Any) -> None:
        """Activate the scene."""

    async def async_activate(self, **kwargs: Any) -> None:
        """Activate the scene."""
```

When the action has a `transition`, you get it as a keyword argument: the number of seconds the devices take to reach their new state. Pass it on if the device supports it.

## States

The state of a scene is the timestamp of the last time it was activated, as an ISO 8601 string in UTC. It is `unknown` until the first activation. The base class records it right before it calls your activate method, and restores it after a restart. You can't set it yourself: `state` is final.

## Scenes activated outside Home Assistant

Some devices also activate scenes on their own, like a hub with a physical scene button. To show those activations in Home Assistant too, inherit from `BaseScene` instead of `Scene`:

- Implement `_async_activate(self, **kwargs)` to activate the scene from Home Assistant. Note the leading underscore. Unlike `Scene`, `BaseScene` doesn't record the activation for you.
- Call `self._async_record_activation()` followed by `self.async_write_ha_state()` when the device tells you the scene is active, whoever activated it. From a thread outside the event loop, use `self._record_activation()` instead of `_async_record_activation()`.

This way, the timestamp follows the device, also when an activation from Home Assistant takes a moment to land.

```python
from typing import Any

from homeassistant.components.scene import BaseScene


class ExampleHubScene(BaseScene):
    """A scene stored on the hub."""

    async def _async_activate(self, **kwargs: Any) -> None:
        """Ask the hub to activate the scene."""
        await self._hub.activate_scene(self._scene_id)

    def _handle_scene_activated(self) -> None:
        """Handle the hub reporting that the scene is active."""
        self._async_record_activation()
        self.async_write_ha_state()
```

## Example

```python
from typing import Any

from homeassistant.components.scene import Scene


class ExampleScene(Scene):
    """A scene stored on the lighting hub."""

    _attr_has_entity_name = True

    def __init__(self, hub: ExampleHub, scene: HubScene) -> None:
        """Initialize the scene."""
        self._hub = hub
        self._scene_id = scene.id
        self._attr_name = scene.name
        self._attr_unique_id = f"{hub.serial}_scene_{scene.id}"

    async def async_activate(self, **kwargs: Any) -> None:
        """Activate the scene."""
        await self._hub.activate_scene(self._scene_id)
```

The names of the scenes come from the hub, so this example uses them as they are instead of a translation key. See [naming entities](/core/entities/naming/).
