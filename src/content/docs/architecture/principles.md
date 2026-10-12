---
title: Architecture principles
description: The ideas behind how Home Assistant is built. Once you know them, many rules in code review stop being surprising.
order: 3
sidebarLabel: Principles
---

Home Assistant has grown for more than ten years, with thousands of contributors. What keeps it together is a small set of ideas that come back everywhere: in the code, in reviews, and in the decisions written down in the [architecture repository](/architecture/decisions/).

You don't need to memorize them. But when a reviewer asks you to change something and you wonder why, the answer is almost always one of these.

This page is about what the values mean for the code and how it is built. [Our principles](/start/principles/) covers the values of the whole project and how we work together. [Design principles](/design/principles/) covers what they mean for the interface.

## Your home, your data

Home Assistant runs in your home, and works without the internet wherever it can. Data about your home stays there, unless you choose to send it somewhere. This is also what the [Open Home Foundation](/glossary/open-home-foundation/) stands for: privacy, choice, and sustainability.

What this means when you build:

- Prefer talking to a device on the local network over going through the cloud of its maker. The [IoT class](/glossary/iot-class/) of an integration tells users which one they get.
- Send nothing to anyone without the user knowing and choosing to. Analytics are opt-in.
- Don't depend on a service of the project itself for the basics. Home Assistant Link is an option, never a requirement.

## One process, one event loop

Home Assistant Core is a single Python process. Almost everything runs on one [event loop](/core/internals/asyncio/): every integration, every automation, every API request. That keeps it light enough to run on a small computer, and fast, but only when everyone plays fair.

What this means when you build:

- Never block the event loop. Waiting on the network or a disk without `await` freezes the whole house, not just your integration.
- Code that can only block, like a library without async support, runs in a worker thread.

## Device logic lives in libraries

An integration translates between Home Assistant and a device or service. The code that knows how to talk to that device, its protocol and its API, lives in a separate Python library on PyPI. The integration uses that library as a [requirement](/glossary/requirement/).

This keeps Home Assistant Core about Home Assistant. The library can be tested, released, and used by other projects on its own, and the integration stays small enough to review.

## Set up in the UI

Users add [integrations](/glossary/integration/) to their home in the UI, not by editing YAML. Integrations that connect to a device or service are set up with a [config flow](/glossary/config-flow/). That was decided in [ADR-0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md).

YAML still exists, for things like automations, templates, and some integrations that don't connect to anything. But for a device, the UI is the way in.

## Everything becomes entities and actions

A light from Philips Hue and a light from IKEA look and behave the same in Home Assistant. Integrations translate whatever a device does into [entities](/glossary/entity/) with a state, and actions to control them.

This shared model is what makes the rest possible. Dashboards, automations, voice, and the history all work with any integration, because they only see entities. When you build an integration, your job is to fit the device into that model, not to create a new one.

## The user's choices win

Users rename entities, put devices in areas, and hide what they don't need. Those changes live in the [registries](/architecture/core/registries/), not in the integration, and they survive restarts and updates.

That is why entities need a [unique ID](/glossary/unique-id/), and why an integration never decides things the user can change, like an entity ID.

## Change with care

Millions of homes run Home Assistant, and people rely on it for their lights, their heating, and their alarm. A change that breaks their setup breaks their home.

- Something old is not removed at once. It is first deprecated, with a warning and a date. See [deprecation](/glossary/deprecation/).
- Backward-incompatible changes are rare, explained, and listed in the release notes.
- The [integration quality scale](/glossary/quality-scale/) sets the bar for what good looks like.

## Support less, support it well

The project limits what it supports, so it can do that well. Some examples from the architecture decisions:

- **Installation methods**: Home Assistant OS and Home Assistant Container. Installing Core yourself, or the Supervisor on your own operating system, is no longer supported.
- **Python**: one minor version of Python at a time, with the goal of supporting the newest one ([ADR-0020](https://github.com/home-assistant/architecture/blob/master/adr/0020-minimum-supported-python-version.md)).
- **Databases**: SQLite, PostgreSQL versions that haven't reached their end of life, and LTS versions of MariaDB and MySQL that haven't either ([ADR-0018](https://github.com/home-assistant/architecture/blob/master/adr/0018-supported-databases.md)).
- **No new integrations** that scrape websites ([ADR-0004](https://github.com/home-assistant/architecture/blob/master/adr/0004-webscraping.md)), or talk to GPIO pins directly ([ADR-0019](https://github.com/home-assistant/architecture/blob/master/adr/0019-GPIO.md)). They break too easily, or can't be supported for everyone. They can still live on as custom integrations.

## Work on this

- See these principles applied to integrations, rule by rule, in the [integration quality scale](/core/quality-scale/).
- Not sure where to start contributing? [Your first contribution](/start/first-contribution/) helps you pick an area.
