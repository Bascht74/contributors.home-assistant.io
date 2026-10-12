---
title: "Event loop"
description: "The asyncio loop that runs Home Assistant Core. Code that blocks it, like waiting on the network without `await`, stops everything else."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "asyncio"
    - "executor"
  code:
    - "async_"
    - "hass.async_add_executor_job"
  related:
    - "core"
    - "hass"
  autolink:
    - "event loop"
---

Functions that start with `async_` run in the event loop and must never block. Code that can only block, like a library without async support, runs in an executor thread with `hass.async_add_executor_job`.
