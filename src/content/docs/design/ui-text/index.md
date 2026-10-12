---
title: UI text
description: How the interface talks. The voice, style, and words of Home Assistant, for everyone who writes a label, a button, or an error.
order: 30
---

Every label, button, error, and empty state is a design decision. Good UI text helps people understand what is happening and what to do next, often without them noticing it.

You write UI text when you design a screen, and also when you build one: in the frontend, and in the `strings.json` of an integration. The same guidelines apply in both places.

## How Home Assistant talks

UI text follows the [personality](/brand/personality/) of Home Assistant. In the interface, the five traits show up in the small things:

- **Welcoming**: meet people at their own level, and never talk down to them. It shows in how an error is explained.
- **Candid**: say what you mean. Don't hide complexity behind false simplicity, or pretend a limitation doesn't exist.
- **Supportive**: steer people forward, without taking over.
- **Generous**: trust people with control and transparency. No deceptive patterns.
- **Independent**: Home Assistant doesn't need to sound like an established tech brand.

How the same voice sounds outside the interface, like in documentation and community replies, is in [Voice and tone](/brand/voice-and-tone/).

## Style

- Write in American English, in a friendly and informational tone.
- Talk to people directly, with "you" and "your" where it fits.
- Be concise and clear. Use the active voice.
- Write for technical and non-technical people alike. Avoid jargon where a familiar home automation term works.
- Use sentence case for titles, headings, buttons, labels, and everything else in the interface: "Create new automation", not "Create New Automation". "Device settings", not "Device Settings".
- Write "Home Assistant" in full. Never "HA" or "HASS".
- Use "like" or "for example" instead of Latin abbreviations.
- Use the Oxford comma in lists.
- Don't use all caps for emphasis.
- In the text of an integration, wrap code-like values, like entity IDs and file names, in backticks. Write brand and protocol names the way their owners do, like Z-Wave and MQTT, without backticks.

## Words

- One thing has one name. The [glossary](/glossary/) lists the terms Home Assistant uses, and the old names you should not use anymore, like "service" for an [action](/glossary/action/).
- Product terms are lowercase in a sentence: automation, entity, device.
- Say "integration", not "component", when you talk to people using Home Assistant.
- Pick the word that matches what people do. "Join" or "Apply" can say more than "Group".

## Guides

- [Buttons and labels](/design/ui-text/buttons-and-labels/): the words on buttons, in dialog titles, and next to fields.
- [Messages](/design/ui-text/messages/): errors, warnings, empty states, confirmations, and success messages.
- [Remove, delete, add, or create](/design/ui-text/remove-delete/): four words that are easy to mix up.

## Translations

All UI text is translated into dozens of languages, so it has to be written in a way translators can work with:

- Every string that people see goes through the translation system. No text in the code itself.
- Use placeholders for values, and keep sentences whole. Never glue translated pieces together.
- Give translators context with clear key names and placeholder names.
- In an integration, reuse a common translation key when one exists for the same text.

[Make your strings translatable](/translate/guides/developers/) has the details. The [style guide](/writing/reference/style/) of the documentation applies to UI text too, like writing "select" instead of "click".
