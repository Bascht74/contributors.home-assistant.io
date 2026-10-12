---
title: Document supported functionality
description: "Gold rule docs-supported-functions: the documentation describes the entities and functionality it provides."
sidebarLabel: docs-supported-functions
sidebarGroup: Gold
order: 9
---

This is a Gold rule. In `quality_scale.yaml`, it is called `docs-supported-functions`.

The integration page on [home-assistant.io](https://www.home-assistant.io/) describes what the integration provides: its entities per platform, what each one does, and on which devices it is available. Sort the list by entity type, or by device when the integration supports very different devices.

## Why it matters

Users want to know what they get before they buy a device. Someone who looks for a fridge they can monitor would be disappointed to find out after the purchase that the integration only reports whether the door is open, and not the temperature. A clear list of entities sets the right expectations.

The list also helps users who already have the device, to find the entity they are looking for, and to understand what it means.

## Example

Sorted by entity type:

```markdown
## Supported functionality

### Buttons

- **Start backflush**
  - **Description**: Starts the backflush of the machine. Turn the
    paddle within 15 seconds after you press it.
  - **Available for machines**: all

### Sensors

- **Coffee temperature**
  - **Description**: Current temperature of the coffee boiler.
  - **Available for machines**: all
- **Steam temperature**
  - **Description**: Current temperature of the steam boiler.
  - **Available for machines**: Micra, GS3
  - **Remarks**: Disabled by default.
```

Sorted by device:

```markdown
## Supported functionality

### Air purifier

#### Sensors

- **Filter life remaining**: The remaining life of the filter, in days.
- **Purified volume**: The volume of air the purifier cleaned, in cubic
  meters. Disabled by default.

#### Numbers

- **Favorite level**: The fan level of the favorite mode, from 0 to 10.
```

See [Write integration documentation](/writing/guides/integration/) and the [integration page structure](/writing/reference/integration-page/) for where this section goes.

## How it is checked

Checked in review, usually on the documentation pull request.

## Exceptions

There are no exceptions to this rule.
