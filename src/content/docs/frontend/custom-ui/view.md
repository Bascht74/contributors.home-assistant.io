---
title: Custom views
description: Write your own view layout, to arrange the cards of a dashboard view in a way the built-in views can't.
order: 7
---

A [view](/glossary/view/) decides how its cards are arranged. The built-in view types are sections, masonry, sidebar, and panel. A custom view type lets you write your own layout, like a free-form canvas or a fixed grid.

Home Assistant still creates the cards and badges, and keeps them up to date. Your view only places them.

> [!NOTE]
> Looking to generate the cards of a view from code? That is a [view strategy](/frontend/custom-ui/strategy/#a-view-strategy), not a custom view.

## An example

```js
class MyNewView extends HTMLElement {
  setConfig(config) {
    this._config = config;
  }

  set cards(cards) {
    this._cards = cards;
    this._render();
  }

  _render() {
    this.style.display = "grid";
    this.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    this.style.gap = "8px";
    this.replaceChildren(...this._cards);
  }
}

customElements.define("my-new-view", MyNewView);
```

Load it as a [resource](/frontend/custom-ui/resources/), and set it as the type of a view:

```yaml
views:
  - title: Home
    type: custom:my-new-view
    cards:
      - type: tile
        entity: light.living_room
```

## What a view gets

| Property | What it is |
| --- | --- |
| `setConfig(config)` | The configuration of the view. |
| `hass` | The full state of Home Assistant. |
| `lovelace` | The dashboard: its configuration, whether it is in edit mode, and functions to save it. |
| `narrow` | `true` on a narrow screen. |
| `path` | Where the view sits in the dashboard configuration, like `["views", 0]`. |
| `cards` | The card elements, ready to place. |
| `badges` | The badge elements. |

The [masonry view](https://github.com/home-assistant/frontend/blob/dev/src/panels/lovelace/views/hui-masonry-view.ts) is the built-in example of a view element.

## Store layout data per card

If your view needs to remember something about each card, like a position or a size, store it in the `view_layout` option of the card. Home Assistant keeps it with the card configuration, and ignores it otherwise:

```yaml
- type: tile
  entity: light.living_room
  view_layout:
    column: 2
    row: 1
```

## Edit, delete, and add cards

In edit mode, your view can open the dialogs of the dashboard editor by firing events. Each event has the `path` of the card in the dashboard configuration: the `path` of your view, followed by `"cards"` and the index of the card.

| Event | Detail | What it does |
| --- | --- | --- |
| `ll-create-card` | `{ path: [...path, "cards"] }` | The card picker, to add a card to the view. |
| `ll-edit-card` | `{ path: [...path, "cards", index] }` | The editor of the card. |
| `ll-delete-card` | `{ path: [...path, "cards", index], silent: false }` | Deletes the card. With `silent: false`, a message with an undo button follows. |

Fire them so they bubble and cross shadow roots:

```js
this.dispatchEvent(
  new CustomEvent("ll-edit-card", {
    detail: { path: [...this.path, "cards", 3] },
    bubbles: true,
    composed: true,
  })
);
```

Older views send a path of numbers only, like `[0, 3]` for the fourth card of the first view. That still works for now.
