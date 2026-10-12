---
title: How the companion apps fit in
description: "Home Assistant on Android and Apple devices: the frontend in an app, plus sensors, notifications, widgets, and more from the device itself."
order: 6
sidebarLabel: Companion apps
---

The [companion apps](/glossary/companion-app/) bring Home Assistant to phones, tablets, watches, cars, and Macs. They show the same [frontend](/architecture/frontend/) as the browser, and add what only an app on the device can do: sensors, location, notifications, widgets, and quick controls.

## In short

- The Android app is written in Kotlin, the Apple app in Swift. Each has its own repository.
- The main screen is the frontend, in a web view. Native parts sit around it.
- The app registers itself with the `mobile_app` integration, which turns the phone into a device with entities.
- The app sends sensor data and location over a webhook. Notifications come back through a push service.

## Two parts

| Part | What it does |
| --- | --- |
| The frontend, in a web view | Dashboards, settings, everything you see in the browser |
| Native code | Logging in, sensors, location, notifications, widgets, watch apps, car apps, and settings of the app |

The frontend knows when it runs inside an app, and talks to it through a bridge: to scan a QR code, show native settings, or use the phone's microphone for voice.

## Registering

When a user logs in to the app, the app registers itself with the `mobile_app` integration. That creates a [config entry](/core/integrations/config-entries/) and a device for the phone, and gives the app a [webhook](/architecture/connections/). The webhook can be encrypted, so its data is safe even over an unencrypted connection.

From then on, the app sends sensor data, like the battery level, and its location over that webhook. Each sensor becomes an entity of the phone's device. With Home Assistant Link, the webhook works away from home too.

## Notifications

Home Assistant can't reach a phone directly. Notifications go through a push service of the project, which hands them to the services of Google and Apple, which deliver them to the phone. The app tells `mobile_app` where to send them when it registers.

## In the code

| What | Where |
| --- | --- |
| Android, including Wear OS and Android Auto | [home-assistant/android](https://github.com/home-assistant/android) |
| iOS, iPadOS, macOS, watchOS, and CarPlay | [home-assistant/iOS](https://github.com/home-assistant/iOS) |
| Core's side | [`homeassistant/components/mobile_app/`](https://github.com/home-assistant/core/tree/dev/homeassistant/components/mobile_app) |
| The bridge in the frontend | `src/external_app/` in [home-assistant/frontend](https://github.com/home-assistant/frontend) |

## Work on this

- Start with [your first companion app contribution](/companion/first-contribution/).
- How each app is built: [Android architecture](/companion/android/architecture/) and [Apple architecture](/companion/apple/architecture/).
- The [mobile app API](/companion/mobile-app-api/): registering, sensors, and notifications, for the official apps and your own.
