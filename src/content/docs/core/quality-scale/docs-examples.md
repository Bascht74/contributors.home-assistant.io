---
title: Document automation examples
description: "Gold rule docs-examples: the documentation gives automation examples or blueprints."
sidebarLabel: docs-examples
sidebarGroup: Gold
order: 6
---

This is a Gold rule. In `quality_scale.yaml`, it is called `docs-examples`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) shows a few common or useful ways to automate with the integration. Give them as YAML [automation](/glossary/automation/) examples, or link to a [blueprint](/glossary/blueprint/). Blueprints can live in the `source/blueprints/integrations` folder of the [home-assistant.io repository](https://github.com/home-assistant/home-assistant.io/tree/current/source/blueprints/integrations), or on the [blueprint exchange](https://community.home-assistant.io/c/blueprints-exchange) of the forum.

Keep it to a handful. The integration page is not a collection of every automation someone ever wrote.

## Why it matters

Examples get users from "it is set up" to "it does something useful". A good example also shows how the entities and actions of the integration fit together, which teaches more than a list of entities can.

## Example

````markdown
## Examples

### Turn off the status LEDs at night

The status LEDs of the device are bright. This automation turns them off
at sunset.

{% details "Example YAML configuration" %}

```yaml
automation:
  - alias: "Turn off the status LEDs at sunset"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.my_device_status_led
```

{% enddetails %}
````

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this section goes.

## How it is checked

Checked in review, usually on the documentation pull request.

## Exceptions

Integrations that do not create entities or provide actions, or that only extend a feature of core, like a backup location, are exempt from this rule.
