---
title: Give entities a unique ID
description: "Bronze rule entity-unique-id: every entity has a unique ID, so users can customize it."
sidebarLabel: entity-unique-id
sidebarGroup: Bronze
order: 15
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `entity-unique-id`.

Every entity of the integration must have a [unique ID](/glossary/unique-id/). The ID must be stable: the same entity gets the same ID after a restart, a reload, or a firmware update. Use something the device or service provides, like a serial number or MAC address, combined with a key for what the entity measures.

## Why it matters

The entity [registry](/glossary/registry/) remembers entities across restarts by their unique ID. That is what lets users rename an entity, change its entity ID, its area, its icon, or its unit, and keep those changes. Without a unique ID, none of that is possible, and the entity is not much more than a value on a screen.

The unique ID only has to be unique per integration and per platform. Do not put the domain of the integration or the platform in it: the registry already includes both.

## Example

Set `_attr_unique_id` when you create the entity:

```python
class MySensor(SensorEntity):
    """Temperature sensor of a device."""

    def __init__(self, device: MyDevice) -> None:
        """Initialize the sensor."""
        self._attr_unique_id = f"{device.serial_number}_temperature"
```

With [entity descriptions](/glossary/entity-description/), the usual pattern is the serial number of the device with the `key` of the description.

Avoid IP addresses, hostnames, and names the user can change. They change, and when they do, the user loses their customizations. Changing how the unique ID is built after release needs a migration, so get it right from the start.

## How it is checked

- Pylint, when the rule is `done`: `home-assistant-missing-entity-unique-id` warns when an entity class does not always set a unique ID, and `home-assistant-entity-unique-id-static` warns when it is a fixed string in an integration that allows more than one config entry.
- Pylint, for every integration: `home-assistant-entity-unique-id-redundant-domain` and `home-assistant-entity-unique-id-redundant-platform` warn when the unique ID repeats the domain or the platform.
- Whether the ID is stable is checked in review.

## Exceptions

If the integration does not have any entities, this rule does not apply.

## Related rules

- [unique-config-entry](/core/quality-scale/unique-config-entry/): prevent duplicate config entries.
