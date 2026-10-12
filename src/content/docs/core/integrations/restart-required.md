---
title: Asking for a restart
description: Tell Home Assistant it needs a restart to apply a change, without raising a repair issue.
sidebarLabel: Restart required
sidebarGroup: Integration features
order: 6
---

Some changes only take effect after Home Assistant restarts, like an update to a custom integration, or a setting that is only read at startup. Your integration does not need a [repair](/core/integrations/repairs/) issue for that. It asks for a restart, and Home Assistant collects all those requests into one indicator for the user, with the list of integrations that asked.

## Update entities

For an [update entity](/core/entities/update/), set `restart_required` to `True`. Once an install finishes without raising, the update entity asks for the restart on behalf of your integration. A failed install does not.

```python
class MyUpdate(UpdateEntity):
    """Updates that need a restart to apply."""

    _attr_restart_required = True
```

You can also set it on the entity description, with `UpdateEntityDescription(restart_required=True)`.

## Anything else

For everything that is not an update entity, call the helper with the domain of your integration:

```python
from homeassistant.helpers import system_state

system_state.async_set_home_assistant_restart_required(hass, DOMAIN)
```

The domain is shown to the user, so they can see what is waiting for the restart. Asking more than once is fine: your integration is listed once. Call the helper from the event loop.

Only ask once the change is actually waiting for the restart. Do not ask in advance.

## There is no way to take it back

Once asked, the restart stays pending until Home Assistant restarts. There is no API to clear it. The restart itself clears it, and by then your change is applied.

There is also no way for an integration to ask for a reboot of the host. Supervisor tracks whether the host needs a reboot, and the `hassio` integration passes that on to Home Assistant.

## Reading the state

Your integration does not need to read this state. It is there for the frontend. Admin users can subscribe to it with the `subscribe_system_state` [WebSocket](/core/internals/websocket-api/) command. It sends the current state right away, and again on every change:

```json
{
  "home_assistant_restart_dismissed": false,
  "home_assistant_restart_required": true,
  "home_assistant_restart_sources": ["demo", "hacs"],
  "host_reboot_dismissed": false,
  "host_reboot_required": false
}
```

## Putting it off

An admin can put off what is pending with the `dismiss_system_state` WebSocket command. That only hides it in the interface: the restart or reboot is still required, and the `*_dismissed` fields tell subscribers it was put off.

A restart that was put off comes back when another integration asks for one. Asking again for the same integration does not bring it back. A reboot that was put off only comes back once the pending reboot is gone and Supervisor raises a new one. None of this is stored, so a restart of Home Assistant forgets it.
