---
title: Set up a development environment
description: Run the Supervisor from source in its development container, run the tests and linters, and try your build on a real system.
sidebarLabel: Development environment
sidebarGroup: Guides
order: 1
---

The Supervisor has a development container that runs a complete system: your Supervisor, Home Assistant Core, the plugins, and apps, all inside one Docker container on your machine. For most changes, that is all you need.

## Set up the development container

You need [Docker](https://docs.docker.com/get-docker/), [Visual Studio Code](https://code.visualstudio.com/) with the Dev Containers extension, and [Git](https://git-scm.com/). The [Core development environment](/core/development/environment/) guide explains how to install them on each operating system. On Windows, work inside WSL2.

1. [Fork the Supervisor repository](https://github.com/home-assistant/supervisor/fork), and clone your fork.
2. Open the folder in Visual Studio Code, and select **Reopen in Container** when it asks.

The container runs privileged, with its own Docker engine inside. That is what lets it run a whole Supervisor system. The setup installs the Python dependencies and the pre-commit hooks.

## Run the Supervisor

Open the Command Palette, select **Tasks: Run Task**, then **Run Supervisor**. The task builds a Supervisor image from your working copy, and starts it as `hassio_supervisor` inside the container. The first start downloads Home Assistant Core and the plugins, which takes a while.

| Address | What |
| --- | --- |
| `http://localhost:9123` | Home Assistant Core |
| `http://localhost:7357` | The observer |

The **Run Supervisor CLI** task opens the `ha` command line against your Supervisor. Run **Run Supervisor** again after a change: it restarts the Supervisor with a fresh image of your code.

The development container follows the `dev` channel, so Core and the plugins are the latest development versions. A Supervisor built from source has the version `9999.09.9.dev9999`, and never tries to update itself.

## Tests and linters

The tests mock Docker, D-Bus, and the network, so they run anywhere, without a running Supervisor. They live in `tests/`, in the same layout as `supervisor/`:

```shell
pytest -qsx tests/resolution/
```

Write new tests as plain `test_` functions with pytest fixtures. `tests/conftest.py` provides a mocked `CoreSys`, and much more.

Before you commit, run the linters and the type checker:

```shell
ruff check --fix supervisor tests
ruff format supervisor tests
pylint supervisor tests
mypy --ignore-missing-imports supervisor/
```

Or run all the configured hooks at once with `pre-commit run --all-files`.

## Code conventions

The repository has its own instructions for contributors, in `.github/copilot-instructions.md`. The most important ones:

- Use relative imports inside `supervisor/`.
- Use constants from `supervisor/const.py`, or the `const.py` of the module, instead of literal values.
- Reach other parts of the system through `self.sys_*`, see [architecture](/os/supervisor/architecture/).
- Raise the exceptions from `supervisor/exceptions.py`, and chain them with `from`.
- Say "app", not "add-on", in new code and comments. Keep `addon` only where an existing API field or class still uses it.

## Test on a real system

Some things only show on real hardware: a board specific D-Bus API, a disk, a USB device. To run your Supervisor on a Home Assistant OS device:

1. On the device, find the architecture with `ha info`: `amd64` or `aarch64`.
2. On your computer, build an image for that architecture and push it to a registry you can pull from, like the GitHub container registry:

   ```shell
   docker build --platform linux/arm64 --push \
     --tag ghcr.io/YOUR_GITHUB_USERNAME/aarch64-hassio-supervisor:dev .
   ```

   Docker calls the architectures `linux/amd64` and `linux/arm64`. The image name uses Home Assistant's names, `amd64` and `aarch64`.

3. On the device, switch to the `dev` channel, so the Supervisor doesn't replace your build with the stable release:

   ```shell
   ha supervisor options --channel dev
   ```

4. On the host shell, see [debug the host](/os/operating-system/debugging/), pull your image and tag it as the image the OS starts:

   ```shell
   docker pull ghcr.io/YOUR_GITHUB_USERNAME/aarch64-hassio-supervisor:dev
   docker tag ghcr.io/YOUR_GITHUB_USERNAME/aarch64-hassio-supervisor:dev \
     ghcr.io/home-assistant/aarch64-hassio-supervisor:latest
   ```

5. Restart the Supervisor service, and follow its output:

   ```shell
   systemctl restart haos-supervisor
   journalctl -fu haos-supervisor
   ```

The service sees that the image changed, and creates a new Supervisor container from it.

Images on the GitHub container registry are private by default. Either log in with `docker login ghcr.io` on the device, or make the package public in its settings on GitHub.

## Open a pull request

Open your pull request against `main` of [home-assistant/supervisor](https://github.com/home-assistant/supervisor), and fill in the template. For large changes, discuss the approach in an issue first.

If you changed the API, the pull request template also asks for:

- A pull request to the [cli](https://github.com/home-assistant/cli) repository, if the `ha` command needs it.
- A pull request to the [Python client library](https://github.com/home-assistant-libs/python-supervisor-client), which Core uses.
- Updated documentation in the [Supervisor API](/apps/supervisor-api/) reference, in the Apps area.

## How the Supervisor is released

1. Pull requests are merged into `main`.
2. Every merge is built and published to the `dev` channel.
3. A release publishes a version, like `2026.10.1`, to the `beta` channel.
4. Once it has proven itself, the [stable.json](https://github.com/home-assistant/version/blob/master/stable.json) in the version repository is updated, and stable systems pick it up.
