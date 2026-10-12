---
title: "State"
description: "The current value of an entity, like `on`, `21.5`, or `playing`, together with its attributes."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "states"
    - "state object"
  code:
    - "State"
    - "hass.states"
    - "native_value"
  related:
    - "entity"
    - "attribute"
    - "state-machine"
    - "unavailable"
---

States live in the [state machine](/glossary/state-machine/). A state is always stored as a string, even when it is a number. When it changes, Home Assistant fires a `state_changed` [event](/glossary/event/), and the recorder writes it to the history.

Two states are special: [unavailable and unknown](/glossary/unavailable/).
