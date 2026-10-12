---
title: "Polling"
description: "Asking a device or service for new data on an interval. The opposite is push, where the device sends updates when something changes."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "poll"
    - "push"
  code:
    - "should_poll"
    - "SCAN_INTERVAL"
    - "update_interval"
  related:
    - "coordinator"
    - "iot-class"
  autolink:
    - "polling"
---

Push is faster and puts less load on devices and networks, so integrations use it when the device supports it. Otherwise, a [coordinator](/glossary/coordinator/) polls on a fixed interval.
