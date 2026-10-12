---
title: Deprecating state constants for cover
description: As of Home Assistant Core 2024.11, the constants used to return state in CoverEntity are deprecated and replaced by the CoverState enum.
date: 2024-10-08
authors:
  - G Johansson
areas:
  - core
---

As of Home Assistant Core 2024.11, the constants used to return state in `CoverEntity` are deprecated and replaced by the `CoverState` enum.

There is a one-year deprecation period, and the constants will stop working from 2025.11 to ensure all custom integration authors have time to adjust.

As the `state` property is not meant to be overwritten, in most cases this change will only affect other Entity properties or tests rather than the `state` property.

More details can be found in the [cover documentation](/core/entities/cover/#states).