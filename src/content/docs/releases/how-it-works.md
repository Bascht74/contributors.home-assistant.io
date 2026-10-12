---
title: How releases work
description: The monthly release cycle of Home Assistant, from the first line of code to the last patch release.
order: 2
sidebarLabel: How it works
---

Home Assistant releases on a fixed schedule. A new version comes out on the first Wednesday of every month. The week before, there is a beta. After the release, patch releases with fixes follow, usually once a week. Then the cycle starts again.

The [Open Home Foundation](/glossary/open-home-foundation/) sets this schedule. The [release FAQ](https://www.home-assistant.io/faq/release/) on home-assistant.io describes it for users.

## The cycle at a glance

| When | What happens |
| --- | --- |
| All month | New features and fixes are merged into the development branch. Nightly builds are made from it every day. |
| Wednesday, a week before the release | The beta starts. The development branch is frozen into a beta, the first one ends in `b0`. |
| During the beta week | Fixes for problems found in the beta land in new betas: `b1`, `b2`, and so on. |
| First Wednesday of the month | The release, like `2026.11.0`. Release notes go live, and there is a release party live stream. |
| The weeks after | Patch releases with bug fixes, like `2026.11.1` and `2026.11.2`. The goal is one a week, aiming for Friday. |

The exact dates are in the [events calendar](/community/reference/events/).

## Development

All new work goes into the `dev` branch of each repository, through pull requests. The version on that branch always points to the next release, with a development marker, like `2026.11.0.dev0`.

Every night, a build is made from the `dev` branch, with a version like `2026.11.0.dev202610100230`. People who want to live on the edge can run those builds through the dev channel. It is the place where new code meets real homes for the first time.

Documentation for new features is written at the same time, on the `next` branch of home-assistant.io. It goes live together with the release. See [Writing docs](/writing/).

## The beta

On the Wednesday a week before the release, the release team creates the first beta from the `dev` branch. From that moment, the release is feature complete: new features go to the next month.

The beta is published on the [beta channel](/releases/first-contribution/#2-join-the-beta-channel). Everyone who joined that channel gets it as an update. The [beta release notes](https://rc.home-assistant.io/latest-release-notes/) and the documentation for the beta are on rc.home-assistant.io.

During the beta week, testers report problems, and developers fix them. Those fixes are merged into `dev` first, and then the release team copies them into the beta. That copying is called cherry-picking. Every round of fixes becomes a new beta. See [Get a fix into a patch release](/releases/guides/patch-releases/) for how a fix gets picked.

## The release

On the first Wednesday of the month, the last beta becomes the release. The release team publishes it, and Home Assistant installations on the stable channel get the update.

At the same time, the release notes are published on the [Home Assistant blog](https://www.home-assistant.io/blog/categories/core/), and the documentation for the new features goes live on home-assistant.io. Later that day, there is a release party: a live stream on YouTube about what is new. See [Release notes and the release party](/releases/guides/release-notes/).

## Patch releases

Some bugs only show up once many people run a release. Patch releases fix those. They only contain bug fixes, never new features, and the goal is one patch release a week, aiming for Friday, until the next release comes out.

Each patch release gets a short changelog, added to the release notes of that month under **Patch releases**.

## The frontend and other parts

The user interface, the frontend, has its own repository and version numbers, but it follows the same rhythm. A new frontend version is bumped into core as part of the release work, so every Home Assistant release ships with a frontend that belongs to it.

Translations are pulled from Lokalise every time Home Assistant is built, so translators do not need a release step of their own. See [How translation works](/translate/how-it-works/).

## What is done by the release team

Some steps are only done by the release team, and you do not need to worry about them:

- Creating the beta, the releases, and the patch releases.
- Choosing and cherry-picking which fixes go into a beta or patch release.
- Publishing the builds, and updating the version information that installations check for updates.
- Writing and publishing the release notes, with help from others.

What everyone else can do is make those steps easy: test the beta, report problems clearly, write a good backward-incompatible change section, and keep pull requests and their documentation ready on time.
