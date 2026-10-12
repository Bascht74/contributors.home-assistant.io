---
title: "Bashio: plugins"
sidebarLabel: "Plugins"
description: "Bashio functions that wrap the Supervisor API for the plugins next to Home Assistant, the audio server, the CLI, DNS, multicast, and the observer."
order: 6
modules:
  - module: audio
    heading: "Audio"
    intro: "The audio server: devices, volume, profiles, and the plugin itself, from `/audio`."
  - module: cli
    heading: "CLI"
    intro: "The CLI plugin, from `/cli`."
  - module: dns
    heading: "DNS"
    intro: "The DNS plugin: servers, hosts, and the plugin itself, from `/dns`."
  - module: multicast
    heading: "Multicast"
    intro: "The multicast plugin, from `/multicast`."
  - module: observer
    heading: "Observer"
    intro: "The observer plugin, from `/observer`."
---

These functions wrap the [plugin endpoints](/apps/supervisor-api/plugins/) of the Supervisor API. Plugins are the containers the Supervisor runs next to Home Assistant for audio, the command line, DNS, multicast, and monitoring. {{generated}}

Most of them need `hassio_api: true` and a role that allows the call, see {{may-call}}.
