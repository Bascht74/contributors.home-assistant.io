---
title: Custom card suggestions in the card picker
description: As of Home Assistant 2026.6, custom cards can show up as suggestions in the card picker.
date: 2026-05-27
authors:
  - Paul Bottein
areas:
  - frontend
---

As of Home Assistant 2026.6, custom cards can show up as suggestions in the card picker. When a user selects an entity, custom cards that opt in are listed under a **Community** section, below the built-in suggestions.

To opt in, add a `getEntitySuggestion` function to your `window.customCards` entry. It receives the `hass` object and the selected entity id, and returns a suggestion (or `null` if the entity is not supported):

```js
window.customCards.push({
  type: "my-card",
  name: "My Card",
  getEntitySuggestion: (hass, entityId) => {
    if (entityId.split(".")[0] !== "light") {
      return null;
    }
    return {
      config: { type: "custom:my-card", entity: entityId },
    };
  },
});
```

You can also return an array of suggestions to offer several variants, each with its own `label`.

Only suggest your card when it makes sense for the entity. Check the domain, device class, or supported features with the `hass` object, and return `null` otherwise. Suggesting your card for every entity makes the picker noisy.

See the [custom card documentation](/frontend/custom-ui/card/) for the full reference.
