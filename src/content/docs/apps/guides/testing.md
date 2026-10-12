---
title: Test your app
description: Run your app with a full Supervisor and Home Assistant on your own computer, on a real device, or with plain Docker.
order: 8
---

You can test an app in three ways. The devcontainer is the most complete and the most comfortable. A real device is what you need for hardware. Plain Docker is the quickest for a build check.

## The devcontainer

The [example app repository](https://github.com/home-assistant/apps-example) comes with a devcontainer for Visual Studio Code. It runs a Supervisor and Home Assistant inside a container on your computer, with every app of your repository available as a local app. It works on Windows, macOS, and Linux.

1. Install [Visual Studio Code](https://code.visualstudio.com/), Docker, and the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
2. Copy `.devcontainer.json` and `.vscode/tasks.json` from the example repository into your repository. If you started from the example repository, you already have them.
3. Open your repository in Visual Studio Code, and select **Reopen in Container** when it asks. The first start takes a while.
4. Run the task **Start Home Assistant**: open the Command Palette, select **Tasks: Run Task**, and pick it. This starts the Supervisor and Home Assistant.
5. Open `http://localhost:7123/` and go through the onboarding.

Your apps show up in the app store under **Local apps**. The other tasks in `tasks.json` install, start, and rebuild an app for you, with `ha apps` commands. Add the slugs of your apps to the list at the bottom of `tasks.json` to use them.

The devcontainer runs Docker inside Docker with `--privileged`, which is why it can run the whole stack. It does not have your hardware, though.

## A real device

For anything that needs real hardware, like a serial port or Bluetooth, test on a device with Home Assistant OS. Copy your app folder into `local_apps` with the [Samba share](https://my.home-assistant.io/redirect/supervisor_app/?app=core_samba) or [Terminal & SSH](https://my.home-assistant.io/redirect/supervisor_app/?app=core_ssh) app, like in [your first app](/apps/first-app/).

If your `config.yaml` has an `image` key, the Supervisor pulls that image instead of building your local changes. Comment the key out while you develop, and put it back before you publish:

```yaml
# image: "ghcr.io/me/my-app"
```

After a change, select **Check for updates** in the app store, then **Rebuild** on the app page. Over SSH, `ha apps rebuild --force local_my_app` does the same.

## Plain Docker

To check that your image builds, use Docker BuildKit in the app folder:

```bash
docker buildx build -t local/my-app .
```

To build for the other architecture, add `--platform`. Docker names the architectures differently: `amd64` is `linux/amd64`, and `aarch64` is `linux/arm64`. A cross build needs QEMU emulation, see the [Docker documentation on multi-platform builds](https://docs.docker.com/build/building/multi-platform/).

```bash
docker buildx build --platform linux/arm64 -t local/my-app .
```

You can also run the image, with a folder of your own as `/data`. Put an `options.json` in that folder for programs that read it directly:

```bash
docker run --rm -v /tmp/my-app-data:/data -p 8080:8080 local/my-app
```

Without a Supervisor, there is no `SUPERVISOR_TOKEN` and no Supervisor API, so every Bashio call that uses the API fails. That includes `bashio::config`, which gets the options from the API and not from `options.json`. Use this for a quick check, not as a full test.

## Logs

Everything your app writes to `stdout` and `stderr` shows up on the **Log** tab of the app, and with `ha apps logs local_my_app`. If your app does not start or does not show up at all, check the Supervisor logs under **Settings** > **System** > **Logs**, with **Supervisor** selected.
