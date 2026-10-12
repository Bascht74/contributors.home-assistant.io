---
title: New checks for config flow unique ID
description: Creating a config entry with a unique ID already present in the registry is deprecated, and will now log a warning.
date: 2025-03-01
authors:
  - epenet
areas:
  - core
---

### Summary of changes

Creating a config entry with a unique ID already present in the registry is deprecated, and will now log a warning.

### Details

When a config flow creates an entry with a colliding unique ID, the old entry is currently automatically removed and replaced with the new config entry.
This can lead to unexpected behavior, and integrations should be adjusted to instead abort the flow.

In case of manual flows, integrations should implement options, reauth, reconfigure to allow the user to change settings.
In case of non user visible flows, the integration should optionally update the existing entry before aborting.

More details can be found in the [config flow](/core/integrations/config-flow/#unique-ids) documentation.
