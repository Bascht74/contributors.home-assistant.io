---
title: Describe the brand, product, or service
description: "Bronze rule docs-high-level-description: the documentation describes what the integration connects to."
sidebarLabel: docs-high-level-description
sidebarGroup: Bronze
order: 10
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `docs-high-level-description`.

The user documentation on [home-assistant.io](https://www.home-assistant.io/) starts with a high-level description of the brand, product, or service the integration connects to. Where possible, it links to the website of the brand, product, or service.

## Why it matters

Not everyone who lands on an integration page knows what it is about. A few sentences on what the product or service is help users decide whether the integration fits them, before they spend time on setup. The link gives them a place to learn more.

## Example

The description is the introduction of the integration page, right after the front matter, without a heading:

```markdown
The **My integration** {% term integration %} connects Home Assistant
to the smart plugs and switches of [MyCompany](https://www.example.com).
MyCompany makes energy monitoring devices for the home, and is best
known for its MyPlug range.
```

The introduction also says what you can do with the integration. See the sections of an integration page in [Integration page structure](/writing/reference/integration-page/), and [Document an integration](/writing/guides/integration/) for writing the page.

## How it is checked

Checked in review, on the documentation pull request that goes with the integration.

## Exceptions

Integrations that do not connect to a device or service, like internal integrations, have nothing to describe and are exempt.
