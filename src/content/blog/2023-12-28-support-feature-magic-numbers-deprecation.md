---
title: Deprecating all magic numbers for supported features
description: As of Home Assistant Core 2024.1, all usage of magic numbers for supported features is deprecated, and each entity platform has provided an EntityFeature enum to replace them.
date: 2023-12-28
authors:
  - J. Nick Koston
areas:
  - core
---

As of Home Assistant Core 2024.1, all usage of magic numbers for supported features is deprecated,
and each entity platform has provided an `EntityFeature` enum to replace them.

There will be a one-year deprecation period, and the magic numbers will stop working in 2025.1 to ensure all custom integration authors have time to adjust.

This applies to, the following platforms:

- **Alarm Control Panel**

  Use the new [`AlarmControlPanelEntityFeature`](/core/entities/alarm-control-panel/#supported-features) enum instead.

- **Camera**

  Use the new [`CameraEntityFeature`](/core/entities/camera/#supported-features) enum instead.

- **Cover**

  Use the new [`CoverEntityFeature`](/core/entities/cover/#supported-features) enum instead.

- **Climate**

  Use the new [`ClimateEntityFeature`](/core/entities/climate/#supported-features) enum instead.

- **Humidifier**

  Use the new [`HumidifierEntityFeature`](/core/entities/humidifier/#supported-features) enum instead.

- **Fan**

  Use the new [`FanEntityFeature`](/core/entities/fan/#supported-features) enum instead.

- **Light**

  Use the new [`LightEntityFeature`](/core/entities/light/#supported-features) enum instead.

- **Lock**

  Use the new [`LockEntityFeature`](/core/entities/lock/#supported-features) enum instead.

- **Media Player**

  Use the new [`MediaPlayerEntityFeature`](/core/entities/media-player/#supported-features) enum instead.

- **Remote**

  Use the new [`RemoteEntityFeature`](/core/entities/remote/#supported-features) enum instead.

- **Siren**

  Use the new [`SirenEntityFeature`](/core/entities/siren/#supported-features) enum instead.

- **Vacuum**

  Use the new [`VacuumEntityFeature`](/core/entities/vacuum/#supported-features) enum instead.

- **Water Heater**

  Use the new [`WaterHeaterEntityFeature`](/core/entities/water-heater/#supported-features) enum instead.