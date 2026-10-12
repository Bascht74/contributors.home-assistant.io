---
title: Contribute to the official apps
description: Help improve the official apps, the base images, and the build tooling that every app relies on. Build your first app, then pick where to help.
sidebarLabel: Your first contribution
order: 1
---

Most people in this area build their own app, for themselves or to share. That is a contribution in its own right. Once you know how an app is put together, you can also help with the pieces the whole ecosystem shares: the official apps, the base images, and the tools that build them.

This page takes you there in steps. Start with step 1, and stop wherever it suits you.

## 1. Build your first app

Do the [Your first app](/apps/first-app/) tutorial, the next page in this area. You build a small app, install it on your own Home Assistant, and grow it into a web server with options. It takes about half an hour, and everything after this step assumes you know what is in an app folder.

## 2. Pick where to help

Three repositories hold what every app builder works with. Each is a normal GitHub repository: fork it, make a branch, and open a pull request against `master`.

### The official apps

[home-assistant/addons](https://github.com/home-assistant/addons) holds the official apps, like Mosquitto broker, MariaDB, Samba share, and Z-Wave JS. Each app is a folder with the same files you used in the tutorial: `config.yaml`, a `Dockerfile`, a `build.yaml`, its documentation in `DOCS.md`, a `CHANGELOG.md`, and its translations.

- **Bugs** are reported with the bug report form in its [issues](https://github.com/home-assistant/addons/issues). The form is for supported setups only. An issue with a reproducible bug and its logs is a good place to start.
- **Feature requests** go to the [feature request discussions](https://github.com/orgs/home-assistant/discussions), not the issues.
- **Tasks** are a separate issue type, for Open Home Foundation staff and authorized contributors. A task issue opened by anyone else is closed automatically.

Issues without activity for 30 days are marked stale, and closed 7 days later. Issues labeled `pinned`, `security`, or `Help wanted` are exempt.

### The base images

[home-assistant/docker-base](https://github.com/home-assistant/docker-base) builds the base images that Home Assistant and most apps start from: Alpine, Python on Alpine, Debian, and Ubuntu, for `amd64` and `arm64`. They come with S6 overlay, Bashio, and TempIO. The README explains how to build each image locally with `docker buildx`.

This repository has no issue tracker. Changes come in as pull requests.

### The build tooling

[home-assistant/builder](https://github.com/home-assistant/builder) holds the GitHub Actions that build, sign with Cosign, and publish multi-arch container images. The [publishing guide](/apps/guides/publishing/) uses them. Its [issues](https://github.com/home-assistant/builder/issues) are open for bugs.

The old `home-assistant/builder` action, used as a single step, is deprecated and no longer maintained. Work goes into the new actions in the `actions/` folder.

## 3. Open a pull request

None of the three repositories has its own pull request template or contributing guide. The [contributing guidelines](https://github.com/home-assistant/.github/blob/master/CONTRIBUTING.md) of the home-assistant organization apply:

- Keep your change as focused as possible. Changes that don't depend on each other go in separate pull requests.
- Follow the standards for style and code quality, and make sure the checks still pass.
- Write a good commit message.

You can use AI tools to help, but you must understand and be able to explain every change you submit. The [Open Home Foundation AI policy](https://github.com/home-assistant/addons/blob/master/AI_POLICY.md) has the details.

## After your pull request

Checks run on your pull request as soon as you open it. They need to pass before it can be merged:

| Repository | What runs on a pull request |
| --- | --- |
| addons | hadolint on every `Dockerfile`, yamllint, and ShellCheck on the scripts. Every app whose `config.yaml`, `build.yaml`, `Dockerfile`, `apparmor.txt`, `data`, or `rootfs` changed is test built for `amd64` and `aarch64`. |
| docker-base | Every image is built. Nothing is published: images are pushed only when a release is published. |
| builder | When the actions change, a test app is built with them. |

A maintainer of the repository then reviews your change. Expect questions, that is how review works. In docker-base and builder, the release notes are drafted from the merged pull requests.

## What is next

- Haven't built an app yet? Start with [your first app](/apps/first-app/), then [build a real app](/apps/build-a-real-app/), and read [how apps work](/apps/how-apps-work/) to know what the Supervisor does with an app.
- Look at the [guides](/apps/guides/) for the task in front of you.
- Want to work on the Supervisor itself? Head to [OS and Supervisor](/os/first-contribution/).
