---
title: The data model
description: Events, states, context, and actions, the building blocks of everything Home Assistant records.
order: 2
---

Home Assistant does a lot, but underneath it is built on a small and simple data model: events, states, and context. Once you know those, the data in the database makes sense.

## Events

Home Assistant is event driven. Everything that happens is an event: a light turns on, a motion sensor detects motion, an automation is triggered. Every event has a type, some data, a time, and a context.

A few built-in events you will see a lot:

| Event type | Fired when | Data |
| --- | --- | --- |
| `state_changed` | The state of an entity changes. | `entity_id`, `old_state`, and `new_state`. When `old_state` is missing, the entity is new. When `new_state` is missing, the entity was removed. |
| `call_service` | An action is performed, like `light.turn_on`. | `domain`, the action as `service`, and its data as `service_data`. |
| `automation_triggered` | An automation is triggered. | `name` and `entity_id` of the automation. |
| `script_started` | A script starts running. | `name` and `entity_id` of the script. |
| `service_registered` | An integration registers a new action. | `domain`, and the action as `service`. |
| `homeassistant_start` and `homeassistant_stop` | Home Assistant starts and stops. | Nothing. |

The event names and fields still use the old word "service" for what is now called an [action](/glossary/action/).

Do not rely on `homeassistant_stop` to find out when Home Assistant stopped: if it is not shut down cleanly, the event is never fired. The `recorder_runs` table is more reliable. See [Database schema](/data/reference/database-schema/#recorder-runs).

## States

Every [entity](/glossary/entity/) has a [state](/glossary/state/). A state has:

- The entity ID, in the format `<domain>.<object_id>`, like `light.kitchen`. The domain tells you what kind of entity it is, and which attributes to expect.
- The state itself, like `on`, or `21.5`.
- Attributes that describe it further, like the brightness and color of a light.
- Timestamps: `last_changed`, `last_updated`, and `last_reported`.

The three timestamps mean different things:

- `last_changed` changes only when the state value changes. A light turning on changes it. A light changing color does not.
- `last_updated` changes when the state value or any attribute changes. A light turning on, and a light changing color, both change it.
- `last_reported` changes every time the integration reports the state, even when nothing changed at all.

With `last_changed` you can tell how long a light has been on. With `last_updated`, how long it has had its current color.

## Context

Context ties events and states together. Whenever something starts a change, like a person in the UI, an automation, or a device, a new context is created. Every event and state change that follows from it carries that context. So you can always trace a change back to what caused it.

A context has three fields:

| Field | What it is |
| --- | --- |
| `id` | The unique ID of the context. |
| `user_id` | The user who started the change, if Home Assistant knows it. Mostly filled when the change came from the UI. |
| `parent_id` | The context that caused this one. An automation creates its own context, even when its trigger had one, and points to the trigger's context here. That keeps the actions of an automation separate from the permissions of the user who triggered it. |

For example, when Paulus comes home:

1. `device_tracker.paulus_phone` changes from `not_home` to `home`.
2. The automation "Paulus is home" is triggered, and fires `automation_triggered` with a new context, with the context of step 1 as its parent.
3. The automation performs `light.turn_on`, which fires `call_service` with the context of step 2.
4. `light.living_room` turns on, and its new state carries the context of step 2 as well.

The logbook uses this to show what caused a change. Not every trigger creates a context yet, and there is no built-in way to look up the original cause of a context in automations or templates.

## Actions

Integrations offer actions, like `light.turn_on` or `notify.send_message`. An action is identified by its domain and name, and takes data that says what to do, like which light to turn on.

Actions are not stored in a table of their own. You can find which actions exist from the `service_registered` events, and which ones were performed from the `call_service` events.

## Where it is stored

The [recorder](/glossary/recorder/) writes events and states to the database. The [Database schema](/data/reference/database-schema/) explains the tables, and [Statistics](/data/reference/statistics/) explains the summaries Home Assistant keeps for the long term.
