---
title: Built-in intents
description: Every intent Home Assistant understands out of the box, with its slots, its slot combinations, and the integration that handles it.
order: 9
---

An [intent](/glossary/intent/) is what a sentence means, in a form Home Assistant can act on. This page lists every intent that has sentences in the [intents repository](https://github.com/OHF-Voice/intents), and so can be spoken in every language that covers it.

The source of this list is [`intents.yaml`](https://github.com/OHF-Voice/intents/blob/main/intents.yaml) in the intents repository. This is the one full list on this site. The code that handles the intents lives in Home Assistant Core: [built-in intents in Core](/core/internals/built-in-intents/) shows where each handler lives, and [intents](/core/internals/intents/) explains how to write a handler or fire intents from your own code.

## How to read this page

Each intent lists:

- **Slots**: the pieces of information a sentence can fill in, like the `name` of a device or the `area` it is in. A slot marked as required must be filled for the intent to work.
- **Response variables**: extra values a response template can use, besides `slots`. See [responses](/translate/voice/template-syntax/#responses).
- **Slot combinations**: the sets of slots a sentence can fill, each with an English example. Sentences and tests are organized per slot combination. "Satellite area" means the area is not spoken: it comes from the voice satellite that heard the sentence.

The importance of a slot combination says how much a language needs it: `required` (the bare minimum, validation fails without it), `usable` (what people expect), `complete` (needed for full coverage), or `optional` (extra). For combinations that target entities by `name` or by an inferred `domain`, importance is set per entity domain. The table shows the highest level of any of its domains. [`intents.yaml`](https://github.com/OHF-Voice/intents/blob/main/intents.yaml) has the full detail.

`name`, `area`, and `floor` are filled from what exists in the user's Home Assistant: the names of their exposed entities, their areas, and their floors.

## Devices and entities

### HassTurnOn

Turns on a device or entity. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `domain` | No | Domain of the targeted devices or entities |
| `device_class` | No | Device class of the targeted devices or entities |

<details>
<summary>Slot combinations (12)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `domain_only` | `domain` (satellite area) | required | turn on the lights in here |
| `name_only` | `name` | required | turn on the overhead light |
| `area_domain` | `area`, `domain` | required | turn on the lights in the kitchen |
| `floor_domain` | `floor`, `domain` | optional | turn on the lights on the first floor |
| `device_class_cover` | `domain`, `device_class` (satellite area) | complete | open the windows in here |
| `name_area` | `name`, `area` | complete | turn on the overhead light in the kitchen |
| `name_floor` | `name`, `floor` | optional | turn on the overhead light on the first floor |
| `name_script` | `name` | complete | run party time script |
| `name_scene` | `name` | complete | activate mood lighting scene |
| `name_area_scene` | `name`, `area` | complete | activate mood lighting scene in the living room |
| `area_device_class_cover` | `area`, `domain`, `device_class` | complete | open the curtains in the living room |
| `floor_device_class_cover` | `floor`, `domain`, `device_class` | optional | open the curtains on the first floor |

</details>

### HassTurnOff

Turns off a device or entity. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `domain` | No | Domain of the targeted devices or entities |
| `device_class` | No | Device class of the targeted devices or entities |

<details>
<summary>Slot combinations (10)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `domain_only` | `domain` (satellite area) | required | turn off the lights in here |
| `name_only` | `name` | required | turn off the overhead light |
| `area_domain` | `area`, `domain` | required | turn off the lights in the kitchen |
| `floor_domain` | `floor`, `domain` | optional | turn off the lights on the first floor |
| `device_class_cover` | `domain`, `device_class` (satellite area) | complete | close the windows in here |
| `name_area` | `name`, `area` | complete | turn off the overhead light in the kitchen |
| `name_floor` | `name`, `floor` | optional | turn off the overhead light on the first floor |
| `area_device_class_cover` | `area`, `domain`, `device_class` | complete | close the curtains in the living room |
| `floor_device_class_cover` | `floor`, `domain`, `device_class` | optional | close the curtains on the first floor |
| `domain_all` | `domain` | optional | turn off all the lights in the house |

</details>

### HassGetState

Gets or checks the state of an entity. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `domain` | No | Domain of the targeted devices or entities |
| `device_class` | No | Device class of the targeted devices or entities |
| `state` | No | Name of state to match |

Response variables: `state` (state of the first entity matched), `query.matched` (list of states that matched the query and state name), `query.unmatched` (list of states that matched everything except state name).

<details>
<summary>Slot combinations (12)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_only` | `name` | complete | what is the outside temperature |
| `name_state` | `name`, `state` | complete | is the sliding door open |
| `name_state_area` | `name`, `state`, `area` | complete | is the garage door open in the garage |
| `name_state_floor` | `name`, `state`, `floor` | complete | is the bedroom window open on the second floor |
| `name_where` | `name` | complete | where is jane |
| `name_zone` | `name`, `state` | complete | is jane home |
| `domain_state` | `domain`, `state` | complete | are all the lights off |
| `domain_state_area` | `area`, `domain`, `state` | complete | which lights are on in the kitchen |
| `domain_state_floor` | `floor`, `domain`, `state` | complete | are all the lights off on the first floor |
| `device_class_state` | `domain`, `device_class`, `state` | complete | are all the windows closed |
| `device_class_state_area` | `area`, `domain`, `device_class`, `state` | complete | are all the windows closed in the bedroom |
| `device_class_state_floor` | `floor`, `domain`, `device_class`, `state` | complete | are all the windows closed on the second floor |

</details>

### HassSetPosition

Sets the position of an entity. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `domain` | No | Domain of the targeted devices or entities |
| `device_class` | No | Device class of the targeted devices or entities |
| `position` | Yes | Position from 0 to 100 |

<details>
<summary>Slot combinations (6)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_only` | `name`, `position` | complete | set curtain left to 50% |
| `device_class` | `domain`, `device_class`, `position` (satellite area) | complete | set the curtains to 50% |
| `area_device_class` | `area`, `domain`, `device_class`, `position` | complete | set the curtains to 50% in the bedroom |
| `name_area` | `name`, `area`, `position` | optional | set the curtain left in the living room to 50% |
| `name_floor` | `name`, `floor`, `position` | optional | set the curtain left on the main floor to 50% |
| `floor_device_class` | `floor`, `domain`, `device_class`, `position` | optional | set the curtains on the main floor to 50% |

</details>

## Conversation

### HassNevermind

Does nothing. Used to cancel a request. Handled by the `intent` integration.

This intent has no slots.

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | nevermind |

</details>

### HassRespond

Returns response but takes no action. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `response` | No | Text to respond with |

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | optional | hello |

</details>

### HassBroadcast

Announces a message on other satellites. Handled by the `assist_satellite` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `message` | Yes | Message to broadcast |

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `message_only` | `message` | optional | broadcast that dinner is ready |

</details>

## Date and time

### HassGetCurrentDate

Gets the current date. Handled by the `intent` integration.

This intent has no slots.

Response variables: `date` (date object with day, month, and year).

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | what is the date |

</details>

### HassGetCurrentTime

Gets the current time. Handled by the `intent` integration.

This intent has no slots.

Response variables: `time` (time object with hours, minutes, and seconds).

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | what time is it |

</details>

## Lights and fans

### HassLightSet

Sets the brightness or color of a light. Handled by the `light` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `domain` | No | Domain of the targeted devices or entities |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `brightness` | No | Brightness percentage from 0 to 100 |
| `color` | No | Name of color |
| `temperature` | No | Color temperature from 1000 to 10000 Kelvin |

<details>
<summary>Slot combinations (12)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_brightness` | `name`, `brightness` | usable | set the overhead light brightness to 50% |
| `name_color` | `name`, `color` | usable | set the overhead light to red |
| `name_temperature` | `name`, `temperature` | usable | set the overhead light color temperature to 2700 Kelvin |
| `brightness_only` | `brightness`, `domain` (satellite area) | complete | set the brightness in here to 50% |
| `area_brightness` | `area`, `brightness`, `domain` | complete | set the living room brightness to 50% |
| `floor_brightness` | `floor`, `brightness`, `domain` | complete | set the main floor brightness to 50% |
| `color_only` | `color`, `domain` (satellite area) | complete | set the lights in here to red |
| `area_color` | `area`, `color`, `domain` | complete | set the living room to red |
| `floor_color` | `floor`, `color`, `domain` | complete | set the main floor to red |
| `temperature_only` | `temperature`, `domain` (satellite area) | complete | set the light color temperature in here to 2700 Kelvin |
| `area_temperature` | `area`, `temperature`, `domain` | complete | set the living room light color temperature to 2700 Kelvin |
| `floor_temperature` | `floor`, `temperature`, `domain` | complete | set the main floor color temperature to 2700 Kelvin |

</details>

### HassFanSetSpeed

Sets the speed of a fan. Handled by the `fan` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `percentage` | Yes | Speed percentage from 0 to 100 |

<details>
<summary>Slot combinations (4)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | `percentage` (satellite area) | complete | set fans to 50% |
| `name_only` | `name`, `percentage` | complete | set ceiling fan to 50% |
| `area_only` | `area`, `percentage` | complete | set kitchen fans to 50% |
| `floor_only` | `floor`, `percentage` | complete | set first floor fans to 50% |

</details>

## Climate and weather

### HassClimateSetTemperature

Sets the desired indoor temperature. Handled by the `climate` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `temperature` | Yes | Temperature in degrees |

<details>
<summary>Slot combinations (4)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `temperature_only` | `temperature` (satellite area) | complete | set the temperature to 30 degrees |
| `name_temperature` | `name`, `temperature` | complete | set the EcoBee to 30 degrees |
| `area_temperature` | `area`, `temperature` | complete | set the bedroom temperature to 30 degrees |
| `floor_temperature` | `floor`, `temperature` | complete | set the temperature of the main floor to 30 degrees |

</details>

### HassClimateGetTemperature

Gets the actual indoor temperature, not the target temperature that `HassClimateSetTemperature` sets. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |

Response variables: `state` (state of the entity that contains the temperature).

<details>
<summary>Slot combinations (4)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None (satellite area) | usable | what is the temperature |
| `name_only` | `name` | usable | what is the temperature of the EcoBee |
| `area_only` | `area` | usable | what is the temperature in the bedroom |
| `floor_only` | `floor` | complete | what is the temperature downstairs |

</details>

### HassClimateSetFanMode

Sets the fan mode of a climate device. Handled by the `climate` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |
| `fan_mode` | Yes | Fan mode to set |

<details>
<summary>Slot combinations (4)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `fan_mode_only` | `fan_mode` (satellite area) | complete | set the fan mode to auto |
| `name_fan_mode` | `name`, `fan_mode` | complete | set the EcoBee fan to auto |
| `area_fan_mode` | `area`, `fan_mode` | complete | set the bedroom fan mode to low |
| `floor_fan_mode` | `floor`, `fan_mode` | complete | set the fan mode on the first floor to low |

</details>

### HassGetWeather

Gets the current weather. Handled by the `weather` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of the weather entity to use |

Response variables: `state` (state of the entity that contains the weather).

<details>
<summary>Slot combinations (2)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | what is the weather |
| `name_only` | `name` | usable | what is the weather in New York |

</details>

## Lists

### HassShoppingListAddItem

Adds an item to the shopping list. Handled by the `shopping_list` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `item` | Yes | Item to add |

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `item_only` | `item` | optional | add apples to my shopping list |

</details>

### HassShoppingListCompleteItem

Checks off an item from the shopping list. Handled by the `shopping_list` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `item` | Yes | Item to check off |

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `item_only` | `item` | optional | check off apples from my shopping list |

</details>

### HassListAddItem

Adds an item to a todo list. Handled by the `todo` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `item` | Yes | Item to add |
| `name` | Yes | Name of the list |

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_item` | `item`, `name` | complete | add apples to my shopping list |

</details>

### HassListCompleteItem

Checks off an item from a todo list. Handled by the `todo` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `item` | Yes | Item to check off |
| `name` | Yes | Name of the list |

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_item` | `item`, `name` | complete | check off take out the trash from my chores list |

</details>

### HassListRemoveItem

Removes an item from a todo list. Handled by the `todo` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `item` | Yes | Item to remove |
| `name` | Yes | Name of the list |

<details>
<summary>Slot combinations (1)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_item` | `item`, `name` | complete | remove take out the trash from my chores list |

</details>

## Media

### HassMediaPause

Pauses a media player. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |

<details>
<summary>Slot combinations (3)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None (satellite area) | usable | pause |
| `name_only` | `name` | usable | pause TV |
| `area_only` | `area` | usable | pause music in kitchen |

</details>

### HassMediaUnpause

Unpauses a media player. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |

<details>
<summary>Slot combinations (3)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None (satellite area) | usable | resume |
| `name_only` | `name` | usable | resume TV |
| `area_only` | `area` | usable | resume music in kitchen |

</details>

### HassMediaNext

Skips a media player to the next item. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |

<details>
<summary>Slot combinations (3)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None (satellite area) | usable | next track |
| `name_only` | `name` | usable | next track on the stereo |
| `area_only` | `area` | usable | next track in the kitchen |

</details>

### HassMediaPrevious

Skips a media player back to the previous item. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |

<details>
<summary>Slot combinations (3)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None (satellite area) | complete | previous track |
| `name_only` | `name` | complete | previous track on the stereo |
| `area_only` | `area` | complete | previous track in the kitchen |

</details>

### HassSetVolume

Sets the volume of a media player. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `volume_level` | Yes | Volume level from 0 to 100 |

<details>
<summary>Slot combinations (3)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | `volume_level` (satellite area) | complete | set volume to 50% |
| `name_only` | `name`, `volume_level` | complete | set TV volume to 50% |
| `area_only` | `area`, `volume_level` | complete | set volume in kitchen to 50% |

</details>

### HassSetVolumeRelative

Increases or decreases the volume of a media player. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `volume_step` | Yes | up, down, or the percentage to change from -100 to 100 |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |

<details>
<summary>Slot combinations (4)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | `volume_step` (satellite area) | complete | increase volume |
| `name_only` | `volume_step`, `name` | complete | decrease TV volume |
| `area_only` | `volume_step`, `area` | complete | decrease volume in kitchen |
| `floor_only` | `volume_step`, `floor` | complete | increase volume on first floor |

</details>

### HassMediaPlayerMute

Mutes a media player. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |

<details>
<summary>Slot combinations (2)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None (satellite area) | complete | mute |
| `name_only` | `name` | complete | mute the TV |

</details>

### HassMediaPlayerUnmute

Unmutes a media player. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |

<details>
<summary>Slot combinations (2)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None (satellite area) | complete | unmute |
| `name_only` | `name` | complete | unmute the TV |

</details>

### HassMediaSearchAndPlay

Searches for a media item and plays it. Handled by the `media_player` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `search_query` | Yes | Media to search for and play |
| `media_class` | No | Type of media to search for (album, app, artist, channel, composer, contributing_artist, directory, episode, game, genre, image, movie, music, playlist, podcast, season, track, tv_show, url, video) |

Response variables: `media` (the matched media item as a `BrowseMedia` object, or `None` when the search found nothing).

<details>
<summary>Slot combinations (8)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | `search_query` (satellite area) | optional | play Pink Floyd |
| `name_only` | `name`, `search_query` | optional | play Pink Floyd on Sonos Speakers |
| `area_only` | `area`, `search_query` | optional | play Pink Floyd in the Living Room |
| `name_area` | `name`, `area`, `search_query` | optional | play Pink Floyd on the Sonos Speakers in the Living Room |
| `media_class_only` | `search_query`, `media_class` (satellite area) | optional | play Pink Floyd playlist |
| `name_media_class` | `name`, `search_query`, `media_class` | optional | play Pink Floyd album on Sonos Speakers |
| `area_media_class` | `area`, `search_query`, `media_class` | optional | play Pink Floyd movie in the Living Room |
| `name_area_media_class` | `name`, `area`, `search_query`, `media_class` | optional | play Pink Floyd podcast on the Sonos Speakers in the Living Room |

</details>

## Timers

### HassStartTimer

Starts a timer. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `hours` | No | Number of hours |
| `minutes` | No | Number of minutes |
| `seconds` | No | Number of seconds |
| `name` | No | Name attached to the timer |
| `conversation_command` | No | Command to execute when timer finishes |

<details>
<summary>Slot combinations (21)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `hours_only` | `hours` | usable | set a timer for 1 hour |
| `minutes_only` | `minutes` | usable | set a timer for 10 minutes |
| `seconds_only` | `seconds` | usable | set a timer for 30 seconds |
| `hours_minutes` | `hours`, `minutes` | complete | set a timer for 1 hour and 10 minutes |
| `hours_seconds` | `hours`, `seconds` | complete | set a timer for 1 hour and 30 seconds |
| `minutes_seconds` | `minutes`, `seconds` | complete | set a timer for 10 minutes and 30 seconds |
| `hours_minutes_seconds` | `hours`, `minutes`, `seconds` | complete | set a timer for 1 hour 10 minutes and 30 seconds |
| `name_hours` | `name`, `hours` | complete | set a timer for 1 hour named pizza |
| `name_minutes` | `name`, `minutes` | complete | set a timer for 10 minutes named pizza |
| `name_seconds` | `name`, `seconds` | complete | set a timer for 30 seconds named pizza |
| `name_hours_minutes` | `name`, `hours`, `minutes` | complete | set a timer for 1 hour and 10 minutes named pizza |
| `name_hours_seconds` | `name`, `hours`, `seconds` | complete | set a timer for 1 hour and 30 seconds named pizza |
| `name_minutes_seconds` | `name`, `minutes`, `seconds` | complete | set a timer for 10 minutes and 30 seconds named pizza |
| `name_hours_minutes_seconds` | `name`, `hours`, `minutes`, `seconds` | complete | set a timer for 1 hour 10 minutes and 30 seconds named pizza |
| `command_hours` | `conversation_command`, `hours` | optional | turn off the lights in 1 hour |
| `command_minutes` | `conversation_command`, `minutes` | optional | turn off the lights in 10 minutes |
| `command_seconds` | `conversation_command`, `seconds` | optional | turn off the lights in 30 seconds |
| `command_hours_minutes` | `conversation_command`, `hours`, `minutes` | optional | turn off the lights in 1 hour and 10 minutes |
| `command_hours_seconds` | `conversation_command`, `hours`, `seconds` | optional | turn off the lights in 1 hour and 30 seconds |
| `command_minutes_seconds` | `conversation_command`, `minutes`, `seconds` | optional | turn off the lights in 10 minutes and 30 seconds |
| `command_hours_minutes_seconds` | `conversation_command`, `hours`, `minutes`, `seconds` | optional | turn off the lights in 1 hour 10 minutes and 30 seconds |

</details>

### HassCancelTimer

Cancels a timer. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `start_hours` | No | Hours the timer was started with |
| `start_minutes` | No | Minutes the timer was started with |
| `start_seconds` | No | Seconds the timer was started with |
| `name` | No | Name attached to the timer |
| `area` | No | Area of the device used to start the timer |

<details>
<summary>Slot combinations (6)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | cancel my timer |
| `name_only` | `name` | complete | cancel the pizza timer |
| `area_only` | `area` | complete | cancel the kitchen timer |
| `hours_only` | `start_hours` | usable | cancel the 1 hour timer |
| `minutes_only` | `start_minutes` | usable | cancel the 10 minute timer |
| `seconds_only` | `start_seconds` | usable | cancel the 30 second timer |

</details>

### HassCancelAllTimers

Cancels all timers. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `area` | No | Area of the device used to start the timer |

<details>
<summary>Slot combinations (2)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | cancel all timers |
| `area_only` | `area` | complete | cancel all timers in the kitchen |

</details>

### HassIncreaseTimer

Adds time to a timer. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `hours` | No | Number of hours |
| `minutes` | No | Number of minutes |
| `seconds` | No | Number of seconds |
| `start_hours` | No | Hours the timer was started with |
| `start_minutes` | No | Minutes the timer was started with |
| `start_seconds` | No | Seconds the timer was started with |
| `name` | No | Name attached to the timer |
| `area` | No | Area of the device used to start the timer |

<details>
<summary>Slot combinations (26)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `hours_only` | `hours` | complete | add 1 hour to my timer |
| `minutes_only` | `minutes` | complete | add 10 minutes to my timer |
| `seconds_only` | `seconds` | complete | add 30 seconds to my timer |
| `minutes_seconds` | `minutes`, `seconds` | complete | add 10 minutes and 30 seconds to my timer |
| `hours_minutes` | `hours`, `minutes` | complete | add 1 hour and 10 minutes to my timer |
| `hours_seconds` | `hours`, `seconds` | complete | add 1 hour and 30 seconds to my timer |
| `name_hours` | `name`, `hours` | complete | add 1 hour to the pizza timer |
| `name_minutes` | `name`, `minutes` | complete | add 10 minutes to the pizza timer |
| `name_seconds` | `name`, `seconds` | complete | add 30 seconds to the pizza timer |
| `name_hours_minutes` | `name`, `hours`, `minutes` | complete | add 1 hour and 10 minutes to the pizza timer |
| `name_hours_seconds` | `name`, `hours`, `seconds` | complete | add 1 hour and 30 seconds to the pizza timer |
| `area_hours` | `area`, `hours` | complete | add 1 hour to the kitchen timer |
| `area_minutes` | `area`, `minutes` | complete | add 10 minutes to the kitchen timer |
| `area_seconds` | `area`, `seconds` | complete | add 30 seconds to the kitchen timer |
| `area_minutes_seconds` | `area`, `minutes`, `seconds` | complete | add 10 minutes and 30 seconds to the kitchen timer |
| `area_hours_minutes` | `area`, `hours`, `minutes` | complete | add 1 hour and 10 minutes to the kitchen timer |
| `area_hours_seconds` | `area`, `hours`, `seconds` | complete | add 1 hour and 30 seconds to the kitchen timer |
| `hours_start_hours` | `start_hours`, `hours` | complete | add 1 hour to the 2 hour timer |
| `hours_start_minutes` | `start_minutes`, `hours` | complete | add 1 hour to the 10 minute timer |
| `hours_start_seconds` | `start_seconds`, `hours` | complete | add 1 hour to the 30 second timer |
| `minutes_start_hours` | `start_hours`, `minutes` | complete | add 10 minutes to my timer |
| `minutes_start_minutes` | `start_minutes`, `minutes` | complete | add 10 minutes to the 20 minute timer |
| `minutes_start_seconds` | `start_seconds`, `minutes` | complete | add 10 minutes to the 40 second timer |
| `seconds_start_hours` | `start_hours`, `seconds` | complete | add 30 seconds to my timer |
| `seconds_start_minutes` | `start_minutes`, `seconds` | complete | add 30 seconds to the 20 minute timer |
| `seconds_start_seconds` | `start_seconds`, `seconds` | complete | add 30 seconds to the 40 second timer |

</details>

### HassDecreaseTimer

Removes time from a timer. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `hours` | No | Number of hours |
| `minutes` | No | Number of minutes |
| `seconds` | No | Number of seconds |
| `start_hours` | No | Hours the timer was started with |
| `start_minutes` | No | Minutes the timer was started with |
| `start_seconds` | No | Seconds the timer was started with |
| `name` | No | Name attached to the timer |
| `area` | No | Area of the device used to start the timer |

<details>
<summary>Slot combinations (26)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `hours_only` | `hours` | complete | remove 1 hour to my timer |
| `minutes_only` | `minutes` | complete | remove 10 minutes to my timer |
| `seconds_only` | `seconds` | complete | remove 30 seconds to my timer |
| `hours_minutes` | `hours`, `minutes` | complete | remove 1 hour and 10 minutes to my timer |
| `hours_seconds` | `hours`, `seconds` | complete | remove 1 hour and 30 seconds to my timer |
| `minutes_seconds` | `minutes`, `seconds` | complete | remove 10 minutes and 30 seconds to my timer |
| `name_hours` | `name`, `hours` | complete | remove 1 hour from the pizza timer |
| `name_minutes` | `name`, `minutes` | complete | remove 10 minutes from the pizza timer |
| `name_seconds` | `name`, `seconds` | complete | remove 30 seconds from the pizza timer |
| `name_hours_minutes` | `name`, `hours`, `minutes` | complete | remove 1 hour and 10 minutes from the pizza timer |
| `name_hours_seconds` | `name`, `hours`, `seconds` | complete | remove 1 hour and 30 seconds from the pizza timer |
| `area_hours` | `area`, `hours` | complete | remove 1 hour from the kitchen timer |
| `area_minutes` | `area`, `minutes` | complete | remove 10 minutes from the kitchen timer |
| `area_seconds` | `area`, `seconds` | complete | remove 30 seconds from the kitchen timer |
| `area_minutes_seconds` | `area`, `minutes`, `seconds` | complete | remove 10 minutes and 30 seconds from the kitchen timer |
| `area_hours_minutes` | `area`, `hours`, `minutes` | complete | remove 1 hour and 10 minutes from the kitchen timer |
| `area_hours_seconds` | `area`, `hours`, `seconds` | complete | remove 1 hour and 30 seconds from the kitchen timer |
| `hours_start_hours` | `start_hours`, `hours` | complete | remove 1 hour from the 2 hour timer |
| `hours_start_minutes` | `start_minutes`, `hours` | complete | remove 1 hour from the 10 minute timer |
| `hours_start_seconds` | `start_seconds`, `hours` | complete | remove 1 hour from the 30 second timer |
| `minutes_start_hours` | `start_hours`, `minutes` | complete | remove 10 minutes to my timer |
| `minutes_start_minutes` | `start_minutes`, `minutes` | complete | remove 10 minutes from the 20 minute timer |
| `minutes_start_seconds` | `start_seconds`, `minutes` | complete | remove 10 minutes from the 40 second timer |
| `seconds_start_hours` | `start_hours`, `seconds` | complete | remove 30 seconds to my timer |
| `seconds_start_minutes` | `start_minutes`, `seconds` | complete | remove 30 seconds from the 20 minute timer |
| `seconds_start_seconds` | `start_seconds`, `seconds` | complete | remove 30 seconds from the 40 second timer |

</details>

### HassPauseTimer

Pauses a running timer. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `start_hours` | No | Hours the timer was started with |
| `start_minutes` | No | Minutes the timer was started with |
| `start_seconds` | No | Seconds the timer was started with |
| `name` | No | Name attached to the timer |
| `area` | No | Area of the device used to start the timer |

<details>
<summary>Slot combinations (6)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | pause my timer |
| `name_only` | `name` | complete | pause the pizza timer |
| `area_only` | `area` | complete | pause the kitchen timer |
| `hours_only` | `start_hours` | complete | pause the 1 hour timer |
| `minutes_only` | `start_minutes` | complete | pause the 10 minute timer |
| `seconds_only` | `start_seconds` | complete | pause the 30 second timer |

</details>

### HassUnpauseTimer

Resumes a paused timer. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `start_hours` | No | Hours the timer was started with |
| `start_minutes` | No | Minutes the timer was started with |
| `start_seconds` | No | Seconds the timer was started with |
| `name` | No | Name attached to the timer |
| `area` | No | Area of the device used to start the timer |

<details>
<summary>Slot combinations (6)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | resume my timer |
| `name_only` | `name` | complete | resume the pizza timer |
| `area_only` | `area` | complete | resume the kitchen timer |
| `hours_only` | `start_hours` | complete | resume the 1 hour timer |
| `minutes_only` | `start_minutes` | complete | resume the 10 minute timer |
| `seconds_only` | `start_seconds` | complete | resume the 30 second timer |

</details>

### HassTimerStatus

Reports status of one or more timers. Handled by the `intent` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `start_hours` | No | Hours the timer was started with |
| `start_minutes` | No | Minutes the timer was started with |
| `start_seconds` | No | Seconds the timer was started with |
| `name` | No | Name attached to the timer |
| `area` | No | Area of the device used to start the timer |

Response variables: `timers`, a list of timer objects. Each timer has `is_active` (true when running, false when paused), `name` and `area` (both optional), `total_seconds_left`, `rounded_hours_left`, `rounded_minutes_left`, `rounded_seconds_left`, and the `start_hours`, `start_minutes`, and `start_seconds` the timer was started with.

<details>
<summary>Slot combinations (6)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | usable | how much time is left on my timer |
| `name_only` | `name` | complete | how much time is left on the pizza timer |
| `area_only` | `area` | complete | how much time is left on the kitchen timer |
| `hours_only` | `start_hours` | complete | how much time is left on the 1 hour timer |
| `minutes_only` | `start_minutes` | complete | how much time is left on the 10 minute timer |
| `seconds_only` | `start_seconds` | complete | how much time is left on the 30 second timer |

</details>

## Vacuums and lawn mowers

### HassVacuumStart

Starts a vacuum. Handled by the `vacuum` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |
| `floor` | No | Name of a floor |

<details>
<summary>Slot combinations (3)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_only` | `name` | complete | start rover |
| `area_only` | `area` | complete | vacuum the kitchen |
| `floor_only` | `floor` | complete | vacuum the main floor |

</details>

### HassVacuumReturnToBase

Returns a vacuum to base. Handled by the `vacuum` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | No | Name of an area |

<details>
<summary>Slot combinations (2)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `name_only` | `name` | complete | return rover to base |
| `area_only` | `area` | complete | return kitchen vacuum to base |

</details>

### HassVacuumCleanArea

Sends a vacuum to clean an area. Handled by the `vacuum` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |
| `area` | Yes | Name of area to be cleaned |

<details>
<summary>Slot combinations (3)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `context_area` | None (satellite area) | usable | vacuum in here |
| `area_only` | `area` | complete | vacuum the kitchen |
| `name_area` | `name`, `area` | complete | vacuum the kitchen with rover |

</details>

### HassLawnMowerStartMowing

Starts a lawn mower. Handled by the `lawn_mower` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |

<details>
<summary>Slot combinations (2)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | complete | start mowing |
| `name_only` | `name` | complete | start clippy |

</details>

### HassLawnMowerDock

Sends a lawn mower to dock. Handled by the `lawn_mower` integration.

| Slot | Required | Description |
| --- | --- | --- |
| `name` | No | Name of a device or entity |

<details>
<summary>Slot combinations (2)</summary>

| Combination | Slots | Importance | Example |
| --- | --- | --- | --- |
| `default` | None | complete | stop mowing |
| `name_only` | `name` | complete | return clippy to base |

</details>

## Intents without sentences

Home Assistant registers a few more intents that have no sentences in the intents repository. You cannot say them to the built-in conversation agent, but code can still fire them. Some are also offered as tools to conversation agents that use an AI model. Do not add sentences for them to the intents repository: `intents.yaml` does not list them.

| Intent | What it does | Slots | Handled by |
| --- | --- | --- | --- |
| `HassToggle` | Toggles a device or entity | Optional `name`, `area`, `floor`, `domain`, and `device_class` | `intent` |
| `HassStopMoving` | Stops a moving cover or valve | Optional `name`, `area`, `floor`, `domain`, and `device_class` | `intent` |
| `HassOpenCover` | Opens a cover. Use `HassTurnOn` instead | Optional `name`, `area`, `floor`, `domain`, and `device_class` | `cover` |
| `HassCloseCover` | Closes a cover. Use `HassTurnOff` instead | Optional `name`, `area`, `floor`, `domain`, and `device_class` | `cover` |
| `HassHumidifierSetpoint` | Sets the target humidity | `name` and `humidity` (0 to 100), both required | `humidifier` |
| `HassHumidifierMode` | Sets the mode of a humidifier | `name` and `mode`, both required | `humidifier` |
| `HassShoppingListLastItems` | Lists the last five items on the shopping list | None | `shopping_list` |
