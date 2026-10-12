---
title: Document how to remove the integration
description: "Bronze rule docs-removal-instructions: the documentation explains how to remove the integration."
sidebarLabel: docs-removal-instructions
sidebarGroup: Bronze
order: 12
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `docs-removal-instructions`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) must explain how to remove the integration. When removing it from Home Assistant is all there is to it, say so. When there is more to clean up, like a token in the app of the manufacturer or a setting on the device, describe those steps too.

## Why it matters

Removing an integration is not always as simple as deleting it in Home Assistant. A cloud service may keep Home Assistant listed as a connected app, or a device may keep pushing data to an address that no longer listens. Users who want to start fresh, or stop using a device, need to know what is left behind.

## Example

Use the standard include for the steps in Home Assistant, and add anything specific to your integration:

```markdown
## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After you remove the integration, open the **MyProduct** app and remove
Home Assistant from the list of connected apps.
```

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this goes on the page.

## How it is checked

Checked in review of the documentation pull request.

## Exceptions

There are no exceptions to this rule.

## Related rules

- [docs-installation-instructions](/core/quality-scale/docs-installation-instructions/): document the installation.
