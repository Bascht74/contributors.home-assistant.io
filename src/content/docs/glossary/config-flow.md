---
title: "Config flow"
description: "The steps in the UI that set up an integration and create a config entry."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "config flows"
  code:
    - "ConfigFlow"
    - "config_flow.py"
    - "async_step_user"
  related:
    - "config-entry"
    - "options-flow"
    - "reauthentication"
    - "reconfigure-flow"
    - "discovery"
  autolink:
    - "config flow"
    - "config flows"
---

A config flow asks the user for what it needs, like a host and a password, checks it, and creates a [config entry](/glossary/config-entry/). It sets a [unique ID](/glossary/unique-id/), so the same device can't be added twice.

A config flow can also start by itself, when a device is [discovered](/glossary/discovery/). The user then only confirms.

New integrations that connect to a device or service are set up with a config flow, not with YAML.
