---
title: Write and share a blueprint
description: Write a blueprint with good inputs and selectors, test it, change it without breaking what people built on it, and share it.
sidebarLabel: Blueprints
order: 5
---

A [blueprint](/glossary/blueprint/) is an automation, a script, or a template entity with blanks that the user fills in. One blueprint can be used many times: once for the hallway, once for the bathroom, each with its own devices and settings.

Blueprints are not in the Marketplace. Users import them from a URL, and Home Assistant remembers that URL to fetch new versions. [How it works](/marketplace/how-it-works/#blueprints) explains where users can import from. New to blueprints? [Your first contribution](/marketplace/first-contribution/) walks through a first one, start to finish.

The full schema, and every selector, are documented for users on home-assistant.io: [the blueprint schema](https://www.home-assistant.io/docs/blueprint/schema/) and [selectors](https://www.home-assistant.io/docs/blueprint/selectors/). This page is about writing one that others enjoy using, and keep using.

## The blueprint block

Every blueprint starts with a `blueprint` block, followed by the configuration of its domain: the triggers, conditions, and actions of an automation, the sequence of a script, or the configuration of a template entity.

```yaml
blueprint:
  name: "Notify when a door stays open"
  description: >
    Sends a notification when a door has been open for too long.
    Needs a door sensor and a device with the companion app.
  domain: automation
  author: "Your name"
  homeassistant:
    min_version: "2024.6.0"
  input:
    door:
      name: "Door"
      selector:
        entity:
          filter:
            - domain: binary_sensor
              device_class: door
```

| Key | |
| --- | --- |
| `name` | Required. Short, and says what it does. |
| `domain` | Required. `automation`, `script`, or `template`. |
| `description` | What the blueprint does, and what the user needs for it. Supports Markdown. The import dialog and the editor show it. |
| `author` | Your name, or your forum name. |
| `homeassistant` | `min_version`: the oldest Home Assistant your blueprint works with, as `major.minor.patch`. |
| `input` | The blanks. See below. |
| `source_url` | Leave it out. Home Assistant sets it to the URL the user imported from. |

## Inputs

Each input has a key, which you use with `!input`, and these options:

- `name` and `description`: what the user sees in the form.
- `selector`: the control the user gets. Without one, the user gets a plain text field, and has to guess what to type.
- `default`: makes the input optional. Without a default, the user has to fill it in.

Use each input in the configuration with `!input <key>`. Home Assistant refuses a blueprint that uses an `!input` it does not define.

Inputs are not template variables. To use one in a template, make it a variable first:

```yaml
variables:
  door_entity: !input door

actions:
  - action: notify.notify
    data:
      message: "{{ state_attr(door_entity, 'friendly_name') }} is still open."
```

### Choose the right selector

The selector decides how easy your blueprint is to use. A few things that help:

- Filter entity selectors on `domain` and `device_class`, so the user only sees entities that make sense. A door sensor picker that lists every sensor in the house is a puzzle.
- Use the `target` selector for what an action acts on. The user can then pick entities, devices, areas, floors, or labels, and you pass it straight to `target`.
- Give a `number` input a sensible `min`, `max`, and `unit_of_measurement`.
- Use `boolean` for optional behavior that the user turns on or off.

The [selectors](https://www.home-assistant.io/docs/blueprint/selectors/) page lists every selector, and the [selector component](/design/components/selector/) in the Design area shows what each one looks like.

### Group inputs in sections

With many inputs, group them in sections. A section has an `input` key of its own, and optionally a `name`, an `icon`, a `description`, and `collapsed`:

```yaml
blueprint:
  name: "Notify when a door stays open"
  domain: automation
  homeassistant:
    min_version: "2024.6.0"
  input:
    door:
      name: "Door"
      selector:
        entity:
          filter:
            - domain: binary_sensor
              device_class: door
    advanced:
      name: "Advanced"
      icon: mdi:cog
      collapsed: true
      input:
        wait_time:
          name: "Wait time"
          default: 300
          selector:
            number:
              min: 30
              max: 3600
              unit_of_measurement: seconds
```

Sections only change the form. You still use the inputs by their own key, like `!input wait_time`, so every key has to be unique across all sections. Sections need Home Assistant 2024.6 or newer: set `min_version` when you use them.

## Template entity blueprints

A blueprint with `domain: template` describes one template entity. Users set it up in `configuration.yaml`, with `use_blueprint`:

```yaml
template:
  - use_blueprint:
      path: homeassistant/inverted_binary_sensor.yaml
      input:
        reference_entity: binary_sensor.front_door
    name: "Front door closed"
    unique_id: front_door_closed
```

The [inverted binary sensor](https://github.com/home-assistant/core/blob/dev/homeassistant/components/template/blueprints/inverted_binary_sensor.yaml) that comes with Home Assistant is a complete example. The other built-in blueprints are good examples too: [automations](https://github.com/home-assistant/core/tree/dev/homeassistant/components/automation/blueprints) and [scripts](https://github.com/home-assistant/core/tree/dev/homeassistant/components/script/blueprints).

## Test it

Test the way your users will get it: import it from the URL you are going to share.

1. Go to **Settings** > **Automations & scenes** > **Blueprints**, select **Import blueprint**, and enter your URL.
2. Create an automation or script from it. Fill in only the required inputs first, so you test your defaults.
3. Make it happen in your home, and check the trace of the automation when it does not do what you expect.
4. Create a second one, with every input set to something else.

Then think about the boundaries: a sensor that is `unavailable`, an empty optional input, a target that is an area instead of an entity, and what happens when the trigger fires again while the automation still runs. That last one is the `mode` of your automation: `restart` is often right for something like a motion light.

## Change it without breaking it

Every automation built on your blueprint uses the copy the user imported. When the user selects **Re-import blueprint**, Home Assistant downloads your new version over the old one, and every automation built on it uses the new version right away. The user gets no chance to fill in anything new first. So:

- Never rename an input. The automations people built still pass their value under the old name. Under the new name, the input is missing.
- Give every new input a `default`. Home Assistant refuses an automation that misses an input without a default, so without one, every automation built on your blueprint stops working.
- Do not change what an input expects, like its selector, or seconds into minutes. Home Assistant does not check the stored values against the new selector: the old value goes in as it is.
- Raise `min_version` when you start to use something new in Home Assistant. Users on an older version then get a clear error, instead of a broken automation.
- For bigger changes, publish a new blueprint, under a new URL. Users move over when they are ready.

The blueprint schema has no version number. Say what changed, and when, in your forum topic or your repository, so users know when to re-import.

## Share it

The URL users import from is the identity of your blueprint: re-importing fetches from there. Pick one place, and keep the blueprint there.

- **A topic on the community forum.** Post it in the [Blueprint Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Home Assistant imports the first YAML code block with a blueprint in the first post, so to publish a new version, edit that post. Follow the rules in the [About Blueprints](https://community.home-assistant.io/t/about-blueprints/253788) topic: one topic per blueprint, a clear title, what it does and needs, the full blueprint in the post, and an import badge.
- **A file on GitHub.** A repository keeps the history of every change, and people can open issues and pull requests. Share the URL of the file on the default branch, so re-imports get the latest version.
- **A GitHub gist.** Quick, and good for something small.

A forum topic and a GitHub file work well together: keep the blueprint on GitHub, and use the topic to talk about it. Then make the GitHub URL the one in your import badge.

The import badge is a [My link](/glossary/my-link/): it opens the import dialog in the reader's own Home Assistant, with the URL of your blueprint filled in. The [My link creator](https://my.home-assistant.io/create-link/?redirect=blueprint_import) makes it for you from the URL of your blueprint. It gives you Markdown like this:

```markdown
[![Open your Home Assistant instance and show the blueprint import dialog with a specific blueprint pre-filled.](https://my.home-assistant.io/badges/blueprint_import.svg)](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Fme%2Fmy-blueprints%2Fblob%2Fmain%2Fmotion_light.yaml)
```

The `blueprint_url` is the URL of your blueprint, URL encoded. Users with the blueprint imported can also share it from their blueprint list, with **Share blueprint**: that creates the same link.

Writing documentation for an integration? Blueprints that go with an integration page can live on home-assistant.io. See [the integration page](/writing/reference/integration-page/).
