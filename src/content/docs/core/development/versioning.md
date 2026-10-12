---
title: Versioning
description: How Home Assistant Core versions are built up, from stable releases to betas, nightlies, and development versions.
sidebarGroup: Changing behavior
order: 2
---

Home Assistant Core uses [calendar versioning](https://calver.org/). A version has three parts:

```text
YYYY.MM.PATCH
```

| Part | Meaning |
| --- | --- |
| `YYYY` | The year of the release, like `2026`. |
| `MM` | The month of the release, without a leading zero: `5`, not `05`. |
| `PATCH` | The patch release within that month, starting at `0`. |

So `2026.5.0` is the release of May 2026, and `2026.5.1` and `2026.5.2` are its patch releases. For the release schedule and the release channels, see the [release FAQ](https://www.home-assistant.io/faq/release/).

## Betas, nightlies, and development versions

Versions follow [PEP 440](https://peps.python.org/pep-0440/), so the patch part can carry a suffix for builds that are not stable:

| Kind | Format | Example |
| --- | --- | --- |
| Stable release | `YYYY.MM.PATCH` | `2026.5.0` |
| Beta | `YYYY.MM.PATCH` + `b<N>` | `2026.5.0b0` |
| Nightly | `YYYY.MM.PATCH` + `.dev<YYYYMMDDHHMM>` | `2026.7.0.dev202607241254` |
| Development | `YYYY.MM.PATCH` + `.dev<N>` | `2026.7.0.dev0` |

## Where the version lives

The version is set in [`homeassistant/const.py`](https://github.com/home-assistant/core/blob/dev/homeassistant/const.py), in the `MAJOR_VERSION`, `MINOR_VERSION`, and `PATCH_VERSION` constants. The `dev` branch always carries the next release as a development version, like `2026.7.0.dev0`.

The version does not come from tags or dates. It is bumped on purpose, with [`script/version_bump.py`](https://github.com/home-assistant/core/blob/dev/script/version_bump.py), which knows how to move to the next `minor`, `patch`, `dev`, `beta`, or `nightly` version. Cutting the first beta turns `2026.7.0.dev0` into `2026.7.0b0`, and the release drops the suffix: `2026.7.0`.

## Comparing versions

When your code needs to behave differently depending on the version of Home Assistant, compare versions with [AwesomeVersion](https://github.com/ludeeus/awesomeversion). Do not parse the string yourself: betas, development versions, and patch releases have to sort correctly, and that is easy to get wrong.
