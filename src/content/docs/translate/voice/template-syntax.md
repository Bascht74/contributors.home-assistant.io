---
title: Template sentence syntax
description: The complete reference for sentence files, the template syntax, lists, expansion rules, responses, and the common file of a language.
order: 7
sidebarLabel: Template syntax
---

This page describes every file you write for a language in the [intents repository](https://github.com/OHF-Voice/intents), except tests, which have [their own page](/translate/voice/test-syntax/). New to all of this? Read [How Assist understands language](/translate/voice/how-assist-understands/) first.

The templates are matched by [hassil](https://github.com/OHF-Voice/hassil). The repository uses hassil 3.

## Files of a language

| Path | Contents |
| --- | --- |
| `sentences/<language>/<intent>/<slot_combination>.yaml` | [Sentence file](#sentence-files) for one intent and slot combination |
| `sentences/<language>/_common.yaml` | [Common file](#the-common-file): error responses, skip words, and settings |
| `lists/<language>/<group>.yaml` | [Lists](#lists) of this language |
| `lists/<group>.yaml` | [Shared lists](#shared-lists): number ranges and wildcards for every language |
| `rules/<language>/<group>.yaml` | [Expansion rules](#expansion-rules) of this language |
| `responses/<language>/<intent>.yaml` | [Responses](#responses) of one intent |
| `tests/<language>/<intent>/<slot_combination>.yaml` | [Tests](/translate/voice/test-syntax/) for one intent and slot combination |

You choose the group names of list and rule files yourself. Put things together in a way that makes sense for your language, like a `lights.yaml` for colors and brightness levels, or a `verbs.yaml` for verbs.

Besides the lists in `lists/`, every template can use the lists `name`, `area`, and `floor`. Home Assistant fills those with the names of the user's exposed entities, areas, and floors when it matches a sentence.

## Slot combinations

The intents and their slot combinations are declared in [`intents.yaml`](https://github.com/OHF-Voice/intents/blob/main/intents.yaml), for all languages at once. You do not change this file, but you need to read it. A slot combination looks like this:

```yaml
HassTurnOn:
  slot_combinations:
    name_only:
      description: "Turns on a device or opens a cover by name"
      slots:
        - "name"
      name_domains:
        required:
          - "light"
          - "cover"
        optional:
          - "valve"
      name_domain_groups:
        default:
          - "light"
          - "switch"
      example:
        - "turn on the overhead light"
        - "open sliding door"
```

| Key | Meaning |
| --- | --- |
| `slots` | The slots every sentence of this combination must fill, no more and no fewer |
| `importance` | How much a language needs this combination: `required`, `usable`, `complete`, or `optional` |
| `name_domains` | For combinations with the `name` slot: the entity domains `{name}` may match, grouped by importance |
| `name_domain_groups` | Named sets of domains that sentence files can refer to, instead of repeating the list |
| `inferred_domains` | For combinations with the `domain` slot: the domains the words of a sentence can imply, grouped by importance |
| `context_area` | `true` when the area comes from the voice satellite, not from the sentence, like in "turn on the lights in here" |
| `wildcard_slots` | Slots that must be filled by a [wildcard list](#wildcards), like the name of a timer |
| `example` | One or more English examples |

The importance levels mean:

- `required`: the bare minimum. Validation fails when the sentences are missing.
- `usable`: what people expect. Validation warns when the sentences are missing.
- `complete`: needed for full coverage of the language.
- `optional`: extra, not counted for full coverage.

When a combination uses `name` or `domain`, the levels are set per domain under `name_domains` or `inferred_domains`, instead of with `importance`.

## Sentence files

A sentence file holds the templates of one intent and one slot combination, in one or more groups under `data`:

```yaml
# sentences/en/HassTurnOn/name_only.yaml, shortened
language: "en"
data:
  # lights, switches, and other things you turn on
  - sentences:
      - "<turn> on [<the>] {name}"
      - "activate [<the>] {name}"
    example: "turn on the overhead light"
    name_domains: "default"
    response: "default"

  # covers
  - sentences:
      - "<open> [<the>] {name}"
    example: "open the sliding door"
    name_domains:
      - "cover"
    response: "cover"
```

Each group supports these keys:

| Key | Required | Meaning |
| --- | --- | --- |
| `sentences` | Yes | The [sentence templates](#template-syntax) |
| `response` | Yes | The key of the [response](#responses) to give when one of these sentences matches |
| `name_domains` | When the combination has `name` | The entity domains these sentences target, as a list, or the name of a group from `name_domain_groups` |
| `inferred_domain` | When the combination has `domain` | The one domain the words of these sentences imply, like `light` for "lights" |
| `example` | No | A sentence this group matches, in your language |
| `speech_to_phrase` | No | `true` to use the group for Speech-to-Phrase, see below |

A few rules apply:

- Every template must fill exactly the slots that `intents.yaml` declares for the combination. A template fills a slot directly with `{slot}`, or through an expansion rule that contains it. The `domain` slot is the exception: you never write it in a template, it comes from `inferred_domain`.
- Every domain marked `required` in `name_domains` or `inferred_domains` must be covered by some group. Not necessarily the same group: split the sentences in whatever way suits your language. This is why English uses one group for things you "turn on" and another for covers you "open".
- Write `example` in your language. An example that is the same as the English one gives a warning.

You do not write which entities a sentence may target, or fixed slot values. That part is generated from `intents.yaml`, which keeps it the same for every language.

### Speech-to-Phrase

Speech-to-Phrase is a speech-to-text engine that only recognizes a fixed set of phrases, which makes it fast on small hardware. Groups with `speech_to_phrase: true` are used to build that set of phrases.

When a slot combination has groups with and without the tag, the tagged groups are a smaller set just for Speech-to-Phrase, and Home Assistant itself ignores them. Every sentence in them must also be matched by the untagged groups. When every group is tagged, they are used for both.

## Template syntax

A sentence template describes many sentences at once.

### Alternatives

Put alternatives between parentheses and separate them with `|`:

```text
set color to (red | green | blue)
```

Alternatives also work inside a word. `turn(s | ed | ing)` matches "turns", "turned", and "turning".

### Optional parts

Put an optional word, phrase, or part of a word between square brackets:

```text
turn on [the] light[s]
```

This matches "turn on the lights", "turn on the light", "turn on lights", and "turn on light". `[this | that]` makes a choice of alternatives optional.

### Lists

`{list_name}` matches any value of a [list](#lists), and puts the value in the slot of the same name. When the slot has a different name than the list, write `{list_name:slot_name}`:

```text
set [the] {name} brightness to {brightness_level:brightness}
```

A list may not be inside an alternative or an optional part. `(text | {list_name})` and `[{list_name}]` are not allowed, because a template must always fill the same slots.

### Expansion rules

`<rule_name>` is replaced by the body of an [expansion rule](#expansion-rules):

```text
<turn> on [<the>] {name}
```

### Permutations

Items between parentheses, separated by `;`, match in any order:

```text
<turn> on ({name}; <area>)
```

This matches both "turn on the lamp in the kitchen" and "turn on in the kitchen the lamp", which some languages need. Spaces are added between the items, so they never merge into a new word. Keep it to two to four items: four items already give 24 orders, five give 120.

### Escaping

To match one of the characters `( ) [ ] { } < >` literally, put a backslash in front of it, like `\(`.

### Sizes

Every optional part doubles the number of sentences a template matches, and alternatives multiply it. Large numbers make matching slow on small devices. Use `count_sentences` to check, see [Contribute sentences and responses](/translate/voice/contributing/#try-things-out).

## Lists

A list holds the possible values of a slot. There are three types: fixed values, a range of numbers, and a wildcard. The lists of a language live in `lists/<language>/`, and every file names its language:

```yaml
# lists/en/lights.yaml
language: "en"
lists:
  color:
    values:
      - "white"
      - "red"
      - "orange"
```

### Values in your language, values for Home Assistant

Intent handlers expect some values in English, like colors. Use `in` and `out` to match a word in your language and pass the English value on:

```yaml
language: "nl"
lists:
  color:
    values:
      - in: "rood"
        out: "red"
      - in: "oranje"
        out: "orange"
```

`in` can be a template with alternatives, and `out` can be a number. This turns words into fixed numbers:

```yaml
language: "en"
lists:
  brightness_level:
    values:
      - in: "(max | maximum | highest)"
        out: 100
      - in: "(minimum | lowest)"
        out: 1
```

Values may not contain lists or expansion rules, and may not be entirely optional.

### Ranges

A range matches numbers, written as digits or as words. "Fifty percent" and "50 percent" both match:

```yaml
lists:
  brightness:
    range:
      type: "percentage"
      from: 0
      to: 100
      step: 1
```

| Key | Required | Meaning |
| --- | --- | --- |
| `from` | Yes | The lowest number |
| `to` | Yes | The highest number |
| `step` | No | The step between numbers, `1` by default |
| `type` | No | `number`, `percentage`, or `temperature` |
| `fractions` | No | Also match `halves` or `tenths` |
| `multiplier` | No | Multiply the matched number by this value |

### Wildcards

A wildcard matches any text:

```yaml
lists:
  album:
    wildcard: true
  artist:
    wildcard: true
```

With the template `play {album} by {artist}`, the sentence "play the white album by the beatles" fills `album` with "the white album" and `artist` with "the beatles". Wildcards are greedy, so make sure the words around them are specific enough not to catch sentences of other intents.

### Shared lists

Ranges and wildcards do not need translation. Put them in `lists/<group>.yaml`, at the root of `lists/`, and every language can use them. Shared files have no `language` key:

```yaml
# lists/lights.yaml
lists:
  brightness:
    range:
      type: "percentage"
      from: 0
      to: 100
  color_temperature:
    range:
      from: 1000
      to: 10000
      step: 100
```

Lists with values cannot be shared, because their values are words in a language.

## Expansion rules

An expansion rule is a piece of a template you use often. The rules of a language live in `rules/<language>/`:

```yaml
# rules/en/verbs.yaml
language: "en"
expansion_rules:
  turn: "(turn | switch)"
  open: "(open | raise | lift) [up]"
```

```yaml
# rules/en/common.yaml
language: "en"
expansion_rules:
  the: "(the | my | our)"
  here: "([in] here | [in] (this | the | my | our) (room | area | space))"
```

A rule must contain some text that is not optional.

Rules make templates shorter, but they can also make them hard to read. Two recommendations keep that in check:

- **A rule should not contain a list.** With `{name}` hidden in a `<name>` rule, you cannot see which slots a template fills. It also leads to doubled words, like `[the] <name>` turning into `[the] [the] {name}`.
- **A rule should not use other rules.** Readers then have to follow a chain to see what a template matches, and alternatives in nested rules multiply the number of sentences fast.

A pull request fails when your language has rules or lists that nothing uses. Remove them, or run `python3 -m script.intentfest prune --language <language> --write` to do it for you.

## Responses

Every group of sentences names a `response`. The response templates of an intent live in `responses/<language>/<intent>.yaml`:

```yaml
# responses/en/HassLightSet.yaml
language: "en"
responses:
  intents:
    HassLightSet:
      brightness: "Brightness set"
```

```yaml
# sentences/en/HassLightSet/name_brightness.yaml, shortened
language: "en"
data:
  - sentences:
      - "[<the>] {name} brightness [to] {brightness} percent"
    example: "set the bedroom lamp brightness to 50%"
    name_domains:
      - "light"
    response: "brightness"
```

Responses are [Jinja2](https://jinja.palletsprojects.com/en/latest/templates/) templates. They are a different format than sentence templates: here, `{{ }}` prints a value.

Every response can use `slots`, with the value of each slot that matched, like `{{ slots.name }}`. Some intents give a response more to work with, like `state` (the first entity that matched) or `query` (the entities a question about states matched). [Built-in intents](/translate/voice/intents/) lists those response variables per intent, and `response_variables` in `intents.yaml` describes them.

The `default` response is used when no other response is named. Look at the [English responses](https://github.com/OHF-Voice/intents/tree/main/responses/en) for examples, and at the [style guide](/translate/voice/style-guide/#responses) for how to write them.

## The common file

`sentences/<language>/_common.yaml` holds what is not tied to one intent: error responses, skip words, and settings.

### Error responses

Assist gives an error response when it cannot handle a command, for example because no entity has the name you said:

```yaml
language: "en"
responses:
  errors:
    no_intent: "Sorry, I couldn't understand that"
    no_area: "Sorry, I am not aware of any area called {{ area }}"
    no_entity: "Sorry, I am not aware of any device called {{ entity }}"
```

The full set of keys is in the [English common file](https://github.com/OHF-Voice/intents/blob/main/sentences/en/_common.yaml). Translate all of them.

### Skip words

Skip words are ignored while matching. They are words people add to a command without changing what it means:

```yaml
skip_words:
  - "please"
  - "can you"
```

### Settings

Languages that are written without spaces between words can change how matching works:

```yaml
language: "zh-CN"
settings:
  ignore_whitespace: true
```

- `ignore_whitespace`: ignore spaces while matching, for languages such as Chinese and Japanese.
- `filter_with_regex`: no longer has any effect. It is still accepted, so older files keep working.
