---
title: Assign entity categories
description: "Gold rule entity-category: configuration and diagnostic entities have an entity category."
sidebarLabel: entity-category
sidebarGroup: Gold
order: 13
---

This is a Gold rule. In `quality_scale.yaml`, it is called `entity-category`.

Entities that are not the main purpose of a device get an [entity category](/glossary/entity-category/). There are two:

- `EntityCategory.CONFIG`: an entity that changes the configuration of a device, like a switch that turns off the status LED.
- `EntityCategory.DIAGNOSTIC`: an entity that shows information about the device itself, like its signal strength, uptime, or firmware version.

Entities that are the reason someone has the device, like the temperature of a thermostat, keep the default: no category.

## Why it matters

Home Assistant uses the category to decide where an entity shows up. Auto-generated dashboards leave configuration and diagnostic entities out, and the device page shows them in their own sections. Without categories, the signal strength of a sensor ends up next to the temperature on the dashboard of every user.

## Example

```python
class MySignalStrengthSensor(SensorEntity):
    """The signal strength of My device."""

    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_device_class = SensorDeviceClass.SIGNAL_STRENGTH
```

With entity descriptions, set `entity_category` on the description instead.

## How it is checked

Checked in review.

## Exceptions

If the integration has no entities, or all its entities are primary entities for which no category is right, this rule does not apply.
