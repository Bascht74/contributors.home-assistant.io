---
title: Make your strings translatable
description: For developers adding text to Home Assistant. How to write strings that translators can work with.
order: 4
---

Every string you add ends up in front of translators of 64 languages. A little care on your side saves them a lot of guessing.

## Where strings go

- In an **integration**, text lives in `strings.json`, next to the code. It covers the setup flow, entity names and states, actions, errors, and repair issues.
- In the **frontend**, text lives in `src/translations/en.json`.

Never put user facing text directly in code. Text in code cannot be translated.

## Reuse before you write

Many strings already exist, like "Device is already configured" or "Failed to connect". Common strings live in `homeassistant/strings.json` in core. Point to them with a reference instead of writing your own:

```json
{
  "config": {
    "abort": {
      "already_configured": "[%key:common::config_flow::abort::already_configured_device%]"
    }
  }
}
```

Every reused string is one string less to translate, in every language.

## Write for translators

- **Use placeholders for values**, never glue sentences together. `"Found {count} devices"` can be translated. `"Found " + count + " devices"` cannot, because word order differs per language.
- **Use plurals properly in the frontend.** Write `{count, plural, one {# device} other {# devices}}` instead of "device(s)". Integration strings in `strings.json` don't use this syntax, so phrase those so they work for any number, like "Devices found: {count}".
- **Name placeholders after what they hold.** `{device_name}` tells a translator more than `{name}`.
- **Keep sentences whole.** Do not split one sentence over two strings.

## Test your strings

In core, compile the strings of your integration to see them in the interface. Replace `wled` with the domain of your integration, or use `--all` for every integration:

```shell
python3 -m script.translations develop --integration wled
```

## What happens after merge

Once your pull request is merged, the new English strings are uploaded to Lokalise automatically. Translators pick them up from there, and the translations arrive with the next build of the project, see [how translations get back](/translate/how-it-works/#how-translations-get-back). You do not need to do anything else.
