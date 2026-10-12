---
title: "Requirement"
description: "A Python package from PyPI that an integration needs, listed with a pinned version in its manifest."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "requirements"
    - "dependency"
  code:
    - "\"requirements\" in manifest.json"
  related:
    - "manifest"
    - "integration"
---

Code that talks to a specific device or service belongs in a library on PyPI, not in the integration. The integration lists that library as a requirement, and Home Assistant installs it when needed.

Requirements are pinned to an exact version, so every installation runs the same code.
