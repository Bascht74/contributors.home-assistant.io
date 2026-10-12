---
title: Format entity names in custom cards
description: As of Home Assistant 2026.4, the hass object exposes a formatEntityName helper. It is the same function used by the built-in cards (tile card, entity rows, ...) to compute the display name of an entity from its registry context (entity, device, area, floor).
date: 2026-05-11
authors:
  - Paul Bottein
areas:
  - frontend
---

As of Home Assistant 2026.4, the `hass` object exposes a `formatEntityName` helper. It is the same function used by the built-in cards (tile card, entity rows, ...) to compute the display name of an entity from its registry context (entity, device, area, floor). Custom cards can use it to produce names that stay consistent with the rest of the dashboard.

Given a temperature sensor named `Temperature` on a device named `Thermostat`:

```js
const stateObj = hass.states["sensor.living_room_thermostat_temperature"];

hass.formatEntityName(
  stateObj,
  [{ type: "device" }, { type: "entity" }],
  { separator: " · " }
); // "Thermostat · Temperature"
```

The frontend also ships an `entity_name` selector. If your card uses the [built-in form editor](/frontend/custom-ui/card/), you can offer users the same name picker the built-in cards use — accepting either a free-form string or a composition of registry items.

Take a look at the updated [data documentation](/frontend/reference/hass-object/) for the full reference and more examples.
