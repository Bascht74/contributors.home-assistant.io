---
title: Getting data
description: How integrations get new data from devices and services, by push or by polling, and how a coordinator keeps that efficient.
order: 9
---

An integration has to know when something changes on a device: a light turned on with its own switch, the temperature went up. There are two ways to find out, and the difference matters a lot for how fast and how light an integration is.

This page is the overview. How to build it, with code, is in [Fetching data](/core/integrations/fetching-data/) in the Core and integrations area.

## In short

- **Push**: the device or service tells Home Assistant when something changes. Fast, and it costs nothing while nothing happens. Use it when the device supports it.
- **Polling**: Home Assistant asks for new data on an interval. Simple, but slower, and it puts load on the device and the network.
- A **coordinator** fetches data once for all entities of a device, and hands it to them. Most polling integrations use one.
- When fetching fails, the entities become [unavailable](/glossary/unavailable/). They never show made-up or stale values.

## Push or poll

With push, the integration keeps a connection open, or listens for messages, and writes the new state of an entity when something arrives. The [IoT class](/glossary/iot-class/) of a push integration is `local_push` or `cloud_push`.

When a device can only be asked, Home Assistant asks on a schedule. Polling every entity on its own is wasteful when they all come from the same device: a device with ten sensors would be asked ten times for the same data.

## The coordinator

A `DataUpdateCoordinator` fetches the data for a whole device or account, once per interval, and tells its entities when new data is in. The entities read from the coordinator, they don't fetch anything themselves. It also puts error handling in one place: when a fetch fails, all its entities become unavailable until the next success, and a login problem starts a [reauthentication](/glossary/reauthentication/) flow.

A coordinator works for push too: an integration that receives data can hand it to the coordinator, and the entities update the same way.

## Being a good neighbor

Polling as rarely as makes sense, limiting how many requests run at the same time, and logging an outage once instead of on every try are rules of the [integration quality scale](/glossary/quality-scale/). See [appropriate polling](/core/quality-scale/appropriate-polling/), [parallel updates](/core/quality-scale/parallel-updates/), and [log once when unavailable](/core/quality-scale/log-when-unavailable/).

## In the code

| What | Where |
| --- | --- |
| `DataUpdateCoordinator`, `CoordinatorEntity`, `UpdateFailed` | [`homeassistant/helpers/update_coordinator.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/helpers/update_coordinator.py) |
| Polling, `SCAN_INTERVAL`, `PARALLEL_UPDATES` | [`homeassistant/helpers/entity_platform.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/helpers/entity_platform.py) |

## Work on this

- New to Core? Start with [your first contribution to Core](/core/first-contribution/).
- [Fetching data](/core/integrations/fetching-data/): push, polling, and the coordinator, with code.
- [Updating state](/core/entities/state-updates/): how an entity writes its new state.
