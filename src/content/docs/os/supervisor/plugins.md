---
title: Plugins
description: The five plugins the Supervisor runs next to Home Assistant Core, what each one does, and where its code lives.
sidebarGroup: How it works
order: 4
---

Plugins are containers the Supervisor runs for the system itself, not for the user. They provide services that Core and apps share, like DNS and audio. Users don't install or remove them, and the Supervisor updates them automatically.

On the Supervisor side, every plugin is a class in `supervisor/plugins/`, based on `PluginBase`. It handles installing, starting, updating, and repairing the container, and a watchdog restarts it when it stops. Each plugin's image is `ghcr.io/home-assistant/<arch>-hassio-<plugin>`, and the versions come from the same version file as everything else.

| Plugin | Container | Repository | What it is |
| --- | --- | --- | --- |
| DNS | `hassio_dns` | [plugin-dns](https://github.com/home-assistant/plugin-dns) | CoreDNS, for name resolution in the containers |
| Audio | `hassio_audio` | [plugin-audio](https://github.com/home-assistant/plugin-audio) | PulseAudio, for sound in and out |
| CLI | `hassio_cli` | [plugin-cli](https://github.com/home-assistant/plugin-cli) | The `ha` command line |
| Multicast | `hassio_multicast` | [plugin-multicast](https://github.com/home-assistant/plugin-multicast) | An mDNS repeater |
| Observer | `hassio_observer` | [plugin-observer](https://github.com/home-assistant/plugin-observer) | A status page that works when nothing else does |

## DNS

Every container on the `hassio` network uses the DNS plugin as its name server. It runs [CoreDNS](https://coredns.io/) with two plugins of its own:

- **mdns** resolves `.local` names, by asking systemd-resolved on the host over D-Bus.
- **fallback** retries failed lookups against Cloudflare's DNS over TLS, when the fallback is on.

The Supervisor writes a hosts file with the names of the containers, like `supervisor` and `homeassistant`, so they can reach each other by name. Other lookups go to the DNS servers of the host, or the ones the user set with `ha dns options`. The configuration template is `rootfs/usr/share/tempio/corefile` in the plugin repository.

## Audio

The audio plugin runs PulseAudio on top of ALSA, so Core and apps that need audio share one sound system. Apps get access when their configuration asks for audio. All audio configuration lives in this container, which lets users adjust PulseAudio without touching the host. `ha audio` shows the devices and sets the defaults.

## CLI

The CLI plugin is the `ha` command line, built from the [home-assistant/cli](https://github.com/home-assistant/cli) repository. On Home Assistant OS it is the login shell on the console: the host runs it when you log in, see [debug the host](/os/operating-system/debugging/#the-local-console). The plugin repository only packages the CLI. Changes to the commands themselves go to the cli repository.

## Multicast

The multicast plugin runs [mdns-repeater](https://github.com/pvizeli/mdns-repeater) on the host network. It repeats mDNS traffic between the host network and the `hassio` network, so discovery works across that boundary. It can be turned off through the Supervisor API.

## Observer

The observer is a small web server, written in Go, on port 4357 of the host. It shows whether the Supervisor is running and healthy, and its logs. It runs separately from the Supervisor on purpose: when the Supervisor or Core is down, the observer is how users still see what is going on.

## Working on a plugin

Each plugin repository builds a container image, mostly from a `Dockerfile` and a `rootfs/` folder, and several have a development container. Most plugins have `ha <plugin>` commands to show their logs, restart them, or update them, like `ha dns logs` or `ha audio restart`.

To try your own build on a device, build the image for the device's architecture, and tag it with the image name and version the plugin runs now (`docker ps` on the host shows it). Then restart the plugin. The approach is the same as [testing the Supervisor on a real system](/os/supervisor/development/#test-on-a-real-system). Keep in mind that the Supervisor updates plugins automatically, which replaces your build when a new version comes out.
