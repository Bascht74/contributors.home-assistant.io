---
title: Deprecating constants for Media Player
description: As of Home Assistant Core 2022.5, the feature flag constants used in MediaPlayerEntity were deprecated and replaced by the MediaPlayerEntityFeature enum.
date: 2024-09-23
authors:
  - G Johansson
areas:
  - core
---

As of Home Assistant Core 2022.5, the feature flag constants used in `MediaPlayerEntity` were deprecated and replaced by the `MediaPlayerEntityFeature` enum. Later, in 2022.10, the repeat mode, media type, and media class constants were deprecated and replaced by `RepeatMode`, `MediaType`, and `MediaClass`, respectively.

However, no proper deprecation was done, so now in 2024.10 we start the one-year deprecation period, and the constants will stop working from 2025.10, to ensure all custom integration authors have time to adjust.
