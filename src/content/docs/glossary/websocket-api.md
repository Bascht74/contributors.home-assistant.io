---
title: "WebSocket API"
description: "The API of Home Assistant Core that the frontend and the companion apps use, over one open connection, to read states, perform actions, and get updates as they happen."
sidebarGroup: "Core and integrations"
term:
  code:
    - "websocket_api"
    - "/api/websocket"
    - "home-assistant-js-websocket"
  related:
    - "frontend"
    - "companion-app"
    - "core"
  autolink:
    - "WebSocket API"
---

A client connects to `/api/websocket`, logs in with an access token, and then sends commands as JSON messages. Integrations can add their own commands with the `websocket_api` integration. The frontend talks to it through the home-assistant-js-websocket library.

See [the WebSocket API](/core/internals/websocket-api/) for the messages and how to add a command.
