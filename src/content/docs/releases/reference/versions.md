---
title: Versions and channels
description: What a Home Assistant version number means, and the stable, beta, and dev channels.
order: 1
---

Home Assistant uses calendar versioning: the version tells you when a release came out.

## Version numbers

A version has three parts: the year, the month, and the patch number. `2026.11.0` is the release of November 2026, and `2026.11.1` its first patch release. A beta adds `b` and a number, like `2026.11.0b0`. Nightly and development builds add `.dev`.

The version format is defined and kept by Home Assistant Core. [Versioning](/core/development/versioning/) has the full format, every kind of version with examples, and how the version is set in the code.

## Channels

Installations with the Supervisor, like Home Assistant OS, get their updates through a channel. Each channel is a different balance between new and stable.

| Channel | You get | For |
| --- | --- | --- |
| Stable | Releases and patch releases | Everyone. This is the default. |
| Beta | Betas during the beta week, and all stable releases | People who want to help test the next release. |
| Dev | Nightly builds of the development branch | Developers and people who test the newest code, and accept that it breaks. |

You switch between stable and beta in **Settings** > **System** > **Updates**. See [Your first contribution](/releases/first-contribution/).

Home Assistant Container uses image tags instead: `stable` (also `latest`), `beta`, and `dev`, next to a tag for every version.

## Where the versions come from

Installations find out about new versions from [version.home-assistant.io](https://version.home-assistant.io/stable.json). It publishes one file per channel, with the current version of Home Assistant, the Supervisor, Home Assistant OS, and the other parts for every type of hardware. The files are maintained in the [version repository](https://github.com/home-assistant/version).

You do not have to touch them. When a release is published, the build workflow of core builds the images, runs end-to-end tests, and then updates the version files of the channel. A stable release is also pushed to the beta channel, so beta testers get it too.

## The branches

| Repository | Development | Beta and patch releases | Released |
| --- | --- | --- | --- |
| core | `dev` | `rc` | `master` |
| frontend | `dev` | `rc` | `master` |
| home-assistant.io | `next` | `rc` | `current` |

Contributors open pull requests against `dev` in core and in the frontend. In home-assistant.io, fixes to existing documentation go to `current`, and documentation for something new goes to `next`.

## Websites per channel

- [www.home-assistant.io](https://www.home-assistant.io/): documentation of the current release.
- [rc.home-assistant.io](https://rc.home-assistant.io/): documentation and release notes of the beta.
- [next.home-assistant.io](https://next.home-assistant.io/): documentation of what is being built for the next release.
