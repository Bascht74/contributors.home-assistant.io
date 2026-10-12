---
title: Action event for custom cards
description: In the Home Assistant Core 2023.7 release, we introduced hass-action for custom cards.
date: 2023-07-07
authors:
  - Paul Bottein
areas:
  - frontend
---

In the Home Assistant Core 2023.7 release, we introduced `hass-action` for custom cards.

If you are a custom cards developer, you can now use any [card action](https://www.home-assistant.io/dashboards/actions/) in your custom card by using the new `hass-action`.

Example :

```js
// Define the action config
const actionConfig = {
  entity: "sensor.temperature",
  tap_action: {
    action: "more-info",
  },
  hold_action: {
    action: "assist",
    start_listening: true,
  },
};

// Open more info on tap action
const event = new Event("hass-action", {
  bubbles: true,
  composed: true,
});
event.detail = {
  config: actionConfig,
  action: "tap",
};
this.dispatchEvent(event);

// Open assist dialog on hold action
const event = new Event("hass-action", {
  bubbles: true,
  composed: true,
});
event.detail = {
  config: actionConfig,
  action: "hold",
};
this.dispatchEvent(event);
```
