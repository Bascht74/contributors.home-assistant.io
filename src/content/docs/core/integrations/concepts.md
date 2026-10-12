---
title: How an integration fits in
description: The handful of ideas every integration is built from, in plain language, with links to the pages that go deeper.
sidebarLabel: How an integration fits in
sidebarGroup: Getting started
order: 1
---

Before you write an integration, it helps to know the words. There are only a handful, and every integration uses them the same way. This page explains each one in a few sentences and links to the page that goes deeper. Read it once, then build something in the [tutorial](/core/integrations/tutorial/).

## The picture

Say you have an air quality monitor on your network. To get it into Home Assistant:

1. A Python **library** knows how to talk to the monitor.
2. Your **integration** uses that library, and is set up from the UI with a **config flow**.
3. The config flow creates a **config entry**: one monitor, with its address.
4. For that config entry, a **coordinator** asks the monitor for new data every minute.
5. A **platform**, like `sensor`, turns that data into **entities**: a temperature sensor, a humidity sensor.
6. The entities belong to a **device**: the monitor itself.

All of it runs on one **event loop**, and all of it reaches the rest of Home Assistant through one object: **`hass`**.

## Integration

An [integration](/glossary/integration/) is a folder of Python code that connects Home Assistant to a device, a service, or an idea. Integrations that ship with Home Assistant live in `homeassistant/components/<domain>/` in the [core repository](https://github.com/home-assistant/core), and their tests in `tests/components/<domain>/`.

The [domain](/glossary/domain/) is the short, unique name of the integration, like `hue` or `airgradient`. It is the name of the folder, it can never change, and it shows up in the names of the integration's actions.

Every integration has a `manifest.json` that describes it: its name, its integration owners, the library it needs, and how it can be discovered. See [the manifest](/core/integrations/manifest/) and [file structure](/core/integrations/file-structure/).

## Library

An integration never talks to a device or service directly. All protocol code, like HTTP requests or parsing packets, lives in a separate Python library on PyPI. The integration only translates between that library and Home Assistant. That keeps integrations small and easy to review, and lets others use the library too. See [build a Python library](/core/integrations/api-library/).

## Config flow and config entry

A [config flow](/glossary/config-flow/) is the dialog users go through when they add your integration under **Settings** > **Devices & services**. It asks for what is needed, like a host name, tests the connection, and then creates a config entry.

A [config entry](/glossary/config-entry/) is one set up instance of your integration: one monitor, one account, one hub. It stores what the config flow collected. Home Assistant calls `async_setup_entry` in your `__init__.py` for every config entry, at startup and when a user adds a new one. While it runs, your integration keeps what it needs, like the API client, in `entry.runtime_data`.

See [config flow](/core/integrations/config-flow/) and [config entries](/core/integrations/config-entries/).

## Platform and entity

An [entity](/glossary/entity/) is one thing Home Assistant can show, measure, or control: a temperature sensor, a light, a switch. Every entity has a state, like `21.5` or `on`, and users build their dashboards and automations on entities.

A [platform](/glossary/platform/) is how your integration provides one type of entity. To provide sensors, you add `sensor.py`. To provide lights, you add `light.py`. Each platform file has its own `async_setup_entry` that creates the entities. Your integration forwards its config entry to the platforms it supports.

Each entity needs a [unique ID](/glossary/unique-id/) that never changes. That ID puts it in the entity registry, which is what lets users rename it, move it to an area, or disable it.

See [entities and platforms](/core/entities/) and [the entity class](/core/entities/entity-class/).

## Device

A [device](/glossary/device/) is the physical thing, or the service, that entities belong to. The air quality monitor is one device with several entities. Your entities describe their device with a `DeviceInfo`, and Home Assistant puts it in the device registry. Users see it as a device page with all its entities. See [device registry](/core/integrations/device-registry/).

## Coordinator

Most devices return all their data in one request. A [coordinator](/glossary/coordinator/) (the `DataUpdateCoordinator` class) fetches that data once, on a schedule, and hands it to all entities. It also handles errors: when an update fails, it marks the entities unavailable and tries again later. See [fetching data](/core/integrations/fetching-data/).

## The event loop and async

Home Assistant runs on Python's `asyncio`. Almost everything happens in one thread, the [event loop](/glossary/event-loop/), and only one piece of code runs there at a time. That is fast and simple, as long as nobody blocks it: when your code waits for the network without `await`, everything in Home Assistant waits with it.

Two things follow from that:

- Use an async library, and `await` its calls. A blocking call goes to a thread with `hass.async_add_executor_job`.
- A function whose name starts with `async_`, like `async_setup_entry` or `async_add_entities`, must run in the event loop. That is a naming convention in core, so you can tell from the name where a function belongs.

See [async in Home Assistant](/core/internals/asyncio/).

## The hass object

Every setup function gets `hass`, the running Home Assistant instance. Everything your integration does with the rest of the system goes through it: `hass.states` holds the state of every entity, `hass.bus` carries events, `hass.services` holds the actions, and `hass.config_entries` manages config entries. Inside an entity or a flow, it is `self.hass`. See [the hass object](/core/internals/hass/).

## Next steps

- Build a small integration from start to finish in the [tutorial](/core/integrations/tutorial/).
- Want to fix something in an existing integration instead? Start with [your first contribution](/core/first-contribution/).
