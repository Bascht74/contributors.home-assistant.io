---
title: "Reauthentication"
description: "A flow that asks the user for new credentials when a config entry can no longer log in, without setting it up again."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "reauth"
  code:
    - "async_step_reauth"
    - "ConfigEntryAuthFailed"
  related:
    - "config-flow"
    - "config-entry"
  autolink:
    - "reauthentication"
    - "reauth"
---

When a password changes or a token expires, the integration raises `ConfigEntryAuthFailed`. Home Assistant then asks the user to log in again, and keeps everything else of the config entry as it is.
