---
title: Translations in the frontend
description: Where frontend text lives, how to use it in code, and how text from Core and integrations gets into the interface.
order: 4
---

The frontend is used in dozens of languages, so no text people see is ever written directly in the code. The English source lives in one file, and the community translates it into every other language.

## Where text lives

- **Frontend text** is in `src/translations/en.json`. It is the only translation file in the repository. When it changes on `dev`, it is uploaded to [Lokalise](/glossary/lokalise/), where translators work on it. The translations come back as nightly builds.
- **Text from Core and integrations**, like entity names, states, and the steps of a config flow, comes from the `strings.json` of each integration. The frontend loads it from Core at runtime.

Translators never see your code, only the strings and their keys. [Make your strings translatable](/translate/guides/developers/) explains how to write strings that they can work with.

## Use a string

Add the English text to `src/translations/en.json`, under a key that says where it is used. This one is the number of repair issues on the repairs card, under `ui` > `card` > `repairs`:

```json
"count_issues": "{count} {count, plural, one {issue} other {issues}}"
```

Then use it through `localize`, with the full key and the values of the placeholders:

```ts
this._localize("ui.card.repairs.count_issues", { count: 3 });
```

Keys are type checked against `en.json`, so a typo in a key fails the type check.

Get `localize` from the internationalization context, with `@consumeLocalize()`, or from `hass.localize` in a component that already has `hass`. See [the hass object and contexts](/frontend/architecture/hass-and-contexts/).

### Placeholders and plurals

Strings use the [ICU message format](https://formatjs.github.io/docs/core-concepts/icu-syntax/). Placeholders go in curly braces, like `{count}`. The `plural` form in the example above picks the right word for the number. Each language has its own plural rules, and translators fill in the forms their language needs.

Always translate a whole sentence, with placeholders for what changes. Never build a sentence from separate translated pieces: word order is different in other languages.

### Reuse a string

When the same text already exists, point to it instead of writing it again. The reference uses the path of the other key, with `::` between the parts:

```json
{
  "armed_home": "[%key:state_badge::alarm_control_panel::armed%]"
}
```

Every reused string is one string less to translate, in every language.

## Text from Core

Text that comes from integrations is loaded on demand, by category. Load the category you need before you use its keys:

```ts
const localize = await hass.loadBackendTranslation("title");
localize(`component.${domain}.title`);
```

Backend keys start with `component.<domain>.`, followed by the path in the `strings.json` of that integration.

Large parts of the frontend text, like the settings or the dashboard editor, are split into fragments that load with their panel. `hass.loadFragmentTranslation()` loads one, for example when a dialog of one panel opens inside another.

## Run with translations

During development, the frontend is English only unless you fetch the translations. Add `--fetch-translations` to any development server, like `pnpm dev --fetch-translations`. See [Set up the environment](/frontend/development/environment/#translations).

To check right-to-left layouts, switch your profile to a right-to-left language like Hebrew or Arabic, or use the right-to-left toggle in the [gallery](/frontend/development/gallery-and-demo/).
