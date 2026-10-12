---
title: "My link"
description: "A link to my.home-assistant.io that opens a page in the reader's own Home Assistant, like their integrations, or a new automation."
sidebarGroup: "Frontend"
term:
  aliases:
    - "My Home Assistant"
    - "My links"
  code:
    - "my.home-assistant.io"
  related:
    - "integration"
    - "config-flow"
    - "blueprint"
    - "app"
    - "marketplace"
  autolink:
    - "My link"
    - "My links"
---

Documentation and integrations use My links to take readers straight to the right place, wherever their Home Assistant runs.

A My link has the form `https://my.home-assistant.io/redirect/<name>/`. Some take parameters, like `https://my.home-assistant.io/redirect/config_flow_start/?domain=hue`, which starts setting up the Hue integration. Every link also has a badge image, at `https://my.home-assistant.io/badges/<name>.svg`, for a button in a README or a forum post. Some names still use a former name, like `supervisor_add_addon_repository`, which opens the dialog to add an app repository.

The [My link creator](https://my.home-assistant.io/create-link/) lists the links, and builds the link and the badge for you. Where contributors use them:

- [The `{% my %}` tag](/writing/reference/liquid/#my-links) on home-assistant.io
- [A badge to add an app repository](/apps/guides/repository/#make-it-one-step)
- [A link to a repository in the Marketplace](/marketplace/guides/catalog/#the-link-to-your-repository)
- [A badge to set up a custom integration](/marketplace/guides/integrations/#link-to-the-setup)
- [A blueprint import badge](/marketplace/guides/blueprints/#share-it)
