---
title: Voice
description: Teach Assist your language. Write the sentences it understands and the answers it gives, and help train the voices behind it.
order: 30
---

Assist, the voice assistant of Home Assistant, understands commands like "turn on the kitchen lights" without sending anything to the cloud. It can do that because people wrote down, for their own language, the many ways someone might say it. That work happens in the [intents repository](https://github.com/OHF-Voice/intents) on GitHub, and it is a different kind of translation than the interface text in Lokalise.

You do not translate sentences one by one. You describe how people in your language phrase a command, with a compact template syntax, and you add tests that prove it works. If you speak your language natively and you are comfortable editing YAML files, you can help.

## Who this is for

- **Native speakers** who want Assist to understand their language, or understand it better.
- **Language leaders** who review the work for their language.
- **Developers** who want to know which intents exist and how sentences turn into actions.

## How to start

1. Read [How Assist understands language](/translate/voice/how-assist-understands/). It explains intents, slots, and slot combinations, the words you will see everywhere.
2. Look up your language on the [progress overview](https://ohf-voice.github.io/intents/). It shows, per intent, what your language already covers.
3. Pick one intent that is missing or weak, and follow [Contribute sentences and responses](/translate/voice/contributing/).

Start small. A pull request for one intent in one language gets reviewed much faster than a big one.

## Guides

- [How Assist understands language](/translate/voice/how-assist-understands/): intents, sentences, slots, lists, and responses, and how they fit together.
- [Contribute sentences and responses](/translate/voice/contributing/): the workflow in the intents repository, from first edit to merged pull request.
- [Style guide](/translate/voice/style-guide/): how to write sentences and responses that work well.
- [Supported languages](/translate/voice/languages/): the languages Assist knows, and how to add a new one.
- [Language leaders](/translate/voice/language-leaders/): what they do, and how to become one.
- [Contribute your voice](/translate/voice/contributing-your-voice/): help train speech recognition and voices for your language.

## Reference

- [Template sentence syntax](/translate/voice/template-syntax/): the full syntax of sentence files, lists, expansion rules, and responses.
- [Test syntax](/translate/voice/test-syntax/): how to write the tests for your sentences.
- [Built-in intents](/translate/voice/intents/): every intent, with its slots and slot combinations.

## Who to talk to

- Questions about your language? Ask the language leader, listed in [`languages.yaml`](https://github.com/OHF-Voice/intents/blob/main/languages.yaml). They review every change to it.
- Questions about the repository, the tooling, or an intent that does not fit your language? Use the [intents discussions](https://github.com/OHF-Voice/intents/discussions), or open an [issue](https://github.com/OHF-Voice/intents/issues).
- Want to chat? Join the **#language-leaders** channel on the Home Assistant [Discord server](https://www.home-assistant.io/join-chat). Can't see it? Pick the right role under **Channels & Roles**.
- Writing code that handles or fires intents? That is covered in [Core internals](/core/internals/).
