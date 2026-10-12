---
title: "Event"
description: "A message on the event bus that something happened, like a state change or a button press. Any code can listen to events."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "events"
    - "event bus"
  code:
    - "hass.bus"
    - "EVENT_STATE_CHANGED"
    - "EventEntity"
  related:
    - "state-machine"
    - "trigger"
    - "hass"
  autolink:
    - "event bus"
---

Home Assistant fires events for many things: a state change, an action being performed, Home Assistant starting. Automations can trigger on them.

Not to be confused with event entities: entities of the `event` type, which show the last thing that happened on a device, like a button press.
