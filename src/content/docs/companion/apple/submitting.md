---
title: Submit an Apple pull request
description: The checklist, the pull request template, and what to expect during review in the Apple repository.
sidebarLabel: Submit a pull request
order: 6
---

Once your change is ready, open a pull request against `main` in [home-assistant/iOS](https://github.com/home-assistant/iOS).

## Before you open it

- **Run autocorrect and lint**: `bundle exec fastlane autocorrect`, then `bundle exec fastlane lint`.
- **Run the tests**: `bundle exec fastlane test`. Add or update tests for the behavior you changed. Remember the [patch coverage](/companion/apple/testing/#patch-coverage) gate.
- **Build what you touched.** Check whether your change affects widgets, the watch, CarPlay, extensions, or the Mac. See [targets](/companion/apple/targets/).
- **Keep it small.** One idea per pull request. If it grows, split it into follow-ups.
- **Gate unfinished features** with `Current.isTestFlight`, and open the draft pull request that removes the gate next to it. See [rules for every change](/companion/apple/architecture/#rules-for-every-change).
- **Read the [AI policy](/start/ai-policy/).** You can use AI tools, but you must understand and be able to explain everything you submit. Pull requests from autonomous agents are closed.

## The pull request

Don't delete anything from the template. Fill out:

- **AI policy**: confirm you read it, and select exactly one option that describes how you used AI.
- **Summary**: what you changed and why.
- **Screenshots**: for UI changes outside the frontend, in light and dark mode.
- **Documentation**: changes that add, change, or remove functionality need a pull request in the [user documentation](https://github.com/home-assistant/companion.home-assistant). Link it.

A draft pull request is a good way to get early feedback on direction or architecture before everything is polished.

## Review

Reviewers look at:

- Whether it is correct.
- Regressions on other targets.
- Test coverage.
- Whether it is maintainable.
- Whether shared code is in the right module.

CI is part of the review, not a replacement for it. Address comments in focused follow-up commits, run the linters and tests again, and ask for another review when CI is green. Answer questions from maintainers in your own words.

## Keep your branch up to date

You don't need to update your branch every time `main` moves. Update it when there is a reason: a conflict, a CI failure caused by recent changes, or a fix on `main` you need. Before review, rebasing is fine. Once review has started, pick the update that disturbs the existing discussion least.

## Strings

Translations are managed on [Lokalise](/translate/). If you add or remove strings, keep the generated files consistent. Strings that are no longer used are removed from Lokalise and the app with the **Lokalise: Delete Keys** workflow, see [continuous integration](/companion/apple/ci/#on-your-pull-request).
