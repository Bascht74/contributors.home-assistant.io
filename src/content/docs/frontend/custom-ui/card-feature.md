---
title: Custom card features
description: Add your own quick control to the tile card and other cards that support features.
order: 4
---

[Card features](/glossary/card-feature/) are the small controls at the bottom of a tile card: a brightness slider, a row of fan speeds, a button to start the vacuum. The built-in ones cover many entities, and you can add your own. A feature is a custom element, much like a [custom card](/frontend/custom-ui/card/), but smaller.

## An example

This feature adds a **Press** button for [button entities](/core/entities/button/):

```js
const supportsButtonPress = (hass, context) => {
  const entityId = context.entity_id;
  return Boolean(entityId?.startsWith("button.") && hass.states[entityId]);
};

class ButtonPressCardFeature extends HTMLElement {
  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  set context(context) {
    this._context = context;
    this._render();
  }

  static getStubConfig() {
    return { type: "custom:button-press-card-feature", label: "Press" };
  }

  _render() {
    if (!this._config || !this._hass || !this._context) {
      return;
    }
    if (!supportsButtonPress(this._hass, this._context)) {
      // Forget the button, so it is created again when the entity is back
      this.replaceChildren();
      this._button = undefined;
      return;
    }
    if (!this._button) {
      this._button = document.createElement("button");
      this._button.style.cssText =
        "width: 100%; height: var(--feature-height, 42px);" +
        "border: none; border-radius: var(--feature-border-radius, 12px);";
      this._button.addEventListener("click", (ev) => this._press(ev));
      this.replaceChildren(this._button);
    }
    this._button.textContent = this._config.label || "Press";
  }

  _press(ev) {
    ev.stopPropagation();
    this._hass.callService("button", "press", {
      entity_id: this._context.entity_id,
    });
  }
}

customElements.define(
  "button-press-card-feature",
  ButtonPressCardFeature
);

window.customCardFeatures = window.customCardFeatures || [];
window.customCardFeatures.push({
  type: "button-press-card-feature",
  name: "Button press",
  isSupported: supportsButtonPress,
  configurable: true,
});
```

Load the file as a [resource](/frontend/custom-ui/resources/), and add the feature to a tile card:

```yaml
type: tile
entity: button.restart_router
features:
  - type: custom:button-press-card-feature
    label: Restart
```

Stop the event from bubbling up, like `_press()` does, or the card underneath handles it too and opens the more-info dialog.

## What a feature gets

- `setConfig(config)`: the configuration of the feature, with its `type`.
- `hass`: the full state of Home Assistant, set on every change.
- `context`: what the card the feature lives in is about. It has an `entity_id` when the card shows an entity, and an `area_id` when it shows an area.

## Register the feature

To show your feature in the feature picker of the card editor, push an entry to `window.customCardFeatures`:

| Key | Required | Meaning |
| --- | --- | --- |
| `type` | Yes | The tag name of your feature, without `custom:`. |
| `name` | | The name in the picker. |
| `isSupported(hass, context)` | | Returns whether the feature works for the card it would go into. The picker only offers it when this returns `true`. |
| `configurable` | | Set to `true` when the feature has options to edit. Defaults to `false`. |

Always define `isSupported`. Without it, the feature is offered for every entity, including the ones it does nothing for.

A feature can have a visual editor, just like a card: the static `getConfigElement()` and `getConfigForm()` work the same as for [custom cards](/frontend/custom-ui/card-editor/). `getStubConfig(hass, context)` returns the configuration a new feature starts with, including its `type`.

## Fit in

Features sit in a tight space. Use the same variables as the built-in features, so yours lines up with them:

| Variable | Default | Use it for |
| --- | --- | --- |
| `--feature-height` | `42px` | The height of your control. |
| `--feature-border-radius` | `12px` | The corners of buttons and sliders. |
| `--feature-button-spacing` | `12px` | The space between buttons. |
