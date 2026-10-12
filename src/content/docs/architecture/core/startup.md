---
title: From start to running
description: What Home Assistant Core does between the moment it starts and the moment your home is ready, and how it shuts down again.
order: 2
---

When Home Assistant starts, it doesn't load everything at once. It loads in stages, so the most important parts are ready first, and a broken integration can't stop the rest of the house from starting.

Knowing these stages helps when you wonder why your integration has to wait for something, or why startup takes as long as it does.

## In short

1. Python starts, and Home Assistant creates its [event loop](/core/internals/asyncio/).
2. Logging, the configuration, and the registries load.
3. Integrations set up in stages: first the basics like logging, the frontend, and the database, then discovery and the cloud, then everything else.
4. Home Assistant fires `homeassistant_start`, runs startup jobs, and is running. It fires `homeassistant_started`.

Shutting down runs the same way in reverse, in stages with time limits, so it always finishes.

## The steps, in detail

### Before anything loads

The `hass` command runs `homeassistant/__main__.py`. It checks the Python version and the operating system, makes sure the configuration folder exists, and takes a lock file, `.ha_run.lock`, so two copies can't run on the same configuration.

Then `runner.py` creates the asyncio event loop, with a pool of up to 64 worker threads for blocking work, and hands over to `bootstrap.py`.

### Bootstrap

`bootstrap.py` sets up the parts everything else needs:

1. **Logging**, to `home-assistant.log` in the configuration folder.
2. **The configuration**: `configuration.yaml` is read, with its secrets and packages.
3. **The base**: the registries (areas, devices, entities, floors, labels, categories, and issues), restored states, and config entries load in parallel.
4. **Core integrations**: `homeassistant` itself and `persistent_notification`.

From here on, Home Assistant also watches for code that blocks the event loop.

### Integrations, in stages

Which integrations load is the sum of three things: everything in `configuration.yaml`, every integration with a [config entry](/glossary/config-entry/), and a set of default integrations, like the frontend, automations, scripts, and the helpers. On Home Assistant OS, the `hassio` integration joins in.

They load in three stages:

| Stage | What loads | Time limit |
| --- | --- | --- |
| 0 | Logging, the frontend, the recorder, and zeroconf, in that order | Mostly none: a database migration must not be interrupted |
| 1 | Discovery (Bluetooth, DHCP, SSDP, USB), the cloud, and the Supervisor | 120 seconds |
| 2 | Everything else | 300 seconds |

Within a stage, integrations set up in parallel, after the integrations they depend on. When a stage runs out of time, Home Assistant logs which integrations are still busy, and moves on. A slow integration makes startup slow, but doesn't stop it.

### Running

When the stages are done, Home Assistant:

1. Changes its state to starting, and fires `homeassistant_start`.
2. Runs the startup jobs that integrations registered.
3. Changes its state to running, and fires `homeassistant_started`.

Integrations that need everything else to be ready, like one that looks at all entities, wait for `homeassistant_started`. The helpers `async_at_start` and `async_at_started` run code at the right moment, also when the integration loads after startup.

### Recovery mode

When the configuration can't be read, the core integrations can't set up, or the frontend can't load, Home Assistant starts in recovery mode. Only the frontend, backups, and the cloud load, so the user can still get in and fix things.

## Shutting down

Shutdown runs in four stages, each with a time limit, so a stuck integration can't keep the house from restarting:

| Stage | What happens | Time limit |
| --- | --- | --- |
| 1 | Shutdown jobs that integrations registered | 20 seconds |
| 2 | Background tasks are cancelled, `homeassistant_stop` fires, and integrations close their connections | 100 seconds |
| 3 | `homeassistant_final_write` fires: the last chance to save data, like the recorder does | 60 seconds |
| 4 | `homeassistant_close` fires, and what is left is cancelled | 30 seconds |

## The states of Home Assistant

`hass.state` tells where Home Assistant is: `not_running`, `starting`, `running`, `stopping`, `final_write`, or `stopped`. Code can also check `hass.is_running` and `hass.is_stopping`.

## In the code

| What | Where |
| --- | --- |
| The command and its options | [`homeassistant/__main__.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/__main__.py) |
| The event loop and worker threads | [`homeassistant/runner.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/runner.py) |
| Stages, default integrations, time limits | [`homeassistant/bootstrap.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/bootstrap.py) |
| Starting and stopping, `CoreState` | [`homeassistant/core.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/core.py) |
| `async_at_start`, `async_at_started` | [`homeassistant/helpers/start.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/helpers/start.py) |

## Work on this

- New to Core? Start with [your first contribution to Core](/core/first-contribution/).
- [Setup failures and exceptions](/core/integrations/setup-failures/): what your integration does when it can't set up yet.
- [Blocking operations](/core/internals/blocking-operations/): what the event loop watchdog looks for.
