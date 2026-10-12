---
title: "Unavailable"
description: "A special state for an entity that Home Assistant can't reach right now. Its counterpart, unknown, means it can be reached but has no value yet."
sidebarGroup: "Entities and devices"
term:
  aliases:
    - "unknown"
  code:
    - "STATE_UNAVAILABLE"
    - "STATE_UNKNOWN"
    - "available"
  related:
    - "state"
    - "coordinator"
---

An integration marks its entities as unavailable when the device is offline or the API fails, by setting `available` to `False`. It never reports a made-up value instead.
