---
title: Query the database
description: Example SQL queries to read states, events, and context from the Home Assistant database, for SQLite, MariaDB, and PostgreSQL.
order: 3
---

The recorder stores the history of your home in a SQL database. You can query it with any SQL tool, like a database client on your computer or a notebook in JupyterLab. This page has queries to start from.

Before you start:

- Read [The data model](/data/reference/data-model/) and [Database schema](/data/reference/database-schema/). The tables are normalized: entity IDs, attributes, and event data live in their own tables, so most queries need a join.
- Only read. Writing to the database while Home Assistant runs can corrupt your history.
- Times are stored as Unix timestamps, in seconds since 1970, in UTC. The queries below convert them to readable dates.

The examples use SQLite, the default database. Where MariaDB, MySQL, or PostgreSQL need different functions, it says so.

## States

### The states of one entity

```sql
SELECT
  states.state,
  DATETIME(states.last_updated_ts, 'unixepoch', 'localtime') AS updated
FROM states
JOIN states_meta ON states.metadata_id = states_meta.metadata_id
WHERE states_meta.entity_id = 'sensor.living_room_temperature'
ORDER BY states.last_updated_ts DESC
LIMIT 100;
```

To convert the timestamp in other databases:

- MariaDB and MySQL: `FROM_UNIXTIME(states.last_updated_ts)`
- PostgreSQL: `TO_TIMESTAMP(states.last_updated_ts)`

### Only real state changes

A state row is written for every update, also when only an attribute changed, like the song on a media player or the color of a light. When the state value itself changed, `last_changed_ts` is the same as `last_updated_ts`, and to save space it is then stored as `NULL`. So to get only the rows where the state value changed:

```sql
SELECT states_meta.entity_id, states.state, states.last_updated_ts
FROM states
JOIN states_meta ON states.metadata_id = states_meta.metadata_id
WHERE states.last_changed_ts IS NULL;
```

### Fill in last changed

Because `last_changed_ts` is `NULL` when it equals `last_updated_ts`, fall back to `last_updated_ts` to get the real value:

```sql
SELECT
  states_meta.entity_id,
  states.state,
  COALESCE(states.last_changed_ts, states.last_updated_ts) AS last_changed_ts
FROM states
JOIN states_meta ON states.metadata_id = states_meta.metadata_id;
```

`COALESCE` works in SQLite, MariaDB, MySQL, and PostgreSQL.

### Attributes

Attributes are stored once in `state_attributes`, and shared by every state row with the same attributes:

```sql
SELECT states_meta.entity_id, states.state, state_attributes.shared_attrs
FROM states
JOIN states_meta ON states.metadata_id = states_meta.metadata_id
LEFT JOIN state_attributes
  ON states.attributes_id = state_attributes.attributes_id
WHERE states_meta.entity_id = 'light.kitchen';
```

`shared_attrs` is a JSON string.

### The previous state

Every state row points to the state before it with `old_state_id`:

```sql
SELECT
  states_meta.entity_id,
  old_states.state AS old_state,
  states.state AS new_state,
  states.last_updated_ts
FROM states
JOIN states_meta ON states.metadata_id = states_meta.metadata_id
LEFT JOIN states AS old_states
  ON states.old_state_id = old_states.state_id;
```

## Events

### All events with their data

The `state_changed` event is not stored in the `events` table: the `states` table already has that information. All other events are.

```sql
SELECT
  events.event_id,
  DATETIME(events.time_fired_ts, 'unixepoch', 'localtime') AS fired,
  event_types.event_type,
  event_data.shared_data
FROM events
LEFT JOIN event_types
  ON events.event_type_id = event_types.event_type_id
LEFT JOIN event_data ON events.data_id = event_data.data_id
ORDER BY events.time_fired_ts DESC
LIMIT 100;
```

### Events and state changes together

To see everything in order, combine both tables:

```sql
SELECT event_types.event_type, events.time_fired_ts AS fired_ts
FROM events
JOIN event_types ON events.event_type_id = event_types.event_type_id
UNION ALL
SELECT 'state_changed', states.last_updated_ts
FROM states
ORDER BY fired_ts;
```

## Context

Context ties together everything that happened because of one cause. The IDs are stored as binary values. Use `HEX()` to make them readable in SQLite, MariaDB, and MySQL. PostgreSQL shows them as they are.

### The context of state changes

```sql
SELECT
  states_meta.entity_id,
  states.state,
  HEX(states.context_id_bin) AS context_id,
  HEX(states.context_user_id_bin) AS user_id,
  HEX(states.context_parent_id_bin) AS parent_id
FROM states
JOIN states_meta ON states.metadata_id = states_meta.metadata_id;
```

### Everything with the same context

Pick a context ID from the previous query, and find all events and states that share it:

```sql
SELECT 'event', event_types.event_type, events.time_fired_ts
FROM events
JOIN event_types ON events.event_type_id = event_types.event_type_id
WHERE HEX(events.context_id_bin) = '0190A1B2C3D4E5F60718293A4B5C6D7E'
UNION ALL
SELECT 'state', states_meta.entity_id, states.last_updated_ts
FROM states
JOIN states_meta ON states.metadata_id = states_meta.metadata_id
WHERE HEX(states.context_id_bin) = '0190A1B2C3D4E5F60718293A4B5C6D7E';
```

## Statistics

The hourly averages of a sensor with long-term statistics:

```sql
SELECT
  DATETIME(statistics.start_ts, 'unixepoch', 'localtime') AS hour,
  statistics.mean,
  statistics.min,
  statistics.max
FROM statistics
JOIN statistics_meta ON statistics.metadata_id = statistics_meta.id
WHERE statistics_meta.statistic_id = 'sensor.living_room_temperature'
ORDER BY statistics.start_ts DESC
LIMIT 48;
```

For energy and other meters, use `state` and `sum` instead of `mean`, `min`, and `max`. See [Statistics](/data/reference/statistics/).
