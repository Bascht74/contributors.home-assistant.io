---
title: Document known limitations
description: "Gold rule docs-known-limitations: the documentation lists the known limitations."
sidebarLabel: docs-known-limitations
sidebarGroup: Gold
order: 7
---

This is a Gold rule. In `quality_scale.yaml`, it is called `docs-known-limitations`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) lists what the integration cannot do, or cannot do well, by design or because of the device or service. Limitations are not bugs: bugs belong in the issue tracker on GitHub, not in the documentation.

## Why it matters

Users find out about a limitation sooner or later. Finding out from the documentation, before they buy a device or spend an evening on an automation, is a lot better than finding out from a failed attempt and an issue that gets closed as "works as intended".

Being upfront about limits also saves you support questions.

## Example

```markdown
## Known limitations

- The integration cannot reboot the device. Use the app of the
  manufacturer for that.
- The cloud API updates the energy usage once per hour, so the energy
  sensors lag up to an hour behind.
```

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this section goes.

## How it is checked

Checked in review, usually on the documentation pull request.

## Exceptions

If the integration has no known limitations, this rule does not apply.
