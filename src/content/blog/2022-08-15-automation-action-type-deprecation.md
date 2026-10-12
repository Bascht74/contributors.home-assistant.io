---
title: AutomationActionType deprecation for 2022.9
description: For Home Assistant Core 2022.9, we have deprecated AutomationActionType, AutomationTriggerInfo, and AutomationTriggerData from homeassistant/components/automation/init.py.
date: 2022-08-15
authors:
  - Marc Mueller
areas:
  - core
---

For Home Assistant Core 2022.9, we have deprecated `AutomationActionType`, `AutomationTriggerInfo`,
and `AutomationTriggerData` from `homeassistant/components/automation/__init__.py`.
They are being replaced by `TriggerActionType`, `TriggerInfo`, and `TriggerData`
from `homeassistant/helpers/trigger.py`.

| Old | New |
| --- | --- |
| `AutomationActionType` | `TriggerActionType` |
| `AutomationTriggerInfo` | `TriggerInfo` |
| `AutomationTriggerData` | `TriggerData` |

Furthermore, we recommend updating the `automation_info` parameter name for the
`async_attach_trigger` function to `trigger_info`.
