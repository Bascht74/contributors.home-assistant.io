---
title: Permissions
description: How permission policies are structured and merged, and how to check them in actions, HTTP views, and WebSocket commands.
sidebarGroup: Authentication
order: 21
---

Permissions limit what a user can see and control. They are attached to groups, and a user gets the combined permissions of all their groups. The owner is the exception: permissions never apply to the owner, who can always do everything.

Permissions only work if your code checks them, and only if it keeps track of *who* asked. That second part is the one people forget.

## Policies

A policy is a dictionary. Its top level holds categories. Today, policies only use `entities`.

```python
{
    "entities": {
        "domains": {"switch": True},
        "entity_ids": {
            "light.kitchen": {"read": True, "control": True},
        },
    }
}
```

Anywhere in a policy, a value can be `True` (allowed) or `None` (use the default, which is deny). A category that is missing is denied.

The `entities` category has the subcategories `entity_ids`, `device_ids`, `area_ids`, `domains`, and `all`. Home Assistant checks them in that order and uses the first one that matches. Each grants access with `True`, or per permission with the keys `read`, `control`, and `edit`.

The three built-in groups have these policies:

| Group | Policy |
| --- | --- |
| Administrators | `{"entities": True}` |
| Users | `{"entities": True}` |
| Read only | `{"entities": {"all": {"read": True}}}` |

Users and administrators can control the same entities. What sets administrators apart is `user.is_admin`, which code checks separately for anything that changes configuration.

### Merging policies

When a user is in several groups, their policies are merged, level by level:

1. If any value is `True`, the result is `True`.
2. If any value is a dictionary, the result is a dictionary, merged with these same rules.
3. If all values are `None`, the result is `None`.

So `{"entities": {"entity_ids": {"light.kitchen": True}}}` merged with `{"entities": {"entity_ids": True}}` gives `{"entities": {"entity_ids": True}}`.

## The context carries the user

Every action call, event, and state has a `Context`, and the context has a `user_id`. That is how Home Assistant knows who did something, for the logbook and for permission checks.

- In an action handler, pass `call.context` on to whatever you do.
- In an HTTP view or WebSocket command, create a context for the user of the request. Both have a helper for it: `self.context(request)` in a view, and `connection.context(msg)` in a WebSocket command.

```python
await hass.services.async_call(
    "homeassistant",
    "restart",
    context=connection.context(msg),
    blocking=True,
)
```

## Check a permission

With the user object in hand, a check is one line:

```python
from homeassistant.auth.permissions.const import POLICY_CONTROL
from homeassistant.exceptions import Unauthorized

if not user.is_admin:
    raise Unauthorized()

if not user.permissions.check_entity(entity_id, POLICY_CONTROL):
    raise Unauthorized(entity_id=entity_id, permission=POLICY_CONTROL)
```

The permission constants are `POLICY_READ`, `POLICY_CONTROL`, and `POLICY_EDIT`.

When a check fails, raise `Unauthorized` from `homeassistant.exceptions`. It stops what you were doing and tells the user they are not allowed. All of its arguments are optional, and help to say what failed: `context`, `user_id`, `entity_id`, `config_entry_id`, `perm_category` (when there is no object ID, like when creating a config entry), and `permission`.

Some APIs are open to every user but limit what they return, like `get_states` over the WebSocket API, which only returns the entities the user may read.

## In an action

Actions registered for entities with `async_register_platform_entity_service`, and the actions of entity components, check entity permissions for you. For an action that only an admin may call, register it with `async_register_admin_service`. See [actions](/core/internals/actions/).

If you register a plain action that acts on entities, check each one yourself:

```python
from homeassistant.auth.permissions.const import POLICY_CONTROL
from homeassistant.exceptions import Unauthorized, UnknownUser


async def async_handle_reset(call: ServiceCall) -> None:
    """Reset the given entities."""
    if call.context.user_id:
        user = await call.hass.auth.async_get_user(call.context.user_id)
        if user is None:
            raise UnknownUser(context=call.context)

        for entity_id in call.data["entity_id"]:
            if not user.permissions.check_entity(
                entity_id, POLICY_CONTROL
            ):
                raise Unauthorized(
                    context=call.context,
                    entity_id=entity_id,
                    permission=POLICY_CONTROL,
                )

    ...
```

No `user_id` means the call did not come from a user, but from Home Assistant itself, like an automation.

## In an HTTP view

The user of the request is in `request["hass_user"]`:

```python
from aiohttp import web

from homeassistant.helpers.http import KEY_HASS, HomeAssistantView
from homeassistant.exceptions import Unauthorized


class MyResetView(HomeAssistantView):
    """Reset everything, for admins only."""

    url = "/api/my_integration/reset"
    name = "api:my_integration:reset"

    async def post(self, request: web.Request) -> web.Response:
        """Handle the reset."""
        hass = request.app[KEY_HASS]
        user = request["hass_user"]
        if not user.is_admin:
            raise Unauthorized()

        hass.bus.async_fire(
            "my_integration_reset", context=self.context(request)
        )
        return self.json_message("Done.")
```

## In a WebSocket command

The user is `connection.user`. For admin-only commands, use the `require_admin` decorator. See [adding your own commands](/core/internals/websocket-api/#add-your-own-command) in the WebSocket API.
