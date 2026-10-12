---
title: "Home Assistant Labs"
description: "Where users can turn on preview features: new features that work, but whose design can still change based on feedback."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "Labs"
    - "preview feature"
    - "preview features"
  code:
    - "labs"
    - "\"preview_features\" in manifest.json"
  ui: "Labs"
  related:
    - "integration"
    - "manifest"
    - "beta"
  autolink:
    - "Home Assistant Labs"
---

Integrations declare their preview features under `preview_features` in their manifest. Users find them under **Settings** > **System** > **Labs**, where every preview feature is off until they turn it on.

Labs is not the same as a [beta](/glossary/beta/). A beta tests the stability of the next release. A preview feature is already stable, and Labs is where its direction is shaped. See [Labs preview features](/core/development/labs/).
