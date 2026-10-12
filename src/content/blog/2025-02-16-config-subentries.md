---
title: Support for config subentries
description: Config entries now have a new data type called “config subentry”. Config subentries are owned by a config entry and set up as part of async_setup_entry.
date: 2025-02-16
authors:
  - Erik Montnémery
areas:
  - core
---

Config entries now have a new data type called “config subentry”. [Config subentries](/core/integrations/subentries/) are owned by a config entry and set up as part of `async_setup_entry`. Config subentries are created by [config subentry flows](/core/integrations/subentries/) and updated by config subentry reconfigure flows. This works similarly to how we create/edit config entries.

This makes it easier for integration authors to allow users to add, modify and remove pieces of configuration which share some common resource, for example a cloud account or an MQTT broker.

The [architecture discussion](https://github.com/home-assistant/architecture/discussions/1070) gives more background.
