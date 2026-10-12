---
title: Document supported devices
description: "Gold rule docs-supported-devices: the documentation lists known supported and unsupported devices."
sidebarLabel: docs-supported-devices
sidebarGroup: Gold
order: 8
---

This is a Gold rule. In `quality_scale.yaml`, it is called `docs-supported-devices`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) lists the devices that are known to work, and the devices that are known not to work. When a list of models is not practical, describe the group, like "every device that runs firmware 2.0 or newer".

## Why it matters

Many people buy devices because Home Assistant supports them. If the documentation does not say which models work, they find out after the purchase, when setup fails. A clear list prevents that, and it saves you issues from people with a device that was never supported.

## Example

```markdown
## Supported devices

These devices are known to work with the integration:

- My Thermostat 2 and 3
- My Hub, with firmware 4.1 or newer
- Every device that runs MyOS

## Unsupported devices

These devices do not work with the integration:

- My Thermostat 1: it has no local API
- Devices made before 2015
```

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this section goes.

## How it is checked

Checked in review, usually on the documentation pull request.

## Exceptions

If the integration does not connect to a device or service, or does not integrate physical devices, this rule does not apply.
