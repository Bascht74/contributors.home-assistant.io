---
title: New alarm control panel state property and state enum
description: As of Home Assistant Core 2024.11, we have introduced the alarm_state property in the AlarmControlPanelEntity.
date: 2024-10-22
authors:
  - G Johansson
areas:
  - core
---

As of Home Assistant Core 2024.11, we have introduced the `alarm_state` property in the `AlarmControlPanelEntity`. This newly added property should be used instead of directly setting the `state` property.

The new `alarm_state` property should return its state using the new `AlarmControlPanelState` enum instead of as previously, setting the state using the `STATE_ALARM_*` constants.

There is a one-year deprecation period, and the constants will stop working from 2025.11 to ensure all custom integration authors have time to adjust.

### Example

```python

from homeassistant.components.alarm_control_panel import AlarmControlPanelEntity, AlarmControlPanelState

class MyAlarm(AlarmControlPanelEntity):
    """My alarm."""

    @property
    def alarm_state(self) -> AlarmControlPanelState | None:
        """Return the state of the alarm."""
        if self.device.is_on():
            return AlarmControlPanelState.ARMED_AWAY
        return AlarmControlPanelState.DISARMED

```

More details can be found in the [alarm control panel documentation](/core/entities/alarm-control-panel/#states).
