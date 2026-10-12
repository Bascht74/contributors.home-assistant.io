---
title: Significant change
description: Tell integrations that export data, like voice assistants, which state changes of your entity type matter.
sidebarGroup: Integration features
order: 8
---

Home Assistant does not only collect data, it also sends it to other services, like Google Assistant and Alexa. Those services do not want every tiny change. A battery that loses 0.1% charge, or a temperature that moves 0.1 degree, is not worth a message. Significant change support lets your entity integration decide which changes matter.

This is for entity integrations, like `sensor` or `light`, that define an entity type.

## Add support

The quickest way is the scaffold script:

```shell
python3 -m script.scaffold significant_change
```

Or create `significant_change.py` with `async_check_significant_change`:

```python
from typing import Any

from homeassistant.core import HomeAssistant, callback


@callback
def async_check_significant_change(
    hass: HomeAssistant,
    old_state: str,
    old_attrs: dict,
    new_state: str,
    new_attrs: dict,
    **kwargs: Any,
) -> bool | None:
    """Return whether the change is significant."""
```

Return `True` when the change is significant, `False` when it is not, and `None` when you cannot tell. Home Assistant treats `None` like `True`: only `False` filters out a change.

A few things to know:

- `old_state` is the last state that was considered significant, not the previous state. Small changes that add up become significant at some point.
- Take all attributes you know into account, not only the state.
- Use the [device class](/glossary/device-class/) to tell different kinds of entities apart: what is significant for a temperature is not significant for a battery.
- Home Assistant handles `unknown` and `unavailable` for you.
