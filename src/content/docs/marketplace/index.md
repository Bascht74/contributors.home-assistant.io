---
title: Marketplace
description: Share what you build with everyone who runs Home Assistant. Publish custom integrations, dashboard cards, themes, template macros, and blueprints, and keep them up to date.
---

Not everything people build for Home Assistant belongs in Home Assistant itself. A card for one specific device, a theme in your favorite colors, an integration for a service only a few people use, an automation that solved a problem in your home: they are all worth sharing, and thousands of people do.

Sharing is a big part of what makes Home Assistant, Home Assistant. Someone builds a card for their own wall tablet and shares it. Someone else uses it in their home, finds a bug, and sends a fix. A third person sees it and gets an idea for something new. What you share inspires others and helps them along, and what they share does the same for you. That is the community: people who love Home Assistant, and love to share what they made with it.

The [Marketplace](/glossary/marketplace/) is where users find and install that work. It is built into Home Assistant starting with 2026.11, under **Settings** > **Marketplace**. It grew out of [HACS](/glossary/hacs/), the community store that people installed as a custom integration for years, and it uses the same catalog and the same `hacs.json` file. An integration, card, theme, or template that works with HACS today most likely works in the Marketplace too, though the Marketplace checks a few things more strictly before it installs. AppDaemon apps and Python scripts are the exception: the Marketplace does not handle them.

The Marketplace is also where a new integration or dashboard card starts. Publish it here, and once it has matured and has a user base, reach out to the maintainers to see whether it should ship built in. See [does it belong in core](/core/integrations/create/#does-it-belong-in-core).

## What you can share

| What | What it does | Shared through |
| --- | --- | --- |
| [Custom integration](/marketplace/guides/integrations/) | Adds support for a device or service, like a built-in integration | The Marketplace |
| [Dashboard card or plugin](/marketplace/guides/dashboard/) | Adds a card, a card feature, a badge, or another building block to dashboards | The Marketplace |
| [Theme](/marketplace/guides/themes/) | Changes the colors and some sizes of the interface | The Marketplace |
| [Template macros](/marketplace/guides/templates/) | Reusable Jinja macros that others import into their templates | The Marketplace |
| [Blueprint](/marketplace/guides/blueprints/) | An automation, script, or template entity with blanks for others to fill in | An import link, and the [Blueprint Exchange](https://community.home-assistant.io/c/blueprints-exchange/53) on the forum |

Blueprints are not in the Marketplace. Users import them from a link instead, and Home Assistant remembers that link to fetch updates. They are here because sharing them works the same way in spirit: you publish, others install, you keep it working.

## Who this is for

This area is for you if you built something for your own Home Assistant and want others to use it too. What you need depends on what you share:

- A blueprint needs YAML and an automation that works in your own home. No programming.
- A theme needs YAML and an eye for color.
- A card or another dashboard plugin needs JavaScript.
- An integration needs Python.

Every type except blueprints lives in a public GitHub repository. You do not need to be a Git expert, but you need an account and to be able to publish a release.

Everything shared this way is made and supported by you, not by the Home Assistant project. Users see a warning that says so before they install anything from the Marketplace. Be ready to answer issues, and to update your work when Home Assistant changes.

## Start here

1. [Your first contribution](/marketplace/first-contribution/): turn an automation you already use into a blueprint, and share it.
2. [How it works](/marketplace/how-it-works/): how the Marketplace finds, checks, installs, and updates what you publish, and how blueprints are shared and updated.
3. Pick the guide for what you build, below.

## Guides

- [Custom integrations](/marketplace/guides/integrations/): what is different when your integration lives outside core.
- [Dashboard cards and plugins](/marketplace/guides/dashboard/): package a card, a card feature, or another JavaScript module.
- [Themes](/marketplace/guides/themes/): structure, the variables you can set, light and dark mode, and testing.
- [Template macros](/marketplace/guides/templates/): share Jinja macros as a template file.
- [Blueprints](/marketplace/guides/blueprints/): write, test, version, and share a blueprint.
- [Releases and updates](/marketplace/guides/releases/): how users get your new versions, and how to keep them working.
- [Get into the catalog](/marketplace/guides/catalog/): add your repository to the catalog, so everyone finds it.

## Reference

- [hacs.json](/marketplace/reference/hacs-json/): every key of the file, and what the Marketplace does with it.
- [Repository structure](/marketplace/reference/repository-structure/): where the files go, per type.
- [Validation checks](/marketplace/reference/validation/): what the HACS action checks, and what the Marketplace refuses to install.

## Related areas

- [Core and integrations](/core/integrations/): how to build an integration, custom or not.
- [Custom cards and more](/frontend/custom-ui/): how to build cards, card features, badges, views, strategies, and panels.
- [Theming and design tokens](/frontend/architecture/theming/): the CSS variables themes change, from the side of the frontend.
- [Security](/security/): what to watch for in code that runs in other people's homes.

## Who to talk to

- The **#developers** channel on the [Home Assistant Discord](https://www.home-assistant.io/join-chat/) is where people who build integrations and cards help each other. Can't see the channel? Under **Channels & Roles**, choose **I want to contribute dev skills to Home Assistant**.
- Questions about the catalog, `hacs.json`, or the HACS action: the [HACS Discord server](https://discord.gg/apgchf8), and the issues of [hacs/integration](https://github.com/hacs/integration/issues).
- Blueprints are shared and discussed in the [Blueprint Exchange](https://community.home-assistant.io/c/blueprints-exchange/53) on the community forum.
- Found a bug in the Marketplace itself? Open an issue in the [core repository](https://github.com/home-assistant/core/issues).
