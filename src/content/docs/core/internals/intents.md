---
title: Intents
description: What an intent is, how an integration handles intents, and how to fire one from code or over HTTP.
sidebarGroup: Voice and AI
order: 50
---

An [intent](/glossary/intent/) describes what someone wants, separate from how they said it. "Turn on the kitchen lights", "kitchen lights on", and a button on a voice assistant all become the same intent: `HassTurnOn`, with the slots `area` set to kitchen and `domain` set to light.

That split is the point. The thing that understands the user (Assist, a large language model, or an external voice assistant) produces an intent. The thing that acts on it, an intent handler, does not care where it came from. Write a handler once, and it works from every source.

In Home Assistant:

- The `conversation` integration turns text into intents, with the sentences from the [intents repository](https://github.com/OHF-Voice/intents). See the [conversation API](/core/internals/conversation-api/).
- The [LLM API](/core/internals/llm-api/) offers intents to large language models as tools. Not every intent: an integration picks which of its intents to offer.
- The `intent` integration registers the [built-in intents](/core/internals/built-in-intents/) and offers an HTTP endpoint to fire them. It is loaded with `conversation`, which is part of the default configuration.
- Any integration can register handlers for its own intents.

## The intent object

`Intent` from `homeassistant.helpers.intent` holds:

| Attribute | Description |
| --- | --- |
| `hass` | The Home Assistant instance. |
| `platform` | The integration that fired the intent. |
| `intent_type` | The name of the intent, like `HassTurnOn`. |
| `slots` | The slot values, by slot name. Each slot is a dictionary with a `value`. |
| `text_input` | The text that led to this intent, if any. |
| `context` | The `Context`, with the user. |
| `language` | The language, which defaults to the language of the instance. |
| `assistant` | The assistant that is handling the request, like `conversation`. Used to only act on entities exposed to it. |
| `device_id` | The device the request came from, like a voice satellite. |
| `satellite_id` | The entity ID of the satellite the request came from. |
| `conversation_agent_id` | The conversation agent that is handling the request. |

## Handle an intent

Subclass `IntentHandler` and register an instance with `intent.async_register`. An integration with intents usually does this in an `intent.py` platform, with an `async_setup_intents` function that the `intent` integration calls:

```python
import probatio

from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv, intent

INTENT_ADD_COFFEE = "MyIntegrationAddCoffee"


async def async_setup_intents(hass: HomeAssistant) -> None:
    """Set up the intents of my integration."""
    intent.async_register(hass, AddCoffeeHandler())


class AddCoffeeHandler(intent.IntentHandler):
    """Count how much coffee was had."""

    intent_type = INTENT_ADD_COFFEE
    description = "Adds cups to today's coffee count"
    slot_schema = {probatio.Optional("cups"): cv.positive_int}

    async def async_handle(
        self, intent_obj: intent.Intent
    ) -> intent.IntentResponse:
        """Handle the intent."""
        slots = self.async_validate_slots(intent_obj.slots)
        cups = slots.get("cups", {}).get("value", 1)
        total = await async_add_coffee(intent_obj.hass, cups)

        response = intent_obj.create_response()
        response.async_set_speech(f"That is {total} cups today.")
        return response
```

- `intent_type` is the name. Prefix your own intents to avoid clashes. Names starting with `Hass` belong to Home Assistant.
- `description` explains the intent. When the intent is offered to language models as a tool, they read it, so write it for them.
- `slot_schema` describes the slots. `async_validate_slots` validates them, and raises when they do not fit.
- `platforms` optionally limits which integrations may fire the intent.

Speech you set in a handler is spoken as is, it is not translated. The built-in intents get their response sentences, in every language, from the intents repository instead.

For the common case of an intent that calls an action on matching entities, `ServiceIntentHandler` from `homeassistant.helpers.intent` does the matching, the calling, and the response for you.

### The response

`intent_obj.create_response()` returns an `IntentResponse`:

- `async_set_speech(text)`: what to say back. Plain text by default, or SSML with `speech_type="ssml"`.
- `async_set_reprompt(text)`: what to say if the user does not answer in time, for a response that asks a question.
- `async_set_card(title, content)`: a card for assistants that can show one.
- `async_set_results(success_results, failed_results)`: the targets that were acted on, as `IntentResponseTarget` objects.
- `async_set_error(code, message)`: turn the response into an error.
- `response_type`: `IntentResponseType.ACTION_DONE` by default. Set it to `QUERY_ANSWER` for an answer to a question.

Raise `intent.IntentHandleError` when the intent cannot be handled, with a message for the user.

## Fire an intent

If your code understands the user itself, like an integration for an external voice assistant, let Home Assistant handle the result:

```python
from homeassistant.helpers import intent

try:
    response = await intent.async_handle(
        hass,
        DOMAIN,
        intent.INTENT_TURN_ON,
        {"name": {"value": "Kitchen light"}},
        context=context,
        language="en",
    )
except intent.UnknownIntent:
    _LOGGER.warning("Unknown intent")
except intent.InvalidSlotInfo as err:
    _LOGGER.error("Invalid slot data: %s", err)
except intent.IntentError:
    _LOGGER.exception("Error handling the intent")
```

It is up to you to bring the response back to the user. `response.speech` holds the speech by type, like `response.speech["plain"]["speech"]`. `response.as_dict()` gives the whole response, in the same shape as the [conversation API](/core/internals/conversation-api/#the-response).

### Over HTTP

The `intent` integration offers `POST /api/intent/handle`, with the intent `name` and its slot values in `data`:

```json
{
  "name": "HassTurnOn",
  "data": {
    "name": "Kitchen light"
  }
}
```

Optional fields are `language`, `assistant`, `device_id`, and `satellite_id`. The response is the intent response as JSON.

To send text instead of an intent, and let Home Assistant work out the intent, use the [conversation API](/core/internals/conversation-api/).
