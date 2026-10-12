---
title: Implement diagnostics
description: "Gold rule diagnostics: users can download diagnostics, with sensitive data redacted."
sidebarLabel: diagnostics
sidebarGroup: Gold
order: 2
---

This is a Gold rule. In `quality_scale.yaml`, it is called `diagnostics`.

The integration implements [diagnostics](/glossary/diagnostics/): a `diagnostics.py` with `async_get_config_entry_diagnostics`, `async_get_device_diagnostics`, or both. The diagnostics contain the information that helps to debug a problem, like the configuration and the data the integration received. They must never contain sensitive information, like passwords, tokens, or coordinates.

## Why it matters

When something does not work, diagnostics let a user download a snapshot of the integration with one selection, and attach it to an issue. Without it, you end up asking for logs, versions, and payloads in several rounds. With it, the first report often contains everything you need.

Users share these files in public issues, so redaction is part of the rule, not an extra.

## Example

Redact sensitive keys with `async_redact_data` before you return the data:

```python
TO_REDACT = {CONF_API_KEY, CONF_LATITUDE, CONF_LONGITUDE}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: MyConfigEntry
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""
    coordinator = entry.runtime_data

    return {
        "entry_data": async_redact_data(entry.data, TO_REDACT),
        "data": async_redact_data(coordinator.data.to_dict(), TO_REDACT),
    }
```

`async_redact_data` comes from `homeassistant.components.diagnostics`. It replaces the values of matching keys, also in nested dictionaries and lists.

## How it is checked

- Pylint, when the rule is `done`: `diagnostics.py` must implement `async_get_config_entry_diagnostics` or `async_get_device_diagnostics` (`home-assistant-missing-diagnostics`).
- Codecov requires 100% test coverage of the changed lines in `diagnostics.py` of every integration. Most integrations test their diagnostics with a snapshot.
- Whether the right data is in, and the sensitive data is out, is checked in review.

## Exceptions

If the integration has no data that helps with debugging, for example because it has no runtime data and its configuration contains only sensitive information, this rule does not apply.
