---
title: Entity state formatting
description: "In the Home Assistant Core 2023.9 release, we introduced 3 new methods to the hass object to allow entity state formatting with localization support for custom cards:"
date: 2023-08-29
authors:
  - Paul Bottein
areas:
  - core
---

In the Home Assistant Core 2023.9 release, we introduced 3 new methods to the `hass` object to allow entity state formatting with localization support for custom cards:

- `hass.formatEntityState`
- `hass.formatEntityAttributeValue`
- `hass.formatEntityAttributeName`

Example:

```js
hass.formatEntityState(hass.states["cover.living_room_shutter"]); 
// It will return "Open" if the user language is English.
// It will return "Ouvert" if the user language is French.
```

For more details, refer to the [entity state formatting documentation](/frontend/reference/hass-object/).
