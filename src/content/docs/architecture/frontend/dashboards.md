---
title: How dashboards work
description: How dashboards are put together from views, sections, cards, and badges, how strategies generate them, and how custom cards fit in.
order: 3
sidebarLabel: Dashboards
---

A [dashboard](/glossary/dashboard/) is a page of [cards](/glossary/card/), and the part of the frontend most people see most. Under the hood, it is a configuration, made of views, sections, cards, and badges, that the frontend turns into elements.

> [!NOTE]
> Dashboards used to be called Lovelace, and the code still uses that name: the panel is `lovelace`, and dashboard elements start with `hui-`. In text, say dashboard.

## In short

- A dashboard has views. A view has sections, and sections have cards, or cards directly, depending on the view type.
- Each card type is a web component, like `hui-tile-card`, loaded when a dashboard uses it.
- A dashboard is stored in Home Assistant, or written in YAML.
- A strategy generates a dashboard, or a view, from the home itself.
- Custom cards are web components loaded from a JavaScript file.

## From configuration to elements

A dashboard is a configuration, like this:

```yaml
views:
  - title: Home
    type: sections
    sections:
      - type: grid
        cards:
          - type: tile
            entity: light.kitchen
```

The frontend reads it, and creates an element for each part: a view, a section, a `hui-tile-card` with its configuration. Card types load when a dashboard first uses them.

## Views

| View type | Lays out |
| --- | --- |
| `sections` | Sections on a grid, each with its own cards. The default for new dashboards. |
| `masonry` | Cards in columns, placed by their height |
| `sidebar` | A wide column of cards, and a narrow one |
| `panel` | One card, over the whole page |

## Cards, badges, and features

- **Cards** show and control things. Their configuration says what. Many have a visual editor.
- **Badges** are small pills at the top of a view.
- **[Card features](/glossary/card-feature/)** add controls to a card, like a brightness slider.

The cards and their configuration options are in [dashboard cards](/design/dashboards/), with live examples.

## Where a dashboard is stored

- **In storage**: the default. Users edit it in the UI, and Home Assistant saves it with the WebSocket API.
- **In YAML**: the user writes it in a file. The UI can't edit it.

## Strategies and custom elements

A [strategy](/glossary/strategy/) is code that generates a dashboard, a view, or a section, instead of a fixed configuration. The dashboard users see when they first open Home Assistant is one: it builds itself from the areas and devices, and stays up to date when something is added. Users can take control of a generated dashboard, and edit its configuration from there.

Cards, badges, views, and strategies can also come from outside the frontend, as web components loaded from a JavaScript file and used with a `custom:` type, like `custom:my-card`. They get the same `hass` object and configuration as the built-in ones. How to build them is in [custom cards and more](/frontend/custom-ui/).

## In the code

| What | Where |
| --- | --- |
| The dashboard panel | `src/panels/lovelace/` |
| Views, sections, cards, badges, features | `views/`, `sections/`, `cards/`, `badges/`, `card-features/` in the dashboard panel |
| Strategies | `strategies/` in the dashboard panel |
| Creating elements from configuration | `create-element/` in the dashboard panel |
| The editors | `editor/` in the dashboard panel |

## Work on this

- Start with [your first frontend contribution](/frontend/first-contribution/).
- Build your own card, badge, or strategy: [custom cards and more](/frontend/custom-ui/).
- The built-in cards and how they should look and behave: [dashboard cards](/design/dashboards/) in the Design area.
