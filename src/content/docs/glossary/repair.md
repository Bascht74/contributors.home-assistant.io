---
title: "Repair"
description: "A problem Home Assistant shows users under Repairs, with what to do about it, like configuration that will stop working."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "repairs"
    - "repair issue"
    - "issue registry"
  code:
    - "ir.async_create_issue"
    - "repairs.py"
  ui: "Repairs"
  related:
    - "deprecation"
    - "translation-key"
    - "diagnostics"
  autolink:
    - "repair issue"
    - "repair issues"
---

Integrations create repair issues in the issue registry, with a translated explanation. Some come with a flow that fixes the problem for the user.

Not to be confused with issues on GitHub.
