---
title: Dashboards
description: What dashboards and cards are, how to pick the right card, and the principles every card follows.
order: 25
sidebarGroups:
  - Entity cards
  - Controls
  - Information
  - Grouping and layout
  - Media and pictures
---

A dashboard is the home screen of Home Assistant: the place people look at every day to see what is going on and to control their home. Dashboards are built from cards. Each card does one job, like showing a lamp, a graph, or the weather.

Each card has one page here, for designers and frontend developers alike. **Usage** comes first: when to use the card, which options change how it looks, and what to put in it. **Configuration** lists the options, with a YAML example. **In code** tells you where the card lives in the frontend. The examples on these pages are the real cards from the frontend, running live on a fake home, in the light or dark theme of the app.

## Views and sections

A dashboard has one or more views, the tabs at the top. The default view type is the sections view: cards sit in sections, and each section is a grid of 12 columns. A section is between 320 and 500 pixels wide, and the view adds columns of sections as the screen gets wider.

Rows in a section are 56 pixels high, with 8 pixels between them. Every card tells the grid how many columns and rows it needs, and what its minimum is. A tile card takes half a section and one row, so two tiles sit side by side. People can resize cards in the editor, within the limits the card sets.

Older views, like the masonry view, place cards in columns based on their height. They still work, but new dashboards start with sections.

## Choosing a card

Start with the [tile card](/design/dashboards/tile-card/). It shows one entity, its state, and with features, the controls people need. When you add an entity to a section, it becomes a tile, and the dashboard Home Assistant builds for you is mostly tiles. Most of the time, a tile is the right answer.

Pick another card when the tile can't do the job:

- Something over time, like a temperature over the past day: the [history graph card](/design/dashboards/history-graph-card/) or the [sensor card](/design/dashboards/sensor-card/).
- A big, focused control for one device: the [thermostat card](/design/dashboards/thermostat-card/), the [light card](/design/dashboards/light-card/), or the [media control card](/design/dashboards/media-control-card/).
- Many entities in little room, like a list of settings: the [entities card](/design/dashboards/entities-card/).
- Something that is not an entity, like text or a web page: the [markdown card](/design/dashboards/markdown-card/) or the [webpage card](/design/dashboards/iframe-card/).
- A title above a group of cards: the [heading card](/design/dashboards/heading-card/).

## Card principles

These principles come from how the cards in the frontend work. Follow them when you design a new card, or change an existing one.

- **Fit the grid.** A card sizes itself in columns and rows of the sections grid, not in pixels. Give it a sensible default size and a minimum, and make it look good when people resize it.
- **Follow the state.** Cards use the icon and color of the state of an entity, so a light that is on looks the same on every card. Do not invent a new color for something the state already says.
- **One tap, one expected result.** Selecting an entity opens its more-info dialog, by default. Quick actions, like toggling a light from the icon of a tile, go where people expect them. Most cards that show an entity support `tap_action`, `hold_action`, and `double_tap_action`, so people can change what happens.
- **Reuse features.** Controls inside a card are card features, like a brightness slider or the buttons of a cover. A feature is built once, and the tile card, the area card, the thermostat card, and the humidifier card can all use it. Add a feature before you add a new card.
- **Show only what is there.** A card hides what an entity does not support, like the color controls of a lamp that only dims. Do not show controls that do nothing.
- **Be honest when something is wrong.** When an entity is unavailable, the card says so and grays out. When the configuration is wrong, the card turns into an error card that says what is missing.
- **Make it editable.** Every card has a visual editor, so people never need YAML to set it up. A new option needs a field in the editor.

## Entity cards

- [Tile card](/design/dashboards/tile-card/): one entity, its state, and its controls. The default.
- [Entity card](/design/dashboards/entity-card/): the state of one entity, big and clear.
- [Button card](/design/dashboards/button-card/): a big button for one entity or action.
- [Entities card](/design/dashboards/entities-card/): a list of entities, one per row.
- [Glance card](/design/dashboards/glance-card/): the state of a few entities at a glance.
- [Entity filter card](/design/dashboards/entity-filter-card/): only the entities that are in a certain state.

## Controls

- [Light card](/design/dashboards/light-card/): brightness of one light, on a dial.
- [Thermostat card](/design/dashboards/thermostat-card/): the target temperature, on a dial.
- [Humidifier card](/design/dashboards/humidifier-card/): the target humidity, on a dial.
- [Alarm panel card](/design/dashboards/alarm-panel-card/): arm and disarm an alarm, with a keypad.
- [Media control card](/design/dashboards/media-control-card/): what is playing, and the controls to play it.
- [To-do list card](/design/dashboards/todo-list-card/): the items of a to-do list.

## Information

- [Sensor card](/design/dashboards/sensor-card/): the value of a sensor, with a small graph.
- [Gauge card](/design/dashboards/gauge-card/): a single value on a dial.
- [History graph card](/design/dashboards/history-graph-card/): how states changed over time.
- [Weather forecast card](/design/dashboards/weather-forecast-card/): the weather now, and the days or hours ahead.
- [Map card](/design/dashboards/map-card/): where people and things are.
- [Markdown card](/design/dashboards/markdown-card/): text, written in Markdown.
- [Plant status card](/design/dashboards/plant-status-card/): how a plant is doing.
- [Clock card](/design/dashboards/clock-card/): the time, digital or analog.

## Grouping and layout

- [Heading card](/design/dashboards/heading-card/): a title for a group of cards.
- [Area card](/design/dashboards/area-card/): an area, with its sensors and controls.
- [Grid and stack cards](/design/dashboards/grid-card/): cards in a grid, a row, or a column.
- [Conditional card](/design/dashboards/conditional-card/): a card that only shows when conditions are met.

## Media and pictures

- [Picture card](/design/dashboards/picture-card/): a picture that does something when selected.
- [Picture entity card](/design/dashboards/picture-entity-card/): an entity, shown as a picture or a camera.
- [Picture glance card](/design/dashboards/picture-glance-card/): a picture, with a row of entities on top.
- [Picture elements card](/design/dashboards/picture-elements-card/): entities and actions placed on a picture, like a floor plan.
- [Webpage card](/design/dashboards/iframe-card/): a web page, inside the dashboard.
