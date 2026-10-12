---
title: Translate exception messages
description: "Gold rule exception-translations: errors shown to users come from strings.json, so they can be translated."
sidebarLabel: exception-translations
sidebarGroup: Gold
order: 17
---

This is a Gold rule. In `quality_scale.yaml`, it is called `exception-translations`.

Exceptions that reach the user are translatable. Raise `HomeAssistantError`, or a subclass like `ServiceValidationError`, with a `translation_domain` and a `translation_key` instead of a hardcoded English message, and put the message in the `exceptions` section of `strings.json`.

## Why it matters

When an action fails, the user sees the error message in the interface. For a user who runs Home Assistant in their own language, an English error in the middle of a translated interface is harder to understand, exactly at the moment they need to understand what went wrong.

Exceptions that inherit from `HomeAssistantError` support translations out of the box, so all it takes is a key and a string.

## Example

```python
async def async_set_schedule(call: ServiceCall) -> None:
    """Set the schedule for a day."""
    start = call.data[ATTR_START_DATE]
    end = call.data[ATTR_END_DATE]
    if end < start:
        raise ServiceValidationError(
            translation_domain=DOMAIN,
            translation_key="end_before_start",
        )

    try:
        await client.set_schedule(start, end)
    except MyConnectionError as err:
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="cannot_connect",
            translation_placeholders={"error": str(err)},
        ) from err
```

`strings.json`:

```json
{
  "exceptions": {
    "end_before_start": {
      "message": "The end date can't be before the start date."
    },
    "cannot_connect": {
      "message": "Could not connect to the device: {error}"
    }
  }
}
```

Don't pass a message as well: with a translation key, the message comes from `strings.json`.

## How it is checked

- Pylint, when the rule is `done`: raising a `HomeAssistantError` or a subclass with a hardcoded message is flagged (`home-assistant-exception-not-translated`).
- Pylint, for every integration: the translation key must exist in the `exceptions` section of `strings.json` (`home-assistant-exception-translation-key-missing`), `translation_domain` and `translation_key` must be set together (`home-assistant-exception-translation-key-domain-mismatch`), the placeholders must match the message (`home-assistant-exception-placeholder-mismatch`), and there must be no message next to a translation key (`home-assistant-exception-message-with-translation`).
- The tests fail when an action raises an exception whose translation is missing.

## Exceptions

If the integration does not raise any exceptions of its own, this rule does not apply.

## Related rules

- [entity-translations](/core/quality-scale/entity-translations/): translate entity names.
- [action-exceptions](/core/quality-scale/action-exceptions/): raise exceptions when actions fail.
