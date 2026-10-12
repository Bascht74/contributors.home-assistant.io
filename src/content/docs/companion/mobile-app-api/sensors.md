---
title: Sensors
description: Register sensors and binary sensors from an app, update their states, and keep their enabled state in sync with Home Assistant.
order: 4
---

An app can add its own sensors and binary sensors to its device in Home Assistant: battery level, steps, Wi-Fi network, whatever the device knows. The app manages them entirely. Each one becomes an entity of the app's device.

## Register a sensor

Register each sensor once, before you update it. You register one sensor per request:

```json
{
  "type": "register_sensor",
  "data": {
    "type": "sensor",
    "unique_id": "battery_level",
    "name": "Battery level",
    "state": 42,
    "device_class": "battery",
    "unit_of_measurement": "%",
    "state_class": "measurement",
    "entity_category": "diagnostic",
    "icon": "mdi:battery",
    "attributes": {
      "charging": false
    }
  }
}
```

| Key | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | Yes | string | `sensor` or `binary_sensor` |
| `unique_id` | Yes | string | An ID, unique within this registration. You need it for every update |
| `name` | Yes | string | The name of the sensor. Home Assistant puts the device name in front of it |
| `state` | No | boolean, number, or string | The current state |
| `device_class` | No | string | A [sensor](/core/entities/sensor/) or [binary sensor](/core/entities/binary-sensor/) device class |
| `unit_of_measurement` | No | string | The unit of the state |
| `state_class` | No | string | The state class. Only for sensors, not binary sensors |
| `entity_category` | No | string | `config` or `diagnostic` |
| `icon` | No | string | An icon, like `mdi:battery`. Defaults to `mdi:cellphone` |
| `attributes` | No | object | Extra state attributes |
| `disabled` | No | boolean | Whether the entity is disabled in Home Assistant |

A successful registration returns `201` with `{"success": true}`. The entity appears right away.

Registering a sensor that already exists is fine. Home Assistant updates the name, device class, unit, entity category, icon, and enabled state if they changed, and applies the request like an update. So send the current `state`, `icon`, and `attributes` along: a left-out `state` makes the state unknown, and a left-out `icon` or `attributes` goes back to its default.

## Update sensors

Update as many sensors as you like in one request. `data` is a list:

```json
{
  "type": "update_sensor_states",
  "data": [
    {
      "type": "sensor",
      "unique_id": "battery_level",
      "state": 41,
      "icon": "mdi:battery-40",
      "attributes": {
        "charging": false
      }
    }
  ]
}
```

| Key | Required | Type | Description |
| --- | --- | --- | --- |
| `type` | Yes | string | `sensor` or `binary_sensor` |
| `unique_id` | Yes | string | The ID you registered the sensor with |
| `state` | Yes | boolean, number, string, or `null` | The new state. The string `unavailable` marks the sensor as unavailable |
| `icon` | No | string | The icon. Falls back to `mdi:cellphone` when left out, so send it with every update if you set one |
| `attributes` | No | object | The state attributes, replacing the old ones |

The update is checked in two steps:

1. The whole list is checked first, for a valid `type` and a `unique_id` on every sensor. If one sensor fails that, the whole request is rejected: you get an empty `{}` with a `200`, and none of the sensors are updated.
2. Then each sensor is checked on its own. A sensor that isn't registered fails with `not_registered`. Only the keys above are allowed. Anything else, like a `name`, or a state of the wrong type, makes that one sensor fail with `invalid_format`. The other sensors are still updated.

After the second step, the response has a result per `unique_id`:

```json
{
  "battery_level": {
    "success": true
  },
  "steps": {
    "success": true,
    "is_disabled": true
  },
  "pressure": {
    "success": false,
    "error": {
      "code": "not_registered",
      "message": "sensor pressure is not registered"
    }
  },
  "light_level": {
    "success": false,
    "error": {
      "code": "invalid_format",
      "message": "<what is wrong>"
    }
  }
}
```

`not_registered` means you need to register the sensor first. `invalid_format` means the update didn't match the schema.

## Keep the enabled state in sync

Users can disable entities in Home Assistant. A disabled sensor is not worth collecting on the phone: it costs battery for nothing. So the app and Home Assistant keep the enabled state of each sensor in sync, in both directions:

- **The user turns a sensor on or off in the app**: send `register_sensor` for it again, with `disabled` set to `true` or `false`.
- **The app updates a sensor that is disabled in Home Assistant**: the update succeeds, but the result contains `"is_disabled": true`. Take that as a signal to fetch the enabled states from Home Assistant.
- **The user turns an entity on or off in Home Assistant**: the [`get_config`](/companion/mobile-app-api/sending-data/#get_config) response contains `entities`, which maps each `unique_id` to its enabled state. Apply it in the app.

```json
{
  "entities": {
    "battery_level": {
      "disabled": false
    },
    "steps": {
      "disabled": true
    }
  }
}
```

Users of the official apps manage their sensors as described in the [sensors documentation](https://companion.home-assistant.io/docs/core/sensors).
