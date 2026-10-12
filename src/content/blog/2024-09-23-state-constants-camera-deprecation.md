---
title: Deprecating state constants for camera
description: As of Home Assistant Core 2024.10, the constants used to return state in Camera are deprecated and replaced by the CameraState enum.
date: 2024-09-23
authors:
  - G Johansson
areas:
  - core
---

As of Home Assistant Core 2024.10, the constants used to return state in `Camera` are deprecated and replaced by the `CameraState` enum.

There is a one-year deprecation period, and the constants will stop working from 2025.10 to ensure all custom integration authors have time to adjust.

As the `state` property is not meant to be overwritten, in most cases this change will only affect other Entity properties or tests.
