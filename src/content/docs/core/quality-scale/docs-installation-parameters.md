---
title: Document the setup parameters
description: "Silver rule docs-installation-parameters: the documentation describes every field asked for during setup."
sidebarLabel: docs-installation-parameters
sidebarGroup: Silver
order: 4
---

This is a Silver rule. In `quality_scale.yaml`, it is called `docs-installation-parameters`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) must describe every field that users fill in when they set up the integration. For each field, explain what it is, and where users can find the value.

## Why it matters

Few things are more frustrating than a setup form that asks for something you do not have. "Local access token"? From where? When the documentation lists every field, and where to find it, users can gather everything before they start, and get through setup in one go.

## Example

For an integration that is set up from the UI, follow the standard configuration text with a `configuration_basic` block. Use the labels exactly as they appear in the setup form:

```markdown
{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your bridge. You can find it in your
    router, or in the app under **Bridge settings** > **Local API**."
Local access token:
  description: "The local access token of your bridge. You can find it
    in the app under **Bridge settings** > **Local API**."
{% endconfiguration_basic %}
```

For an integration that is set up in YAML, use a `configuration` block instead, which also lists whether a variable is required and its type. See [Integration page structure](/writing/reference/integration-page/#the-configuration-block) for both blocks, and [Write integration documentation](/writing/guides/integration/) for how to open a documentation pull request.

## How it is checked

This rule is checked in review, of the code and of the documentation pull request.

## Exceptions

If the integration asks for nothing during setup, this rule does not apply.

## Related rules

- [docs-configuration-parameters](/core/quality-scale/docs-configuration-parameters/): document the options.
- [docs-installation-instructions](/core/quality-scale/docs-installation-instructions/): document the installation.
