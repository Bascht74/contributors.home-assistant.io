---
title: Document the conditions
description: "Bronze rule docs-conditions: the documentation describes the conditions of the integration."
sidebarLabel: docs-conditions
sidebarGroup: Bronze
order: 9
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `docs-conditions`.

The user documentation on [home-assistant.io](https://www.home-assistant.io/) describes every [condition](/glossary/condition/) the integration provides. Each condition gets a page of its own, linked from the integration page. The page explains what the condition checks, lists its options, and shows how to use it from the UI and in YAML.

## Why it matters

Conditions of an integration are more specific than the standard conditions, and that makes them harder to use without help. A separate page per condition keeps the integration page readable, while still giving each condition room for its options, its behavior with multiple targets, and real examples.

## Example

Each condition gets its own file in the home-assistant.io repository, in `source/_conditions/`, named after the full condition, like `my_integration.is_door_open.markdown`:

```markdown
---
title: "Door is open"
condition: my_integration.is_door_open
domain: my_integration
description: "Tests if one or more doors are open."
---

The **Door is open** condition passes when one or more of your doors
are open. Use it to make sure an automation only runs while a door is
actually open, like turning off the heating.

{% include conditions/ui_header.md %}
```

After the introduction, the page walks through using the condition in the UI, its options in the UI, using it in YAML, and its options in YAML. It ends with a "Good to know" section and real automation examples. The integration page lists all conditions with one include:

```markdown
{% include integrations/conditions.md %}
```

The full page layout, with all includes and the options blocks, is in [Integration page structure](/writing/reference/integration-page/#triggers-conditions-and-actions). For writing the page itself, see [Document an integration](/writing/guides/integration/).

## How it is checked

Checked in review, on the documentation pull request that goes with the integration.

## Exceptions

If the integration does not provide any conditions, this rule does not apply.

## Related rules

- [docs-actions](/core/quality-scale/docs-actions/): document the actions.
- [docs-triggers](/core/quality-scale/docs-triggers/): document the triggers.
