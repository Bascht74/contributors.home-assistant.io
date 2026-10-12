---
title: Calendar Data Model improvements and deprecations
description: As of Home Assistant Core 2022.5, CalendarDeviceEntity is deprecated and superseded by CalendarEntity.
date: 2022-04-18
authors:
  - Allen Porter
areas:
  - core
---

As of Home Assistant Core 2022.5, `CalendarDeviceEntity` is deprecated and superseded by `CalendarEntity`. The new entity has a more well defined data model, and a streamlined websocket API. `CalendarDeviceEntity` will be removed in a future Home Assistant release and custom components are required to migrate to the new APIs. See the new [Calendar Entity](/core/entities/calendar/) developer documentation for details. 

