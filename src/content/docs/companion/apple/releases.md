---
title: Apple releases
description: How a change to the Apple app travels from a merged pull request to App Store Connect, how versions are set, and how a Mac build becomes a GitHub release.
sidebarLabel: Releases
order: 8
---

Every merged pull request is built, signed, and uploaded to App Store Connect. From there, builds reach TestFlight testers and the App Store. This page describes the parts of that path that live in the repository, and how to build a release yourself.

## From merge to App Store Connect

### Every push to main

When a pull request is merged into `main`, the `distribute.yml` workflow builds two apps with Fastlane:

- **iOS**: `bundle exec fastlane ios build` archives the app for the App Store and uploads it to App Store Connect.
- **Mac**: `bundle exec fastlane mac build` builds the Mac app twice from one archive. A Developer ID version, which Apple notarizes, and a Mac App Store package, which is uploaded to App Store Connect.

Each run also keeps its builds as artifacts: the iOS `.ipa`, the Developer ID Mac app (`mac-developer-id.zip`), the Mac App Store package, and the debug symbols.

The build number is the `CURRENT_PROJECT_VERSION` from `Configuration/Version.xcconfig`, followed by the number of the workflow run. That run number is what ties a build in App Store Connect back to the commit it came from.

### TestFlight

Anyone can [join the TestFlight beta](https://www.home-assistant.io/ios/beta/). Beta users find the problems that tests can't.

Features that aren't ready for everyone yet can ship to TestFlight only, behind `Current.isTestFlight`. Taking such a feature out of beta is merging its draft pull request that removes the gate. See [rules for every change](/companion/apple/architecture/#rules-for-every-change).

Moving a build on to TestFlight testers and to the App Store happens in App Store Connect, not in the repository.

### Setting the version

The version number users see is the `MARKETING_VERSION` in `Configuration/Version.xcconfig`. A maintainer changes it with the **Version: Set Version** workflow (`set_version.yml`), which runs `bundle exec fastlane set_version` and opens a pull request with the new version.

### Mac releases on GitHub

The Developer ID Mac app is also published on the [GitHub releases page](https://github.com/home-assistant/iOS/releases).

1. A maintainer runs the **Tag macOS Release** workflow with a release tag, like `release/2026.5.0/2026.1987`, and a commit on `main`. The last number of the tag is the run number of the Distribute run that built that commit.
2. The workflow waits until that Distribute run has succeeded, tags the commit, and starts the **Release macOS** workflow.
3. **Release macOS** creates a GitHub pre-release with generated release notes, and attaches the Developer ID app from the Distribute run.

Running it again for an existing release updates that release, and keeps it a pre-release or not, the way a maintainer left it.

### Store listing

The App Store description, keywords, and release notes live in `fastlane/metadata`, one folder per language. They are translated on [Lokalise](/translate/), like the strings of the app. The `update_lokalise_metadata` lane uploads the store text to Lokalise, and `update_asc_metadata` uploads the translations to App Store Connect.

## Build a release yourself

You only need this if you have access to the Apple developer team of the project. Both lanes sign with the team's certificates and upload to App Store Connect.

Fastlane reads its configuration, like the Apple ID and team IDs, from the environment or a `.env` file. See [`.env.sample`](https://github.com/home-assistant/iOS/blob/main/.env.sample) for the values. Then:

```bash
# Build and upload the Mac app
bundle exec fastlane mac build

# Build and upload the iOS app
bundle exec fastlane ios build
```

Both save their builds to `build/`.

For your own device, you don't need any of this: run the `App-Debug` scheme with your own team, as described in [get started](/companion/apple/get-started/#3-set-up-code-signing).
