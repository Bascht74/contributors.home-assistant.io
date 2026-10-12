---
title: Your first contribution
description: Pick the path that fits your skills, and take one small first step. Most paths don't need any code.
order: 1
---

Your first contribution doesn't need to be big. A typo fixed, ten strings translated, a question answered on the [forum](https://community.home-assistant.io/): that is a real contribution, and it teaches you how the project works. Start small, get through the loop once, and the next one is easier.

Most of the ways to help don't involve writing code at all, so they come first on this page. Each path says which account you need, and links to a page with concrete steps.

## Before you start

Two things are the same, whatever you pick:

- **Read the [code of conduct](/start/code-of-conduct/).** It's short, and it applies everywhere.
- **Know where to ask.** You don't need permission to start, but it helps to know where to go when you get stuck. The [Home Assistant Discord](https://www.home-assistant.io/join-chat/) is the quickest place for a question. Stuck on code? Ask in [general coding support](discord:coding-support). See [where we talk](/start/where-we-talk/) for the place that fits your area.

Many paths use GitHub. Never used it, or never understood it? Read [Use GitHub, without being a developer](/start/github/) first. It explains the words, and walks you through a change in your browser.

## Without writing code

### You speak another language

Home Assistant is translated by the people who use it. If you're a native speaker, you can start in a few minutes. The interface is translated in your browser, on Lokalise.

- **You need:** a free [Lokalise](/glossary/lokalise/) account. Lokalise asks you to create one when you join a project.
- **Start here:** [Your first translation](/translate/first-contribution/).

Want Assist to understand your language when you talk to it? That work happens in YAML files on GitHub, through pull requests, so you need a free [GitHub](https://github.com/signup) account for that. Start with [Voice](/translate/voice/).

### You like to write

The documentation on home-assistant.io is written by the community. Fix something small, straight from your browser.

- **You need:** a free [GitHub](https://github.com/signup) account.
- **Start here:** [Your first docs fix](/writing/first-contribution/).

### You design

Flows, screens, components, and UI text. You don't need to write code to help shape how Home Assistant works.

- **You need:** a [Discord](https://www.home-assistant.io/join-chat-design) account to meet the designers in **#designers**, and a free [GitHub](https://github.com/signup) account to share proposals in discussions and issues.
- **Start here:** [Your first design contribution](/design/first-contribution/).

### You like helping people

Answer questions on the forum and Discord, welcome newcomers, organize a meetup, or help share news.

- **You need:** a free account on the [community forum](https://community.home-assistant.io/).
- **Start here:** [Answer your first question](/community/first-contribution/).

### You want to test before everyone else

Every month, a beta of the next release comes out a week before the release itself. Running it and reporting what breaks keeps bugs out of everyone else's home.

- **You need:** a Home Assistant installation where a problem is an annoyance, not a disaster, and a free [GitHub](https://github.com/signup) account to report the bugs you find.
- **Start here:** [Join the beta](/releases/first-contribution/).

Do you have a device or a browser that a pull request needs to be tested on? Some areas let you try a change before it's merged, without building anything. See [try out a frontend pull request](/frontend/development/builds/#try-out-a-pull-request) and [test an Android pull request build](/companion/android/get-started/#test-a-pull-request-build). Then leave a comment on the pull request with what you found. "I tried this with my device, and it works" is a useful review.

### You want to share data

Turn on analytics in your own Home Assistant, and help the project see which integrations, versions, and installation types are in use. Nothing is shared unless you turn it on.

- **You need:** a Home Assistant installation. No account.
- **Start here:** [Share your analytics](/data/first-contribution/).

### Report a bug well

Something broken? A clear issue with steps to reproduce saves maintainers a lot of time. [Report a bug](/start/report-a-bug/) tells you which repository to use, what the forms ask, and where to find the logs and versions they need.

- **You need:** a free [GitHub](https://github.com/signup) account.

### Report a security problem

Found something that could put people's homes at risk? Don't open an issue: issues are public. Report it privately, so the problem can be fixed before the details are out. [Report a vulnerability](/security/report-a-vulnerability/) tells you how, and what to include.

- **You need:** a free [GitHub](https://github.com/signup) account.

### You built something worth sharing

An automation that works well in your home can help others too. Turn it into a blueprint and share it. Built a dashboard card, a theme, or an integration of your own? Publishing it in the Marketplace is the recommended first step: you gain experience, and you can iterate faster. You don't need a pull request in a Home Assistant repository: it lives in your own.

- **You need:** a free [GitHub](https://github.com/signup) account. For a blueprint, no programming.
- **Start here:** [Share your first blueprint](/marketplace/first-contribution/).

## With code

These paths end in a pull request on GitHub, in a repository where the [Contributor License Agreement](#the-contributor-license-agreement) applies. Building an app for yourself is the exception: you can publish it from your own repository. Each first contribution page tells you how to set up your development environment.

### You write Python

Home Assistant Core is the Python application at the heart of everything: the automation engine and thousands of integrations. Start with a small bug fix or a missing test.

- **Start here:** [Your first contribution to Core](/core/first-contribution/).

### You write TypeScript or work on web interfaces

The frontend is everything you see in the browser and the companion apps: dashboards, settings, and dialogs. It's built with Lit and TypeScript.

- **Start here:** [Your first frontend contribution](/frontend/first-contribution/).

### You build mobile apps

The companion apps for Android and iOS (also on macOS, Wear OS, and Apple Watch) are written in Kotlin and Swift.

- **Start here:** [Your first companion app contribution](/companion/first-contribution/).

### You work on Linux, embedded systems, or containers

Home Assistant OS and the Supervisor install, update, and run everything. That work is about Linux, Docker, boards, and Python.

- **Start here:** [Your first contribution to the Supervisor](/os/first-contribution/).

### You want to package software

Apps (formerly add-ons) are containers the Supervisor runs next to Home Assistant, like a database or a Zigbee bridge. You can build one for yourself, without anyone's approval.

- **Start here:** [Your first app](/apps/first-app/).

## The Contributor License Agreement

The code repositories of Home Assistant, like Core, the frontend, the companion apps, the Supervisor, Home Assistant OS, and the official apps, ask you to sign the [Contributor License Agreement](/start/licensing/). The first time you open a pull request in one of them, a bot comments with a link. You do that once, and it covers your future contributions too. Until you sign it, your pull request can't be merged.

The paths without code don't need it: translating, fixing the documentation, contributing voice sentences, answering questions, testing betas, and sharing analytics.

## What happens next

Opened a pull request? [Pull requests and reviews](/start/pull-requests/) tells you what to expect. Reviews take time, because there are more pull requests than reviewers. Be patient, and keep going. Once you're through it, [grow as a contributor](/start/grow/) shows where you can go from there.
