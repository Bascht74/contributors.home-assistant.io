---
title: Publish template macros
description: Share Jinja macros that others import into their templates, as one template file the Marketplace installs in custom_templates.
sidebarLabel: Template macros
order: 4
---

A [template](/glossary/template/) file holds Jinja macros: reusable pieces of template that others import into their own templates, in automations, scripts, and template entities. How macros work, and how users import them, is in [custom templates and macros](https://www.home-assistant.io/docs/templating/custom-templates/) on home-assistant.io.

This is the smallest type in the Marketplace: one file. The catalog and the HACS action call it `template`.

## The file

Write your macros in one `.jinja` file:

```jinja title="battery.jinja"
{% macro battery_icon(entity_id) %}
{% set level = states(entity_id) | int(0) %}
{{ 'mdi:battery-alert' if level < 20 else 'mdi:battery' }}
{% endmacro %}
```

Users import a macro by the name of your file:

```jinja
{% from 'battery.jinja' import battery_icon %}
{{ battery_icon('sensor.front_door_battery') }}
```

That makes the name of your file part of how people use it. Pick one that is unlikely to clash with someone else's, and do not rename it later. When `filename` changes, the Marketplace removes the old file on the next update, and every template that imports it breaks.

## Package it

Put the file in the root of your repository, and name it in `hacs.json` with `filename`:

```text
battery.jinja
hacs.json
README.md
```

```json title="hacs.json"
{
  "name": "Battery macros",
  "filename": "battery.jinja"
}
```

The Marketplace refuses a template repository when `filename` does not name a `.jinja` file in the root. It installs only that one file, into the `custom_templates` folder of the user's configuration, and reloads the custom templates, so it works right away.

A few more rules, because Home Assistant reads every file in `custom_templates` when it starts:

- The file must be UTF-8. One that Home Assistant can not decode stops it from starting.
- The file must be smaller than 5 MiB. Home Assistant skips a larger one.
- `zip_release` is not supported for templates: an archive would unpack into the folder all templates share.
- Two repositories can not install a file with the same name. The Marketplace refuses the second.

HACS requires GitHub releases for templates. Publish a release for every version. See [releases and updates](/marketplace/guides/releases/).

## Check it in your repository

Run the [HACS action](https://github.com/hacs/action) with `category: "template"` on every push and pull request. Add a few examples of the macros in use to your README: that is what users read to decide whether they want it.
