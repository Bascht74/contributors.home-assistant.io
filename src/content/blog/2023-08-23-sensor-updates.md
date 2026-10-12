---
title: Numerical sensors are no longer allowed to set their state to NaN or inf
description: Numerical sensors are no longer allowed to set their state to Not a Number or to positive or negative infinity.
date: 2023-08-23
authors:
  - Erik Montnémery
areas:
  - core
---

Numerical sensors are no longer allowed to set their state to [Not a Number](https://en.wikipedia.org/wiki/NaN) or to positive or negative infinity.

The change was introduce in [core PR#98110](https://github.com/home-assistant/core/pull/98110)

For more details, refer to the [`sensor` documentation](/core/entities/sensor/).
