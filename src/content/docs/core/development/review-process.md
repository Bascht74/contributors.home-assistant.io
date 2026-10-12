---
title: After you open a pull request
description: What happens after you open a pull request to Home Assistant Core, and what you can do to help it along.
sidebarGroup: Pull requests
order: 3
---

Your pull request is open. Now it waits for a [review](/glossary/review/). What happens next is mostly the same in every Home Assistant repository: the bots, the wait, review comments, and stale pull requests. [Pull requests and reviews](/start/pull-requests/#after-you-open-it) explains all of it. This page adds what is specific to core.

## Who reviews

Maintainers merge pull requests. The [integration owners](/glossary/integration-owner/) of an integration, listed in its `manifest.json`, are asked for a review automatically when you change it. But anyone can review: "I tested this with my device, and it works" already helps.

A new tier on the quality scale needs the approval of a member of the core team. See [raise the tier of an integration](/core/quality-scale/raise-tier/#the-review).

## Automated reviewers

Two automated reviewers in core comment on pull requests before a human looks at them. They comment, they don't decide.

- **Quality scale reviewer**: runs when a pull request that changes an integration is opened, reopened, or marked ready for review. It checks the change against the [quality scale](/core/quality-scale/) rules the integration marks as `done` or `exempt` in its `quality_scale.yaml`, and posts an inline comment on every line that breaks one. When nothing breaks a rule, it leaves one short comment. Very large pull requests are skipped.
- **Check requirements**: runs when a pull request changes a requirements file. For every new or updated Python package, it checks that the source repository is public, that your description links to it (for a new package) or to a changelog or comparison of the two versions (for an update), how the package is published to PyPI, and more. It posts the result as one comment.

Read their comments like you read any review. When you think one is wrong, say why in a reply.

## What blocks the merge

Next to CI, a bot sets a few status checks on your pull request. They must be green before a maintainer can merge it:

- `required-labels`: red while the pull request has no type label, like `bugfix` or `new-feature`. The bot adds that label from the box you check under "Type of change" in the template, so check exactly one.
- `docs-missing`: red while the pull request has the `docs-missing` label, or when a new integration or platform has no link to a documentation pull request on [home-assistant.io](https://www.home-assistant.io/). The template has a field for that link under "Additional information".
- `cla-bot`: red until you sign the Contributor License Agreement.
- `code-owner-approval`: for a Platinum integration, red until one of its integration owners approves the pull request.
- `blocking-label-awaiting-frontend`: red while the pull request has the `awaiting-frontend` label, because it waits for a change in the frontend.

## What moves faster

Bug fixes, code quality improvements, and pull requests with tests go before new features. Small pull requests go before big ones. Changes that need someone with specific knowledge, like an architectural change or an integration owner who is not around, take longer.

Tests help more than anything else. They show your code works, keep it working, and help reviewers understand the problem you solved.

## When changes are requested

When a reviewer requests changes, a bot turns your pull request into a draft. Push your fixes as new commits: do not amend, squash, or rebase what you already pushed. When you have addressed every comment and CI passes, select **Ready for review**. The bot then lets the reviewers who requested changes know it is their turn again.

## Keep it up to date

After a week or so without activity, [bring in the latest `dev`](/core/development/catching-up/) with a merge, and run the tests again. Then your pull request is ready to go when the review starts.

## Fixes for a patch release

Home Assistant releases monthly, with patch releases in between. If your fix should go into the next patch release, say so clearly in the description. The reviewer checks that it qualifies, and adds it to the milestone of the next patch release.

## Use the wait

Review other pull requests while you wait. It is the best way to make the queue move, and to learn how core works. [Reviewing pull requests](/core/development/reviewing/) tells you what to look for.
