---
title: Report a bug
description: Which repository to report a bug in, what the bug report forms ask and where to find it, and what happens after you report.
order: 3.5
---

A good bug report is one of the most useful things you can give the project. You don't need to write code for it, only a free [GitHub](https://github.com/signup) account and a bit of patience. This page helps you pick the right place, gather what the form asks for, and know what to expect afterwards.

Bug reports are for things that don't work the way they should. A question about your own setup goes to the [help page](https://www.home-assistant.io/help/), and an idea for something new goes to [feature requests](https://github.com/home-assistant/feature-requests/discussions).

## Before you report

- **Update first.** Check that the problem still happens on the latest version. Several forms ask you to confirm this.
- **Search for an existing issue.** Use the search box on the **Issues** tab of the repository. Found one that matches? Add a 👍, or a comment with anything new you know, instead of opening a second one.
- **Security problem?** Don't report it here: issues are public. [Report a vulnerability](/security/report-a-vulnerability/) privately instead.
- **Write in English.** Everyone can follow along that way. Using a translation tool is fine: see the [AI policy](/start/ai-policy/#non-native-english-speakers).

## Pick the repository

Each part of Home Assistant has its own issue tracker. Report the problem where the code lives:

| The problem is in | Report it in |
| --- | --- |
| An integration, automations, or anything else in Home Assistant Core | [core](https://github.com/home-assistant/core/issues) |
| The interface: dashboards, cards, settings screens, and dialogs | [frontend](https://github.com/home-assistant/frontend/issues) |
| The Supervisor: updates, backups, and installing apps | [supervisor](https://github.com/home-assistant/supervisor/issues) |
| Home Assistant OS, the operating system itself | [operating-system](https://github.com/home-assistant/operating-system/issues) |
| One of the official apps | [addons](https://github.com/home-assistant/addons/issues) |
| The Android app, Wear OS, or Android Auto | [android](https://github.com/home-assistant/android/issues) |
| The iOS, iPadOS, watchOS, or macOS app | [iOS](https://github.com/home-assistant/iOS/issues) |
| The documentation on home-assistant.io | [home-assistant.io](https://github.com/home-assistant/home-assistant.io/issues) |

Not sure? A dashboard that looks wrong belongs to the frontend, even in a companion app. The iOS form suggests a quick test: if the problem also shows up in Safari, report it in the frontend. Still unsure where it fits? Ask on [Discord](https://www.home-assistant.io/join-chat/) first.

On the **New issue** page of a repository, select the bug report form. The other options on that page point you to the right place for support and feature requests.

## What the forms ask

Every form asks for a clear description of the problem, and most ask for the steps to reproduce it. Write those as numbered steps someone else can follow. Then each form asks for its own details.

### Home Assistant Core

- The version of Home Assistant Core that has the problem, and the last version that worked, if you know it.
- Your installation type: Home Assistant OS, Container, Supervised, or Core.
- The integration that causes the problem, and a link to its documentation page on home-assistant.io. The link helps the right people find your issue.
- [Diagnostics](/glossary/diagnostics/) of the device or integration, if it offers them.
- A YAML example that reproduces the problem, if it applies, and anything useful from the logs.

### Frontend

- A checklist: you updated Home Assistant, cleared the cache of your browser, tried another browser, and tried [safe mode](https://www.home-assistant.io/blog/2023/11/01/release-202311/#restarting-into-safe-mode) to rule out custom cards and other custom resources.
- What you expected to happen, next to what happened.
- The Home Assistant Core version, your browser and its version, and the operating system it runs on.
- For a problem with how an entity is shown: its state and attributes, from the **Details** view of the more info dialog.
- The YAML of the cards involved, and any errors in the console of your browser.

### Supervisor

- The form is for supported setups only. It still offers Home Assistant OS and Home Assistant Supervised as installation types, but Supervised is no longer a supported installation type. See [installation types](/os/installation-types/).
- The Supervisor logs, the system information, and, if you can, the Supervisor diagnostics.

### Home Assistant OS

- The image you use, like `generic-x86-64` or `rpi5-64`, and the version of Home Assistant OS.
- Whether the problem started after an update of the operating system.
- Hardware details, especially for bare-metal x86 installations, and any USB devices you have attached. In a virtual machine, the hypervisor and its version.
- The Supervisor logs and the host logs.

The form asks you to test with the latest version first. If it looks like a regression, check that the problem goes away on the previous version. You can go back with `ha os update --version x.y`, where `x.y` is the version you want.

### Android

- The version of the app, the Android version, and the device model. For Wear OS, list both the phone and the watch.
- The Home Assistant version, and the last version that worked.
- The logs of the app, and a screenshot or video of the problem. For a notification problem, the YAML you used.

### iOS and macOS

- The device model and software version, from **Settings** > **General** > **About** on your device.
- The app version, from **App Configuration** > **About** in the app. Include the number in brackets.
- The Home Assistant Core version, what you expected to happen, and screenshots.

## Where to find it

Home Assistant shows most of what the forms ask for, if you know where to look.

- **Versions and installation type:** go to **Settings** > **System** > **Repairs**, open the three dots menu in the top right, and select **System information**. The copy button at the bottom copies all of it, for forms that ask for the full system information.
- **Diagnostics:** go to **Settings** > **Devices & services**, open the integration or the device, and select **Download diagnostics** in its three dots menu. Drag the downloaded file into the form. Don't paste its contents. [Debug logs and diagnostics](https://www.home-assistant.io/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) on home-assistant.io explains more.
- **Logs:** go to **Settings** > **System** > **Logs**. Choose **Supervisor** or **Host** in the top right for those logs. In the Home Assistant CLI, `ha supervisor logs` and `ha host logs` show the same.
- **Android app logs:** in the app, go to **Settings** > **Companion App Troubleshooting** > **Show and Share Logs**. For Wear OS, the form asks for the LogCat logs of the watch.
- **Browser errors:** open the developer tools of your browser, and copy the errors from its console.

Before you paste anything, remove passwords, private URLs, and other personal details.

## After you report

The bug report forms of the frontend, Android, and iOS add the `bug` label by themselves. Home Assistant Core does more:

- **A label for the integration.** A bot adds a [label](/glossary/label/) like `integration: hue`, using the documentation link from your report. It also mentions the [integration owners](/glossary/integration-owner/) of that integration, so they know about your issue.
- **A duplicate check.** Once an integration label is added, a workflow compares your issue with other issues for the same integration from the last six months, using an AI model. If it finds likely duplicates, it lists them in a comment and adds the `potential-duplicate` label. Look at them: if one is the same problem, close yours and add your details there. If yours is different, say how.
- **A language check.** An issue that isn't in English is closed with the `non-english` label, and a comment asks you to open it again in English.
- **Questions.** An integration owner or maintainer may ask for more details, like logs or diagnostics, or add the `needs-more-information` label. Answer when you can. Without answers, an issue can't move forward.

### Keep it alive

An issue without activity for a while gets the `stale` label, and is closed if nothing happens after that. In Home Assistant Core, that's after 90 days, and the issue closes 7 days later. Still have the problem? Check that it happens on the latest version, and say so in a comment. That resets the clock. Once an issue is closed, a bot locks it after a while. [Stale and locked](/start/pull-requests/#stale-and-locked) has the timings of every repository.

### When it's fixed

A fix comes in a pull request, from whoever picks it up. That can be you. Once it's merged, it reaches everyone in the next release. An urgent fix can go into a patch release sooner: the reviewer decides that, and adds the pull request to the milestone of the next patch release. Want to try the next release before everyone else? [Join the beta](/releases/first-contribution/).
