---
title: Test syntax
description: How to write the tests that prove your sentences match the right intent, fill the right slots, and give the right response.
order: 8
---

Every sentence template in the [intents repository](https://github.com/OHF-Voice/intents) is covered by tests. A test gives a few example sentences, and says which slots they must fill and what Assist must answer. The tests run on every pull request.

## Where tests live

Tests mirror the [sentence files](/translate/voice/template-syntax/#sentence-files), one file per intent and slot combination:

```text
tests/<language>/<intent>/<slot_combination>.yaml
```

Every test file stands on its own. It declares the home it needs: the floors, areas, entities, timers, and media that its sentences talk about. Nothing is shared between test files, so you can read and change one without looking at the others.

## A test file

```yaml
# tests/en/HassTurnOn/name_only.yaml
language: "en"

entities:
  - name: "Overhead Light"
    domain: "light"
  - name: "Sliding Door"
    domain: "cover"

tests:
  - sentences:
      - "turn on Overhead Light"
      - "Overhead light on"
    slots:
      name: "Overhead Light"
    response: "Turned on the light"

  - sentences:
      - "open Sliding Door"
    slots:
      name: "Sliding Door"
    response: "Opening"
```

`tests` holds one or more groups. Each group has:

| Key | Required | Meaning |
| --- | --- | --- |
| `sentences` | Yes | The sentences to try |
| `slots` | Yes, when the combination has slots | The slots every sentence must fill, with their values |
| `response` | Yes | The exact text Assist must answer |
| `timers` | No | [Timers](#timers-and-media) for this group only |
| `media` | No | [Media](#timers-and-media) for this group only |

Every sentence must match the intent and slot combination the file is named after. `slots` must name exactly the slots of that combination in `intents.yaml`, including `domain` when the combination has it, like `domain: "light"`. `response` is the fully rendered response, compared character by character.

> [!IMPORTANT]
> Every sentence template must be matched by at least one test sentence. When a template is never used, the tests fail and list the untested templates. So when you add a template, add a test sentence that reaches it.

## Fixtures

The floors, areas, and entities at the top of a test file are its fixtures. They play the role of what a user has set up in Home Assistant. You only write names: the IDs are made from them.

```yaml
language: "en"

floors:
  - name: "First Floor"

areas:
  - name: "Kitchen"
    floor: "First Floor"
  - name: "Living Room"

entities:
  - name: "Kitchen Switch"
    domain: "switch"
    area: "Kitchen"
  - name: "Curtain Left"
    domain: "cover"
    area: "Living Room"
```

An entity accepts:

| Key | Required | Meaning |
| --- | --- | --- |
| `name` | Yes | The name sentences use for the entity |
| `domain` | Yes | The entity domain, like `light` or `cover` |
| `area` | No | The name of an area declared in the same file |
| `state` | No | The state of the entity, when the response reads it. Use `in` and `out` when the spoken state differs from the state Home Assistant stores |
| `state_with_unit` | No | The state together with its unit, like `22 °C` |
| `attributes` | No | Attributes the response or the match depends on. A device class goes here, as `device_class` |
| `is_exposed` | No | Set to `false` for an entity that is not exposed to Assist. The response then leaves it out, for example from the answer to a question about states |

```yaml
entities:
  - name: "Living Room Window"
    domain: "cover"
    state: "open"
    attributes:
      device_class: "window"
```

Give fixtures specific names, like "Garage Door Left" or "Curtains Left", instead of generic ones like "garage door". Otherwise a test for a sentence like "open the garage door" cannot tell a name apart from a kind of device.

## Timers and media

Intents that work with timers or media declare them like the other fixtures. Put them at the top of the file for all groups, or in a single group:

```yaml
# tests/en/HassTimerStatus/area_only.yaml
language: "en"

areas:
  - name: "Kitchen"

timers:
  - is_active: true
    area: "Kitchen"
    start_minutes: 5
    total_seconds_left: 180
    rounded_hours_left: 0
    rounded_minutes_left: 3
    rounded_seconds_left: 0

tests:
  - sentences:
      - "how much time is left on the kitchen timer"
      - "kitchen timer status"
    slots:
      area: "Kitchen"
    response: "3 minutes left."
```

A timer needs at least one of `start_hours`, `start_minutes`, or `start_seconds`, and all of `total_seconds_left`, `rounded_hours_left`, `rounded_minutes_left`, and `rounded_seconds_left`. `name`, `area`, and `is_active` are optional.

A media item only has a `title`:

```yaml
# tests/en/HassMediaSearchAndPlay/area_only.yaml
language: "en"

areas:
  - name: "Kitchen"

media:
  - title: "The Office"

tests:
  - sentences:
      - "play The Office in the Kitchen"
    slots:
      search_query: "The Office"
      area: "Kitchen"
    response: "Playing media"
```

## Context areas

Some slot combinations have `context_area: true` in `intents.yaml`. Their area comes from the voice satellite, not from the sentence, like in "vacuum in here". Home Assistant passes the name of that area along, so a response like `Cleaning {{ slots.area }}` still says the real name.

In a test file for such a combination, mark the area the satellite is in with `context_area: true`, and write its name out in the response:

```yaml
# tests/en/HassVacuumCleanArea/context_area.yaml
language: "en"

areas:
  - name: "Living Room"
    context_area: true

tests:
  - sentences:
      - "vacuum in here"
      - "clean this room"
    response: "Cleaning Living Room"
```

Only one area can be marked, and only in a file for a combination with `context_area: true`. Entities the response reads must be in the marked area, because the area of the satellite filters entities just like a spoken area does. Without a marked area, the tests use a placeholder name, `__context_area__`.

## Run the tests

Run the tests of your language:

```shell
pytest tests --language en
```

Leave off `--language` to test every language, add `-k <intent>` to test one intent, and add `-n auto` to run in parallel. In VS Code or a codespace, **Terminal** > **Run Task** > **Run tests for current file** validates your language and runs the tests for the file you have open.
