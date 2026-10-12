---
title: More info
description: The dialog that opens when you select an entity, and the view each type of entity gets in it.
order: 26
sidebarGroups:
  - Lights and climate
  - Openings and security
  - Media
  - Appliances
  - Helpers
  - Information
---

Select an entity almost anywhere in Home Assistant, and the more-info dialog opens. It is the one place where you see everything about a single entity: its state, a control to change it, what it did before, and its settings. Because it opens from dashboards, from search, from the entities table, and from other dialogs, it is one of the screens people see most.

The dialog is the same for every entity. What sits inside it depends on the domain: a light gets a brightness slider, a thermostat gets a round dial, a timer gets a duration field. These pages show each of those domain views, rendered live by the real frontend on a fake home.

## Anatomy

The dialog has a header and a few views you move between.

- **Header**: a close button, the name of the entity, and above it a breadcrumb with the area and the device it belongs to. On the right sit a **History** button, a **Settings** button, and a menu. The menu holds **Add to…**, the favorites options for entities that have them, a link to the device, **Related**, and **Details**. The **Settings** button and the menu show only for administrators.
- **Info view**: the default view. For domains with the newer design it starts with a large state, like **71%** or **Locked**, and the time it last changed. Select the time to switch between relative and absolute time. Below it is the main control, and below that the secondary controls. Older domains show a state row at the top instead. Domains without a view of their own, like a sensor, also get a history graph and an activity list below it.
- **History**: the history graph and the activity of the entity. For domains with their own view, history lives behind the header button, so the info view stays about controlling the device.
- **Settings**: the entity settings, like its name, icon, area, and whether it is enabled.
- **Related**: the context of the entity, like its floor, area, device, integration, and labels, followed by the other items it is related to, like the automations and scripts that use it.
- **Details**: the entity ID, the raw state, when it last changed and updated, and every attribute. A code button in the header switches it to YAML.

When an entity is a group of other entities, like a light group or a scene, the info view lists the members below the controls as tile cards, so you can control them one by one.

## Design principles

The newer more-info views follow the same pattern, so a light, a lock, and a fan feel like one family.

- **One big main control.** Each view has one control that does the main job of the entity, and it gets most of the room: a vertical slider, a big switch, a round dial. These come from the [controls](/design/components/controls/) family, made to be used with a finger as much as with a mouse.
- **Secondary controls below.** Modes, presets, and other settings sit in a row of compact [select menus](/design/components/select-menu/) under the main control. Small mode switches, like brightness or color for a light, sit in a row of round icon buttons right below it.
- **The state first.** The large state at the top tells you what is going on before you touch anything. Views reword it when that helps: a light shows its brightness, a cover shows **Open · 70%**.
- **Only what the device can do.** Every control checks the supported features of the entity. When a device can't do something, the control is not there. It is not shown disabled, it is gone. Controls are only disabled when the entity is unavailable, or when an action makes no sense in the current state, like closing a door that is already closed.
- **Color follows state.** Controls take the color of the entity's state, like amber for a light that is on or green for a locked lock, using the same colors as the [state icon](/design/components/state-icon/).

## Views

### Lights and climate

- [Light](/design/more-info/light/)
- [Climate](/design/more-info/climate/)
- [Fan](/design/more-info/fan/)
- [Humidifier](/design/more-info/humidifier/)
- [Water heater](/design/more-info/water-heater/)

### Openings and security

- [Cover](/design/more-info/cover/)
- [Valve](/design/more-info/valve/)
- [Lock](/design/more-info/lock/)
- [Alarm control panel](/design/more-info/alarm-control-panel/)

### Media

- [Media player](/design/more-info/media-player/)

### Appliances

- [Vacuum](/design/more-info/vacuum/)
- [Lawn mower](/design/more-info/lawn-mower/)
- [Switch](/design/more-info/switch/)
- [Update](/design/more-info/update/)

### Helpers

- [Input number](/design/more-info/input-number/)
- [Number](/design/more-info/number/)
- [Input text](/design/more-info/input-text/)
- [Timer](/design/more-info/timer/)
- [Scene](/design/more-info/scene/)

### Information

- [Weather](/design/more-info/weather/)
- [Person](/design/more-info/person/)
- [Sun](/design/more-info/sun/)

## In code

The dialog is `ha-more-info-dialog`, in `src/dialogs/more-info/`. The info view is `ha-more-info-info`, which renders `more-info-content`. That element picks the view for the domain of the entity, `more-info-<domain>`, from `src/dialogs/more-info/controls/`. The list of domains with the newer design is `DOMAINS_WITH_NEW_MORE_INFO` in `src/dialogs/more-info/const.ts`.

The large state at the top is `ha-more-info-state-header`, and the row of secondary controls is `ha-more-info-control-select-container`, both in `src/dialogs/more-info/components/`. Most main controls live in `src/state-control/`, one folder per domain.

Source: [`src/dialogs/more-info/`](https://github.com/home-assistant/frontend/tree/dev/src/dialogs/more-info)
