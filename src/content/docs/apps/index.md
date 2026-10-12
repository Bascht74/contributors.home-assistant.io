---
title: Apps
description: Package software that runs next to Home Assistant, managed by the Supervisor. Build an app, test it, and share it with everyone.
---

Apps are extra programs that run next to Home Assistant: an MQTT broker, a file editor, a database, a media server. Apps used to be called add-ons, and you still see that name in the code, the API, and in older posts. They run on Home Assistant OS, where the [Supervisor](/glossary/supervisor/) installs them, starts them, updates them, and includes them in backups.

Under the hood, an app is a container image plus a small configuration file. The configuration tells the Supervisor what the app needs: which ports, which folders, which hardware, and which options the user can set. Users install apps from the **App store** under **Settings** > **Apps**, and anyone can publish a repository with their own apps.

## Who this is for

This area is for you if you want to package software as an app, for yourself or for others. You need to be comfortable with a terminal, Docker or another container tool, and a bit of shell scripting. You do not need to know Python or the Home Assistant code base.

If you want to work on the Supervisor itself, the part that runs the apps, see [OS and Supervisor](/os/).

## Start here

Follow these in order:

1. [Contribute to the official apps](/apps/first-contribution/): your first contribution, from your own app to the official apps, the base images, and the build tooling.
2. [Your first app](/apps/first-app/): build a "Hello world" app, install it, and grow it into a small web server with options. About half an hour.
3. [Build a real app](/apps/build-a-real-app/): walk through a complete example app, with services, options and logging with Bashio, translations, documentation, CI, and releases.
4. [How apps work](/apps/how-apps-work/): the Supervisor, repositories, the app folder, and what happens when an app starts.

## Guides

- [Build the container image](/apps/guides/dockerfile/): base images, build arguments, and labels.
- [Run services with S6 overlay](/apps/guides/s6-overlay/): S6 overlay is the process supervisor in the base images. It runs your setup steps and programs in order, restarts them, and stops the container when they fail.
- [Add options](/apps/guides/options/): let users configure your app, with validation and translated labels.
- [Talk to Home Assistant and the Supervisor](/apps/guides/communication/): the internal network, the Core API proxy, and the Supervisor API.
- [Add a web interface with ingress](/apps/guides/ingress/): show your app inside the Home Assistant UI.
- [Share services and discover integrations](/apps/guides/services-discovery/): offer MQTT or MySQL to other apps, and let Home Assistant set up an integration for your app.
- [Access hardware and the host](/apps/guides/hardware/): serial ports, USB, GPIO, audio, and host namespaces.
- [Present your app](/apps/guides/presentation/): README, documentation, changelog, icon, and logo.
- [Test your app](/apps/guides/testing/): the devcontainer, a real device, and plain Docker.
- [Secure your app](/apps/guides/security/): AppArmor, API roles, protection mode, and user authentication.
- [Publish your app](/apps/guides/publishing/): build images for every architecture and version your releases.
- [Create and share a repository](/apps/guides/repository/): put your apps where users can add them.

## Reference

- [App configuration](/apps/reference/configuration/): every key of `config.yaml`.
- [Bashio](/apps/bashio/): every function of the shell library in the base images, to read options, write logs, and call the Supervisor API.
- [App files](/apps/reference/files/): the files in an app folder and a repository.
- [Runtime environment](/apps/reference/environment/): environment variables, folders, and network addresses inside an app container.
- [Security rating](/apps/reference/security-rating/): how the Supervisor rates your app.
- [Supervisor API](/apps/supervisor-api/): every endpoint, its payload, and the data models.

## Useful repositories

- [hassio-addons/app-example](https://github.com/hassio-addons/app-example): the example app that [Build a real app](/apps/build-a-real-app/) walks through, with S6 services, Bashio, linting, and releases.
- [home-assistant/apps-example](https://github.com/home-assistant/apps-example): a smaller example repository, with a devcontainer and workflows that build every app in it.
- [hassio-addons/bashio](https://github.com/hassio-addons/bashio): Bashio, the shell function library for apps.
- [home-assistant/addons](https://github.com/home-assistant/addons): the official apps.
- [hassio-addons](https://github.com/hassio-addons): the community apps, and a lot of good examples.
- [home-assistant/docker-base](https://github.com/home-assistant/docker-base): the base images.
- [home-assistant/builder](https://github.com/home-assistant/builder): the GitHub Actions that build and publish images.
- [home-assistant/supervisor](https://github.com/home-assistant/supervisor): the Supervisor. When in doubt, the code is the truth.

## Who to talk to

- The **#developers** channel on the [Home Assistant Discord](https://www.home-assistant.io/join-chat/) is where app developers help each other. Questions about how the Supervisor runs apps fit **#operating-system**, the channel for Home Assistant OS and the Supervisor. Can't see the channels? Under **Channels & Roles**, choose **I want to contribute dev skills to Home Assistant**.
- Found a bug in how the Supervisor handles apps? Open an issue in [home-assistant/supervisor](https://github.com/home-assistant/supervisor/issues).
- Something wrong with an official app? Use the issues of [home-assistant/addons](https://github.com/home-assistant/addons/issues).
- Ready to show your app to the world? Post it in the [Share your Projects](https://community.home-assistant.io/c/projects/9) category of the community forum.
