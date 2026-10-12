---
title: Reproduce state
description: Make scenes work with the entities of your entity integration, by turning a stored state back into action calls.
sidebarGroup: Integration features
order: 7
---

A [scene](/glossary/scene/) stores the states of a set of entities, like "the living room lights at 30% and warm white". When a scene is activated, Home Assistant has to turn those states back into reality, by calling the right actions. It asks the integration of each entity domain to do that.

This is for entity integrations, like `light` or `climate`: the integrations that define an entity type and its actions. An integration that only provides entities of an existing type, like a light platform, does not need it.

## Add support

The quickest way is the scaffold script:

```shell
python3 -m script.scaffold reproduce_state
```

Or create `reproduce_state.py` with `async_reproduce_states`:

```python
from collections.abc import Iterable
from typing import Any

from homeassistant.core import Context, HomeAssistant, State


async def async_reproduce_states(
    hass: HomeAssistant,
    states: Iterable[State],
    *,
    context: Context | None = None,
    reproduce_options: dict[str, Any] | None = None,
) -> None:
    """Reproduce the given states."""
```

For each state, compare it to the current state of the entity, skip it if they already match, and call the actions that get the entity to the stored state and attributes. Pass `context` on to the action calls, so the changes are linked to the scene. Log a warning for states you cannot reproduce, like an invalid state value, and skip them. Run the states in parallel, for example with `asyncio.gather`, so a scene with many entities is applied quickly.

The `reproduce_state.py` of the [switch integration](https://github.com/home-assistant/core/blob/dev/homeassistant/components/switch/reproduce_state.py) is a short, complete example.
