---
title: "Action"
description: "Something Home Assistant can do, like turning on a light or sending a notification. Automations, scripts, and dashboards perform actions."
sidebarGroup: "Automations and organizing"
term:
  aliases:
    - "actions"
    - "perform an action"
  code:
    - "hass.services"
    - "services.yaml"
    - "ServiceCall"
    - "async_register"
  formerly:
    - "service"
    - "service call"
  related:
    - "automation"
    - "script"
    - "target"
    - "selector"
---

Integrations register actions, and describe their fields in `services.yaml`. An action can target entities, devices, areas, floors, or labels.

Actions used to be called services, and were renamed in Home Assistant 2024.8. The code still uses the old name: `hass.services`, `services.yaml`, and `ServiceCall`. In text, always say action, and "perform an action", not "call a service".
