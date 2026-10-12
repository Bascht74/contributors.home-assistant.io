---
title: How analytics works
description: The path your analytics take, from your installation to the public analytics site, and how the device database fits in.
order: 2
sidebarLabel: How it works
---

Home Assistant has two ways to share data with the project, both opt in: analytics, which tells the project about installations, and the device database, which tells it about devices. This page follows the data from your home to where it ends up.

## Why the project wants numbers

Home Assistant cannot see how it is used. That is on purpose, but it makes some decisions hard. Analytics helps with three things:

- **Deciding where to spend time.** Knowing which integrations are popular helps the team decide what to improve, rewrite, or expand.
- **Talking to manufacturers.** "Thousands of Home Assistant users have your device" convinces a company to add a local API far better than a feature request does. This has led manufacturers to add local control and privacy features.
- **Helping users choose.** The public analytics site shows which integrations and devices are popular. The integration pages on [home-assistant.io](https://www.home-assistant.io/) show how many active installations use each integration, using the same data.

## Analytics

### Collecting

The [analytics integration](https://github.com/home-assistant/core/tree/dev/homeassistant/components/analytics) is part of Home Assistant itself. When you turn on analytics, it waits 15 minutes after Home Assistant starts, sends a report, and then sends one every 24 hours while Home Assistant runs.

What is in the report depends on the options you turned on. [What analytics shares](/data/reference/analytics-data/) lists every field. Installations running a development version send their data to a separate test environment, so they do not mix with the real numbers.

### Receiving

The report goes to the analytics receiver, a small program running on Cloudflare Workers. It checks the report, adds the country it came from based on the IP address (and the state, for the United States), and stores it in a key-value store, under the random identifier of the installation.

Every installation has exactly one entry. It is rewritten when a report differs from what is stored, and at least every 30 days when nothing changed. An entry that is not rewritten for 60 days is removed.

### Processing

Scheduled tasks go through the stored entries and calculate the totals:

| Task | Runs | What it does |
| --- | --- | --- |
| Process queue | Every minute, until done | Goes through all entries and counts them. When done, the website is rebuilt with the new data. |
| Update history | Every hour | Updates the history of installation types, versions, and totals. |
| Rebuild website | Every hour, at 15 minutes past | Rebuilds the website with the latest data. |
| Reset queue | Once a day, just after midnight | Starts a new round of processing. |

### Publishing

The [analytics website](https://analytics.home-assistant.io/) is rebuilt with the new totals. It shows installations over time, versions, installation types, boards, integrations, apps, and statistics. The same data is available as files, for anyone to use. See [Use the public data](/data/guides/public-data/).

All of it, the receiver, the processing, and the website, is open source in the [analytics.home-assistant.io repository](https://github.com/home-assistant/analytics.home-assistant.io).

## Diagnostics

Diagnostics is different from the rest. When it is on, crash reports of unexpected errors are sent to [Sentry](https://sentry.io/), where developers use them to fix bugs. They are only visible to the developers. This option currently covers the Supervisor and the OS Agent.

## The device database

The Open Home Foundation is building a device database: an open, community-powered resource that shows how smart home devices perform in real homes. Will this sensor work without the cloud? Which entities does this plug provide? The answers come from Home Assistant installations whose owners chose to share anonymized data about their devices.

### Turning it on

The device database is a preview feature. To share, turn on the **Device database** feature in **Settings** > **System** > **Labs**. That also turns on **Devices** in **Settings** > **System** > **Analytics**, where you can turn sharing off again. In the same place, **Preview device analytics** downloads exactly what would be shared.

### What is shared

Once a day, at a random time picked once per installation, Home Assistant sends a snapshot of its devices:

- Only devices of integrations that ship with Home Assistant, and only integrations for devices and hubs. Custom integrations, and services like weather providers, are left out.
- For each device: the manufacturer, model, model ID, hardware and software version, whether it has a configuration URL, and which device it connects through.
- For each entity: its domain, device class, entity category, unit of measurement, whether it uses an entity name, and whether its state is assumed.

The IDs of your devices are not sent. Devices only refer to each other by their position in the list. Names you gave your devices, areas, and entities are never included.

An integration can leave out some or all of its devices and entities. See [Analytics in your integration](/data/guides/integration-analytics/).

### Where it goes

Snapshots go to the device database of the Open Home Foundation, not to the analytics receiver. How that data is processed is described in the [Data Use Statement](https://www.openhomefoundation.org/device-database-data-use-statement). The plans and progress of the device database are shared on the blog, starting with [How we'll build the device database, together](https://www.home-assistant.io/blog/2026/02/02/about-device-database/).
