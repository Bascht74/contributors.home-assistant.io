---
title: Privacy principles
description: The rules Home Assistant follows for every bit of data it collects, and why.
order: 3
---

Home Assistant is built on the belief that your data is yours, all of it, and that you do not need to share your data to learn from it. The [Open Home Foundation](/glossary/open-home-foundation/), which owns Home Assistant, puts privacy next to choice and sustainability as its core principles. Everything in this area follows from that.

## Your data stays home

Everything Home Assistant records about your home, like the states of your devices, your history, and your energy use, is stored on your own hardware, in your own database. It never leaves your home unless you set something up that sends it somewhere. That is also why the project does not know how many people run Home Assistant: it has no way to count installations that do not opt in.

## Opt in, never opt out

Nothing is shared with the project unless you turn it on. Analytics is off until you choose to enable it, during onboarding or later in the settings. The same goes for the device database, which is a separate choice.

## You choose what to share

Analytics is split into separate options, from basic system information to usage, counts, and crash reports. You can turn each one on or off, and change your mind at any time. Turning an option off takes effect right away.

## You can see what you share

Every time Home Assistant sends analytics, it writes the exact data it sent to your log. There is no hidden part. For the device database, you can download a preview of what would be shared, from the analytics settings.

## Only counts, never people

The data that is shared contains no names, no entity IDs, no addresses, and nothing you named yourself. Each installation sends a random identifier, only so it is counted once, even though it reports every day. The country is derived from the IP address when the data arrives. The IP address itself is not stored with the analytics data.

Only aggregated totals are published. The data of a single installation is never made public, and you cannot find a single installation in the public data.

## Data does not stay forever

The analytics receiver keeps the data of an installation for at most 60 days after its last report. Stop sharing, and your installation disappears from the data after that period.

## Open, all the way

The code that collects analytics is part of Home Assistant itself, in the [analytics integration](https://github.com/home-assistant/core/tree/dev/homeassistant/components/analytics). The code that receives and processes it is open source too, in the [analytics.home-assistant.io repository](https://github.com/home-assistant/analytics.home-assistant.io). Anyone can check what happens with the data.

The websites of the Open Home Foundation follow the same idea: they use [Plausible](https://www.openhomefoundation.org/blog/making-our-web-analytics-open-source-with-plausible/), an open source analytics tool without personal data collection or tracking.

## For the device database

The device database has its own [Data Use Statement](https://www.openhomefoundation.org/device-database-data-use-statement), which explains in detail how the device data is processed. It only includes details about devices, like the manufacturer and model, never personally identifying information like the names you give your devices.
