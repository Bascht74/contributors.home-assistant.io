---
title: Media player toggle action changed
description: The implementation of the toggle action service has been adjusted in the media player base class.
date: 2025-03-14
authors:
  - Erik Montnémery
areas:
  - core
---

The implementation of the toggle action service has been adjusted in the media player base class.
The media player will now be turned on if it is in the states `off` or `standby`; in all other states, it will be turned off.

Before this change, the media player would also be turned on if it was in state `idle`. This was not in line with the meaning of the `idle` state, as it is counted as [a state where the device is already turned on](/core/entities/media-player/#states).

Custom integrations which have overridden the `async_toggle` may need to update their implementations.

The change is introduced in the [home assistant core PR #78192](https://github.com/home-assistant/core/pull/78192).
