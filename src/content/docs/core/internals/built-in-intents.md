---
title: Built-in intent handlers
description: Where the handlers of the intents Home Assistant ships with live in Core, how they find their entities, and where to look up every intent and its slots.
sidebarGroup: Voice and AI
order: 51
sidebarLabel: Built-in intents
---

Built-in intents are the [intents](/core/internals/intents/) Home Assistant Core handles itself, like `HassTurnOn` or `HassStartTimer`. The sentences that trigger them, in every language, live in the [intents repository](https://github.com/OHF-Voice/intents). The handlers that act on them live in Core.

The full list, with every slot, slot combination, and an example sentence, is on [Built-in intents](/translate/voice/intents/) in the Translations area. It follows [`intents.yaml`](https://github.com/OHF-Voice/intents/blob/main/intents.yaml), the file that defines them. This page covers the side of Core: where the handlers are, and what to keep in mind when you work on them.

## Where the handlers live

Each built-in intent is registered by an integration, and only works while that integration is loaded. Most entity domains register theirs in an `intent.py` platform, which the `intent` integration sets up.

| Integration | Code | Intents |
| --- | --- | --- |
| `intent` | `homeassistant/components/intent/__init__.py` | Turning on and off, toggling, state, position, stopping, date, time, indoor temperature, and the conversation intents `HassNevermind` and `HassRespond` |
| `intent` | `homeassistant/components/intent/timers.py` | Timers |
| `assist_satellite` | `homeassistant/components/assist_satellite/intent.py` | `HassBroadcast` |
| `climate` | `homeassistant/components/climate/intent.py` | Setting the temperature and the fan mode |
| `cover` | `homeassistant/components/cover/intent.py` | `HassOpenCover` and `HassCloseCover` |
| `fan` | `homeassistant/components/fan/intent.py` | `HassFanSetSpeed` |
| `humidifier` | `homeassistant/components/humidifier/intent.py` | Target humidity and mode |
| `lawn_mower` | `homeassistant/components/lawn_mower/intent.py` | Mowing and docking |
| `light` | `homeassistant/components/light/intent.py` | `HassLightSet` |
| `media_player` | `homeassistant/components/media_player/intent.py` | Pause, unpause, next, previous, volume, mute, and search and play |
| `shopping_list` | `homeassistant/components/shopping_list/intent.py` | The shopping list |
| `todo` | `homeassistant/components/todo/intent.py` | To-do lists |
| `vacuum` | `homeassistant/components/vacuum/intent.py` | Starting, returning to base, and cleaning an area |
| `weather` | `homeassistant/components/weather/intent.py` | `HassGetWeather` |

The names of the most used intents are constants in `homeassistant/helpers/intent.py`, like `intent.INTENT_TURN_ON`. Use those instead of the strings.

## Finding the entities

Most intents that act on entities find them with the same slots: `name`, `area`, `floor`, `domain`, and `device_class`. The handler matches them against the entities, areas, and floors in the user's Home Assistant. When an assistant like Assist sends the intent, only the entities exposed to that assistant are matched.

When no area is spoken, some slot combinations use the area of the voice satellite that heard the sentence. The translations page marks those as "satellite area".

## Intents without sentences

A few built-in intents have no sentences in the intents repository, so the built-in conversation agent never produces them. Code can still fire them, and some are offered as tools to AI conversation agents. Two of them, `HassOpenCover` and `HassCloseCover`, are covered by `HassTurnOn` and `HassTurnOff`: use those in new code. The [list of intents without sentences](/translate/voice/intents/#intents-without-sentences) has all of them.

## Related

- [Intents](/core/internals/intents/): write your own handler, and fire intents from code or over HTTP.
- [Conversation API](/core/internals/conversation-api/) and [LLM API](/core/internals/llm-api/): how text and AI models turn into intents.
- [Voice translations](/translate/voice/): how the sentences behind each intent are written, per language.
