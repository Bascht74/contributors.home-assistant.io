---
title: Android
description: The Home Assistant app for Android, Wear OS, Android Auto, and Android Automotive. What is in the repository, and where to start.
order: 2
sidebarGroups:
  - Set up
  - Architecture
  - Write code
  - Test
  - Ship
---

The Android app started in 2019 and is now used by millions of people. Its center is a web view that shows the Home Assistant frontend. Around it sit native features: sensors that report from the phone, notifications, widgets, tiles, NFC tags, Assist, a Wear OS app, and car screens for Android Auto and Android Automotive.

The project is written entirely in Kotlin. New UI is Jetpack Compose. You will still find older code, like XML layouts and view binding, that predates the current guidelines. That code is migrated over time, and the pages here describe how new code should look.

## The repository

Everything lives in [home-assistant/android](https://github.com/home-assistant/android). It is one Gradle project with several modules:

| Module | What it is |
| --- | --- |
| `:app` | The phone and tablet app |
| `:automotive` | The Android Automotive app. Reuses the sources of `:app` |
| `:wear` | The Wear OS app |
| `:common` | Code shared by all apps: the data layer, sensors, the WebSocket and REST clients, the design system, and all strings |
| `:testing-unit` | Helpers shared by the unit tests of every module |
| `:lint` | The custom lint rules of the project |
| `:microwakeword` | On-device wake word detection |
| `:provides-sensor-processor` | A code generator for sensor registration |
| `build-logic` | Convention plugins that configure every module the same way |

The minimum and target SDK versions are in `gradle/libs.versions.toml`, under the `androidSdk-*` keys.

## Set up

- [Get started](/companion/android/get-started/): install Android Studio, build the app, and run it.
- [Push notifications](/companion/android/push-notifications/): set up your own Firebase project, if you work on notifications.

## Architecture

- [Architecture](/companion/android/architecture/): the principles, the tech stack, and how the modules fit together.
- [UI architecture](/companion/android/ui-architecture/): how a screen is built, from the view down to the repositories.
- [The frontend screen](/companion/android/frontend-screen/): the screen that hosts the web view, and the reference implementation of the UI architecture.
- [Flavors and targets](/companion/android/flavors-and-targets/): `full` and `minimal`, and the phone, car, watch, and TV builds.

## Write code

- [Compose and the design system](/companion/android/compose/): building UI with `HATheme` and the `HA*` components.
- [Best practices](/companion/android/best-practices/): strong types, concurrency, dependency injection, and failing fast.
- [Code style and linting](/companion/android/code-style/): KTLint, Detekt, and the Android linter.
- [Dependencies](/companion/android/dependencies/): the version catalog, lockfiles, and Renovate.
- [Debug tools](/companion/android/debugging/): the developer playground, StrictMode, and LeakCanary.

## Test

- [Testing](/companion/android/testing/): how to write tests, and unit tests with JUnit, MockK, Robolectric, and Turbine.
- [Screenshot tests](/companion/android/screenshot-testing/)
- [Instrumentation tests](/companion/android/instrumentation-testing/)
- [End-to-end tests](/companion/android/e2e-testing/)

## Ship

- [Submit a pull request](/companion/android/submitting/): the checklist, the template, and the review.
- [Continuous integration](/companion/android/ci/): what runs on your pull request, and after it is merged.
- [Releases](/companion/android/releases/): from a merged pull request to the Play Store, and building a signed release yourself.

## Who to talk to

- The [Android project thread](discord:android-project) on the [Home Assistant Discord](https://www.home-assistant.io/join-chat). Pick the developer role under **Channels & Roles** first.
- [Issues](https://github.com/home-assistant/android/issues) in the Android repository, for bugs and feature requests.
- For how the app works for users, see the [companion app documentation](https://companion.home-assistant.io/).
