---
title: Cover intents deprecated
description: The intents HassCoverOpen and HassCoverClose have been deprecated as of Home Assistant 2023.02.
date: 2023-01-20
authors:
  - Paulus Schoutsen
areas:
  - core
---

The intents `HassCoverOpen` and `HassCoverClose` have been deprecated as of Home Assistant 2023.02. Instead, use the intents `HassTurnOn` and `HassTurnOff`. This was done because some languages do not differentiate between Open/On and Close/Off.
