---
title: Reconfiguration support for webhook helper
description: Integrations that use the webhook config flow helper (homeassistant.helpers.config_entry_flow.register_webhook_flow) now support reconfiguration.
date: 2026-02-18
authors:
  - tr4nt0r
areas:
  - core
---

Integrations that use the webhook config flow helper (`homeassistant.helpers.config_entry_flow.register_webhook_flow`) now support reconfiguration. This allows the integration to retrieve the webhook again, or obtain an updated webhook when the Home Assistant instance URL changes.

Custom integrations using the webhook config flow helper must add translation strings for the reconfiguration flow.

**Example translation strings for a reconfiguration flow:**

```json
{
  "config": {
    "abort": {
      "reconfigure_successful": "**Reconfiguration was successful**\n\nIn Sleep as Android go to *Settings → Services → Automation → Webhooks* and update the webhook with the following URL:\n\n`{webhook_url}`"
    },
    "step": {
      "reconfigure": {
        "description": "Are you sure you want to re-configure the Sleep as Android integration?",
        "title": "Reconfigure Sleep as Android"
      }
    }
  }
}
```

For more details, see [core PR #151729](https://github.com/home-assistant/core/pull/151729).
