---
title: How apps work
description: What the Supervisor does with your app, from the repository to a running container, and the names and folders you run into along the way.
order: 4
---

An app is a container that the Supervisor manages for the user. Knowing what the Supervisor does at each step makes most of the configuration options obvious. This page walks through it, from repository to running app.

## The pieces

- **Home Assistant OS** runs everything as containers on top of a minimal operating system.
- **The Supervisor** is the container that manages all the others: Home Assistant Core, a few system containers (called plugins), and every app. It has a REST API that Core, the UI, and apps talk to. [What the Supervisor runs](/os/supervisor/#what-the-supervisor-runs) lists every container, with its address.
- **An app** is a folder with a `config.yaml` and either a `Dockerfile` or a reference to a published image.
- **A repository** is a Git repository with one or more app folders and a `repository.yaml`.
- **The app store** shows the apps of every repository the user added, under **Settings** > **Apps** > **Install app**.

## From repository to app store

The Supervisor keeps a local copy of every repository it knows:

- **Local apps**: the `local_apps` folder on the device. No Git involved, which makes it the place for development.
- **Official apps**: [home-assistant/addons](https://github.com/home-assistant/addons).
- A few built-in community repositories, like the [community apps](https://github.com/hassio-addons/repository), ESPHome, and Music Assistant.
- Every repository the user added by URL.

When the store reloads, the Supervisor searches each repository for files named `config.yaml`, `config.yml`, or `config.json`, at any depth, skipping hidden folders and folders called `rootfs`. Every file it finds is one app. It validates the file against the configuration schema; an app with an invalid configuration is skipped, with a warning in the Supervisor logs.

## Names and IDs

The Supervisor identifies an installed app by its repository and its slug, joined with an underscore: `{repository}_{slug}`.

- The **slug** comes from `config.yaml`. It may contain letters, digits, `-`, `_`, and `.`, and must be unique within its repository.
- The **repository ID** is `local` for local apps and `core` for the official apps. For a repository added by URL, it is the first 8 characters of the SHA-1 hash of the lowercased URL, branch included, like `a0d7b954` for the community apps.

So `hello_world` in your local folder becomes `local_hello_world`. You see this full ID in the API, in the CLI (`ha apps info local_hello_world`), and in [my links](/glossary/my-link/). It is also the base of the hostname on the internal network: replace `_` with `-`, and `local_hello_world` is reachable as `local-hello-world`.

## Installing and building

When the user installs an app, the Supervisor gets its image in one of two ways:

- **Pull**: if `config.yaml` has an `image` key, the Supervisor pulls that image with `version` as its tag. This is how published apps should work: fast and reliable. See [Publish your app](/apps/guides/publishing/).
- **Build**: without `image`, the Supervisor builds the image on the device from your `Dockerfile`, using Docker BuildKit. This is what happens with local apps during development.

Before it installs anything, the Supervisor checks that the app fits the system: the CPU architecture must be in `arch`, the machine type must match `machine` if you set it, and Home Assistant must be at least the version in `homeassistant`.

## Starting

When an app starts, the Supervisor:

1. Validates the user's options against your `schema` and writes them to `/data/options.json`.
2. Creates the container with everything `config.yaml` asks for: ports, mapped folders, devices, capabilities, the AppArmor profile, and the environment variables, including a `SUPERVISOR_TOKEN` that is unique to this app.
3. Adds the container to the internal network and registers its hostname in the internal DNS.
4. Starts the container and waits for it to run.

At boot, apps start in stages, based on their `startup` value:

| `startup` | Starts |
| --- | --- |
| `initialize` | First, when the Supervisor starts |
| `system` | Before the services, for things like databases |
| `services` | Before Home Assistant Core |
| `application` | After Home Assistant Core. This is the default |
| `once` | Never at boot. For apps that do a job and exit |

Apps only start at boot if the user left **Start on boot** on. With `boot: manual`, it is off by default; with `boot: manual_only`, the user cannot turn it on at all.

## While running

- Everything your app writes to `stdout` and `stderr` ends up in the **Log** tab.
- If the user turns on the **Watchdog**, the Supervisor restarts your app when the container fails. If you set a `watchdog` URL, it also checks that URL and restarts the app when it stops responding.
- `/data` is the private, persistent storage of your app. It survives restarts and updates, and it is part of every backup of your app. Everything outside `/data` and the mapped folders is lost when the container is recreated.

## Backups

A backup of your app contains its configuration, its `/data` folder, and, if you map `app_config`, its public configuration folder. By default, backups are hot: your app keeps running. If your app needs a consistent state on disk, you have two options:

- Set `backup_pre` and `backup_post` to commands that run inside your container before and after the backup, like flushing a database to disk.
- Set `backup: cold`, and the Supervisor stops your app during the backup.

Use `backup_exclude` to leave out files that do not need to be restored, like caches. See the [app configuration](/apps/reference/configuration/#backups) for the details.

## Updating

When you raise `version` in `config.yaml`, users see an update. Updating pulls (or builds) the new image and recreates the container; `/data` stays. Users can turn on automatic updates per app. If a release needs their attention, list it in `breaking_versions`, and the Supervisor never updates across it automatically.

## Where to go from here

- The [guides](/apps/guides/) cover one task each, from the container image to publishing your app.
- [Talk to Home Assistant and the Supervisor](/apps/guides/communication/) explains the internal network and the APIs.
- [Runtime environment](/apps/reference/environment/) lists everything your container gets from the Supervisor.
- [App configuration](/apps/reference/configuration/) has every key of `config.yaml`.
