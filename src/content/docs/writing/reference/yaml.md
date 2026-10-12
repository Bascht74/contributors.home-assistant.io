---
title: YAML style
description: How YAML examples in the documentation should look, so they are easy to read, copy, and adapt.
order: 3
---

People copy YAML examples straight into their own configuration. When every example follows the same style, they are easier to read, easier to compare, and easier to get right the first time.

This page has two parts. The first covers plain YAML, and applies to any YAML you write. The second covers choices that are specific to Home Assistant, where the same thing can be written in more than one way.

## General YAML

### Indentation

Indent with 2 spaces.

```yaml
# Good
lighting:
  brightness: 80

# Bad
lighting:
    brightness: 80
```

### Booleans

Use only `true` and `false`, in lowercase. Values like `yes`, `no`, `on`, and `off` look friendly, but they confuse people who are new to YAML. YAML 1.2 also dropped them as booleans, so sticking to `true` and `false` keeps examples future proof.

```yaml
# Good
enabled: true
visible: false

# Bad
enabled: True
visible: off
debug: yes
```

### Comments

Comments help the reader understand what an example does.

- Put the comment on its own line, above the line it explains. Comments at the end of a line get hard to read on small screens.
- Indent the comment at the same level as the line it belongs to.
- Put a space after the `#`, and start the comment with a capital letter.

```yaml
# Good
sensor:
  # Check every five minutes
  scan_interval: 300

# Acceptable, but prefer the style above
sensor:
  scan_interval: 300 # Check every five minutes

# Bad
sensor:
# Check every five minutes
  scan_interval: 300
  #Check every five minutes
  timeout: 10
  # check every five minutes
  retries: 3
```

### Lists

YAML calls them sequences. In the documentation, call them lists.

Write lists in block style, with each item indented under its key.

```yaml
# Good
colors:
  - red
  - green
  - blue

# Bad
colors:
- red
- green
- blue
```

Avoid flow style, the inline form with square brackets. It looks compact, but it gets hard to read once the values grow. If you do use it, put a space after each comma, and no spaces just inside the brackets.

```yaml
# Acceptable
colors: [red, green, blue]

# Bad
colors: [ red, green, blue ]
colors: [red,green,blue]
lights: ["light.living_room_window", "light.living_room_corner"]
```

### Mappings

Mappings are also known as dictionaries, hash tables, or key/value pairs. In the documentation, call them mappings.

Always write mappings in block style. Flow style, which looks like JSON, is not allowed.

```yaml
# Good
position:
  x: 10
  y: 20

# Bad
position: { x: 10, y: 20 }
```

### Null values

Leave a null value empty. Do not write `null` or `~`.

```yaml
# Good
history:

# Bad
history: null
history: ~
```

### Strings

Quote strings with double quotes. Some values in Home Assistant examples are an exception, see [Strings that stay unquoted](#strings-that-stay-unquoted).

```yaml
# Good
greeting: "Welcome home!"

# Avoid
greeting: Welcome home!

# Bad
greeting: 'Welcome home!'
```

### Long strings

Do not use `\n` to add line breaks, and do not write long strings on a single line. Use a block scalar instead:

- The literal style, `|`, keeps the line breaks you write.
- The folded style, `>`, joins the lines into one, with a space between them.

```yaml
# Good
message: |
  The washing machine is done.
  Time to empty it.
summary: >
  This text is spread over several lines in YAML,
  but Home Assistant reads it as one single line.

# Bad
message: "The washing machine is done.\nTime to empty it.\n"
```

Prefer `|` and `>` without a chomping indicator. If an example needs different handling of the line breaks at the end, you can use:

- The strip indicator, `|-` or `>-`, to remove the final line break and any empty lines after it.
- The keep indicator, `|+` or `>+`, to keep the final line break and any empty lines after it.

## Home Assistant YAML

Home Assistant often accepts the same configuration in more than one form. These rules pick one, so all examples look alike.

### Leave out defaults and empty sections

Do not include an option that is set to its default value. The exception is an example that is specifically about that option.

The same goes for empty sections, like `conditions: []` or `data: {}`, and for `mode: single`, which is the default mode of automations and scripts.

```yaml
# Good
triggers:
  - trigger: state
    entity_id: binary_sensor.front_door
actions:
  - action: light.turn_on
    target:
      entity_id: light.hallway

# Bad
mode: single
triggers:
  - trigger: state
    entity_id: binary_sensor.front_door
conditions: []
actions:
  - action: light.turn_on
    target:
      entity_id: light.hallway
    data: {}
```

### Placeholders

When the reader has to fill in a value, write the placeholder in capitals, with underscores between words. That makes it obvious what to replace.

```yaml
api_key: YOUR_API_KEY
host: YOUR_DEVICE_IP_ADDRESS
```

Write examples so they work in the `configuration.yaml` file, unless the text clearly says otherwise.

### Strings that stay unquoted

Strings get double quotes, with one exception. The following values are easier to read without quotes, so leave them unquoted:

- Entity IDs, like `binary_sensor.front_door`
- Entity attributes, like `temperature`
- Device IDs
- Area IDs
- Platform types, like `light` or `switch`
- Trigger types, like `state` or `time`
- Condition types, like `state` or `numeric_state`
- Action names, like `light.turn_on`
- Device classes, like `motion` or `problem`
- Event names
- Values that only accept a fixed set of options, like `mode` in automations

```yaml
# Good
actions:
  - action: notify.mobile_app_phone
    data:
      message: "The front door is open."
  - action: light.turn_on
    target:
      entity_id: light.hallway
      area_id: entrance
    data:
      transition: 5

# Bad
actions:
  - action: "notify.mobile_app_phone"
    data:
      message: The front door is open.
```

### Action targets

You can point an action at an entity in three places: under `target`, directly on the action, or inside `data`. Always use `target`.

It is the most flexible option. Besides entities, a target can hold devices, areas, floors, and labels, and you can combine them.

```yaml
# Good
actions:
  # Target one entity
  - action: light.turn_on
    target:
      entity_id: light.living_room
  # Target every light in an area
  - action: light.turn_on
    target:
      area_id: living_room
  # Combine an area, an entity, and a device
  - action: light.turn_on
    target:
      area_id: living_room
      entity_id: light.office_desk
      device_id: 8f2b6e4c1a9d4e7b9c3f5a1d2e6b8c4f

# Bad
actions:
  - action: light.turn_on
    entity_id: light.living_room
  - action: light.turn_on
    data:
      entity_id: light.living_room
```

### A single value or a list of values

Many options accept either one value or a list of values. Some also accept a comma-separated string. For those options:

- Use a single value when there is only one. Do not wrap it in a list.
- Use a block style list when there is more than one.
- Never put several values in one comma-separated string.

```yaml
# Good
entity_id: light.living_room

# Good
entity_id:
  - light.living_room
  - light.kitchen

# Bad
entity_id: light.living_room, light.kitchen

# Bad
entity_id: [light.living_room, light.kitchen]

# Bad
entity_id:
  - light.living_room
```

### A single mapping or a list of mappings

Options like `triggers`, `conditions`, `actions`, and `sequence` accept either one mapping or a list of mappings. Always use a list, even when there is only one item.

A list shows the reader they can add more items. It also lets them copy one item into their own configuration without changing its shape.

```yaml
# Good
actions:
  - action: light.turn_on
    target:
      entity_id: light.living_room

# Bad
actions:
  action: light.turn_on
  target:
    entity_id: light.living_room
```

## Templates

Templates are powerful, but they are hard to read for people who are new to them. If plain YAML can do the job, use that instead.

There is a second reason. On [home-assistant.io](https://www.home-assistant.io/), templates need extra escaping, so the site does not mistake them for Liquid. See [Liquid helpers](/writing/reference/liquid/). No template, no escaping.

```yaml
# Good
conditions:
  - condition: numeric_state
    entity_id: sun.sun
    attribute: elevation
    below: 4

# Bad
conditions:
  - condition: template
    value_template: "{{ state_attr('sun.sun', 'elevation') < 4 }}"
```

### Quotes in templates

A template is a string, so it gets double quotes. Use single quotes inside the template.

```yaml
# Good
greeting: "{{ 'Good morning' if now().hour < 12 else 'Hello' }}"

# Bad
greeting: '{{ "Good morning" if now().hour < 12 else "Hello" }}'
```

### Long templates

Split a long template over multiple lines, so the reader can follow the logic. Use a block scalar for this, as described in [Long strings](#long-strings).

```yaml
# Good
conditions:
  - >-
    {{
      is_state('lock.front', 'locked')
      and is_state('lock.back', 'locked')
    }}

# Bad
conditions:
  - "{{ is_state('lock.front', 'locked') and is_state('lock.back', 'locked') }}"
```

The bad example is still short. Picture it with five more conditions, and you see why it does not scale.

### Short condition syntax

For template conditions, use the shorthand. It is shorter and cleaner.

```yaml
# Good
conditions: "{{ states('sensor.outdoor_temperature') | float(0) > 25 }}"

# Bad
conditions:
  - condition: template
    value_template: >-
      {{ states('sensor.outdoor_temperature') | float(0) > 25 }}
```

### Filters

Put a space on both sides of the filter pipe, `|`. If that makes the expression unclear, add parentheses.

```yaml
# Good
conditions:
  - "{{ states('sensor.humidity') | float(0) > 60 }}"
  - "{{ target == (states('input_number.target') | int(0)) }}"

# Bad
conditions:
  - "{{ states('sensor.humidity')|float(0) > 60 }}"
  - "{{ target == (states('input_number.target')|int(0)) }}"
```

### States and attributes

Use the helper functions to read states and attributes: `states()`, `is_state()`, `state_attr()`, and `is_state_attr()`. Do not read them from the `states` object directly.

The helpers handle entities that are not ready yet, like during Home Assistant startup. Reading the `states` object directly gives errors in that case.

```yaml
# Good
temperature: "{{ states('sensor.temperature') }}"
target: "{{ state_attr('climate.living_room', 'temperature') }}"

# Bad
temperature: "{{ states.sensor.temperature.state }}"
target: "{{ states.climate.living_room.attributes.temperature }}"
```
