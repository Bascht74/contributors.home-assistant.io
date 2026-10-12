---
title: Runtime environment
description: What an app container gets from the Supervisor. Environment variables, folders, host names, and network addresses.
order: 4
---

When the Supervisor starts your app, it sets up the container with a few things your code can count on. This page lists them.

## Environment variables

| Variable | Contents |
| --- | --- |
| `SUPERVISOR_TOKEN` | The token of your app, for the Supervisor API and the Home Assistant Core API proxy. Unique per app. |
| `HASSIO_TOKEN` | The same token, under its old name. Use `SUPERVISOR_TOKEN` in new code. |
| `TZ` | The time zone of the system, like `Europe/Amsterdam`. |

Your own variables from `environment` in `config.yaml` are added too. With `legacy: true`, the top-level options that are a string or a number are also passed as variables.

The base images use S6 overlay, which keeps the environment of the container in a separate place. Scripts that start with `#!/command/with-contenv bashio` (or `with-contenv bash`) get these variables; other scripts started by S6 may not. See [the container environment](/apps/guides/s6-overlay/#the-container-environment).

## Folders

| Path | Contents |
| --- | --- |
| `/data` | The private, persistent storage of your app. Read and write, included in backups. |
| `/data/options.json` | The options of the user, validated against your `schema`. Written before every start. |

Folders you map with `map` are mounted at these paths, unless you set a different `path`:

| Type | Path |
| --- | --- |
| `homeassistant_config` | `/homeassistant` |
| `app_config` | `/config` |
| `all_app_configs` | `/app_configs` |
| `local_apps` | `/local_apps` |
| `ssl` | `/ssl` |
| `share` | `/share` |
| `media` | `/media` |
| `backup` | `/backup` |

Mapped folders are read-only unless you set `read_only: false`.

Depending on other keys in `config.yaml`, the Supervisor mounts more:

| Key | Mounted |
| --- | --- |
| `tmpfs: true` | `/tmp` as tmpfs, in memory |
| `host_ipc: false` | A private `/dev/shm`, in memory |
| `audio: true` | `/etc/pulse/client.conf`, `/run/audio`, and `/etc/asound.conf` |
| `devicetree: true` | `/device-tree` |
| `gpio: true` | `/sys/class/gpio`, on systems that support it |
| `udev: true` | `/run/udev`, read-only |
| `kernel_modules: true` | `/lib/modules`, read-only |
| `host_dbus: true` | `/run/dbus`, read-only |
| `journald: true` | `/var/log/journal` and `/run/log/journal`, read-only |
| `docker_api: true` | `/run/docker.sock`, read-only, only with protection mode off |

## Network

Unless you set `host_network`, your app runs on an internal network, `172.30.32.0/23`, together with the Supervisor and the other apps. Home Assistant Core is reachable from it too.

| Name | What it is |
| --- | --- |
| `supervisor` | The Supervisor, with its API. Always `172.30.32.2`. `hassio` is an alias. |
| `homeassistant` | Home Assistant Core. It runs on the host network and is reachable at `172.30.32.1`, the gateway of the internal network. |
| `{repository}-{slug}` | Another app, like `core-mosquitto` or `local-hello-world`. |

The host name of your own container is your app ID with `_` replaced by `-`. With `host_uts: true`, it is the host name of the host instead.

`supervisor` and `hassio` are added to the hosts file of your container, so they also work on the host network. An app on the host network is still registered by name in the internal DNS, pointing to the gateway `172.30.32.1`, so other apps reach it by name as well.

Ingress requests always come from the Supervisor, `172.30.32.2`.

## Init

The Home Assistant base images use S6 overlay as their init system, with `/init` as the entrypoint. Set `init: false` in `config.yaml` so Docker does not add its own init process in front of it. See [Run services with S6 overlay](/apps/guides/s6-overlay/).
