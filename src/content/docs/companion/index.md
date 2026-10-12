---
title: Companion apps
description: The official Home Assistant apps for Android, iOS, iPadOS, macOS, watchOS, Wear OS, and the car. How they are built, and how to help build them.
---

The companion apps put Home Assistant in your pocket, on your wrist, and in your car. They show the same frontend you know from the browser, and add what only an app on the device can do: sensors, location, notifications, widgets, watch apps, and car screens.

There are two apps, each in its own repository, built by its own group of contributors:

| App | Runs on | Language | Repository |
| --- | --- | --- | --- |
| Android | Android phones and tablets, Wear OS, Android Auto, Android Automotive, Meta Quest | Kotlin | [home-assistant/android](https://github.com/home-assistant/android) |
| Apple | iPhone, iPad, Mac, Apple Watch, CarPlay | Swift | [home-assistant/iOS](https://github.com/home-assistant/iOS) |

Both talk to Home Assistant through the same integration in Core: `mobile_app`. That integration is a public API, so other apps can use it too.

This area is for developers who want to work on either app, and for anyone building an app of their own that talks to Home Assistant. You need to be comfortable with Kotlin and Android Studio, or with Swift and Xcode. If you want to help without writing code, there is plenty to do too: see [ways to help](#ways-to-help).

## Ways to help

- **Fix a bug or build a feature**: pick an issue in the Android or iOS repository.
- **Test betas**: join the [Android beta on Google Play](https://play.google.com/apps/testing/io.homeassistant.companion.android) or the [iOS beta on TestFlight](https://www.home-assistant.io/ios/beta/), and report what breaks.
- **Test pull requests**: install a build from a pull request and tell the author if it works. See [testing pull request builds](/companion/android/get-started/#test-a-pull-request-build).
- **Review**: everyone can comment on a pull request. Even a short review helps.
- **Translate**: both apps are translated on Lokalise. See [Translations](/translate/).
- **Document**: the user documentation lives at [companion.home-assistant.io](https://companion.home-assistant.io/), in the [companion.home-assistant](https://github.com/home-assistant/companion.home-assistant) repository.

## Start here

- [Your first contribution](/companion/first-contribution/): choose your platform, build the app, and open your first pull request.
- [How the apps fit in](/architecture/platform/companion-apps/): the big picture, from the web view to the push service.

## Android

- [Android overview](/companion/android/): the repository, the modules, and where to find what.
- [Get started](/companion/android/get-started/): set up Android Studio and build the app.
- [Architecture](/companion/android/architecture/) and [UI architecture](/companion/android/ui-architecture/): how the app and its screens are structured.
- [Testing](/companion/android/testing/): unit, screenshot, instrumentation, and end-to-end tests.
- [Submit a pull request](/companion/android/submitting/): the checklist and the review process.

## Apple

- [Apple overview](/companion/apple/): the repository, the targets, and where to find what.
- [Get started](/companion/apple/get-started/): set up Xcode, signing, and build the app.
- [Architecture](/companion/apple/architecture/) and [targets](/companion/apple/targets/): how the code is shared across iPhone, Watch, CarPlay, widgets, and Mac.
- [Submit a pull request](/companion/apple/submitting/): the checklist and the review process.

## The mobile app API

- [Mobile app API](/companion/mobile-app-api/): how an app connects to Home Assistant, registers itself, sends sensor data and location, and receives notifications. For both official apps, and for your own.

## Who to talk to

- Join the [Home Assistant Discord](https://www.home-assistant.io/join-chat) and pick the developer role under **Channels & Roles**. Then head to the [Android project thread](discord:android-project), or to the **#apple-apps** channel. Questions that go beyond one app, like the `mobile_app` integration, fit the **#developers** channel.
- Bugs and feature requests go to the issues of the [Android](https://github.com/home-assistant/android/issues) or [iOS](https://github.com/home-assistant/iOS/issues) repository.
- Questions about the `mobile_app` integration in Core go to the [core repository](https://github.com/home-assistant/core).
