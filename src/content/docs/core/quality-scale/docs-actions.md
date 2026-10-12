---
title: Document the actions
description: "Bronze rule docs-actions: the documentation describes the actions of the integration."
sidebarLabel: docs-actions
sidebarGroup: Bronze
order: 8
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `docs-actions`.

The user documentation on [home-assistant.io](https://www.home-assistant.io/) describes every [action](/glossary/action/) the integration adds: what it does, and what each of its fields means.

## Why it matters

Actions do things that the standard entities cannot, like fetching a schedule or sending a command with options. That makes them powerful, but also harder to use than turning on a light. Without documentation, users have to guess which fields there are, which ones are required, and what the response looks like.

## Example

Each action gets its own file in the home-assistant.io repository, in `source/_actions/`, named after the full action, like `my_integration.get_schedule.markdown`. The file becomes a page of its own:

```markdown
---
title: "Get schedule"
action: my_integration.get_schedule
domain: my_integration
description: "Gets the heating schedule of a thermostat."
---

The **Get schedule** action returns the heating schedule that is stored
on your thermostat.

{% include actions/ui_header.md %}
```

The integration page then lists all its actions with one include, which builds the list from those files:

```markdown
{% include integrations/actions.md %}
```

The full layout of an action page, with the UI and YAML sections and the options blocks, is in [Integration page structure](/writing/reference/integration-page/#triggers-conditions-and-actions). For writing the page itself, see [Document an integration](/writing/guides/integration/).

## How it is checked

Checked in review, on the documentation pull request that goes with the integration.

## Exceptions

If the integration does not add any actions of its own, this rule does not apply.

## Related rules

- [docs-triggers](/core/quality-scale/docs-triggers/): document the triggers.
- [docs-conditions](/core/quality-scale/docs-conditions/): document the conditions.
