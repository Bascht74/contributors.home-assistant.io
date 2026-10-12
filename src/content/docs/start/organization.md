---
title: How the project is organized
description: Who owns Home Assistant, who pays for it, where the work lives, and who decides what gets merged.
sidebarLabel: How the project is organized
order: 5
---

Home Assistant is an open source project, owned by a non-profit foundation and built together with a community of contributors. This page explains how those pieces fit, so you know who you're working with.

## The Open Home Foundation

Home Assistant belongs to the [Open Home Foundation](https://www.openhomefoundation.org/), a non-profit organization. Home Assistant and other projects were transferred to the foundation in 2024. Today, the foundation also owns projects like ESPHome and Music Assistant.

The foundation employs more than 50 people full-time. They work in the same repositories, follow the same review process, and talk in the same channels as everyone else. You'll meet them in reviews, but they're far from the only people who review and merge.

The foundation stands for three values in the smart home: privacy, choice, and sustainability. They come back in [our principles](/start/principles/). Its [structure page](https://www.openhomefoundation.org/structure/) explains how it is governed and funded.

## Commercial partners

The foundation is funded by commercial partner fees and donations. Its current commercial partners are [Nabu Casa](https://www.nabucasa.com/) and Apollo Automation. Each is contractually required to contribute a majority of its profit from selling licensed products to the foundation.

Nabu Casa is the official provider of Home Assistant products and services, like Home Assistant Link: an optional subscription that adds remote access, Amazon Alexa and Google Assistant, and cloud speech for Assist.

## The repositories

All the work happens in the open, on GitHub, under the [home-assistant](https://github.com/home-assistant) organization. A few repositories you'll come across early:

- [core](https://github.com/home-assistant/core): Home Assistant Core and all built-in integrations, in Python.
- [frontend](https://github.com/home-assistant/frontend): the web interface, in TypeScript.
- [home-assistant.io](https://github.com/home-assistant/home-assistant.io): the user documentation.
- [android](https://github.com/home-assistant/android) and [iOS](https://github.com/home-assistant/iOS): the companion apps.
- [supervisor](https://github.com/home-assistant/supervisor) and [operating-system](https://github.com/home-assistant/operating-system): what installs, updates, and runs everything.
- [architecture](https://github.com/home-assistant/architecture): discussions and decisions about how Home Assistant is built.

Some projects live in other organizations of the foundation, like the voice intents in [OHF-Voice](https://github.com/OHF-Voice/intents). [Repositories](/architecture/repositories/) lists them all, and tells you which one to go to for what.

## Maintainers, teams, and integration owners

Anyone can open an issue, a pull request, or a review. Who decides what gets merged depends on the repository:

- **Maintainers** can approve and merge pull requests. Each repository has its own maintainers, often organized in GitHub teams, like `@home-assistant/core` for Home Assistant Core.
- **Integration owners** are responsible for an integration. In Home Assistant Core, every integration lists its owners in the `codeowners` field of its manifest. They get notified about its issues, and GitHub asks them to review pull requests that touch it.
- **Reviewers** can be anyone. A careful review from a contributor helps maintainers decide faster.

Bigger questions, like a new type of entity or a rule that applies to all integrations, are discussed in the open in the architecture repository. [How architecture decisions are made](/architecture/decisions/) explains how that works.

### Teams in CODEOWNERS

A `CODEOWNERS` file tells GitHub who to ask for a review. In Home Assistant Core and on [home-assistant.io](https://github.com/home-assistant/home-assistant.io), it names people and a few GitHub teams of the `home-assistant` organization:

- `@home-assistant/core`: the core files, and the integrations the core team owns
- `@home-assistant/frontend`: the `frontend`, `lovelace`, and `panel_custom` integrations
- `@home-assistant/supervisor`: the `hassio` integration, and the files that build the container image
- `@home-assistant/cloud`: the `cloud`, `alexa`, and `google_assistant` integrations, behind Home Assistant Link
- `@home-assistant/matter`: the `matter` integration
- `@home-assistant/z-wave`: the `zwave_js` integration

A few integrations are owned by a team outside the organization, like the team of a manufacturer. In Core, the `CODEOWNERS` file is generated from the manifests of the integrations, so it changes when the manifests do.

### Become an integration owner

The owners of an integration are listed in the `codeowners` field of its `manifest.json`. To become one, open a pull request that adds your GitHub username there. It helps a lot to have worked on the integration first. [The integration owner](/core/quality-scale/integration-owner/) explains what the role asks of you, and how to update the files.

## Volunteers and staff

Two kinds of people work on Home Assistant:

- **Staff** are employed by the Open Home Foundation. The foundation pays their salaries, from the fees of its commercial partners and from donations. Its [structure page](https://www.openhomefoundation.org/structure/) has the details.
- **Volunteers** aren't paid. They contribute in their free time, because they care about Home Assistant.

Both work in the same repositories, under the same rules. Most contributors are volunteers. That shapes how the project works: reviews can take a while, nobody owes anyone a merge, and patience goes both ways. It also means the project is shaped by the people who show up. If you care about something, you can help make it happen.

## Where the project is heading

The foundation plans larger work in the open. Its board sets the [goals](https://github.com/OpenHomeFoundation/goals). The product team turns some of the feature requests into opportunities on the [roadmap](https://github.com/OpenHomeFoundation/roadmap): problems worth solving, not a list of features with dates. Opportunities are delivered through epics and tasks in the repositories where the work happens.

You influence it through [feature requests](https://github.com/home-assistant/feature-requests/discussions): share your idea, vote, and discuss. [From idea to release](/roadmap/how-it-works/) walks through every step, and shows where you can join in.
