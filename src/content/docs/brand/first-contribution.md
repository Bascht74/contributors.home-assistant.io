---
title: Your first brand contribution
description: Pick one page or one piece of interface text, read it against the personality of Home Assistant, and improve it.
order: 1
sidebarLabel: Your first contribution
---

The brand is not something you contribute to on its own. It shows up in everything else: a page of documentation, a dialog, an error message. So the best first contribution is small and concrete: take one piece of text, read it with the personality in mind, and make it better.

No design skills or coding needed, just a GitHub account. For the documentation, you can make the change yourself, in your browser. For interface text, you can point out what's wrong and let a developer change it, or make the change yourself if you're comfortable in a code repository.

## 1. Read the personality

Read [Personality](/brand/personality/) once. Pay attention to the lists of what each trait is not. They help you spot a trait pushed too far: candid turned blunt, supportive turned condescending, welcoming turned sycophantic.

## 2. Pick something to read

Start with something you know well, so you can tell whether it is right:

- **A page of the documentation**, on [home-assistant.io](https://www.home-assistant.io/), about something you set up yourself.
- **A piece of interface text**, like a dialog or an error message you ran into.

Keep it to one page or one dialog. A small change is easier to review.

## 3. Read it against the traits

Ask yourself a few questions while you read:

- **Welcoming**: does it meet the reader at their level, or does it talk down to them? Does it assume knowledge they might not have?
- **Candid**: does it say what it means? Does it hide a limitation, or pretend something is simpler than it is?
- **Supportive**: when something goes wrong, does it say what to do next?
- **Generous**: does it give the reader what they need, without burying it?
- **Independent**: does it sound like Home Assistant, or like a corporate tech brand?

Also check the basics: "Home Assistant" written in full, "select" instead of "click", and terms used the way the [glossary](/glossary/) defines them. [Voice and tone](/brand/voice-and-tone/) shows what the traits look like in each kind of text.

## 4. Make the change

Where you make the change depends on what you picked:

- **Documentation**: every page on home-assistant.io has an **Edit** link. [Your first docs fix](/writing/first-contribution/) walks you through it, straight from your browser.
- **Interface text, without code**: open an [issue in the frontend repository](https://github.com/home-assistant/frontend/issues) that names the screen, quotes the current text, and suggests your version. Or bring it to the **#designers** channel on the [Home Assistant Discord](https://www.home-assistant.io/join-chat-design) first, if you're not sure about the right words. Read [UI text](/design/ui-text/) before you suggest a new wording.
- **Interface text, as a pull request**: the English text of the interface lives in `src/translations/en.json` of the [frontend repository](https://github.com/home-assistant/frontend), and the text of an integration in its `strings.json` in the [core repository](https://github.com/home-assistant/core). Those are code repositories: a pull request there runs the automated checks, and needs a signed [Contributor License Agreement](/start/licensing/), which a bot asks for the first time.

Don't change the English text in a translation tool. Translators work from the English source, so fix it there, and the translations follow.

In your issue or pull request, explain what felt off and why your version is better. Pointing to the trait helps: "the old text hid that this only works locally, so I made it candid about that" is easy to review.

New to GitHub? See [Use GitHub, without being a developer](/start/github/).

## What is next

- Read [Voice and tone](/brand/voice-and-tone/) for how the personality sounds in other places.
- Like improving words? The [Writing docs](/writing/) area and [UI text](/design/ui-text/) have plenty more to do.
- Speak another language? Bring the same voice to it in [Translations](/translate/).
