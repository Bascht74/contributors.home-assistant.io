---
title: Document use cases
description: "Gold rule docs-use-cases: the documentation shows what you can do with the integration."
sidebarLabel: docs-use-cases
sidebarGroup: Gold
order: 11
---

This is a Gold rule. In `quality_scale.yaml`, it is called `docs-use-cases`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) describes a few use cases: what you can do with the device or service once it is in Home Assistant, and why you would want it there.

## Why it matters

For some integrations, the value is obvious: a smart light is for turning on the light. For others, a user looks at the integration and wonders why they would bother. A few concrete use cases answer that question, and often give people ideas they would not have had themselves.

Use cases are about the why. [docs-examples](/core/quality-scale/docs-examples/) is about the how, with automations to copy.

## Example

```markdown
## Use cases

The water meter of My Company reports your water usage every minute.
In Home Assistant, you can:

- Track your water usage in the energy dashboard, next to electricity
  and gas.
- Get a notification when water keeps running for an hour, which often
  means a leak or a running toilet.
- Compare your usage per day, to see what the garden sprinklers cost.
```

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this section goes.

## How it is checked

Checked in review, usually on the documentation pull request.

## Exceptions

There are no exceptions to this rule.
