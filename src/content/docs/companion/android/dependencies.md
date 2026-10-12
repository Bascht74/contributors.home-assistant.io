---
title: Android dependencies
description: The version catalog, dependency lockfiles, and Renovate in the Android app.
sidebarLabel: Dependencies
sidebarGroup: Write code
order: 4
---

The Android app keeps tight control over its dependencies. Every library is declared in one place, every resolved version is locked, and a bot keeps them up to date.

## The version catalog

All dependencies are declared in the [version catalog](https://docs.gradle.org/current/userguide/version_catalogs.html), `gradle/libs.versions.toml`. This is the only way to add a dependency. A module refers to it through the `libs` accessor:

```kotlin
dependencies {
    implementation(libs.kotlinx.coroutines.android)
}
```

## Lockfiles

The project uses Gradle [dependency locking](https://docs.gradle.org/current/userguide/dependency_locking.html). Each module has a `gradle.lockfile` with the exact version of every direct and transitive dependency, so builds are the same on every machine.

After you add or change anything in the catalog, update the lockfiles and commit them:

```bash
./gradlew alldependencies --write-locks
```

CI fails when the catalog changed but the lockfiles didn't.

## Renovate

[Renovate](https://docs.renovatebot.com/) opens pull requests to update dependencies, including the lockfiles. It waits three days after a release before it proposes it, so early problems get found by others first.

## Stable versions only

The project avoids alpha, beta, and release candidate versions of libraries. Exceptions are agreed on in a pull request, when a feature is only available in a pre-release. They come with a cost: the API can change with every update, and someone has to deal with that.
