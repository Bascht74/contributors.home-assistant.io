---
title: Deprecating unit conversion utilities
description: "As of Home Assistant Core 2022.10, the following utilities are deprecated:"
date: 2022-09-28
authors:
  - epenet
areas:
  - core
---

As of Home Assistant Core 2022.10, the following utilities are deprecated:

  - `homeassistant/util/distance`
  - `homeassistant/util/pressure`
  - `homeassistant/util/speed`
  - `homeassistant/util/temperature`
  - `homeassistant/util/volume`

Please use the corresponding static classes from `homeassistant/util/unit_conversion`:

  - `DistanceConverter`
  - `PressureConverter`
  - `SpeedConverter`
  - `TemperatureConverter`
  - `VolumeConverter`
