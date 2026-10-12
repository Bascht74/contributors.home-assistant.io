---
title: Deprecate invalid use of sensor unit of measurement and state class
description: Since Home Assistant Core 2022.12, a warning is issued in the logs if a sensor entity that has a device class uses unit of measurement and state class incorrectly, taking their device class into account.
date: 2024-01-17
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

Since Home Assistant Core 2022.12, a warning is issued in the logs if a sensor entity that has a device class 
uses unit of measurement and state class incorrectly, taking their device class into account.

An invalid use would be a sensor entity that has a device class of `SensorDeviceClass.TEMPERATURE` but uses 
the unit of measurement `%` instead of `°C` or `°F`; or the state class `SensorStateClass.TOTAL` 
instead of `SensorStateClass.MEASUREMENT`.

There will be a six-month deprecation period to ensure all custom integration authors have time to adjust.
As of Home Assistant Core 2024.8, the warning will then be replaced by an exception.