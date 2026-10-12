---
title: Frontend architecture
description: How the frontend is put together, from the first script that loads to the panels, dialogs, and the data that flows through them.
order: 20
sidebarLabel: Architecture
---

The frontend is a single-page application made of web components. Each component bundles its template, styles, and logic, and shows up in the browser as an HTML tag, like `<ha-button>` or `<hui-tile-card>`. Components are composed into bigger components, all the way up to the app itself.

## The parts

The frontend loads in four layers.

### Bootstrap

`src/entrypoints/core.ts` is a tiny script that loads first. It checks for login credentials and opens the WebSocket connection to Home Assistant Core. Because it is so small, the data starts flowing while the rest of the interface is still downloading.

### App shell

`src/entrypoints/app.ts` loads the root element, `<home-assistant>` in `src/layouts/home-assistant.ts`, and the global styles. The root element sets up the state of the app through a stack of mixins in `src/state/`: the connection, translations, themes, dialogs, the sidebar, and more. It then renders `src/layouts/home-assistant-main.ts`, which draws the sidebar and hands the current URL to the panel resolver.

### Panels

Every page in Home Assistant is a [panel](/glossary/panel/): dashboards, the map, history, the settings. Panels live in `src/panels/`, and are loaded only when someone opens them. Core decides which panels exist, and integrations can add their own. [Routing and panels](/frontend/architecture/routing-and-panels/) explains how.

### Dialogs

Dialogs live in `src/dialogs/`, and can open on top of any page. The best known is the [more-info dialog](/glossary/more-info-dialog/), which shows the state, history, and settings of one entity.

## Where things live

| Folder | What is in it |
| --- | --- |
| `src/components/` | Shared `ha-*` components, used everywhere. |
| `src/panels/` | One folder per panel. Dashboards are in `src/panels/lovelace/`. |
| `src/dialogs/` | Dialogs, including the more-info dialog. |
| `src/data/` | Types and functions that talk to Core: WebSocket commands, subscriptions, and contexts. |
| `src/common/` | Small helpers without UI: formatting, entity helpers, decorators, and DOM utilities. |
| `src/state/` | The mixins that make up the app state of the root element. |
| `src/layouts/` | The root element, the main layout, the panel resolver, and page layouts. |
| `src/resources/` | Global styles and theme definitions. |
| `src/translations/` | `en.json`, the English source of all frontend text. |
| `src/external_app/` | The bridge to the companion apps. |

## How data flows

The frontend talks to Core mostly over the [WebSocket API](https://github.com/home-assistant/home-assistant-js-websocket), and in a few places over the REST API.

Data flows one way. When something changes in Core, like a light turning on, the root element receives the update and makes a new `hass` object, and the change flows down the component tree to every component that needs it. When a component wants to change something, it calls Core, and waits for the change to come back down.

Components that need only part of the data consume a [Lit context](/frontend/architecture/hass-and-contexts/) instead of the whole `hass` object. Data that is not part of `hass`, like the label registry or the list of backups, is loaded through [subscriptions and commands](/frontend/architecture/data/) that keep it in sync with Core.

## Pages

- [Components and Lit](/frontend/architecture/components/): web components, Lit, and the `ha-*` components built on Web Awesome.
- [The hass object and contexts](/frontend/architecture/hass-and-contexts/): how components get their data.
- [The data layer](/frontend/architecture/data/): WebSocket commands, subscriptions, and collections.
- [Translations in the frontend](/frontend/architecture/translations/): how text gets translated.
- [Theming and design tokens](/frontend/architecture/theming/): theme variables and tokens, and how themes apply.
- [Routing and panels](/frontend/architecture/routing-and-panels/): how a URL becomes a page.
