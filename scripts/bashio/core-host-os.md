---
title: "Bashio: Core, host, and OS"
sidebarLabel: "Core, host, and OS"
description: "Bashio functions that wrap the Supervisor API for Home Assistant Core, the host, Home Assistant OS, hardware, and the network."
order: 5
modules:
  - module: core
    heading: "Home Assistant Core"
    intro: "Control Home Assistant Core and read its settings and resource usage, from `/core`."
  - module: host
    heading: "Host"
    intro: "The host system: hostname, features, disk usage, services, logs, reboot, and shutdown, from `/host`."
  - module: os
    heading: "Home Assistant OS"
    intro: "Home Assistant OS: version, updates, boot slots, data disk, swap, and board settings, from `/os`."
  - module: hardware
    heading: "Hardware"
    intro: "Hardware the Supervisor knows about, from `/hardware`."
  - module: network
    heading: "Network"
    intro: "Network interfaces and their settings, from `/network`."
---

These functions wrap the [Home Assistant Core endpoints](/apps/supervisor-api/core/) and the [host and OS endpoints](/apps/supervisor-api/host/) of the Supervisor API. {{generated}}

Most of them need `hassio_api: true`, and the calls that change something need a role that allows it, see {{may-call}}. To read hardware for your own app, like serial ports, you do not need these functions: map the device in `config.yaml`, see [Access hardware and the host](/apps/guides/hardware/).
