---
title: The frontend
description: Where the web interface fits in the whole of Home Assistant, and where to find its details.
order: 30
---

The [frontend](/glossary/frontend/) is everything users see: dashboards, settings, the automation editor, and every dialog. It is a web application, built with Lit and TypeScript, in the [home-assistant/frontend](https://github.com/home-assistant/frontend) repository. Core serves its files, it runs in the browser, and the [companion apps](/architecture/platform/companion-apps/) show it too.

## Its place in the whole

- **It holds no state of its own.** Everything it shows comes from Core, over the [WebSocket API](/core/internals/websocket-api/), and every change is pushed to it. Close the browser, and nothing is lost.
- **It never talks to devices.** Selecting a light performs an action in Core, and Core's integration talks to the light. The frontend only sees entities.
- **Text comes from two places.** The frontend's own text comes from its translation files. Text of integrations, like entity names and setup steps, comes from Core, from each integration's `strings.json`.
- **It loads in parts.** Pages, called panels, and dashboard cards load only when they are needed, so the first page is fast.

## The details

The [Frontend](/frontend/) area explains how it is built:

- [Architecture](/frontend/architecture/): the parts of the app, and where things live in the repository.
- [The hass object and contexts](/frontend/architecture/hass-and-contexts/): how components get the data they need.
- [The data layer](/frontend/architecture/data/): how the frontend talks to Core.
- [Routing and panels](/frontend/architecture/routing-and-panels/): pages, and how they load.

And in this area: [dashboards](/architecture/frontend/dashboards/), how views, cards, and strategies fit together.

The components and their design are documented in the [Design](/design/components/) area.

## Work on this

- New to the frontend? Start with [your first frontend contribution](/frontend/first-contribution/).
- [Architecture](/frontend/architecture/) in the Frontend area: how the app is built.
- Working on how it looks? The [Design](/design/first-contribution/) area is where that starts.
