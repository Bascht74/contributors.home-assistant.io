---
title: Access hardware and the host
description: Give your app access to serial ports, USB devices, GPIO, audio, and parts of the host, and only as much as it needs.
order: 4
---

By default, an app sees nothing of the hardware and little of the host. That is on purpose: every bit of access you add is something a bug in your app can misuse. This guide shows the options, from narrow to broad. Pick the narrowest one that works.

## Let the user pick a device

For a USB stick or a serial adapter, the best option is usually not in `config.yaml` at all, but in your options. A `device` option shows the user a dropdown of the devices on the system, and the Supervisor maps the chosen one into your container:

```yaml
options:
  device:
schema:
  device: "device(subsystem=tty)"
```

The user picks the device, it keeps working across reboots because the dropdown offers stable `/dev/serial/by-id/...` paths where the system has them, and your app gets access to that one device only. This is how the official Z-Wave JS app does it.

## Fixed devices

If your app always uses the same device, list its path in `devices`:

```yaml
devices:
  - /dev/ttyAMA0
```

## Groups of devices

These options map a whole class of devices, including devices plugged in after the app started:

| Key | Access |
| --- | --- |
| `uart: true` | All serial devices |
| `usb: true` | Raw USB access, through `/dev/bus/usb` |
| `video: true` | All video devices |
| `gpio: true` | GPIO, through `/sys/class/gpio`. Some libraries also need `/dev/mem` and the `SYS_RAWIO` capability |
| `udev: true` | The udev database of the host, read-only, to look up device details |
| `devicetree: true` | The device tree of the host, at `/device-tree` |

On systems with AppArmor, GPIO access usually needs a custom AppArmor profile as well. See [Secure your app](/apps/guides/security/#apparmor).

## Audio

With `audio: true`, your app connects to the audio system of Home Assistant through PulseAudio, and the user picks the input and output device on the app page. If your software only speaks ALSA, install the PulseAudio plugin for ALSA: `alsa-plugins-pulse` on Alpine, `libasound2-plugins` on Debian and Ubuntu.

## The host

Some apps need more of the host than devices:

| Key | What it gives |
| --- | --- |
| `host_network: true` | The network of the host. Needed for discovery protocols like mDNS and for software that must see the real network interfaces. Lowers the security rating. |
| `host_dbus: true` | The D-Bus system bus of the host, read-only, to talk to services like NetworkManager or BlueZ. |
| `journald: true` | The system journal, read-only. It is at `/var/log/journal` on some systems and at `/run/log/journal` on others, so check both. |
| `kernel_modules: true` | The kernel modules of the host, read-only, and the right to load them. |
| `realtime: true` | Real-time scheduling, for audio software that needs low latency. |
| `host_uts: true` | The host name of the host. |

For the full list, including capabilities with `privileged`, see the [app configuration](/apps/reference/configuration/#host-and-privileges).

## Protection mode

Some options only work with **Protection mode** off: `full_access`, `docker_api`, and `host_pid`. Protection mode is on by default, and the UI warns the user when it is off. With protection mode off and these options set, your app can do almost anything to the system.

Use these only for apps whose job is managing the system itself, and explain in your documentation why your app needs it. `full_access` in particular gives access to every device, and makes `devices`, `uart`, `usb`, and `gpio` pointless. `full_access` and `docker_api` set the [security rating](/apps/reference/security-rating/) to 1, and `host_pid` lowers it by 2.
