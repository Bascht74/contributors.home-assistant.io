---
title: Supervisor
description: What the Supervisor does, what it runs, and how it relates to apps and the Supervisor API.
order: 4
sidebarGroups:
  - How it works
  - Guides
---

The [Supervisor](/glossary/supervisor/) is what lets users manage their whole system from Home Assistant. It is a Python program, in the [home-assistant/supervisor](https://github.com/home-assistant/supervisor) repository, that runs as a container on Home Assistant OS. Its jobs:

- Run Home Assistant Core, and update it. When an update fails to start, it rolls back.
- Install, run, and update [apps](/glossary/app/).
- Make and restore backups.
- Update Home Assistant OS, and itself.
- Run the plugins that provide DNS, audio, multicast, the command line, and a status page.
- Manage the host: network, hostname, disks, and time, through D-Bus and the OS Agent.
- Check the system for problems, and offer fixes.

## What the Supervisor runs

Everything the Supervisor runs is a Docker container. Most of them are on a private bridge network called `hassio`, `172.30.32.0/23`. Core and the multicast plugin use the host network instead, and so do apps that ask for it:

| Container | What it is | Address |
| --- | --- | --- |
| `hassio_supervisor` | The Supervisor | `172.30.32.2` |
| `homeassistant` | Home Assistant Core | Host network |
| `hassio_dns` | [DNS plugin](/os/supervisor/plugins/#dns) | `172.30.32.3` |
| `hassio_audio` | [Audio plugin](/os/supervisor/plugins/#audio) | `172.30.32.4` |
| `hassio_cli` | [CLI plugin](/os/supervisor/plugins/#cli) | `172.30.32.5` |
| `hassio_observer` | [Observer plugin](/os/supervisor/plugins/#observer) | `172.30.32.6` |
| `hassio_multicast` | [Multicast plugin](/os/supervisor/plugins/#multicast) | Host network |
| `app_<slug>` | An app | From `172.30.33.0/24`, or the host network |

The Supervisor container itself is started by `haos-supervisor.service` on the host, see [Home Assistant OS](/os/operating-system/#how-it-boots). Everything else is started by the Supervisor.

## Apps and the Supervisor API

The Supervisor has a REST API at `http://supervisor`, on the `hassio` network. Home Assistant Core uses it through the `hassio` integration, the `ha` command line uses it through the CLI plugin, and apps use it when they ask for access in their configuration. Each caller gets its own token, and a role that limits what it may do.

Apps are where most people meet the Supervisor. The Supervisor installs them from app repositories, builds or pulls their images, and runs them with the options, ports, and access their configuration asks for. Building apps, and the full Supervisor API reference, are documented in the [Apps](/apps/) area.

## Where to go next

- [Set up a development environment](/os/supervisor/development/) to run the Supervisor on your own machine.
- [Architecture](/os/supervisor/architecture/) explains how the code is organized.
- [Jobs](/os/supervisor/jobs/) and the [resolution center](/os/supervisor/resolution-center/) are the two mechanisms most changes touch.
