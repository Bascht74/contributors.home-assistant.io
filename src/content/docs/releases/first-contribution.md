---
title: Your first beta test
description: Join the beta, run the next release a week before everyone else, and report what breaks.
order: 1
sidebarLabel: Your first contribution
---

Every month, a beta of the next release comes out a week before the release itself. Every bug found in that week is a bug that does not hit everyone else's home. Testing the beta is one of the most valuable things you can do, and you only need a Home Assistant installation to do it.

## 1. Know what you are signing up for

A beta is almost done, but not quite. Most of the time it works fine. Sometimes something breaks. Before you join:

- Test on an installation where a problem is an annoyance, not a disaster. If your heating or your alarm depends on Home Assistant, think twice, or test on a second installation.
- Make sure you have a recent backup. Home Assistant OS makes one before every update, if you let it.
- Expect several betas in one week. Fixes come in as they are found.

## 2. Join the beta channel

On Home Assistant OS:

1. Go to **Settings** > **System** > **Updates**.
2. In the top-right corner, open the three dots menu.
3. Select **Join beta channel**.
4. Install the update that shows up. If it does not show up, select **Check for updates** in the same menu.

You can also do it from the command line:

```bash
ha supervisor options --channel beta
ha supervisor reload
ha core update --backup
```

Running Home Assistant Container? Use the `beta` tag of the image, and recreate the container:

```bash
docker pull ghcr.io/home-assistant/home-assistant:beta
```

## 3. Read the beta release notes

The [beta release notes](https://rc.home-assistant.io/latest-release-notes/) explain what is new, and list the backward-incompatible changes. Read the backward-incompatible changes first: they tell you what might need a change on your side. Then try out the new features you care about.

## 4. Report what breaks

Found a problem? Before you report it:

- Check that it is new. Did it work in the current stable release?
- Search the issue tracker. Someone may have reported it already. If so, add what you know to that issue, instead of opening a new one.

Then open an issue in the right repository:

- Integrations, automations, and the core: [core issues](https://github.com/home-assistant/core/issues).
- The interface, dashboards, and cards: [frontend issues](https://github.com/home-assistant/frontend/issues).
- The documentation and release notes: [home-assistant.io issues](https://github.com/home-assistant/home-assistant.io/issues).

You need a free GitHub account to open an issue. New to GitHub? See [Use GitHub, without being a developer](/start/github/).

Fill in the issue template completely. Mention the beta version you run, like `2026.11.0b2`, what you expected, what happened instead, and the relevant log messages. In core, link the documentation page of the integration and attach its diagnostics file if it has one: the template asks for both. A clear report gets fixed faster.

### What happens after you report

- **Labels and integration owners.** In core, the Home Assistant bot adds an `integration:` label based on the integration you named, and mentions the [integration owners](/glossary/integration-owner/) of that integration, so the people who know it best get a notification.
- **Duplicate check.** Once an integration label is on the issue, a workflow in core looks for similar open issues. If it finds any, it links them in a comment and adds the `potential-duplicate` label. Have a look: if one of them is your problem, continue there.
- **Questions.** An integration owner or maintainer may ask for more details, like logs or diagnostics, or label the issue `needs-more-information`. Answer when you can, and keep testing the next betas.
- **The fix.** A fix starts as a normal pull request. During the beta week, it lands in one of the next betas. After the release, it goes into a patch release. See [Get a fix into a patch release](/releases/guides/patch-releases/).

An issue in core or the frontend without any activity for 90 days is marked `stale`, and closed 7 days later if nothing happens. A comment is enough to keep it open.

> [!TIP]
> Not sure if something is a bug, or how to report it? Ask in the **#beta** channel on the [Home Assistant Discord server](https://www.home-assistant.io/join-chat). Other testers and developers are there during the beta week.

## 5. Stay or leave

When the release comes out, you get it as a normal update. You can stay on the beta channel for the next month, or leave it with **Leave beta channel** in the same menu. Leaving does not downgrade you automatically: you get the next stable release when it is newer than what you run.

## What is next

- Read [How releases work](/releases/how-it-works/), so you know what happens when.
- Found a typo or something unclear in the beta release notes? That is worth fixing too. See [Release notes and the release party](/releases/guides/release-notes/).
