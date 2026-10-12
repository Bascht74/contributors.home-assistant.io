---
title: Your first contribution to the Supervisor
description: Run the Supervisor in its development container, make a small change, run the tests, and open your first pull request.
sidebarLabel: Your first contribution
order: 1
---

The Supervisor is the easiest way into this area. It is Python, it has a ready-made development container, and it runs a complete Home Assistant system on your own machine. You see your change working in minutes, without flashing anything.

Plan an evening. The first build of the container takes a while, and you only do it once.

> [!TIP]
> Rather work on the operating system? Start with [Build an image](/os/operating-system/build/). Expect a first build to take an hour or more, and plenty of disk space.

## 1. Say hi

Join the **#operating-system** channel on the [Home Assistant Discord](https://www.home-assistant.io/join-chat/). Under **Channels & Roles**, choose **I want to contribute dev skills to Home Assistant** to see it. You do not need permission to start, but it helps to know where to ask.

## 2. Open the development container

You need [Docker](https://docs.docker.com/get-docker/), [Visual Studio Code](https://code.visualstudio.com/), and [Git](https://git-scm.com/). On Windows, work inside WSL2.

1. [Fork the Supervisor repository](https://github.com/home-assistant/supervisor/fork) on GitHub.
2. Clone your fork and open it in Visual Studio Code:

   ```shell
   git clone https://github.com/YOUR_GITHUB_USERNAME/supervisor
   cd supervisor
   code .
   ```

3. When Visual Studio Code asks, select **Reopen in Container**.

## 3. Run the Supervisor

Open the Command Palette, select **Tasks: Run Task**, then **Run Supervisor**. The task builds a Supervisor image from your working copy and starts it. The Supervisor then downloads Home Assistant Core and its plugins, so the first start takes a few minutes.

When it is done, open `http://localhost:9123`. That is Home Assistant Core, run by your own Supervisor. The **Run Supervisor CLI** task opens the `ha` command line against it.

## 4. Find something small

- Look through the [open issues](https://github.com/home-assistant/supervisor/issues) for something that is clearly described and small.
- A missing test is a good first change too. Tests live in `tests/` and mirror the layout of `supervisor/`.
- A confusing log message or error you ran into yourself counts. You already know why it matters.

Before you start on something bigger, ask in the issue first. Large changes to the Supervisor need agreement on the approach. The [Supervisor README](https://github.com/home-assistant/supervisor#development) puts it plainly: small changes and bug fixes can go straight to a pull request, but for significant changes, open an RFC (a request for comments: a written proposal others can react to) first.

## 5. Make the change and test it

Create a branch, make your change, and run the tests for the part you touched:

```shell
git checkout -b fix-something
pytest -qsx tests/backups/
```

Run the linters before you commit:

```shell
ruff check --fix supervisor tests
ruff format supervisor tests
```

To see your change in the running system, run the **Run Supervisor** task again. It rebuilds the image from your code.

## 6. Open a pull request

Push your branch to your fork and open a pull request against `main`. Fill in the pull request template: describe the proposed change, pick the type of change, and work through the checklist. A maintainer reviews it. Expect questions, that is how review works.

## After your pull request

In the Supervisor repository:

- **Checks.** CI runs Ruff, pylint, mypy, hadolint on the `Dockerfile`, and the tests, on every push. The pull request template says it plainly: your pull request can't be merged unless the tests pass. A build workflow also builds a Supervisor image from your branch and runs a few tests against a running system.
- **Labels.** Your pull request needs a label for its type. A check fails as long as `cla-signed` is its only label. The release notes are drafted automatically, and only list pull requests with a category label: `breaking-change`, `new-feature`, `bugfix`, `style`, `refactor`, `performance`, `test`, `build`, `ci`, `chore`, `revert`, or `dependencies`. The label also decides the section your change shows up in.
- **Waiting.** A pull request without activity for 30 days is marked stale, and closed 7 days later. Any update removes the mark.
- **After the merge.** Your change is built and published to the `dev` channel. A release then takes it to `beta`, and later to `stable`. See [how the Supervisor is released](/os/supervisor/development/#how-the-supervisor-is-released).

In the operating system repository, pull requests go against `dev`. hadolint, ShellCheck, and the Buildroot package checker run on every pull request. A maintainer can add the `run-ova-test` label to build an image and run the automated tests. That only works for branches in the main repository, not for a pull request from a fork. Pull requests without activity for 90 days are marked stale, and closed 7 days later. [Releases and builds](/os/operating-system/releases/) follows a change from there to a release.

## What is next

- Read the [Supervisor architecture](/os/supervisor/architecture/) to find your way around the code.
- Learn how [jobs](/os/supervisor/jobs/) and the [resolution center](/os/supervisor/resolution-center/) work. Most changes touch one of them.
- Test on real hardware with [a remote system](/os/supervisor/development/#test-on-a-real-system).
