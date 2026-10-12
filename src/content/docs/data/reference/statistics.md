---
title: Statistics
description: How Home Assistant summarizes sensor data into 5-minute and hourly statistics, and how those are stored.
order: 4
---

The `states` table keeps every state change exactly as it happened, but only for a limited time: 10 days by default. To keep history for longer, Home Assistant also compiles [statistics](/glossary/statistics/): summaries of sensor values per time period. Those power the energy dashboard, the statistic graph card, and the long-term history graphs. The user documentation explains them in [Long-term statistics](https://www.home-assistant.io/docs/configuration/long-term-statistics/).

## Short-term and long-term

- **Short-term statistics** are compiled every 5 minutes, from the states of that period. They are purged together with the states.
- **Long-term statistics** are compiled every hour, from the short-term statistics of that hour. They are never purged. With 24 rows per sensor per day, they stay small enough to keep forever.

## Which entities get statistics

Statistics are kept for sensors with a [state class](/glossary/state-class/). What is stored depends on that class:

| State class | Example | Stored per period |
| --- | --- | --- |
| `measurement` | A temperature, or the current power use. | `mean`, `min`, and `max`. |
| `measurement_angle` | A wind direction. | A circular `mean`, so 350 and 10 degrees average to 0, not 180. |
| `total` or `total_increasing` | An energy meter, or a water meter. | `state`, `sum`, and `last_reset_ts`. |

For meters:

- `state` is the value of the sensor at the end of the period.
- `sum` is the running total since statistics were first compiled for this sensor. The difference between the `sum` of two periods is how much was used in between, even when the meter was reset in the meantime.
- `last_reset_ts` is when the meter last started a new cycle, if known.

How an integration enables statistics for its sensors is explained in [Sensor entities](/core/entities/sensor/#long-term-statistics).

Statistics can also be imported from outside sources, like the history of an energy provider. Those use a `:` instead of a `.` in their ID, like `energy_provider:electricity_import`.

## The tables

### `statistics_meta`

One row per statistic, describing what it is.

| Column | Type | What it is |
| --- | --- | --- |
| `id` | Integer, primary key | The ID used by the data tables. |
| `statistic_id` | String | For entities, the entity ID. For imported statistics, an ID like `domain:name`. Renaming an entity updates it. |
| `source` | String | Where it comes from: `recorder` for entities, or the domain of the integration that imported it. |
| `unit_of_measurement` | String | The unit of the statistic. |
| `unit_class` | String | The kind of unit, like `energy` or `temperature`, used to convert between units. |
| `mean_type` | Integer | `0` for no mean, `1` for a normal mean, `2` for a circular mean. |
| `has_sum` | Boolean | Whether the statistic has a `sum`. |
| `name` | String | A name, mostly for imported statistics. |

There is also a `has_mean` column, which is being replaced by `mean_type`.

### `statistics` and `statistics_short_term`

Both tables have the same columns. `statistics` holds one row per hour, `statistics_short_term` one per 5 minutes.

| Column | Type | What it is |
| --- | --- | --- |
| `id` | Integer, primary key | The ID of this row. |
| `metadata_id` | Integer, refers to `statistics_meta` | Which statistic. |
| `start_ts` | Timestamp | The start of the period. |
| `created_ts` | Timestamp | When the row was written. |
| `mean` | Number | The time-weighted average over the period. |
| `mean_weight` | Number | The weight used to combine circular means. |
| `min` | Number | The lowest value in the period. |
| `max` | Number | The highest value in the period. |
| `state` | Number | For meters: the value at the end of the period. |
| `sum` | Number | For meters: the running total. |
| `last_reset_ts` | Timestamp | For meters: when the last cycle started. |

Each table has an index on `metadata_id` with `start_ts`.

### `statistics_runs`

Keeps track of which periods statistics have already been compiled for, so nothing is compiled twice, and missed periods are caught up after a restart.

| Column | Type | What it is |
| --- | --- | --- |
| `run_id` | Integer, primary key | The ID of this row. |
| `start` | Date and time | The start of the compiled period. |

## Where you see statistics

- The [history](https://www.home-assistant.io/integrations/history/) panel, for periods older than the states that are kept.
- The [statistic graph card](https://www.home-assistant.io/dashboards/statistics-graph/) and the [statistic card](https://www.home-assistant.io/dashboards/statistic/).
- The [energy dashboard](https://www.home-assistant.io/docs/energy/).
- The `recorder.get_statistics` action, to use them in scripts and automations.
