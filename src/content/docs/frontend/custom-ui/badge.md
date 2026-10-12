---
title: Custom badges
description: Build your own badge for the top of a dashboard view.
order: 5
---

[Badges](/glossary/badge/) are the small pills at the top of a view, above the cards. They show a state at a glance, like the temperature outside or how many lights are on. A custom badge is built the same way as a [custom card](/frontend/custom-ui/card/), just smaller.

## An example

```js
class TextBadge extends HTMLElement {
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._config || !this._hass) {
      return;
    }
    const stateObj = this._hass.states[this._config.entity];
    this.textContent = stateObj
      ? this._hass.formatEntityState(stateObj)
      : "Unavailable";
  }
}

customElements.define("text-badge", TextBadge);
```

Load it as a [resource](/frontend/custom-ui/resources/), and add it to a view:

```yaml
views:
  - title: Home
    badges:
      - type: custom:text-badge
        entity: sensor.outside_temperature
```

## What a badge gets

- `setConfig(config)`: the configuration of the badge. Throw an error for an invalid configuration, and Home Assistant shows an error badge instead.
- `hass`: the full state of Home Assistant, set on every change.
- `preview`: `true` when the badge is shown in the badge editor.

## Badge picker and editor

To show your badge in the badge picker, push an entry to `window.customBadges`:

```js
window.customBadges = window.customBadges || [];
window.customBadges.push({
  type: "text-badge",
  name: "Text badge",
  description: "Shows the state of an entity as text.",
  preview: true,
  documentationURL: "https://example.com/text-badge",
});
```

The keys are the same as for [cards in the card picker](/frontend/custom-ui/card-editor/#show-up-in-the-card-picker), and a badge can also suggest itself for an entity with `getEntitySuggestion`.

A badge can have a visual editor and a default configuration too. The static `getStubConfig()`, `getConfigForm()`, and `getConfigElement()` work exactly like they do for [custom cards](/frontend/custom-ui/card-editor/).
