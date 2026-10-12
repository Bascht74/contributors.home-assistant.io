---
title: "State machine"
description: "The part of Home Assistant Core that holds the current state of every entity."
sidebarGroup: "Entities and devices"
term:
  code:
    - "hass.states"
    - "StateMachine"
  related:
    - "state"
    - "hass"
    - "event"
  autolink:
    - "state machine"
---

Integrations write states to it, and everything else reads from it: automations, templates, dashboards. Writing goes through the entity, not straight to the state machine.
