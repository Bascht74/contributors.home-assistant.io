---
title: Document the options
description: "Silver rule docs-configuration-parameters: the documentation describes every option of the options flow."
sidebarLabel: docs-configuration-parameters
sidebarGroup: Silver
order: 3
---

This is a Silver rule. In `quality_scale.yaml`, it is called `docs-configuration-parameters`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) must describe every option that users can change after setup, in the [options flow](/glossary/options-flow/) of the integration. For each option, explain what it does, and what values make sense.

## Why it matters

An option without an explanation is a guess. Users open the options, see a field like "Timeframe", and have no idea whether to pick 5 or 120, or what changes when they do. A short description on the integration page saves them the trial and error, and saves you the support questions.

## Example

Add the standard options text, followed by a `configuration_basic` block with one entry per option. Use the labels exactly as they appear in the UI:

```markdown
{% include integrations/option_flow.md %}

{% configuration_basic %}
Country code:
  description: "The country (NL or BE) to show on the radar camera."
Timeframe:
  description: "How many minutes ahead the precipitation forecast
    looks. From 5 to 120 minutes."
{% endconfiguration_basic %}
```

See [Integration page structure](/writing/reference/integration-page/#the-configuration_basic-block) for the block, and [Write integration documentation](/writing/guides/integration/) for how to open a documentation pull request.

## How it is checked

This rule is checked in review, of the code and of the documentation pull request.

## Exceptions

If the integration has no options flow, this rule does not apply.

## Related rules

- [docs-installation-parameters](/core/quality-scale/docs-installation-parameters/): document the setup parameters.
