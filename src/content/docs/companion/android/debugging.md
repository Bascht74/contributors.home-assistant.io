---
title: Android debug tools
description: The developer playground, the Compose catalog, StrictMode, and LeakCanary in debug builds of the Android app.
sidebarLabel: Debug tools
sidebarGroup: Write code
order: 5
---

Debug builds of the Android app come with a few tools that make development faster and catch problems early. None of them are in release builds.

## The developer playground

The app depends on a server and a web view, so trying something often means going through onboarding and a few screens first. The developer playground skips that. It is a separate launcher shortcut in debug builds, with its code in the `app/src/debug` source set.

From the playground you can, among other things, open the [Compose catalog](/companion/android/compose/#the-compose-catalog) of all `HA*` components.

Use the playground however you like. Only commit changes that help other developers too, and follow the same code style. Translations are not needed there. Good examples: a button that crashes the app on purpose to test crash reporting, or a screen that shows all components and themes.

## StrictMode

[StrictMode](https://developer.android.com/reference/android/os/StrictMode) is on in debug builds. It catches disk and network access on the main thread, and behavior that newer Android versions deprecate. The VM policy crashes the app; the thread policy logs. Keep an eye on the log while you work.

If StrictMode blocks you, turn it off for a build:

```bash
./gradlew :app:assembleFullDebug -PnoStrictMode
```

Or set `noStrictMode=true` in `gradle.properties`. If you had to turn it off, open an issue or mention it on [Discord](https://www.home-assistant.io/join-chat/), so the underlying problem gets fixed.

## LeakCanary

[LeakCanary](https://square.github.io/leakcanary/) is included in debug builds and reports memory leaks. If it reports one, open an issue. If the leak comes from a library and can't be fixed now, document it.

To build without it, for example for performance testing:

```bash
./gradlew :app:assembleFullDebug -PnoLeakCanary
```

Or set `noLeakCanary=true` in `gradle.properties`, in the project or in your Gradle user home.

> [!WARNING]
> Without LeakCanary, the resolved dependencies change, and Gradle complains about the lockfile. Update the lockfiles locally as described in [dependencies](/companion/android/dependencies/#lockfiles), but don't commit those changes.

## FailFast

`FailFast` crashes debug builds when it catches an error that release builds would quietly survive. The log shows a big `CRITICAL FAILURE: FAIL-FAST` banner with the stack trace. See [fail fast](/companion/android/best-practices/#fail-fast).
