---
title: "The hass object"
description: "The `HomeAssistant` instance that integrations get, with access to the state machine, the event bus, actions, and the configuration."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "hass"
  code:
    - "HomeAssistant"
    - "hass"
  related:
    - "state-machine"
    - "event"
    - "action"
    - "event-loop"
  autolink:
    - "hass object"
---

Almost every function in Home Assistant Core takes `hass` as its first argument. It is how code reaches everything else: `hass.states`, `hass.bus`, `hass.services`, and `hass.config`.

`hass` is a name in code. In text, write Home Assistant.
