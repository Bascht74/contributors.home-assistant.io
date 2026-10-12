---
title: History and statistics
description: How the recorder writes every state change to a database, and how history, the logbook, and long-term statistics read it back.
order: 11
---

Everything that happens in Home Assistant can be looked back on: when the door opened, how warm it was yesterday, how much energy the house used last month. The [recorder](/glossary/recorder/) makes that possible. It writes states and events to a database, and other integrations read them back.

## In short

- The recorder runs in its own thread, so writing to the database never holds up the [event loop](/core/internals/asyncio/).
- It stores every state change and event, and keeps them for 10 days by default.
- For sensors with a [state class](/glossary/state-class/), it also keeps statistics: five-minute summaries for as long as the history, and hourly summaries for good.
- History graphs, the logbook, and the energy dashboard all read from the recorder's database.

## The recorder

The recorder listens to every event on the event bus, and writes it to the database in batches, every 5 seconds. Its database is SQLite by default, a file called `home-assistant_v2.db` in the configuration folder. MariaDB, MySQL, and PostgreSQL are supported too, see [ADR-0018](https://github.com/home-assistant/architecture/blob/master/adr/0018-supported-databases.md).

States and their attributes are stored apart, and identical attributes are stored once. That keeps the database small, even though the same light reports the same attributes many times a day.

Every night, the recorder removes what is older than `purge_keep_days`, 10 days by default.

## Statistics

Ten days of history is not enough to compare this winter with the last one, and keeping every state change forever would fill the disk. Statistics solve that. For each sensor with a state class, the recorder compiles:

- **Short-term statistics**, every five minutes: the mean, minimum, and maximum, or the sum for meters. They are cleaned up with the history.
- **Long-term statistics**, every hour, kept forever.

A sensor without a state class gets no statistics at all. That is why the state class matters so much for sensors, and why the energy dashboard only works with sensors that have one.

## Who reads it

| Integration | What it shows |
| --- | --- |
| `history` | States over time, for graphs |
| `logbook` | What happened, in words: "Front door opened" |
| `energy` | Energy use and production, from long-term statistics |

## What not to record

Not everything belongs in the database. Attributes that change all the time, or are large, like a list of all supported effects, make the database grow fast. An entity can leave attributes out with `_unrecorded_attributes`, and entity types do the same for attributes that never change.

Users can exclude whole entities in their configuration.

## In the code

| What | Where |
| --- | --- |
| The recorder | [`homeassistant/components/recorder/`](https://github.com/home-assistant/core/tree/dev/homeassistant/components/recorder) |
| The database tables | `db_schema.py` in the recorder |
| Compiling statistics | `statistics.py` in the recorder |
| History and logbook | [`homeassistant/components/history/`](https://github.com/home-assistant/core/tree/dev/homeassistant/components/history), [`homeassistant/components/logbook/`](https://github.com/home-assistant/core/tree/dev/homeassistant/components/logbook) |

## Work on this

- New to Core? Start with [your first contribution to Core](/core/first-contribution/).
- [Sensor entity](/core/entities/sensor/): the state class, which decides whether a sensor gets statistics.
- Want to look at the data of your own home? [Explore your own data](/data/guides/explore-your-data/) in the Data area.
