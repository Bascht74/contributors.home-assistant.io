---
title: Testing the Apple app
description: Unit, snapshot, UI, and end-to-end tests in the Apple project, mocking with Current, and the patch coverage gate.
sidebarLabel: Testing
order: 5
---

The Apple app runs on many targets, and a lot of code is shared between them. Tests keep that shared code stable while people change onboarding, widgets, notifications, the watch, and more.

## Run the tests

```bash
bundle exec fastlane test
```

This runs the `Tests-Unit` scheme on an iPhone simulator, and the watch tests on an Apple Watch simulator. In Xcode, select the `Tests-Unit` scheme and press <kbd>Command</kbd>+<kbd>U</kbd>.

## Where tests live

| Folder | What is tested |
| --- | --- |
| `Tests/App` | App behavior |
| `Tests/Shared` | Shared logic: models, the database, sensors, notifications, and utilities |
| `Tests/Widgets` | Widgets |
| `Tests/WatchAppTests`, `Tests/WatchComplications` | The watch app and its complications |
| `Tests/UI` | UI tests and the end-to-end test |
| `Tests/Mocks` | Mocks shared by the tests |

Tests mirror the structure of `Sources`. Shared helpers live in `Sources/SharedTesting`.

## Mock with Current

Every dependency lives in [`Current`](/companion/apple/architecture/#the-current-environment), so a test replaces what it needs in its setup:

```swift
override func setUp() {
    super.setUp()
    Current.date = { Date(timeIntervalSince1970: 1_000_000) }
    Current.servers = FakeServerManager()
}
```

## Snapshot tests

New SwiftUI views get snapshot tests, in light and dark mode, with the helpers from `SharedTesting`:

```swift
import SharedTesting

func testMyView() {
    assertLightDarkSnapshots(of: MyView())
}
```

Reference images live in `__Snapshots__` folders next to the tests. If you change a view on purpose, look at the updated images before you commit them.

## End-to-end test

`Tests/UI/OnboardingE2ETests.swift` runs onboarding against a real Home Assistant: from the welcome screen to the native settings screen that the frontend opens over the external bus. It runs every night in the `E2E` workflow, not on pull requests.

The elements it drives have identifiers from `AccessibilityIdentifier` in `Sources/App/Accessibility/`. Add a case there instead of matching on visible text, which translations would break.

To run it yourself, start the Home Assistant instance from `.github/e2e/homeassistant` (its README explains how), then:

```bash
bundle exec fastlane e2e
```

## The push server

`Sources/PushServer` is a separate Swift package with its own tests:

```bash
cd Sources/PushServer
swift test
```

## Patch coverage

CI requires at least 90% of the lines your pull request changes to be covered by unit tests. Below that, the **Patch coverage** check fails, and the job summary lists the lines no test runs. On pull requests from a branch in the repository itself, a bot also requests changes, and dismisses that review once a push clears the bar.

Only executable lines count. Files that no target of `Tests-Unit` builds, like watch-only or widget-only code, are skipped, and so are pull requests that change nothing coverable. When code really can't be unit tested, like UIKit plumbing, a maintainer can dismiss the review. Explain why in the pull request description.

You can get the same number locally. Run this from the root of the repository, not from `Sources/PushServer`:

```bash
bundle exec fastlane test
python3 Tools/xccov_to_lcov.py \
  fastlane/test_output/Tests-Unit.xcresult \
  --lcov fastlane/test_output/coverage.lcov
python3 Tools/diff_coverage.py fastlane/test_output/coverage.lcov \
  --base origin/main
```

## Good habits

- One behavior per test.
- Deterministic tests over timing-sensitive ones.
- Test close to the shared logic when a change affects several targets.
