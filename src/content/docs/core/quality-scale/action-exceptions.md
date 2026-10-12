---
title: Raise exceptions when actions fail
description: "Silver rule action-exceptions: actions raise ServiceValidationError or HomeAssistantError when they fail."
sidebarLabel: action-exceptions
sidebarGroup: Silver
order: 1
---

This is a Silver rule. In `quality_scale.yaml`, it is called `action-exceptions`.

When an [action](/glossary/action/) fails, the integration must raise an exception, instead of failing silently or only writing to the log. Raise `ServiceValidationError` when the user did something wrong, like passing invalid input or pointing at something that does not exist. Raise `HomeAssistantError` when the action itself fails, like a network error or an error reported by the device.

This is not only about the actions your integration registers. Entity actions count too: when turning on a `light` or pressing a `button` fails, the entity raises an exception.

## Why it matters

An exception is the only way the user learns that something went wrong. Home Assistant shows its message in the UI, and an automation or script that runs the action stops with an error instead of carrying on as if all went well.

The two exception types tell who caused the problem. A `ServiceValidationError` says the user can fix it by changing the input. A `HomeAssistantError` says the action failed on the side of the integration or the device. The UI reports them as different errors, so the user knows where to look.

## Example

This action sets a schedule. The end date before the start date is a user error. A connection error is a failure of the action:

```python
from homeassistant.exceptions import (
    HomeAssistantError,
    ServiceValidationError,
)


async def async_set_schedule(call: ServiceCall) -> None:
    """Set the schedule for a day."""
    start_date = call.data[ATTR_START_DATE]
    end_date = call.data[ATTR_END_DATE]
    if end_date < start_date:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="end_before_start",
        )

    entry = service.async_get_config_entry(
        call.hass, DOMAIN, call.data[ATTR_CONFIG_ENTRY_ID]
    )
    try:
        await entry.runtime_data.set_schedule(start_date, end_date)
    except MyConnectionError as err:
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="cannot_connect",
        ) from err
```

The same goes for an entity action:

```python
async def async_turn_on(self, **kwargs: Any) -> None:
    """Turn the switch on."""
    try:
        await self.client.turn_on()
    except MyConnectionError as err:
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="cannot_connect",
        ) from err
```

Plain messages, like `HomeAssistantError("Cannot connect")`, are enough for this rule. Translated messages, as in the examples, are what the Gold rule [exception-translations](/core/quality-scale/exception-translations/) asks for.

Do not log the error before you raise it. Home Assistant already reports the exception, so logging it as well reports it twice.

## How it is checked

- Pylint flags action handlers that catch an exception and do not raise again, like an empty `except` block, a block that only logs, or `contextlib.suppress` (`home-assistant-action-swallowed-exception`).
- Pylint warns when an error is logged at warning level or higher earlier in the same block that raises it (`home-assistant-log-and-raise`).
- Whether the right exception type is raised is checked in review.

## Exceptions

If the integration registers no actions of its own and only has read-only platforms, like `sensor` and `binary_sensor`, this rule does not apply.

## Related rules

- [exception-translations](/core/quality-scale/exception-translations/): translate exception messages.
- [action-setup](/core/quality-scale/action-setup/): register actions in async_setup.
