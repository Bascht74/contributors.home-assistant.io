---
title: Document how data is updated
description: "Gold rule docs-data-update: the documentation explains how and how often data is updated."
sidebarLabel: docs-data-update
sidebarGroup: Gold
order: 5
---

This is a Gold rule. In `quality_scale.yaml`, it is called `docs-data-update`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) explains how the integration gets its data: whether it polls the device or service, and how often, or whether the device pushes updates. If there are limits, like an API that allows only a number of requests per day, or a device that struggles with frequent requests, the page says so.

## Why it matters

How data is updated decides what a user can do with an integration. A motion sensor that is polled every 5 minutes is useless to turn on a light when someone walks in. A sensor that pushes its state is perfect for it. Users need to know this before they buy a device or build automations on it.

Users can set their own polling interval, so they also need to know the default, and the reasons not to go lower.

## Example

Add a "Data updates" section to the integration page:

```markdown
## Data updates

The integration {% term polling "polls" %} the device every 5 minutes.
Devices with firmware 2.0 or newer can push their data instead. The
integration turns that on when it starts, and only falls back to polling
when it fails.

The cloud API allows 1,000 requests per day. Polling more often than every
2 minutes can get your account blocked for the rest of the day.
```

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this section goes.

## How it is checked

Checked in review, usually on the documentation pull request.

## Exceptions

If the integration does not get data from a device or service, because it neither polls nor receives updates, this rule does not apply.
