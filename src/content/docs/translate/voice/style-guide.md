---
title: Voice style guide
description: How to write sentences that match the way people talk, and responses that are short and clear.
order: 3
sidebarLabel: Style guide
---

Good sentences match what people say, and nothing else. Good responses tell people what happened, and nothing more. This page collects what works, for every language. Your language leader may have agreements on top of this for your language.

## Sentences

### Write how people talk

Do not translate the English templates word for word. Think of how people in your language say the command out loud, at home, to a speaker in the corner. Include the short forms ("kitchen lights on") as well as the full ones ("turn on the lights in the kitchen"), and the word orders your language allows.

If your language has a free word order, use [permutations](/translate/voice/template-syntax/#permutations), like `({name}; <area>)`, instead of writing every order out.

### Use your language for examples

Every group of sentences has an `example`. Write it in your language. It shows reviewers and the progress overview what the group is meant to match.

### Use rules for repeated parts

When the same words keep coming back, like the verbs for turning something on, put them in an [expansion rule](/translate/voice/template-syntax/#expansion-rules). Then you improve them in one place. Keep rules simple: no lists inside rules, and no rules inside rules. Otherwise nobody can tell what a template matches.

### Leave politeness to skip words

People add "please" or "can you" to commands. Do not add those words to every template. Put them in the [skip words](/translate/voice/template-syntax/#skip-words) of your language, and the matcher ignores them everywhere.

### Keep the numbers in check

Every optional part doubles the number of sentences a template matches. A few too many, and your language has millions of sentences, which makes Assist slow on small devices. Check with `count_sentences` (see [Try things out](/translate/voice/contributing/#try-things-out)), and prefer a few clear templates over one that matches everything.

### Do not match too much

A template that is too loose catches sentences that belong to another intent. This happens most with [wildcards](/translate/voice/template-syntax/#wildcards), which match any text: a loose "play `{search_query}`" can swallow "set the light to maximum". Put specific words around wildcards. A check on every pull request catches this, but it is easier to avoid it while you write.

### Translate values, keep what Home Assistant needs

Colors, states, and other values that Home Assistant expects in English use the `in` and `out` form of a [list](/translate/voice/template-syntax/#values-in-your-language-values-for-home-assistant): your word goes in, the English value comes out.

### Drafts from an AI model

The repository can write a prompt for an AI model, to get a first draft of the sentences of an intent:

```shell
python3 -m script.intentfest llm_template nl HassListAddItem
```

Treat the output as a draft. You are the native speaker: read every sentence, drop what nobody would say, and add what is missing.

### Stay consistent with the interface

Use the same words and the same form of address as the Home Assistant interface in your language. If your language has agreed on formal or informal address, or on how to translate certain words, follow that. See the [language guidelines](/translate/reference/languages/).

## Responses

### Be concise

Responses are spoken, so every word counts.

- When a command targets a single device, do not repeat its name. "Turned on the light" is enough.
- When a command targets an area, do not repeat the area or name its entities.
- When a response lists entities, name them all if there are four or fewer. If there are more, name the first three and say how many more there are, like "Kitchen, Hallway, Office and 2 more".

For lists, use the same template as the English responses, so every response reads the same way. Do not write your own variant:

```jinja
{% if query.matched %}
  {% set match = query.matched | map(attribute="name") | sort | list %}
  {% if match | length > 4 %}
    Yes, {{ match[:3] | join(", ") }} and {{ (match | length - 3) }} more
  {%- else -%}
    Yes,
    {% for name in match -%}
      {% if not loop.first and not loop.last %}, {% elif loop.last and not loop.first %} and {% endif -%}
      {{ name }}
    {%- endfor -%}
  {% endif %}
{% else %}
  No
{% endif %}
```

Translate the words in it, like "Yes", "No", "and", and "more", and keep the logic as it is.

### Use the present tense

"The light is on", not "The light was on".

### Use the active voice

"Turned on the light", not "The light has been turned on".

Covers and valves are the exception. They take a while to open or close, so their responses describe what is happening: "Opening", "Closing".
