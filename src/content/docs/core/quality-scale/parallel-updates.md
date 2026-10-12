---
title: Set the number of parallel updates
description: "Silver rule parallel-updates: every entity platform sets PARALLEL_UPDATES."
sidebarLabel: parallel-updates
sidebarGroup: Silver
order: 8
---

This is a Silver rule. In `quality_scale.yaml`, it is called `parallel-updates`.

Every [platform](/glossary/platform/) module of the integration, like `sensor.py` or `light.py`, must set `PARALLEL_UPDATES` explicitly. It is the maximum number of entity updates and entity actions of that platform that Home Assistant runs at the same time. `0` means no limit.

## Why it matters

Some devices and services cannot handle many requests at once. A small device with ten entities can choke when all ten update at the same moment, or when a scene turns on ten of its switches at once. `PARALLEL_UPDATES` lets Home Assistant queue them instead.

Setting it explicitly also means someone thought about it. The right value depends on the device, and only the integration knows it.

## Example

A platform that talks to the device for every entity sends one request at a time:

```python
PARALLEL_UPDATES = 1


class MySwitch(SwitchEntity):
    """A switch on the device."""
```

With a [coordinator](/glossary/coordinator/), the data is already fetched in one place, so entity updates do not need a limit. On a read-only platform, like `sensor` or `binary_sensor`, set it to `0`:

```python
# The coordinator fetches the data, so updates need no limit
PARALLEL_UPDATES = 0
```

A coordinator does not limit actions, though. On platforms with actions, like `switch` or `light`, think about how many commands the device accepts at once, and set the value to match.

## How it is checked

- Pylint, when the rule is `done`: every platform module must define a module-level `PARALLEL_UPDATES` (`home-assistant-missing-parallel-updates`).
- Whether the value fits the device is checked in review.

## Exceptions

If the integration has no entity platforms, this rule does not apply.

## Related rules

- [appropriate-polling](/core/quality-scale/appropriate-polling/): poll at an appropriate interval.
