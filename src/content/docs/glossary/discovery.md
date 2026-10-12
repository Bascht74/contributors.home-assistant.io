---
title: "Discovery"
description: "Finding devices and services, like on the network or over Bluetooth, so Home Assistant can offer to set them up."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "discovered"
  code:
    - "zeroconf"
    - "ssdp"
    - "dhcp"
    - "bluetooth"
    - "usb"
    - "async_step_zeroconf"
  ui: "Discovered"
  related:
    - "config-flow"
    - "manifest"
---

An integration lists in its manifest how its devices can be found, like by mDNS (`zeroconf`), SSDP, DHCP, Bluetooth, or USB. When Home Assistant finds a match, it starts the integration's config flow, and shows the device as discovered.
