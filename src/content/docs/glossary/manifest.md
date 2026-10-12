---
title: "Manifest"
description: "The `manifest.json` file of an integration: its domain, name, integration owners, requirements, and how it can be discovered."
sidebarGroup: "Core and integrations"
term:
  code:
    - "manifest.json"
  related:
    - "integration"
    - "requirement"
    - "integration-owner"
    - "discovery"
    - "iot-class"
  autolink:
    - "manifest.json"
---

Home Assistant reads the manifest before it loads any code of an integration. It tells which other integrations need to be set up first, which Python packages to install, whether the integration has a config flow, and on which networks or buses it can be discovered.

The manifest is also where the [IoT class](/glossary/iot-class/) and the [quality scale](/glossary/quality-scale/) of an integration are set.
