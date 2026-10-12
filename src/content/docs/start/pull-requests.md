---
title: Pull requests and reviews
description: How to open a pull request that is easy to review, what happens after you open it, and how to help it get merged. For every repository.
sidebarLabel: Pull requests and reviews
order: 4
---

A [pull request](/glossary/pull-request/) is how a change gets into Home Assistant, whether it's code, documentation, or a design token. This page explains the parts that are the same in every repository. Each area adds its own details, like the [Core development guides](/core/development/) or [reviews in the frontend](/frontend/development/review-and-release/).

New to GitHub? Words like fork, branch, commit, and push are explained in [Use GitHub, without being a developer](/start/github/). It also walks you through a first pull request entirely in your browser, no software needed.

## Before you open it

### Check that it fits

Most changes don't need permission first. A bug fix, a documentation improvement, or a small feature can go straight to a pull request. Bigger changes are different: a new type of entity, a change to how all integrations work, or a new dependency for everyone. Those start as a discussion, so you don't build something that has to change course. See [how decisions are made](/architecture/decisions/).

All architecture decisions are recorded in the [architecture repository](https://github.com/home-assistant/architecture). Your change has to follow them.

### Keep it small

A pull request should do one thing: fix one bug, add one feature, or update one page. Noticed something else along the way? Put it in a separate pull request.

Small pull requests get reviewed faster. More people can review them, they conflict less often, and a good review of a small change catches more than a quick look at a big one. Many small pull requests aren't less efficient. They're more efficient.

A dependency update goes in its own pull request too, with a link to the release notes or the changes between the two versions, so reviewers can check what changed.

### Test it

Run your change and check that it works, or for documentation, that it looks right. It sounds obvious, but it saves a whole review round when it doesn't.

### Start from the latest version

A [branch](/glossary/branch/) is a separate line of changes, so your work doesn't mix with anything else. Create a new one for every pull request, based on the latest version of the main branch of the repository. That's `dev` for Home Assistant Core and the frontend, for example, and `current` or `next` for the documentation. The guides of each area tell you which branch to use.

Your [fork](/glossary/fork/), your own copy of the repository, doesn't update by itself. If you made it a while ago, it may be behind: pull in the latest changes before you start.

### Fill out the template

Every repository has a pull request template. Use it, and don't remove its sections. Write a clear title, and a description that explains *why* you make this change, not only what it does. Link the issue it fixes. If you used AI tools, follow the [AI policy](/start/ai-policy/): you must be able to explain every change in your own words. Several templates ask about it with a checkbox. [What the pull request templates ask](/start/ai-policy/#what-the-pull-request-templates-ask) lists them.

## After you open it

### The bots go first

Within minutes, a few things happen automatically:

- **The CLA check.** In the code repositories, a bot asks you to sign the [Contributor License Agreement](/start/licensing/) the first time you contribute. Until you do, your pull request can't be merged.
- **Labels.** Bots label your pull request, for example by the type of change or the integration it touches. Labels help maintainers find the pull requests they can review.
- **Integration owners.** If you change an integration, GitHub asks its [integration owners](/glossary/integration-owner/) for a review. Other files can have owners too, listed in the `CODEOWNERS` file of the repository.
- **CI.** Automated checks build your change, run the tests, and check the style. A red cross means something failed. Open the details, fix what's related to your change, and push again: send your new commits to the branch of your pull request, and the checks run again. See [CI](/glossary/ci/). Can't make sense of a failure? Ask in a comment on the pull request.

If a check fails because of your change, mark your pull request as a draft while you fix it. That tells reviewers it isn't ready yet. If you're sure the failure has nothing to do with your change, leave it open and mention it.

### Waiting for a review

This is the hard part. Reviews take time, from hours to weeks, and nothing is guaranteed. There are always more pull requests than reviewers.

Some things are generally picked up sooner: bug fixes, small changes, and pull requests with tests. Big pull requests, or ones that need someone with specific knowledge, take longer.

While you wait:

- **Keep it up to date.** A merge conflict means someone else changed the same lines as you, and Git can't combine the two by itself. GitHub shows it on your pull request. Fix it, and update your branch with the latest changes if it's been a while. [When GitHub says there is a conflict](/start/github/#when-github-says-there-is-a-conflict) shows how, in the browser.
- **Look at it again.** A day later, you often spot something yourself.
- **Review someone else's work.** It's the best way to make the queue move, for everyone. Testing a pull request and commenting "I tried this with my device, and it works" is already a useful review.

Don't ping maintainers or integration owners to ask for a review, not in the pull request and not in private messages. The bots notify the right people. Asking for a review in the description is redundant too: opening the pull request already does that.

### Review comments

At some point, a reviewer comments on your work, or asks for changes. That isn't personal. Reviewers want the same thing you do: a better Home Assistant. Ask if you don't understand a comment. Push back, politely, if you think a reviewer is wrong. Explain why.

In many repositories, a bot turns your pull request into a draft when a reviewer requests changes. Once you've handled every comment and the checks pass, select **Ready for review**. The bot then lets the reviewers know you're done.

Some projects use AI tools to help with reviews. Treat their comments like any other review comment: if you think one is wrong, say so briefly. Maintainers have the final say.

### Stale and locked

A pull request or issue without activity for a while gets the `stale` label from a bot, with a comment. If nothing happens after that, the bot closes it. Any activity resets the clock: if you're still waiting for a review, a comment is enough. Some labels, like `no-stale`, keep a bot away.

Once something is closed, another bot locks the conversation after a while. After that, only people with write access to the repository can comment. Found the same problem again? Open a new issue, and link the old one.

The timings differ per repository:

| Repository | Issue goes stale after | Pull request goes stale after | Closed after the label | Locked after closing |
| --- | --- | --- | --- | --- |
| [core](https://github.com/home-assistant/core/blob/dev/.github/workflows/stale.yml) | 90 days | 60 days | 7 days | Issues 30 days, pull requests 1 day |
| [frontend](https://github.com/home-assistant/frontend/blob/dev/.github/workflows/stale.yaml) | 90 days | 90 days | 7 days | Issues 30 days, pull requests 1 day |
| [home-assistant.io](https://github.com/home-assistant/home-assistant.io/blob/current/.github/workflows/stale.yml) | 60 days | 60 days | 7 days | Issues 30 days, pull requests 1 day |
| [supervisor](https://github.com/home-assistant/supervisor/blob/main/.github/workflows/stale.yml) | 30 days (bugs only) | 30 days | 7 days | Issues 30 days, pull requests 1 day |
| [operating-system](https://github.com/home-assistant/operating-system/blob/dev/.github/workflows/stale.yml) | 90 days | 90 days | 7 days | Issues 30 days, pull requests 7 days |
| [addons](https://github.com/home-assistant/addons/blob/master/.github/workflows/stale.yml) | 30 days | Not set | 7 days | Not set |
| android | Not active | Not active | Not active | Not set |
| iOS | Not set | Not set | Not set | Not set |

The links go to the configuration of each repository, in its `.github` folder. The lock timings are in `lock.yml` (`lock.yaml` in the frontend), next to it. The android repository still has a [`stale.yml`](https://github.com/home-assistant/android/blob/main/.github/stale.yml) for an older bot (90 days for issues, 30 for pull requests), but that bot hasn't labeled anything there since 2021.

## Being a good neighbor

- Don't open more than five pull requests at a time. Wait until some are merged before you open more.
- Don't open pull requests that depend on other pull requests that aren't merged yet.
- Only open a pull request you plan to finish. If you can't continue, say so and close it. There's no shame in that. If you're stuck, ask for help on [Discord](/start/where-we-talk/).

## It's merged

Congratulations, and thank you. You made Home Assistant better for everyone who uses it.

Most changes reach users in the next release. A fix that needs to go into a patch release? Say so clearly in the description. The reviewer decides, and adds it to the milestone of the next patch release.

Then keep going: open another pull request, or help review. It gets easier every time.
