---
title: Document the installation
description: "Bronze rule docs-installation-instructions: the documentation has step-by-step setup instructions, with prerequisites."
sidebarLabel: docs-installation-instructions
sidebarGroup: Bronze
order: 11
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `docs-installation-instructions`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) must explain, step by step, how to set up the integration. If something has to happen before setup, like creating an account, installing an app, or turning on a local API on the device, the page lists that as prerequisites.

## Why it matters

Setup is the first experience users have with your integration. When the device needs a setting changed first, and the documentation does not say so, the user ends up with a config flow that cannot connect and no idea why. Clear instructions, including what to prepare, prevent that frustration and a lot of support questions.

## Example

List the prerequisites as numbered steps, then use the standard config flow include for the setup itself:

```markdown
## Prerequisites

1. Install the **MyProduct** app on your phone, and create an account.
2. Add your device in the app.
3. In the app, go to **Settings** and turn on **Local API**.

{% include integrations/config_flow.md %}
```

The include adds a [My link](/glossary/my-link/) badge, `{% my config_flow_start badge domain=domain %}`, that opens the config flow of your integration in the reader's own Home Assistant. You do not add that badge yourself.

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this goes on the page.

## How it is checked

Checked in review. The reviewer of the documentation pull request reads the instructions, and ideally follows them.

## Exceptions

There are no exceptions to this rule.

## Related rules

- [docs-installation-parameters](/core/quality-scale/docs-installation-parameters/): document the setup parameters.
- [docs-removal-instructions](/core/quality-scale/docs-removal-instructions/): document how to remove the integration.
