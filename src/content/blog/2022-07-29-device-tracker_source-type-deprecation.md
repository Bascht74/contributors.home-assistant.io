---
title: Device tracker deprecations for 2022.9
description: For Home Assistant Core 2022.9, we have deprecated the device_tracker SOURCE_TYPE_* constants.
date: 2022-07-29
authors:
  - Marc Mueller
areas:
  - core
---

For Home Assistant Core 2022.9, we have deprecated the `device_tracker`
`SOURCE_TYPE_*` constants.
Use the new [`SourceType`](/core/entities/device-tracker/) enum instead.

Deprecated constants:

- `SOURCE_TYPE_GPS`
- `SOURCE_TYPE_ROUTER`
- `SOURCE_TYPE_BLUETOOTH`
- `SOURCE_TYPE_BLUETOOTH_LE`
