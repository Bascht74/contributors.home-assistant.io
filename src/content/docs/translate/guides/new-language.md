---
title: Request a new language
description: Your language is not available yet? Here is how to get it added.
order: 2
---

If your language is not in the list, you can request it. Once it is added, it appears in Lokalise and anyone can start translating.

## Make the request

Start a discussion in the [localization category](https://github.com/home-assistant/frontend/discussions/categories/localization) of the frontend repository. Include both the English name and the native name of your language:

```text
English name: German
Native name: Deutsch
```

## Regional variants

Regional variants, like Canadian French or Brazilian Portuguese, are possible too. They only make sense when the text really differs from the base language. A variant is only included when it has translations that differ from the base language.

When you translate a regional variant, copy the base translation for strings that are the same in your region, instead of leaving them empty. That way it stays clear which strings have been reviewed.

## What happens next

A maintainer adds the language to Home Assistant and to Lokalise. Languages are identified with [BCP 47](https://www.rfc-editor.org/info/bcp47) tags, like `fr`, `fr-CA`, or `zh-Hans`. Once that is done, you can join the project and start translating.
