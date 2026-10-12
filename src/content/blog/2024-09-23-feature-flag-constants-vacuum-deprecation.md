---
title: Deprecating feature flag constants for Vacuum
description: As of Home Assistant Core 2022.5, the feature flag constants used in StateVacuumEntity were deprecated and replaced by the VacuumEntityFeature enum.
date: 2024-09-23
authors:
  - G Johansson
areas:
  - core
---

As of Home Assistant Core 2022.5, the feature flag constants used in `StateVacuumEntity` were deprecated and replaced by the `VacuumEntityFeature` enum.

However, there was no proper deprecation done and therefore now in 2024.10 we start the one-year deprecation period. The constants will stop working from 2025.10, to ensure all custom integration authors have time to adjust.
