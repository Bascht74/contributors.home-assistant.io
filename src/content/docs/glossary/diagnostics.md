---
title: "Diagnostics"
description: "A download with the data and state of a config entry or device, that users attach to an issue to help debug it."
sidebarGroup: "Core and integrations"
term:
  code:
    - "diagnostics.py"
    - "async_redact_data"
  ui: "Download diagnostics"
  related:
    - "platform"
    - "config-entry"
    - "repair"
---

Integrations provide diagnostics with a `diagnostics.py` platform. Passwords, tokens, locations, and other private data must be removed from it, with `async_redact_data`.
