---
title: Build the container image
description: Write the Dockerfile of your app. Pick a base image, add your services and scripts, and set build arguments and labels.
order: 1
---

Every app is a container image. You describe it in a `Dockerfile` in the app folder, like any other image. The Supervisor builds it on the device during development, and the [builder actions](/apps/guides/publishing/) build it for every architecture when you publish.

## A minimal Dockerfile

```dockerfile
FROM ghcr.io/home-assistant/base:3.24

# Install what your app needs
RUN apk add --no-cache nginx

# Copy your files into the image
COPY rootfs /
```

That is all it takes when your services are set up in `rootfs`, as explained in [S6 overlay](#s6-overlay) below. You can also keep it simpler and run a single script with `CMD`, like in [your first app](/apps/first-app/).

## Base images

The Home Assistant base images, from [home-assistant/docker-base](https://github.com/home-assistant/docker-base), come with everything most apps need. They are published as multi-architecture images for `amd64` and `aarch64`.

| Image | Based on | Example tag |
| --- | --- | --- |
| `ghcr.io/home-assistant/base` | Alpine Linux | `3.24` |
| `ghcr.io/home-assistant/base-python` | Alpine Linux with Python | `3.14-alpine3.24` |
| `ghcr.io/home-assistant/base-debian` | Debian | `trixie` |
| `ghcr.io/home-assistant/base-ubuntu` | Ubuntu | `26.04` |

The README of the repository lists the supported tags. Prefer Alpine: it is small, which matters on a Raspberry Pi with an SD card. Use Debian or Ubuntu when your software needs glibc.

Every base image contains:

- [S6 overlay](https://github.com/just-containers/s6-overlay) version 3, as the init system and service supervisor.
- [Bashio](https://github.com/hassio-addons/bashio), a library of shell functions for apps.
- [Tempio](https://github.com/home-assistant/tempio), to render configuration files from templates.
- `bash`, `curl`, `jq`, `tzdata`, and CA certificates.
- jemalloc, in the Alpine-based images. To use it, set `LD_PRELOAD="/usr/local/lib/libjemalloc.so.2"` for your application.

Pin a version of the base image, like `base:3.24`, instead of `latest`. Your builds stay reproducible, and a tool like Renovate or Dependabot can update the tag for you.

You do not have to use these images. Any image works, as long as it runs on the architectures in your `arch`. Without S6 overlay, keep the default `init: true`, so Docker adds an init process, and leave out the Bashio parts below.

## S6 overlay

The base images use S6 overlay as their init: `/init` is the entrypoint, and it starts and supervises your services. Two things follow from that:

- Set `init: false` in `config.yaml`. S6 overlay must be process 1 in the container, and does not start if Docker adds its own init in front of it.
- Do not set `host_pid: true`. S6 overlay does not work in the PID namespace of the host.

You describe your services in the `rootfs` folder of your app. A setup step that runs once is a oneshot service, your program is a longrun service, and a `finish` script decides whether a crash stops the container:

```text
rootfs/etc/s6-overlay/
├── s6-rc.d/
│   ├── init-my-app/
│   │   ├── dependencies.d/base
│   │   ├── run
│   │   ├── type
│   │   └── up
│   └── my-app/
│       ├── dependencies.d/init-my-app
│       ├── finish
│       ├── run
│       └── type
└── user-bundles.d/user/contents.d/
    ├── init-my-app
    └── my-app
```

[Run services with S6 overlay](/apps/guides/s6-overlay/) explains every file, the older `/etc/services.d` format, finish scripts, and the mistakes that are easy to make.

## Bashio

Bashio saves you from parsing JSON and calling the Supervisor API by hand. Use `bashio` as the interpreter of your scripts, with `with-contenv` in front so the script gets the environment of the container. A few functions you use all the time:

```bash
#!/command/with-contenv bashio

# Read an option
port=$(bashio::config 'port')

# Check if an optional option is set
if bashio::config.has_value 'username'; then
  bashio::log.info "Username is set"
fi

# Stop with an error if a required option is empty
bashio::config.require 'password'

# Logging, with levels the user can filter on
bashio::log.debug "Only shown with debug logging"
bashio::log.warning "Something looks off"
```

Bashio also wraps most of the Supervisor API, like `bashio::services 'mqtt' 'host'` and `bashio::app.ingress_port`. Every function is in the [Bashio reference](/apps/bashio/).

## Build arguments

The Supervisor and the builder actions pass two build arguments:

| Argument | Contents |
| --- | --- |
| `BUILD_ARCH` | The architecture of the build: `aarch64` or `amd64` |
| `BUILD_VERSION` | The `version` from `config.yaml` |

Declare them with `ARG` before you use them:

```dockerfile
ARG BUILD_ARCH
RUN echo "Building for ${BUILD_ARCH}"
```

Both build with Docker BuildKit, so the standard `TARGETARCH` argument is available as well. Note that it says `arm64` where Home Assistant says `aarch64`.

If you need a different `Dockerfile` per architecture, name it `Dockerfile.aarch64` or `Dockerfile.amd64`. The Supervisor uses it instead of `Dockerfile` for that architecture.

> [!NOTE]
> Since Supervisor 2026.04.0, `BUILD_FROM` is no longer passed by default. If your `Dockerfile` starts with `FROM ${BUILD_FROM}`, give the argument a default value, or replace it with a fixed `FROM`.

## Labels

The Supervisor reads a few labels from the image:

| Label | Contents |
| --- | --- |
| `io.hass.version` | The version of the app |
| `io.hass.arch` | The architecture of the image |
| `io.hass.type` | `app` |

You do not have to set them yourself in most cases. When the Supervisor builds an app, it adds all three. The `build-image` action of the builder adds `io.hass.version` and `io.hass.arch`. If you build your images some other way, add them with `LABEL`:

```dockerfile
LABEL \
  io.hass.version="1.0.0" \
  io.hass.type="app" \
  io.hass.arch="aarch64"
```

For an existing image without these labels, set `legacy: true` in `config.yaml`.

## build.yaml

Older apps have a `build.yaml` next to `config.yaml`, with the base image per architecture (`build_from`), extra build arguments (`args`), and labels (`labels`). This file is deprecated. The Supervisor still reads it, with a warning, but put everything in the `Dockerfile` instead:

- `build_from`: a `FROM` line, or `ARG BUILD_FROM=...` with a default.
- `args`: `ARG` lines with default values.
- `labels`: `LABEL` lines.
- `squash`: no replacement; BuildKit does not support it.
