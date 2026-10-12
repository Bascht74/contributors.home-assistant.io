---
title: Forwarding setup to config entry platforms
description: Calling hass.config_entries.async_forward_entry_setup is deprecated and will be removed in Home Assistant 2025.6.
date: 2024-06-12
authors:
  - J. Nick Koston
areas:
  - core
---

Calling `hass.config_entries.async_forward_entry_setup` is deprecated and will be removed in Home Assistant 2025.6. Instead, await `hass.config_entries.async_forward_entry_setups` as it can load multiple platforms at once and is more efficient since it does not require a separate import executor job for each platform.

`hass.config_entries.async_forward_entry_setups` must always be awaited if it's called while the config entry is being set up to ensure that it finishes before the config entry setup is complete. For more details, review [this blog post](/blog/2022/07/08/config_entry_forwards).
