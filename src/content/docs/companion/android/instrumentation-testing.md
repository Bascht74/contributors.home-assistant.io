---
title: Android instrumentation tests
description: Test the Android app on a real Android runtime, on emulators for every supported API level.
sidebarLabel: Instrumentation tests
sidebarGroup: Test
order: 3
---

Unit tests run on your JVM. Users run the app on Android, which has its own runtime and supports only part of the Java APIs on older versions. Instrumentation tests close that gap: they run on an emulator, on the same runtime users have.

Write unit tests first. Reach for an instrumentation test when the behavior depends on the real Android system.

## Why they matter

Some bugs only show at runtime on a specific Android version. The [Jackson](https://github.com/FasterXML/jackson) library is a real example: from version 2.14 it needs API 26, and nothing fails until the app runs on an older device. Only an instrumentation test, or a crash report from a user, catches that. See [this pull request](https://github.com/home-assistant/android/pull/5108) for how it played out.

## What they cover

- **Screens**, with Espresso and Compose UI tests, checking how a screen behaves when the user interacts with it.
- **Code without UI**, like foreground services, where you check the data and the interaction with the system.

Most of these tests should not depend on a Home Assistant server. Replace the server with fakes, or mocks with [MockK](https://mockk.io/). Testing against a real server is what the [end-to-end tests](/companion/android/e2e-testing/) are for.

## Where they run

On every pull request, the instrumentation tests of `:app` run on [Emulator.wtf](https://emulator.wtf), against every API level from `androidSdk-min` to `androidSdk-target`. The whole run takes seconds. See [continuous integration](/companion/android/ci/#instrumentation-tests) for how that works with forks.

The tests of `:wear`, `:automotive`, `:common`, and `:microwakeword` run on the regular Android emulator on GitHub Actions, because Emulator.wtf doesn't offer those targets. That is slower, so they cover fewer API levels.

## Emulators with an outdated WebView

The app shows the Home Assistant frontend in a WebView. An emulator system image ships with the WebView that was current when the image was published, and an emulator never gets WebView updates from the Play Store the way a real device does. The older the API level, the older that WebView.

When the WebView is too old for the frontend you run, the frontend doesn't render, or the WebView crashes. You are most likely to run into this on the oldest API levels the app supports.

To fix it, install a newer WebView APK on the emulator, as explained in [this Stack Overflow answer](https://stackoverflow.com/a/79514205/3289338).

If you run your own [frontend development server](/frontend/development/run/), you can also start it with `ES5=1`. It then also builds the legacy version of the frontend, which older WebViews can run:

```shell
ES5=1 pnpm dev
```

## Flaky emulators

Android emulators sometimes fail for no reason at all. The fix is to run the job again. Only maintainers can re-run a job, so ask in the pull request if you think it was a fluke.
