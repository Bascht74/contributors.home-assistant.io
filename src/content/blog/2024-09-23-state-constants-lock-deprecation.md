---
title: Deprecating state constants for lock
description: As of Home Assistant Core 2024.10, the constants used to return state in LockEntity are deprecated and replaced by the LockState enum.
date: 2024-09-23
authors:
  - G Johansson
areas:
  - core
---

As of Home Assistant Core 2024.10, the constants used to return state in `LockEntity` are deprecated and replaced by the `LockState` enum.

There is a one-year deprecation period, and the constants will stop working from 2025.10 to ensure all custom integration authors have time to adjust.

As the `state` property is not meant to be overwritten, in most cases this change will only affect other Entity properties or tests rather than the `state` property.
