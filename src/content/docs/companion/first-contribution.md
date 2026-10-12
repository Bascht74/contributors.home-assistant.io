---
title: Your first companion app contribution
description: Pick Android or Apple, build the app on your machine, and open your first pull request.
sidebarLabel: Your first contribution
order: 1
---

Your first contribution to a companion app does not have to be a feature. A small bug fix, a lint warning that nobody fixed, or a missing test is a great start. It gets you through the whole loop once: build, change, test, pull request, review.

## 1. Choose your platform

The two apps share nothing but the API they talk to. Pick the one that matches your skills and the device you use every day:

| | Android | Apple |
| --- | --- | --- |
| Language | Kotlin | Swift |
| IDE | Android Studio | Xcode (on a Mac) |
| Build system | Gradle | Xcode with Swift Package Manager, Fastlane for tooling |
| UI | Jetpack Compose (legacy XML being migrated) | SwiftUI and UIKit |
| Repository | [home-assistant/android](https://github.com/home-assistant/android) | [home-assistant/iOS](https://github.com/home-assistant/iOS) |

You need a Mac to work on the Apple app. For Android, any machine that runs Android Studio works.

## 2. Say hi

Join the [Home Assistant Discord](https://www.home-assistant.io/join-chat), pick the developer role under **Channels & Roles**, and head to the [Android project thread](discord:android-project), or to the **#apple-apps** channel. Tell people what you want to work on. It saves you from building something someone else is already building.

## 3. Build the app

Follow the setup guide for your platform:

- [Get started with Android](/companion/android/get-started/)
- [Get started with Apple](/companion/apple/get-started/)

Run the app on an emulator, a simulator, or your own device, and connect it to a Home Assistant instance. A test instance is best: the app registers itself as a new device on every server you connect it to.

## 4. Find something to work on

Good first targets:

- **An open issue**: browse the [Android issues](https://github.com/home-assistant/android/issues) or [iOS issues](https://github.com/home-assistant/iOS/issues). Something small that you can reproduce is ideal.
- **Lint baselines** (Android): the app, wear, automotive, common, and microwakeword modules each have a `lint-baseline.xml` with known issues that were never fixed. Fix one, remove it from the baseline, done. See [code style and linting](/companion/android/code-style/#baselines).
- **Missing tests**: add a test for code that has none. Both repositories value tests highly, and the Apple repository even requires most of the lines you change to be covered.
- **Something that annoys you**: a bug you hit yourself is the best first topic, because you already know why it matters.

## 5. Open a pull request

Fork the repository, create a branch, make your change, and open a pull request against `main`. Fill out the pull request template completely; it has a checklist and asks how you used AI tools. Read the [AI policy](/start/ai-policy/) before you start.

The submit guides have the details:

- [Submit an Android pull request](/companion/android/submitting/)
- [Submit an Apple pull request](/companion/apple/submitting/)

If your change is visible to users, it also needs a pull request in the [user documentation](https://github.com/home-assistant/companion.home-assistant).

> [!NOTE]
> A review can take a while. Be patient, and make sure CI is green in the meantime.

## What is next

- Read the architecture of your platform: [Android](/companion/android/architecture/) or [Apple](/companion/apple/architecture/).
- Curious how the app talks to Home Assistant? Read the [mobile app API](/companion/mobile-app-api/).
