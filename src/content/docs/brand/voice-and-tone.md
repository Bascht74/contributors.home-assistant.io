---
title: Voice and tone
description: How the personality of Home Assistant sounds in documentation, the interface, error messages, community replies, release notes, and social media.
order: 4
---

The [personality](/brand/personality/) is who Home Assistant is. The voice is how that person sounds when they write. It is the same voice everywhere, whether you write a page of documentation, a button label, or a reply on the [forum](https://community.home-assistant.io/). What changes is the tone: an error message needs a different tone than a release announcement.

This page shows how the voice works in each place. The detailed rules, like grammar, capitalization, and formatting, live in the [style guide](/writing/reference/style/) for documentation and in [UI text](/design/ui-text/) for the interface. This page does not repeat them.

## Everywhere

A few things hold no matter where you write:

- **Talk to the reader.** Use "you" and "your", not "the user" or "users".
- **Write for the whole world.** Write in American English, with short sentences and plain words. Many readers do not speak English as their first language.
- **Be friendly and informational.** Not formal, and not more technical than it needs to be.
- **Be inclusive.** Keep the writing objective, and free of bias or anything that excludes people.
- **Write "Home Assistant" in full.** Never "HA" or "HASS". See [Name and logo](/brand/name-and-logo/).
- **Use the words of the glossary.** Use terms the way the [glossary](/glossary/) defines them, and never a name that was retired, like "service" for an [action](/glossary/action/), "add-on" for an app, or "Lovelace" for a dashboard.

## Documentation

The documentation on [home-assistant.io](https://www.home-assistant.io/) is often the first thing people read, and it is written for a broad audience. Most readers use Home Assistant through its interface, and many are not developers.

- **Welcoming**: assume the reader primarily uses the UI. Show the way through the interface first, and treat YAML, templates, and code as optional paths for those who need them.
- **Candid**: don't hide limitations or complexity behind marketing language. Say what something can and cannot do.
- **Supportive**: make Home Assistant feel approachable. Avoid wording that makes it sound fragile, difficult, or easy to break.
- **Generous**: give readers what they need, with the basics first and the details later, without burying them.
- **Independent**: don't label YAML or more complex features as "advanced", unless the product itself uses that word.

The same style applies to blog posts on home-assistant.io. See [Writing docs](/writing/) and the [style guide](/writing/reference/style/).

## Interface text

Labels, buttons, dialogs, and helper text are read in a second, often while someone is in the middle of something.

- Be concise and clear, and use the active voice.
- Write for technical and non-technical people alike. Avoid jargon where a familiar home automation term works.
- Address people directly with "you" and "your" when it fits.
- Pick the word that matches what happens, like "remove" for what can be restored and "delete" for what is gone for good. See [Remove or delete](/design/ui-text/remove-delete/).

The full guidance, with examples, is in [UI text](/design/ui-text/). Every string in the interface is also translated, so see [Make your strings translatable](/translate/guides/developers/) when you add one.

## Error messages

An error is the moment the personality matters most: the guide names how errors are explained as one of the small things where being welcoming shows. Someone is stuck, and wants to get going again.

- **Welcoming**: explain what went wrong in plain words that make sense without knowing the code.
- **Candid**: be honest about what happened. Don't hide a limitation behind a vague message.
- **Supportive**: say what to do next, when there is something to do.

[Messages](/design/ui-text/messages/) covers errors, warnings, repairs, and empty states in detail.

## Community replies

How the community talks to newcomers is the other place the guide calls out by name. A reply on the forum, on [Discord](https://www.home-assistant.io/join-chat/), or in a pull request is Home Assistant talking, even when you write it as yourself.

- **Welcoming**: meet people at their level, and never talk down to them. Everybody started somewhere.
- **Supportive**: help people forward without taking over. Point them to the exact page that helps, and explain why.
- **Candid, but not blunt**: be honest when something is not possible, and kind in how you say it.

[Welcome newcomers](/community/guides/welcome-newcomers/) has practical advice, and the [code of conduct](/start/code-of-conduct/) applies in every space.

## Release notes and blog posts

The release notes explain what is new, what changed, and what people need to do. For many people, it is the only thing they read about a release.

- **Candid**: be straight about [backward-incompatible changes](/glossary/backward-incompatible-change/) and what people need to do about them. Don't hide them behind the highlights.
- **Generous**: show what a feature does for someone's home, with screenshots or a short video, and link to the documentation.
- **Independent**: it is fine to be direct, a little unconventional, and not take yourself too seriously. Home Assistant doesn't need to sound like a corporate tech brand.

See [Release notes and the release party](/releases/guides/release-notes/) for how the release notes come together.

## Social media

Only the [official accounts](/community/guides/social-media/#the-official-accounts) speak for Home Assistant. When you share Home Assistant from your own account, you speak as yourself, but the same personality fits: friendly, honest about what works and what doesn't, and kind. The code of conduct applies on social media too. Disagreeing is fine, piling on is not.

See [Help on social media](/community/guides/social-media/).
