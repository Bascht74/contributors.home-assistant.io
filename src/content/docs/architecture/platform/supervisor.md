---
title: The Supervisor
description: The program that runs Home Assistant Core, apps, backups, and updates on Home Assistant OS, each in its own container.
order: 3
---

On Home Assistant OS, Home Assistant Core doesn't run by itself. The Supervisor runs it. The Supervisor starts Core, updates it, backs it up, and restores it. It also runs [apps](/apps/how-apps-work/), and a few helpers of its own.

Core, every app, every helper, and the Supervisor itself run as Docker containers.

## In short

- The Supervisor is a Python program, in the [home-assistant/supervisor](https://github.com/home-assistant/supervisor) repository.
- It runs Core, apps, and plugins as containers. How they are networked is in [what the Supervisor runs](/os/supervisor/#what-the-supervisor-runs).
- It has a REST API, at `http://supervisor`. Core, apps, and the command line use it.
- It makes backups, installs updates, and checks the system for problems.

## What runs on Home Assistant OS

Next to Core and the apps, the Supervisor runs a few plugins of its own: for DNS, audio, the `ha` command line, multicast discovery, and a status page that keeps working when everything else is down. [What the Supervisor runs](/os/supervisor/#what-the-supervisor-runs) lists every container, with its name and network.

## What it does

- **The Supervisor API**: Core, apps, and the `ha` command line talk to the Supervisor over a REST API at `http://supervisor`. What a caller may do depends on its role. See the [Supervisor API](/apps/supervisor-api/), and how Core uses it in [the connection with Core](/os/supervisor/core-connection/).
- **Ingress**: shows the web interface of an app inside Home Assistant, behind its login, without opening a port. See [ingress](/apps/guides/ingress/).
- **Backups and updates**: the Supervisor backs up Core, apps, and folders, and installs new versions from `version.home-assistant.io`. See [how the Supervisor works](/os/supervisor/architecture/).
- **Keeping the system healthy**: it checks the system all the time, and what it finds shows up as repair issues. See [the resolution center](/os/supervisor/resolution-center/).

## Go deeper

- [How the Supervisor works](/os/supervisor/architecture/): how it starts, jobs, and the code layout
- [Plugins](/os/supervisor/plugins/): the DNS, audio, CLI, multicast, and observer containers
- [Develop the Supervisor](/os/supervisor/development/): run and test your changes
- [How apps work](/apps/how-apps-work/): the Supervisor from an app's point of view

## Work on this

- Start with [your first contribution to the Supervisor](/os/first-contribution/). It runs a complete system on your own machine.
- Building an app instead? Head to [your first app](/apps/first-app/) in the Apps area.
