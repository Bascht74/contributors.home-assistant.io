---
title: Who does what
description: The people involved in a Home Assistant release, and what each of them does.
order: 2
---

A release is the work of hundreds of people. Most of them never think of themselves as part of the release. Here is who does what.

## Contributors

Everyone who opens a pull request. For the release, your part is:

- Getting your pull request merged before the beta starts, if you want it in this month's release.
- Writing a clear [backward-incompatible change section](/releases/guides/backward-incompatible-changes/) when your change requires action from users.
- Opening the documentation pull request on the `next` branch of [home-assistant.io](https://github.com/home-assistant/home-assistant.io), together with the code.

## Maintainers and integration owners

[Maintainers](/glossary/maintainer/) review and merge pull requests. [Integration owners](/glossary/integration-owner/) look after a specific integration. For the release, they:

- Decide what gets merged before the beta starts.
- Fix problems found in the beta, in the code they know best.
- Flag fixes that should go into the beta or the next patch release. See [Get a fix into a patch release](/releases/guides/patch-releases/).

## Beta testers

Everyone on the [beta channel](/releases/first-contribution/#2-join-the-beta-channel). They run the next release a week early, in real homes, and report what breaks. Without them, those bugs would hit everyone. You can be one: see [Your first contribution](/releases/first-contribution/).

## Documentation reviewers

They review and merge the documentation pull requests on the `next` branch, so the documentation of new features is ready on release day. See [Writing docs](/writing/).

## Translators

They translate the new text on Lokalise. Translations are pulled in with every build, so their work lands in the beta and the release without a separate step. See [Translations](/translate/).

## The release team

The release team runs the release itself. Steps only they do:

- Creating the betas, releases, and patch releases.
- Cherry-picking the fixes of a milestone into the release branch.
- Publishing the release.
- Writing and publishing the release notes, with help from others.

The release team uses the [release helper scripts](https://github.com/home-assistant/hass-release) to generate the changelog, cherry-pick milestones, and find documentation pull requests that are not merged yet.

## Creators

Members of the [Creator Network](/community/reference/programs/#creator-network) meet with the team on beta day, and can give feedback on a release before it comes out. Their videos and articles help many people understand what is new.
