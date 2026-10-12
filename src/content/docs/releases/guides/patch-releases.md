---
title: Get a fix into a patch release
description: How a bug fix reaches the beta and the patch releases, and what you can do to help it get there.
order: 4
---

Once a release is out, new features wait for next month. Bug fixes do not have to. During the beta week, fixes go into the next beta. After the release, they go into the weekly patch releases.

## How it works

All fixes start the normal way: a pull request against the `dev` branch. There is no separate branch to target, and you do not have to open a second pull request.

When a fix should go into the beta or the next patch release, the pull request is added to the milestone of that version on GitHub, like `2026.11.1`. When the release team prepares the beta or patch release, they take every merged pull request in that milestone, and copy its changes into the release branch. That is called cherry-picking. The pull request then gets the `cherry-picked` label, so you can see it made it in.

In the release notes, fixes picked during the beta week are marked as beta fixes.

## What gets picked

Patch releases only contain bug fixes, never features. The release team decides case by case, and these things make a fix more likely to be picked:

- It fixes a regression: something that worked in the previous release, and broke in this one.
- It fixes a bug that affects a lot of people, or breaks something important.
- It fixes a problem with a new integration or feature of this release.
- It is small and safe. A patch release should never break something else.

Dependency updates that fix a bug, or that are needed because a service changed its API, can be picked too.

## What you can do

- **Say it in the pull request.** Explain which issue it fixes, and that it is a regression or affects the current release. Link the issue.
- **Keep the fix small.** A focused fix is easy to review, and easy to pick. A fix mixed with a refactor is not.
- **Ask for it.** If you think a merged fix should be in the next patch release, mention it in the pull request, and ask a maintainer of the integration or the release team. Do not take it personally when the answer is "next month": the release team weighs every pick against the risk of breaking something else.

## Who decides

Maintainers and the release team decide what goes into a milestone. The release team does the cherry-picking and publishes the release. See [Who does what](/releases/reference/roles/).
