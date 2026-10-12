---
title: Extend the frontend
description: Changes to the frontend that go together with a change in Core, like a more-info view for a new domain or a WebSocket command for an integration.
order: 40
---

Sometimes a change in Core needs something new in the frontend: a new entity domain needs controls, or an integration needs to send data the interface does not have yet. These pages cover the frontend side of that.

Each of these is a pull request to the [frontend repository](https://github.com/home-assistant/frontend), usually together with one to Core. Link the two in the pull request templates, so reviewers see the whole picture. [Review and release](/frontend/development/review-and-release/#changes-that-need-the-backend) explains how the two are merged.

- [Add a more-info view](/frontend/extending/more-info/): the controls in the more-info dialog for a domain.
- [Add a state card](/frontend/extending/state-card/): the row that shows an entity and its state.
- [Add a WebSocket command](/frontend/extending/websocket-api/): send data from your integration to the frontend.

Most integrations need none of this. Entities of the existing domains already get their controls, cards, and more-info views. Look at the [more-info views](/design/more-info/) and [dashboard cards](/design/dashboards/) in the Design area to see what is there.
