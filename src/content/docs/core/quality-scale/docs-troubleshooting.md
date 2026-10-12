---
title: Document troubleshooting
description: "Gold rule docs-troubleshooting: the documentation helps users solve common problems themselves."
sidebarLabel: docs-troubleshooting
sidebarGroup: Gold
order: 10
---

This is a Gold rule. In `quality_scale.yaml`, it is called `docs-troubleshooting`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) has a troubleshooting section for the problems that users run into and can fix themselves. Each topic describes the symptom the user sees, what causes it, and the steps to solve it.

## Why it matters

Users who can solve a problem themselves are back up and running in minutes, instead of days of waiting on an issue or a forum thread. Every common problem you document is a support question that does not have to be asked, and answered, again.

Start with the symptom, in the words the user sees on screen. That is what they search for.

## Example

Put each problem in its own collapsible block, with the symptom, a description, and the resolution. Leave out a part when it adds nothing for a short topic.

```markdown
## Troubleshooting

{% details "Can't set up the device" %}

### Symptom

When you set up the integration, the form shows "Failed to connect".

#### Description

The device only accepts local connections when local access is turned
on in its settings.

#### Resolution

1. Make sure the device is powered on, and the LED is green.
2. In the app of the manufacturer, go to **Settings** > **Local access**.
3. Turn on **Allow local connections**, and try again.

{% enddetails %}
```

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this section goes.

## How it is checked

Checked in review, usually on the documentation pull request.

## Exceptions

If the integration has no known problems that users can solve themselves, this rule does not apply.
