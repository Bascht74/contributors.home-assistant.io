---
title: Document the triggers
description: "Bronze rule docs-triggers: the documentation describes the triggers of the integration."
sidebarLabel: docs-triggers
sidebarGroup: Bronze
order: 13
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `docs-triggers`.

When the integration provides its own [triggers](/glossary/trigger/), every trigger must be documented. Each trigger gets a page of its own on [home-assistant.io](https://www.home-assistant.io/), and the integration page links to them. A trigger page explains what the trigger does, lists its options, and shows how to use it from the UI and in YAML.

## Why it matters

Integration triggers are less familiar than the standard ones, like a state change. Without documentation, users do not know they exist, what the options mean, or when the trigger fires. A page per trigger keeps the integration page readable, and gives every trigger room for examples.

## Example

Each trigger is a file in `source/_triggers/` of home-assistant.io, named after the trigger, like `my_integration.co2_changed.markdown`. A shortened example:

```markdown
---
title: "Carbon dioxide level changed"
trigger: my_integration.co2_changed
domain: my_integration
description: "Triggers after the carbon dioxide level changes."
---

The **Carbon dioxide level changed** trigger fires after the CO2 reading
of one or more sensors changes by a meaningful amount. Use it to turn on
ventilation when a room gets stuffy.

{% include triggers/ui_header.md %}

1. Go to **Settings** > **Automations & scenes**.
2. Open an automation, and in the **When** section, select **Add trigger**.
3. Pick the area or sensor, then select **Carbon dioxide level changed**.

{% include triggers/yaml_header.md %}

{% example %}
trigger: |
  trigger: my_integration.co2_changed
  target:
    entity_id: sensor.bedroom_co2
  options:
    threshold: 50
{% endexample %}
```

On the integration page, `{% include integrations/triggers.md %}` lists the triggers of the integration. The [integration page structure](/writing/reference/integration-page/#triggers-conditions-and-actions) describes the full layout of a trigger page, with all its includes. See also [Write integration documentation](/writing/guides/integration/).

## How it is checked

Checked in review. Hassfest validates the trigger descriptions in `triggers.yaml` of the integration, but not the documentation.

## Exceptions

If the integration does not provide any triggers, this rule does not apply.

## Related rules

- [docs-actions](/core/quality-scale/docs-actions/): document the actions.
- [docs-conditions](/core/quality-scale/docs-conditions/): document the conditions.
