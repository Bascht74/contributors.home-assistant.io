---
title: System health
description: Show the state of your integration on the system information page, like whether the server can be reached and how much quota is left.
sidebarGroup: Integration features
order: 5
---

The system information page shows how Home Assistant is doing, with a section per integration. Users find it under **Settings** > **System** > **Repairs**, in the menu at the top right, under **System information**. They copy it into issues, so it is a good place for facts that help with troubleshooting: whether the server can be reached, which server the integration is connected to, or how much of a request quota is left.

## Add system health

Create `system_health.py`, and register a function that returns the information:

```python
from typing import Any

from homeassistant.components import system_health
from homeassistant.core import HomeAssistant, callback


@callback
def async_register(
    hass: HomeAssistant, register: system_health.SystemHealthRegistration
) -> None:
    """Register the system health info."""
    register.async_register_info(system_health_info)


async def system_health_info(hass: HomeAssistant) -> dict[str, Any]:
    """Return the system health info."""
    info: dict[str, Any] = {
        # Checking the server can take a while, so pass the coroutine
        "can_reach_server": system_health.async_check_can_reach_url(
            hass, API_ENDPOINT
        ),
    }

    entries: list[ExampleConfigEntry] = (
        hass.config_entries.async_loaded_entries(DOMAIN)
    )
    if entries:
        quota = await entries[0].runtime_data.client.get_quota()
        info["remaining_requests"] = quota.remaining

    return info
```

Only count on `runtime_data` for a loaded entry. `async_entries` also returns entries that are ignored, disabled, failed to set up, or were unloaded. Unloading removes `runtime_data`, and the others may never have had it. So use `async_loaded_entries`, and handle the case where there is none.

The values can be of any type, and also a coroutine. For a coroutine, the frontend shows a spinner, and fills in the result when it is done. `async_check_can_reach_url` is a ready-made check for whether a URL can be reached.

`async_register_info` also takes a `manage_url`, a link to where users can manage the integration or account.

## Texts

Give every key a label in `strings.json`, under `system_health`:

```json
{
  "system_health": {
    "info": {
      "can_reach_server": "Reach Example server",
      "remaining_requests": "Remaining allowed requests"
    }
  }
}
```
