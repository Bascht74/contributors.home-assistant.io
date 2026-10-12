---
title: Supervisor architecture
description: How the Supervisor code is organized, how it starts, and how updates and backups work inside it.
sidebarLabel: Architecture
sidebarGroup: How it works
order: 1
---

The Supervisor is one async Python process, built on asyncio and aiohttp. It talks to Docker through its API, to the host through D-Bus, and to everything else over HTTP. This page is a map of the code, so you know where to look.

## CoreSys: one object to reach everything

Every manager in the Supervisor hangs off one object, `CoreSys` in `supervisor/coresys.py`. Classes that need it inherit from `CoreSysAttributes`, and reach the other parts through `sys_*` properties:

```python
from ..coresys import CoreSys, CoreSysAttributes


class Example(CoreSysAttributes):
    """Do something with the system."""

    def __init__(self, coresys: CoreSys) -> None:
        """Initialize the example."""
        self.coresys = coresys

    async def check(self) -> bool:
        """Check if Core needs an update."""
        return self.sys_homeassistant.need_update
```

Some of the managers you will use most:

| Property | What it manages | Code |
| --- | --- | --- |
| `sys_homeassistant` | Home Assistant Core | `supervisor/homeassistant/` |
| `sys_apps` | Installed apps | `supervisor/apps/` |
| `sys_store` | App repositories | `supervisor/store/` |
| `sys_backups` | Backups and restores | `supervisor/backups/` |
| `sys_plugins` | The plugins | `supervisor/plugins/` |
| `sys_os` | Home Assistant OS, its updates and data disk | `supervisor/os/` |
| `sys_host` | Network, services, logs, and hardware info of the host | `supervisor/host/` |
| `sys_dbus` | D-Bus clients for systemd, NetworkManager, RAUC, the OS Agent | `supervisor/dbus/` |
| `sys_docker` | Docker containers, images, and the `hassio` network | `supervisor/docker/` |
| `sys_updater` | Available versions | `supervisor/updater.py` |
| `sys_jobs` | Running jobs | `supervisor/jobs/` |
| `sys_resolution` | Issues, suggestions, and system health | `supervisor/resolution/` |
| `sys_api` | The REST API | `supervisor/api/` |

Use these instead of reaching for Docker or D-Bus libraries directly. All I/O is async: run blocking calls with `self.sys_run_in_executor()`.

## How it starts

The Supervisor moves through states, defined as `CoreState` in `supervisor/const.py`:

1. **initialize**: create `CoreSys` and every manager.
2. **setup**: load configuration, connect to D-Bus and Docker, and evaluate the system.
3. **startup**: update itself if a newer version is available and auto update is on, start the plugins, then Core and the apps by their startup stage.
4. **running**: everything is up. Scheduled tasks and health checks run.
5. **freeze**, **shutdown**, **stopping**, **close**: during a backup that freezes the system, and on the way down.

Many checks and jobs only run in certain states. That is why a job condition like `running` exists.

During startup, the Supervisor also marks the booted OS slot as good. Until it does, the bootloader considers an OS update unconfirmed. See [the update system](/os/operating-system/update-system/).

## Scheduled tasks

`supervisor/misc/tasks.py` registers the recurring work: checking for updates of apps and plugins, reloading the app store and backups, and watchdogs that restart Core, apps, or the observer when they stop responding. The resolution center adds its hourly health check. See [the resolution center](/os/supervisor/resolution-center/).

## Updates

The Supervisor reads the available versions from `version.home-assistant.io/<channel>.json`, maintained in the [home-assistant/version](https://github.com/home-assistant/version) repository. The channel is `stable`, `beta`, or `dev`, and users can change it with `ha supervisor options --channel`.

- **The Supervisor** updates itself automatically by default. When the version it runs is older than the latest, it pulls the new image and restarts.
- **Plugins** update automatically.
- **Home Assistant Core**, **apps**, and **Home Assistant OS** update when the user asks for it, or when they turned on automatic updates for an app.

A Core update can make a partial backup first. After the update, the Supervisor checks that Core starts. If it doesn't, the Supervisor rolls back to the previous version, writes the log of the failed start to `home-assistant-rollback.log` in the configuration folder, and raises an `update_rollback` issue.

## Backups

A backup is an uncompressed tar file with a `backup.json` describing it, and one inner archive per part: Home Assistant Core and its configuration, each app, each folder (`share`, `ssl`, `media`, and local apps), and the Supervisor's own configuration. With a password, the inner archives are encrypted with [SecureTar](https://github.com/home-assistant-libs/securetar).

A full backup has every part, a partial backup the parts that were picked. Backups go to `/backup` on the data partition by default, or to a network storage mount. Home Assistant Core's `backup` integration builds on top of this, and handles uploading backups to other places.

Apps can say how they want to be backed up: stopped, or while running, with pre and post commands. While a backup runs, the Supervisor can freeze Core so its database is in a consistent state.

## The API

`supervisor/api/` has one module per area, like `backups.py` or `network.py`. Routes are registered in `supervisor/api/__init__.py`. Handlers use the `@api_process` decorator, which turns Supervisor errors into proper error responses, and validate input with `api_validate()`. The middleware in `supervisor/api/middleware/` checks the token and the role of every caller. Every endpoint, with its payload and response, is documented in the [Supervisor API](/apps/supervisor-api/) reference.

When you change the API, the [ha CLI](https://github.com/home-assistant/cli) and the [Python client library](https://github.com/home-assistant-libs/python-supervisor-client) often need a matching change. The pull request template of the Supervisor asks about both.
