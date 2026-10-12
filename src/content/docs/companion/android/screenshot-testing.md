---
title: Android screenshot tests
description: Check that Compose UI in the Android app only changes on purpose, with Compose Preview Screenshot Testing.
sidebarLabel: Screenshot tests
sidebarGroup: Test
order: 2
---

Screenshot tests compare the UI against reference images in the repository. When a pixel changes, the test fails, so every UI change is a deliberate one. They test looks only, never logic.

They are especially useful when a UI library updates. The Wear Compose library, for example, has changed the look of the watch app between releases more than once, and screenshot tests caught it.

## How they work

The app uses [Compose Preview Screenshot Testing](https://developer.android.com/studio/preview/compose-screenshot-testing). It renders composables on the JVM, so no emulator is needed. That makes them much faster and cheaper than instrumentation tests.

Tests live in the `screenshotTest` source set. Reference images are stored per module:

| Module | Reference images |
| --- | --- |
| `:app` | `src/screenshotTestFullDebug/reference` |
| `:common` and `:wear` | `src/screenshotTestDebug/reference` |

## Write a screenshot test

- **Render the real composable**, not a simplified copy, in each meaningful state: loading, empty, error, and with several servers when that matters.
- **Reuse your previews.** Use the same composables and preview annotations, so previews and tests don't drift apart.
- **Cover sizes and themes**: small screens like a watch, large screens, light and dark mode. Use configuration annotations to set them.

## Run and update

Check that nothing changed:

```bash
./gradlew validateDebugScreenshotTest
```

After an intentional UI change, update the reference images:

```bash
./gradlew updateDebugScreenshotTest updateFullDebugScreenshotTest
```

Don't run the validate task right after an update: it compares against images you just generated from the same code. Look at the updated images instead, and check that only what you meant to change has changed. Explain the changes in your pull request.

## When CI disagrees with your machine

Rendering differs slightly between operating systems, for example in antialiasing (see this [Google issue](https://issuetracker.google.com/issues/348590914)). The threshold is kept as low as possible, so real problems are not masked. That means images you generate locally can fail on CI.

Don't chase pixel differences locally. A maintainer can run the **Update Screenshots** workflow, which regenerates the images on the same kind of host CI uses and commits them to your branch. It only works for branches in the main repository, not forks; for a fork, a maintainer handles it during review. The workflow does not start the pull request checks again: push a new commit afterwards to trigger them.
