---
title: "Config entry"
description: "One set-up instance of an integration, like one Hue bridge, with the configuration Home Assistant stores for it."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "config entries"
    - "entry"
  code:
    - "ConfigEntry"
    - "async_setup_entry"
    - "entry.runtime_data"
  ui: "Integration entry"
  related:
    - "config-flow"
    - "config-subentry"
    - "options-flow"
    - "integration"
    - "unique-id"
  autolink:
    - "config entry"
    - "config entries"
---

When a user adds an integration in the UI, the [config flow](/glossary/config-flow/) creates a config entry. Adding a second bridge creates a second config entry of the same integration.

A config entry can be disabled, reloaded, and removed on its own. The code that sets it up is `async_setup_entry`, and anything the integration needs while running, like an API client, goes in `entry.runtime_data`.
