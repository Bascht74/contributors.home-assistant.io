---
title: Apple targets
description: The app, extensions, Apple Watch, CarPlay, and Mac targets of the Apple project, and what to check when your change touches shared code.
sidebarLabel: Targets
order: 3
---

The Xcode project builds many products from one codebase. A change in shared code can end up in all of them, so check which ones your change touches.

## The schemes

| Scheme | Builds |
| --- | --- |
| `App-Debug` | The app, for local development. Start here |
| `App-Release` | The app, as it ships |
| `Tests-Unit` | The unit tests that CI runs |
| `Tests-UI` | The UI tests and the end-to-end onboarding test |
| `WatchApp` | The Apple Watch app |
| `Extensions-*` | One app extension each, like `Extensions-Widgets` |

## iPhone and iPad

The main app, in `Sources/App`. Most features start here.

## Widgets, controls, and App Intents

`Sources/Extensions/Widgets` and `Sources/Extensions/AppIntents` power Home Screen and Lock Screen widgets, Control Center controls, and Shortcuts. They run as extensions, outside the app.

Items that appear in widgets, the watch, CarPlay, and Shortcuts share one model, `MagicItem`. If you add a new kind of item or action, it likely needs to work on all of those.

## Notifications

Several targets handle notifications:

- The notification service extension, which changes a notification before it shows, for example to download an attachment.
- The notification content extension, for the expanded view of a notification, like a camera stream.
- The push provider extension, for local push on a home network.

Live Activities are part of the app and widgets. When you work on notifications, check all of them. See the [user documentation](https://companion.home-assistant.io/docs/notifications/notifications-basic) for what users can do with them.

## Apple Watch

The watch app is in `Sources/Watch` and `Sources/WatchApp`, and its complications and widgets in `Sources/WatchWidgets`. Changes to actions, notifications, complications, or shared settings often need testing on the watch too. The watch has its own tests, which `bundle exec fastlane test` runs on a watch simulator.

## CarPlay

`Sources/CarPlay` has the templates, list items, filters, and actions for supported entities.

## Share and Matter

The share extension handles content shared to Home Assistant from other apps. The Matter extension is part of adding Matter devices. If your change touches incoming content or device setup, check these.

## Mac

The Mac app is built with Mac Catalyst from the same code. `Sources/MacBridge` has the Mac specific parts. Even if you only work on an iOS feature, shared code is compiled for the Mac too, so it must build there.

## The push server

`Sources/PushServer` is a standalone Swift package for the push relay. It is not part of the Xcode project, and has its own tests. It carries its own copy of the notification parser from `Sources/SharedPush`: when you change one, decide whether the other needs the same change. See [testing](/companion/apple/testing/#the-push-server).
