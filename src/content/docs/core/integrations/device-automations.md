---
title: Device automations
description: How device triggers, conditions, and actions work, for the integrations that already have them.
sidebarGroup: Integration features
order: 3
---

> [!IMPORTANT]
> Alternatives to device automations are being explored. Existing device automations keep working, but new device automations are not accepted. This page is for maintaining the ones that exist.

Device automations let users build automations around a device, without knowing about states, events, or actions. They pick a device, and then pick from a list of triggers, conditions, and actions for it, like "Button 1 pressed" or "Turn on the light". Under the hood, they use the same events, states, and actions as everything else.

They come from two places:

- The integration of the device, for things that are not tied to an entity, like a button press on a remote (ZHA and deCONZ do this).
- The entity integrations, for things that are tied to an entity, like a light turning on. The `light` integration provides these for every light.

An integration adds them with three platform files: `device_trigger.py`, `device_condition.py`, and `device_action.py`. Each one defines a schema, a function that lists what a device supports, and a function that does the work. The scaffold script has templates for all three: `python3 -m script.scaffold device_trigger`, `device_condition`, or `device_action`.

## Device triggers

A trigger fires when something happens to the device, like an event on the bus or a state change.

```python
import probatio

from homeassistant.components.device_automation import (
    DEVICE_TRIGGER_BASE_SCHEMA,
)
from homeassistant.components.homeassistant.triggers import event
from homeassistant.const import (
    CONF_DEVICE_ID,
    CONF_DOMAIN,
    CONF_PLATFORM,
    CONF_TYPE,
)

TRIGGER_TYPES = {"button_short_press", "button_long_press"}

TRIGGER_SCHEMA = DEVICE_TRIGGER_BASE_SCHEMA.extend(
    {probatio.Required(CONF_TYPE): probatio.In(TRIGGER_TYPES)}
)


async def async_get_triggers(
    hass: HomeAssistant, device_id: str
) -> list[dict[str, Any]]:
    """List the triggers of a device."""
    return [
        {
            CONF_PLATFORM: "device",
            CONF_DOMAIN: DOMAIN,
            CONF_DEVICE_ID: device_id,
            CONF_TYPE: trigger_type,
        }
        for trigger_type in TRIGGER_TYPES
    ]


async def async_attach_trigger(
    hass: HomeAssistant,
    config: ConfigType,
    action: TriggerActionType,
    trigger_info: TriggerInfo,
) -> CALLBACK_TYPE:
    """Attach a trigger to the event of the device."""
    event_config = event.TRIGGER_SCHEMA(
        {
            event.CONF_PLATFORM: "event",
            event.CONF_EVENT_TYPE: f"{DOMAIN}_event",
            event.CONF_EVENT_DATA: {
                CONF_DEVICE_ID: config[CONF_DEVICE_ID],
                CONF_TYPE: config[CONF_TYPE],
            },
        }
    )

    return await event.async_attach_trigger(
        hass, event_config, action, trigger_info, platform_type="device"
    )
```

- `TRIGGER_SCHEMA` validates a trigger. Define it as a constant in the module, and Home Assistant applies it for you. Do not apply it yourself.
- `async_get_triggers` lists the triggers a device supports. These are what users can pick.
- `async_attach_trigger` makes the trigger fire. It returns a function that detaches it.

If the static schema is not enough, implement `async_validate_trigger_config(hass, config)` to validate dynamically.

## Device conditions

A condition checks something about the device, like whether a light is on.

- `CONDITION_SCHEMA`: extends `DEVICE_CONDITION_BASE_SCHEMA` from `homeassistant.helpers.config_validation`.
- `async_get_conditions(hass, device_id)`: lists the conditions a device supports.
- `async_condition_from_config(hass, config)`: returns a function that checks the condition, and returns a `bool`. It must be safe to call from the event loop.

Implement `async_validate_condition_config(hass, config)` for dynamic validation.

## Device actions

An action makes the device do something, like turning on a light or rebooting the device.

- `ACTION_SCHEMA`: extends `DEVICE_ACTION_BASE_SCHEMA` from `homeassistant.helpers.config_validation`. Home Assistant applies it, do not apply it yourself.
- `async_get_actions(hass, device_id)`: lists the actions a device supports.
- `async_call_action_from_config(hass, config, variables, context)`: performs the action.

Implement `async_validate_action_config(hass, config)` for dynamic validation.

## Secondary device automations

Devices with many triggers, conditions, or actions can overwhelm users. Mark the less important ones as secondary. They are still available, but may be shown after the others, or behind a "show more" option.

```python
{
    CONF_PLATFORM: "device",
    CONF_DOMAIN: DOMAIN,
    CONF_DEVICE_ID: device_id,
    CONF_TYPE: "button_long_press",
    "metadata": {"secondary": True},
}
```

If a device automation refers to an entity with an `entity_id` key, it is marked secondary automatically when that entity is hidden, or has an [entity category](/glossary/entity-category/).

## Texts

The names users see come from `strings.json`, under `device_automation`:

```json
{
  "device_automation": {
    "trigger_type": {
      "button_short_press": "Button pressed",
      "button_long_press": "Button held down"
    },
    "condition_type": {
      "is_on": "{entity_name} is on"
    },
    "action_type": {
      "reboot": "Reboot"
    }
  }
}
```

Run `python3 -m script.translations develop` to see changes while you develop.
