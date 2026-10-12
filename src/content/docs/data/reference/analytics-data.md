---
title: What analytics shares
description: Every field Home Assistant sends when you turn on analytics, per option, with example data.
order: 1
---

Analytics is split into options you turn on separately, in **Settings** > **System** > **Analytics**. Usage and statistical data need basic analytics to be on. This page lists what each option adds to the report. The source of truth is the [analytics integration](https://github.com/home-assistant/core/tree/dev/homeassistant/components/analytics) in core.

## Basic analytics

Always part of the report, when analytics is on.

| Field | What it is |
| --- | --- |
| `uuid` | A random identifier for your installation, made the first time analytics is sent. It is only used to count your installation once. |
| `version` | The Home Assistant version, like `2026.10.0`. |
| `installation_type` | The installation type, like `Home Assistant OS` or `Home Assistant Container`. |
| `supervisor` | Only with the Supervisor: whether the installation is `healthy` and `supported`, and its architecture, `arch`. |
| `operating_system` | Only on Home Assistant OS: the `board`, and the `version` of the operating system. |

The receiver adds the `country` based on the IP address. For the United States, it also adds the `region`, which is the state.

```json
{
  "uuid": "12a3456bc78d90123ef4567a789012b3",
  "version": "2026.10.0",
  "installation_type": "Home Assistant OS",
  "supervisor": {
    "healthy": true,
    "supported": true,
    "arch": "amd64"
  },
  "operating_system": {
    "board": "odroid-n2",
    "version": "18.3"
  }
}
```

## Usage

Adds what you use, by name.

| Field | What it is |
| --- | --- |
| `integrations` | The domains of the built-in integrations you use, like `hue` or `zha`. |
| `custom_integrations` | The domain and version of each custom integration you use. |
| `addons` | Only with the Supervisor: for each app, its `slug`, `version`, and whether `protected` mode and `auto_update` are on. |
| `energy` | Whether the energy dashboard is `configured`. |
| `recorder` | The database `engine` of the recorder, like `sqlite`, and its `version`. |
| `certificate` | Whether Home Assistant serves HTTPS with its own certificate. |

An integration counts when it is set up from the UI and not disabled or ignored, when it is configured in YAML, or when it provides entities that are not disabled.

```json
{
  "integrations": ["hue", "zha"],
  "custom_integrations": [
    { "domain": "my_integration", "version": "1.2.0" }
  ],
  "addons": [
    {
      "slug": "core_mosquitto",
      "protected": true,
      "version": "6.5.1",
      "auto_update": false
    }
  ],
  "energy": { "configured": true },
  "recorder": { "engine": "sqlite", "version": "3.49.1" },
  "certificate": false
}
```

## Statistical data

Adds counts, never names.

| Field | What it is |
| --- | --- |
| `state_count` | The number of entities. |
| `automation_count` | The number of automations. |
| `integration_count` | The number of built-in integrations, counted like under usage. |
| `addon_count` | Only with the Supervisor: the number of apps. |
| `user_count` | The number of users, not counting system users. |

## Diagnostics

Does not add anything to the report. It turns on crash reports to [Sentry](https://sentry.io/) for the Supervisor and the OS Agent. See [How analytics works](/data/how-it-works/#diagnostics).

## Devices

Sends a separate snapshot of your devices to the device database, not to the analytics receiver. It does not need basic analytics, but it does need the **Device database** preview feature in **Settings** > **System** > **Labs**. Turning on that feature also turns on this option. See [The device database](/data/how-it-works/#the-device-database) for what it contains.

## How long it is kept

The receiver keeps one entry per installation. It rewrites the entry when a report differs from what is stored, and at least every 30 days when nothing changed. An entry that is not rewritten for 60 days is removed.
