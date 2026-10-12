---
title: Get started with Apple
description: Install Xcode and the Ruby tooling, set up code signing, and run the Home Assistant app on a simulator or your own device.
sidebarLabel: Get started
order: 1
---

You need a Mac. This page takes you from a fresh clone to the app running in the simulator.

## Requirements

- **Xcode**: the version the project currently requires is in the [README](https://github.com/home-assistant/iOS#getting-started). The project follows new Xcode releases quickly, so at times that is a beta from [Apple Developer Downloads](https://developer.apple.com/download/).
- **Ruby**: for Bundler and Fastlane, which run the linters and tests. The version is in `.ruby-version`.
- **An Apple developer team ID**, for code signing.

Third party libraries are Swift packages. Xcode resolves them on its own.

## 1. Fork, clone, and branch

1. Fork [home-assistant/iOS](https://github.com/home-assistant/iOS) on GitHub.
2. Clone your fork and create a branch:

   ```bash
   git clone https://github.com/<your-github-username>/iOS.git
   cd iOS
   git checkout -b fix-widget-refresh
   ```

## 2. Install the Ruby tooling

Pick one way to get Ruby, then install the gems. With [mise](https://mise.jdx.dev/):

```bash
brew install mise
mise install
bundle install
```

With [rbenv](https://github.com/rbenv/rbenv):

```bash
brew install rbenv ruby-build
rbenv install
bundle install
```

The Ruby version is in `.ruby-version`. If you already have a matching Ruby, `bundle install` is enough.

## 3. Set up code signing

The app uses entitlements that need code signing, even in the simulator. Debug builds use automatic provisioning, but you need to tell Xcode which team and bundle IDs to use.

Create `Configuration/HomeAssistant.overrides.xcconfig`:

```text
DEVELOPMENT_TEAM = YourTeamID
BUNDLE_ID_PREFIX = some.bundle.prefix
```

- `DEVELOPMENT_TEAM` is your team ID, from the [Apple developer portal](https://developer.apple.com/account). It looks like `ABCDEFG123`.
- `BUNDLE_ID_PREFIX` is a prefix you control, so Xcode can create provisioning profiles for it.

Git ignores this file. Xcode generates the profiles for your team, and features your team doesn't have, like critical alerts, are turned off.

## 4. Run the app

1. Open `HomeAssistant.xcodeproj` in Xcode.
2. Select the **App-Debug** scheme.
3. Select a simulator or your device.
4. Build and run.

Connect it to a test instance of Home Assistant if you can: each onboarding registers a new device on the server.

## Handy commands

```bash
# Check formatting and lint, without changing files
bundle exec fastlane lint

# Fix what can be fixed automatically
bundle exec fastlane autocorrect

# Run the unit tests
bundle exec fastlane test

# Run autocorrect before every commit
bundle exec fastlane install_git_hooks
```

## Only testing the frontend

Working on the [frontend](/frontend/) and want to see it in the app? You don't need to build the app:

1. Install Xcode, and open the simulator from **Xcode** > **Open Developer Tool** > **Simulator**.
2. Download the `ios-simulator` artifact from a recent run of the [CI workflow](https://github.com/home-assistant/iOS/actions/workflows/ci.yml) on `main`.
3. Drag the `.app` onto the simulator and launch it.
4. In Safari, turn on the **Develop** menu in the advanced settings. Then use **Develop** > **Simulator** to open Web Inspector on the app's web view.

## AI tools

The repository has instructions for AI coding tools in `AGENTS.md`, and skills in `.agents/skills/`, like `ha-ios-architecture`, `ha-ios-testing`, and `ha-ios-workflow-ci`. The pull request template asks whether you used AI, and how. [Contribute with AI tools](/start/ai-tools/) lists every skill, and explains what the [AI policy](/start/ai-policy/) asks of you.

## What is next

- Read the [architecture](/companion/apple/architecture/) and the [targets](/companion/apple/targets/).
- Check the [code style](/companion/apple/code-style/) before your first pull request.
