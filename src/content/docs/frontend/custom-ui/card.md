---
title: Custom cards
description: Build your own dashboard card. The element, its configuration, sizing in the sections and masonry views, and the helpers the frontend offers.
order: 2
---

A custom card is a custom element that Home Assistant puts on a dashboard, just like a built-in card. It gets its configuration and the state of Home Assistant, and renders whatever you want.

## A first card

Create `www/state-card-example.js` in your configuration folder:

```js
class StateCardExample extends HTMLElement {
  // Called with the YAML configuration of the card. Throw an
  // error and Home Assistant shows it instead of the card.
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this._config = config;
    this._render();
  }

  // Called with a new hass object on every change in the home.
  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._config || !this._hass) {
      return;
    }

    const stateObj = this._hass.states[this._config.entity];
    const state = stateObj
      ? this._hass.formatEntityState(stateObj)
      : "not found";

    if (!this._content) {
      this.innerHTML = `<ha-card><div class="content"></div></ha-card>`;
      this._content = this.querySelector(".content");
      this._content.style.padding = "16px";
    }
    this._content.textContent = `${this._config.entity} is ${state}`;
  }

  // Height in the masonry view, in units of 50 pixels.
  getCardSize() {
    return 1;
  }

  // Size in the grid of the sections view.
  getGridOptions() {
    return { columns: 6, rows: 1, min_rows: 1 };
  }
}

customElements.define("state-card-example", StateCardExample);
```

[Register it as a resource](/frontend/custom-ui/resources/) with the URL `/local/state-card-example.js` and the type **JavaScript module**. Then add it to a dashboard in YAML:

```yaml
type: custom:state-card-example
entity: light.living_room
```

The tag name you register, `state-card-example`, becomes the type `custom:state-card-example`.

`ha-card` is the element the built-in cards use for their background, border, and shadow. Use it, so your card looks like the others and follows the theme. Like every `ha-*` element, it is not a promised API, see [which tools to use](/frontend/custom-ui/#which-tools-to-use).

## The card API

| Member | Required | What it does |
| --- | --- | --- |
| `setConfig(config)` | Yes | Receives the configuration. Called rarely: when the card is created, and when the configuration changes. Throw an `Error` for an invalid configuration. |
| `hass` | | Set with a new `hass` object whenever the state of Home Assistant changes. That is often. Only update what changed. |
| `getCardSize()` | | The height of the card in the masonry view, as a number or a promise of a number. 1 is 50 pixels. Defaults to 1. |
| `getGridOptions()` | | The size of the card in the sections view. |
| `preview` | | Set to `true` when the card is shown in the card editor. |

The `hass` object is described in the [hass object reference](/frontend/reference/hass-object/). Its formatters, like `hass.formatEntityState()` and `hass.formatEntityName()`, turn states and names into text in the language and units of the user. Use them instead of showing raw states.

## Sizing in the sections view

A section is a grid of 12 columns. Rows are 56 pixels high, with 8 pixels between them. `getGridOptions()` tells the grid how big your card is by default, and how far users can resize it:

| Option | Default | Meaning |
| --- | --- | --- |
| `columns` | `12` | Number of columns, or `"full"` for the full width. |
| `rows` | `"auto"` | Number of rows. With `"auto"`, the card is as high as its content and can't be resized in height. |
| `min_columns`, `max_columns` | | Limits for the width. |
| `min_rows`, `max_rows` | | Limits for the height. |

Without `getGridOptions()`, the card takes the full width of the section, and its height follows its content.

Use multiples of 3 for `columns`, like 3, 6, 9, or 12. Those line up with the other cards. A card of `rows: 2` is 120 pixels high: two rows of 56 pixels and one gap of 8.

```js
getGridOptions() {
  return { columns: 6, rows: 2, min_rows: 2 };
}
```

## Sizing in the masonry view

The masonry view places cards in columns, and uses `getCardSize()` to spread them evenly. When you ask another element for its size, wait until it is defined, because cards are loaded lazily:

```js
await customElements.whenDefined(element.localName);
return element.getCardSize();
```

## Get only the data you need

`hass` changes on every state change in the home, even when nothing your card shows changed. A card can ask for just a part of the data instead, by requesting a [context](/frontend/architecture/hass-and-contexts/). Fire a `context-request` event when the card is added to the page:

```js
connectedCallback() {
  const event = new CustomEvent("context-request", {
    bubbles: true,
    composed: true,
  });
  event.context = "states";
  event.subscribe = true;
  event.callback = (states, unsubscribe) => {
    this._unsubscribe = unsubscribe;
    this._states = states;
    this._render();
  };
  this.dispatchEvent(event);
}

disconnectedCallback() {
  this._unsubscribe?.();
  this._unsubscribe = undefined;
}
```

The callback gets the value of the context, and with `subscribe` set, it is called again on every change. Always unsubscribe when the card is removed. The keys of the contexts, like `states`, `entities`, `hassApi`, and `hassInternationalization`, are defined in [`src/data/context/index.ts`](https://github.com/home-assistant/frontend/blob/dev/src/data/context/index.ts).

## Card helpers

The frontend offers a few helpers to custom cards, for example to create a built-in card inside yours:

```js
const helpers = await window.loadCardHelpers();
const card = helpers.createCardElement({
  type: "tile",
  entity: "light.living_room",
});
card.hass = this._hass;
```

`loadCardHelpers()` is available once the dashboard panel is loaded. It returns `createCardElement`, `createBadgeElement`, `createRowElement`, `createHeaderFooterElement`, and `createHuiElement`, the dialogs `showAlertDialog`, `showConfirmationDialog`, `showPromptDialog`, and `showEnterCodeDialog`, and `importMoreInfoControl`. A card created this way needs `hass` set, just like yours.

## Next steps

- Add a visual editor, and put your card in the card picker: [Card editor and picker](/frontend/custom-ui/card-editor/).
- Add quick controls to the tile card: [Custom card features](/frontend/custom-ui/card-feature/).
