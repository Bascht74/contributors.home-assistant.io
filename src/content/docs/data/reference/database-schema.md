---
title: Database schema
description: The tables of the recorder database, what is in them, and how they connect.
order: 3
---

The [recorder](/glossary/recorder/) integration stores the history of Home Assistant in a SQL database. By default that is a SQLite file called `home-assistant_v2.db` in the configuration folder. It can also be MariaDB, MySQL, or PostgreSQL. How to set that up, and how long data is kept, is in the [recorder documentation](https://www.home-assistant.io/integrations/recorder/).

The schema changes over time. When it does, Home Assistant migrates the database by itself during an update. This page describes schema version 53. The source of truth is [`db_schema.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/recorder/db_schema.py) in core.

> [!NOTE]
> Some tables still have columns from older schema versions, like `entity_id` in `states` or `event_type` in `events`. They are no longer filled, and are left out of this page. Use the columns listed here.

## Overview

| Table | What it holds |
| --- | --- |
| `states` | One row per state update of an entity. |
| `states_meta` | The entity IDs, stored once. |
| `state_attributes` | The attributes of states, stored once per unique set. |
| `events` | One row per event, except `state_changed`. |
| `event_types` | The event types, stored once. |
| `event_data` | The data of events, stored once per unique set. |
| `statistics` | Hourly statistics. |
| `statistics_short_term` | 5-minute statistics. |
| `statistics_meta` | What each statistic is about. |
| `statistics_runs` | Which periods statistics have been compiled for. |
| `recorder_runs` | Every time the recorder started and stopped. |
| `schema_changes` and `migration_changes` | The history of schema migrations. Only for Home Assistant itself. |

Values that repeat a lot, like entity IDs, attributes, and event types, live in their own table and are referenced by ID. That keeps the database a lot smaller, but means most queries need a join. See [Query the database](/data/guides/query-the-database/) for examples.

All timestamps ending in `_ts` are Unix timestamps in seconds, in UTC, stored as floating point numbers. Context IDs, ending in `_bin`, are 16 bytes of binary data.

## States

### `states`

| Column | Type | What it is |
| --- | --- | --- |
| `state_id` | Integer, primary key | The ID of this row. |
| `metadata_id` | Integer, refers to `states_meta` | Which entity. |
| `state` | String, up to 255 characters | The state value. |
| `last_updated_ts` | Timestamp | When the state or its attributes last changed. |
| `last_changed_ts` | Timestamp | When the state value last changed. `NULL` when it is the same as `last_updated_ts`. |
| `last_reported_ts` | Timestamp | When the integration last reported the state. `NULL` when it is the same as `last_updated_ts`. |
| `old_state_id` | Integer, refers to `states` | The previous state of this entity. |
| `attributes_id` | Integer, refers to `state_attributes` | The attributes. |
| `context_id_bin` | Binary | The context of the change. |
| `context_user_id_bin` | Binary | The user who started it, if known. |
| `context_parent_id_bin` | Binary | The parent context, if any. |
| `origin_idx` | Integer | Where the change came from: `0` for local, `1` for remote. |

Indexes: `metadata_id` with `last_updated_ts`, and `context_id_bin`.

### `states_meta`

| Column | Type | What it is |
| --- | --- | --- |
| `metadata_id` | Integer, primary key | The ID used by `states`. |
| `entity_id` | String | The entity ID, like `light.kitchen`. |

When an entity is renamed, its row here is updated, so its history moves along.

### `state_attributes`

| Column | Type | What it is |
| --- | --- | --- |
| `attributes_id` | Integer, primary key | The ID used by `states`. |
| `hash` | Integer | A hash of the attributes, to find duplicates quickly. |
| `shared_attrs` | Text | The attributes, as JSON. |

## Events

### `events`

| Column | Type | What it is |
| --- | --- | --- |
| `event_id` | Integer, primary key | The ID of this row. |
| `event_type_id` | Integer, refers to `event_types` | The type of event. |
| `data_id` | Integer, refers to `event_data` | The data of the event. |
| `time_fired_ts` | Timestamp | When the event was fired. |
| `origin_idx` | Integer | Where the event came from: `0` for local, `1` for remote. |
| `context_id_bin` | Binary | The context of the event. |
| `context_user_id_bin` | Binary | The user who started it, if known. |
| `context_parent_id_bin` | Binary | The parent context, if any. |

Indexes: `event_type_id` with `time_fired_ts`, and `context_id_bin`.

`state_changed` events are not in this table. The `states` table has all of their information, and its `last_updated_ts` is the time the event was fired.

### `event_types`

| Column | Type | What it is |
| --- | --- | --- |
| `event_type_id` | Integer, primary key | The ID used by `events`. |
| `event_type` | String | The event type, like `automation_triggered`. |

### `event_data`

| Column | Type | What it is |
| --- | --- | --- |
| `data_id` | Integer, primary key | The ID used by `events`. |
| `hash` | Integer | A hash of the data, to find duplicates quickly. |
| `shared_data` | Text | The event data, as JSON. |

## Recorder runs

### `recorder_runs`

Every time Home Assistant starts, the recorder starts a new run. The run ends when Home Assistant shuts down. When you analyze your data, this tells you when Home Assistant was not running, so you do not mistake a gap for a period without changes.

| Column | Type | What it is |
| --- | --- | --- |
| `run_id` | Integer, primary key | The ID of the run. |
| `start` | Date and time | When the run started. |
| `end` | Date and time | When the run ended. |
| `closed_incorrect` | Boolean | Whether Home Assistant stopped without shutting down cleanly. |
| `created` | Date and time | When the row was created. |

When `closed_incorrect` is true, Home Assistant did not shut down cleanly, and `end` is set to when it started again. That can be minutes or days later, so do not trust `end` in that case. The last event or state change of the run is a better guess of when it really stopped.

## Statistics

The statistics tables are described on their own page: [Statistics](/data/reference/statistics/).
