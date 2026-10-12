---
title: Placeholders and references
description: The parts of a string you should not translate, and how to handle them.
order: 1
---

Some strings are not plain text. They contain parts that Home Assistant fills in while it runs, or that point to another string. Those parts must stay exactly as they are.

## Curly brackets: values filled in at runtime

A part between curly brackets, like `{name}`, is replaced by a live value. In this string:

```text
{count} devices found
```

Home Assistant puts the actual number in place of `{count}`. Keep the placeholder as it is, and move it to wherever it fits in your language:

```text
{count} Geräte gefunden
```

Rules for curly brackets:

- Every placeholder in the English string must also appear in your translation.
- Never translate the name between the brackets. `{count}` stays `{count}`.
- You may move placeholders around, your sentence order wins.

### Plurals and choices

Some placeholders choose between variants, for example for one or many items:

```text
{count, plural,
  one {# device}
  other {# devices}
}
```

Translate the text inside the inner brackets, not the keywords around it. Languages with more plural forms can add them, like `few` or `many`. The syntax is the ICU message format. The [format.js guide](https://formatjs.github.io/docs/core-concepts/icu-syntax/) explains all of it.

## Square brackets: references to other strings

Text between square brackets, shown in green in Lokalise, is a reference. It points to another string, so the same text is translated only once. When you translate a string that contains a reference, you can usually take it over as is: use **Insert source** in the editor.

Your language may have duplicates that English does not have. You are welcome to link those with references too. Lokalise explains how in its documentation on [key referencing](https://docs.lokalise.com/en/articles/1400528-key-referencing).
