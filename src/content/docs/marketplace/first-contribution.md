---
title: Share your first blueprint
description: Turn an automation that already works in your home into a blueprint, import it yourself to test it, and share it on the Blueprint Exchange.
sidebarLabel: Your first contribution
order: 1
---

The quickest way to share something is a [blueprint](/glossary/blueprint/). You already have the hard part: an automation that works in your home. A blueprint is that same automation with the parts that are specific to your home, like which sensor and which light, left blank for others to fill in.

This takes about half an hour. You need a GitHub account for step 4. No programming.

Already have a card, a theme, or an integration on GitHub? Skip ahead to the [publishing requirements](/marketplace/reference/repository-structure/) and the [HACS action](/marketplace/reference/validation/). Getting that check green is a fine first step too.

## 1. Pick an automation

Pick an automation that you use and that works. Small is good: one trigger, one or two actions. Something like "turn on the hallway light when there is motion, and off again after two minutes".

Open it in the automation editor, select the three dots menu, and select **Edit in YAML**. Copy the YAML into a text editor.

## 2. Add the blueprint block

Put a `blueprint` block at the top. It needs a `name` and a `domain`. The domain is `automation` here: blueprints can also be made for scripts and template entities.

```yaml
blueprint:
  name: "Motion light with a timeout"
  description: >
    Turns on a light when motion is detected, and turns it off
    again when there has been no motion for a while.
  domain: automation
  author: "Your name"
```

Remove the `id` and `alias` of your automation. Every automation made from your blueprint gets its own.

## 3. Turn the specific parts into inputs

Every entity ID, area, or number that is specific to your home becomes an input. Define each input under `input` with a [selector](/glossary/selector/), so the user gets the right picker, and use it in the automation with `!input`:

```yaml
blueprint:
  name: "Motion light with a timeout"
  description: >
    Turns on a light when motion is detected, and turns it off
    again when there has been no motion for a while.
  domain: automation
  author: "Your name"
  input:
    motion_sensor:
      name: "Motion sensor"
      selector:
        entity:
          filter:
            - domain: binary_sensor
              device_class: motion
    light:
      name: "Light"
      selector:
        target:
          entity:
            - domain: light
    wait_time:
      name: "Wait time"
      description: "How long to keep the light on after the last motion."
      default: 120
      selector:
        number:
          min: 0
          max: 3600
          unit_of_measurement: seconds

mode: restart
max_exceeded: silent

triggers:
  - trigger: state
    entity_id: !input motion_sensor
    from: "off"
    to: "on"

actions:
  - action: light.turn_on
    target: !input light
  - wait_for_trigger:
      - trigger: state
        entity_id: !input motion_sensor
        from: "on"
        to: "off"
  - delay: !input wait_time
  - action: light.turn_off
    target: !input light
```

Home Assistant refuses a blueprint that uses an `!input` it does not define. Every input with a `default` is optional for the user. This example is close to the motion light blueprint that comes with Home Assistant, [`motion_light.yaml`](https://github.com/home-assistant/core/blob/dev/homeassistant/components/automation/blueprints/motion_light.yaml) in core. Reading it next to yours is a good check.

## 4. Publish it as a gist

1. Go to [GitHub Gists](https://gist.github.com/).
2. Name the file after your blueprint, ending in `.yaml`, like `motion_light_timeout.yaml`.
3. Paste your blueprint, and create the gist as a public gist.
4. Copy the URL of the gist.

## 5. Import it yourself

Test it the way your users will get it:

1. In Home Assistant, go to **Settings** > **Automations & scenes** > **Blueprints**.
2. Select **Import blueprint**, paste the URL of your gist, and select **Preview**.
3. Select **Import blueprint**.
4. Select your blueprint, and select **Create automation**.
5. Fill in the inputs, save, and check that the automation does what it should.

Fix what does not work in the gist, and import again. Home Assistant asks to override the blueprint you imported before.

When it works, turn off your original automation, so the two do not fight over the same light.

## 6. Share it

Post your blueprint on the [Blueprint Exchange](https://community.home-assistant.io/c/blueprints-exchange/53), the blueprint category of the community forum. Read its [About Blueprints](https://community.home-assistant.io/t/about-blueprints/253788) topic first. In short:

- One topic per blueprint, with a title that says what it does.
- Describe what the blueprint does, and which devices it needs.
- Include the full blueprint in a YAML code block in the first post. Home Assistant imports it straight from the topic.
- Add an import badge. Create one on [my.home-assistant.io](https://my.home-assistant.io/create-link/?redirect=blueprint_import), with the URL of your topic.
- Import it from your own topic once, to check that it works.

That is it: you shared your first blueprint. When people use it, they will ask questions and suggest improvements in your topic. [Blueprints](/marketplace/guides/blueprints/) explains how to change a blueprint without breaking the automations people built on it.
