---
title: Around Core
description: The software that runs next to Home Assistant Core, or talks to it from elsewhere, and how it all fits together.
order: 40
---

Home Assistant Core is the heart, but it doesn't do everything alone. On Home Assistant OS, the Supervisor runs it, updates it, and backs it up, next to apps that add more software. Companion apps bring Home Assistant to phones, watches, and cars. Home Assistant Link makes it reachable from anywhere, and voice runs from a satellite in the kitchen to a speech engine somewhere else.

## How Home Assistant runs

There are two supported ways to run Home Assistant, see [installation types](/os/installation-types/):

- **Home Assistant OS**: an operating system made for Home Assistant. The [Supervisor](/architecture/platform/supervisor/) runs Core and [apps](/apps/how-apps-work/), each in its own container, and installs updates of everything, including the operating system itself. Recommended for almost everyone.
- **Home Assistant Container**: Core in a container, on a system the user manages. No Supervisor, and no apps.

Both run the same Core: the image Home Assistant OS uses is built on top of the same container image that Home Assistant Container runs. Almost everything you build works the same in both.

## The pieces

- [The Supervisor](/architecture/platform/supervisor/): what runs Core, apps, backups, and updates on Home Assistant OS.
- [Home Assistant OS](/os/operating-system/): the operating system, how it is built, and how it updates safely.
- [Apps](/apps/how-apps-work/): extra software next to Home Assistant, in containers.
- [Companion apps](/architecture/platform/companion-apps/): Home Assistant on Android and Apple devices.
- [Home Assistant Link](/architecture/platform/cloud/): remote access, voice assistants, and more, without opening up your home.
- [Voice](/architecture/platform/voice/): how a spoken sentence becomes an action.

## Work on this

- [Your first contribution to the Supervisor](/os/first-contribution/), or to the operating system.
- [Your first contribution](/apps/first-contribution/) in the Apps area: build an app, or help with the official ones.
- [Your first companion app contribution](/companion/first-contribution/): Android or Apple.
- Voice: write sentences for your language in [voice translations](/translate/voice/), or work on the [Assist pipelines](/core/internals/assist-pipelines/) in Core.
