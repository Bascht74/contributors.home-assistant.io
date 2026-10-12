---
title: "HACS"
description: "The Home Assistant Community Store: the custom integration that installed community-made integrations, cards, and themes, until the Marketplace replaced it in 2026.11. Its catalog and tools live on."
sidebarGroup: "Installation and system"
term:
  aliases:
    - "Home Assistant Community Store"
  code:
    - "hacs.json"
    - "hacs/default"
    - "hacs/action"
  related:
    - "marketplace"
    - "custom-integration"
  autolink:
    - "HACS"
---

For years, users installed HACS as a [custom integration](/glossary/custom-integration/) to find and update community work. Starting with Home Assistant 2026.11, it is built in as the [Marketplace](/glossary/marketplace/), and Home Assistant blocks the old custom integration.

The name lives on in what publishers use: the catalog in the [hacs/default](https://github.com/hacs/default) repository, the `hacs.json` file in every repository, and the [HACS action](https://github.com/hacs/action) that validates a repository. The Marketplace uses all three.
