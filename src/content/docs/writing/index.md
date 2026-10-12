---
title: Writing docs
description: Help millions of people get more out of Home Assistant, by improving the documentation on home-assistant.io.
---

The documentation on [home-assistant.io](https://www.home-assistant.io/) is often the first thing people read when they set up a device, build an automation, or get stuck. Every page there was written and improved by the community. A clearer sentence, a missing step, or a fixed screenshot helps everyone who reads that page after you.

You do not need to be a developer. If you can explain something clearly, you can help.

Want to improve this contributor site instead? See [Improve this contributor site](/writing/this-site/).

## Who you write for

Most people who read the documentation use Home Assistant through its interface, not through YAML files. Write for them first: show the way through the UI, and keep the technical details available for those who need them. The [style guide](/writing/reference/style/) explains how.

## Two ways to help

- **Small fixes** take minutes and happen entirely in your browser. A typo, an outdated screenshot, a step that no longer matches the UI. Every page has an **Edit** link.
- **Larger changes**, like a new page or a restructured section, are easier with a local copy of the site, so you can preview your work before you share it.

## Writing with AI tools

The [documentation repository](https://github.com/home-assistant/home-assistant.io) carries skills for AI tools, in `.claude/skills/`: one for the writing style, one for Markdown and Liquid, one for YAML examples, and `document-integration-docs` for integration pages. Its instructions tell agents to load them before they edit, and not to invent new automation, script, or dashboard examples unless you ask. Every claim on the page is still yours to check against the code. [Contribute with AI tools](/start/ai-tools/#write-documentation-on-home-assistantio) has the workflow.

## Start here

- [Your first docs fix](/writing/first-contribution/): fix something small, straight from your browser.
- [How the documentation works](/writing/how-it-works/): where pages live, which branch to use, and how changes go live.

## Guides

- [Structure a page](/writing/guides/structure/): concepts, tasks, references, and when to use which.
- [Preview the site locally](/writing/guides/local-preview/): run the documentation on your own machine.
- [Document an integration](/writing/guides/integration/): for developers adding a new integration.
- [Move, rename, or remove a page](/writing/guides/move-or-remove/): without breaking links.

## Reference

- [Style guide](/writing/reference/style/): language, tone, and formatting.
- [Images and videos](/writing/reference/images/): screenshots, captions, and embedded videos.
- [Liquid helpers](/writing/reference/liquid/): My links, glossary tooltips, and text boxes.
- [YAML style](/writing/reference/yaml/): how YAML examples should look.
- [Automated checks](/writing/reference/checks/): what the checks on your pull request look for.
- [Integration front matter](/writing/reference/front-matter/): every key at the top of an integration page.
- [Integration page structure](/writing/reference/integration-page/): the sections of an integration page, and the blocks to fill them.
- [Brand](/brand/): the personality and voice of Home Assistant, which every page reflects.

## Who to talk to

- Readers leave feedback on pages through the **Provide feedback** link. Those become [issues on GitHub](https://github.com/home-assistant/home-assistant.io/issues), and they are a great place to find something to work on.
- Questions about your change? Ask in your pull request. Reviewers are happy to help you get it right.
- Want to chat about the documentation? Join the **#documentation** channel on the [Home Assistant Discord](https://www.home-assistant.io/join-chat/).
