---
title: Create and share a repository
description: Put your apps in a Git repository that users add to their app store, and make adding it a single step.
order: 12
---

Users install apps from repositories. A repository is a Git repository with a `repository.yaml` at the root, and one folder per app. It can hold a single app or dozens.

## Create the repository

The quickest start is the [example app repository](https://github.com/home-assistant/apps-example). Select **Use this template** on GitHub, and you get an app, documentation files, an AppArmor profile, a devcontainer, and build workflows in one go. Then:

1. Rename the `example` folder, and set the same name as `slug` in its `config.yaml`.
2. Change `image` in `config.yaml` to your own registry, like `ghcr.io/<your-username>/my-app`.
3. Change every link and name that points to `home-assistant/apps-example`. That includes the `github.repository` check in `.github/workflows/build-app.yaml`: until you change it, the workflow skips the build in any repository but the example.
4. Update `repository.yaml`.

Or start from scratch, with this layout:

```text
my-apps/
  my_app/
    config.yaml
    Dockerfile
    DOCS.md
    README.md
  repository.yaml
  README.md
```

`repository.yaml` names the repository and its maintainer:

```yaml
name: "My apps"
url: "https://github.com/me/my-apps"
maintainer: "Jane Doe <jane@example.com>"
```

Only `name` is required. The file can also be `repository.yml` or `repository.json`. Without it, or with an invalid one, the Supervisor does not load the repository at all.

The Supervisor finds apps at any depth in the repository, so you can group them in folders if you like. Hidden folders and folders called `rootfs` are skipped.

## Add a repository to Home Assistant

Users add your repository in the app store:

1. Go to **Settings** > **Apps** and select **Install app**.
2. In the top-right menu, select **Repositories**.
3. Enter the URL of your repository and select **Add**.

Your apps then show up in the app store, in a section with the `name` from your `repository.yaml`.

The URL may end with `#` and a branch name, like `https://github.com/me/my-apps#next`. The Supervisor then uses that branch instead of the default one. That is how you offer a [beta channel](/apps/guides/presentation/#offer-a-beta-channel).

The Supervisor clones the repository with Git, so it does not have to be on GitHub. Any Git URL the device can reach works.

## Make it one step

A [My link](/glossary/my-link/) opens the right page in the user's own Home Assistant. The `supervisor_add_addon_repository` link opens the dialog to add an app repository, with your URL already filled in. Put it in your README as a badge:

```markdown
[![Open your Home Assistant instance and show the add app repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fme%2Fmy-apps)
```

Replace the URL encoded part after `repository_url=` with the URL of your repository. The [My link creator](https://my.home-assistant.io/create-link/?redirect=supervisor_add_addon_repository) builds the link and the badge for you, and encodes the URL.

To link to the page of one app, use the `supervisor_app` link with the full slug of the app, including the [repository ID](#the-repository-id): `https://my.home-assistant.io/redirect/supervisor_app/?app=a1b2c3d4_my_app`.

## The repository ID

The Supervisor gives every repository an ID: the first 8 characters of the SHA-1 hash of its URL in lowercase, including a `#branch` if there is one. Your apps get this ID in front of their slug, like `a1b2c3d4_my_app`, and on the internal network as `a1b2c3d4-my-app`.

Because the ID comes from the URL, the same apps from a different branch or a renamed repository are different apps to the Supervisor. Keep the URL stable once people use it.

To see the ID of your repository, call `GET /store/repositories` on the Supervisor API, or run `ha store` in the terminal.

## Share it

When your repository is ready:

- Write a README for the repository, with a short description of every app and the [badge to add it](#make-it-one-step).
- Post it in the [Share your Projects](https://community.home-assistant.io/c/projects/9) category of the community forum.
- Keep an eye on the issues. Users of your apps will find you there.
