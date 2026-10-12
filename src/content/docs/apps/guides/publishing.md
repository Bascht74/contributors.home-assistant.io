---
title: Publish your app
description: Build images for every architecture with the builder actions, publish them to a container registry, and version your releases.
order: 11
---

There are two ways to get your app to users: let their device build it, or build images yourself and publish them to a container registry. Publishing images is better for your users in almost every way.

## Built on the device, or pre-built

Without `image` in `config.yaml`, every user's device builds your app from the `Dockerfile` when they install or update it. That is easy for you, and fine while you try out an idea. For your users it is slow, wears out SD cards, and fails whenever a package your build downloads changes or disappears.

With `image`, the Supervisor pulls a ready image. Installing is fast and reliable, and every user runs exactly what you tested. Once people use your app, publish images.

## Build with GitHub Actions

The [builder](https://github.com/home-assistant/builder) repository has composable GitHub Actions to build, sign, and publish multi-architecture images:

| Action | What it does |
| --- | --- |
| `prepare-multi-arch-matrix` | Turns a list of architectures into a build matrix |
| `build-image` | Builds and pushes the image for one architecture, like `ghcr.io/me/aarch64-my-app` |
| `publish-multi-arch-manifest` | Combines the images per architecture into one multi-arch image, like `ghcr.io/me/my-app` |
| `cosign-verify` | Verifies Cosign signatures, used by the others |

The [example app repository](https://github.com/home-assistant/apps-example) has a complete workflow that builds every app that changed, on every push to `main`. Copy it as a starting point. The README of the builder has a smaller example for a single image.

A few things to set up:

- The workflow pushes to the GitHub Container Registry with the token of the workflow, which needs the `packages: write` permission. Signing with Cosign needs `id-token: write`.
- The first time an image is pushed, it is private. Make it public in the package settings on GitHub, or users cannot pull it.
- Pin the actions to a release of the builder, not to a branch.

> [!NOTE]
> The old all-in-one `home-assistant/builder` action is deprecated and no longer maintained. If your workflow still uses it, move to the actions above. The [example app repository](https://github.com/home-assistant/apps-example) shows the new setup.

## Point config.yaml at the image

Set `image` to the name of the multi-arch image, without a tag:

```yaml
image: "ghcr.io/me/my-app"
```

The Supervisor pulls the tag that matches `version`, and Docker picks the right architecture from the manifest. Older apps publish one image per architecture and use the `{arch}` placeholder, like `ghcr.io/me/{arch}-my-app`. That still works, but a multi-arch image is the better choice for new apps.

## Versions

`version` in `config.yaml` is the single source of truth: it is the version users see, the tag the Supervisor pulls, and what the update notification compares against. So:

- Push the image with the new tag before you change `version` in your repository. Otherwise, users get an update they cannot download.
- Never push a different image under an existing tag. Users who already have it do not get the change, and new users get something else than the old ones.
- Use a version scheme that sorts correctly, like [Semantic Versioning](https://semver.org/) or a date-based scheme like `2026.10.0`.

The example workflow reads the tag from `version` in `config.yaml`, and builds and pushes an app when its `config.yaml`, `Dockerfile`, or `rootfs` changes on `main`. Between that push and the end of the build, a user whose Supervisor reloads your repository already sees the update but cannot download it yet. Keep that window short, and do not publish a version bump when the build is failing.

## Backward-incompatible changes

Users can turn on automatic updates per app. If a release needs their attention, like a configuration change or a migration that cannot be undone, add its version to `breaking_versions`:

```yaml
version: "3.0.1"
breaking_versions:
  - "3.0.0"
```

The Supervisor then never installs that version, or a version after it, automatically for users on an older version. They see the update, read your changelog, and install it themselves. Explain the backward-incompatible change at the top of `CHANGELOG.md`.

## Minimum versions

If your app needs a feature of a recent Home Assistant Core, set `homeassistant` to the minimum version. On older installations, the app is not available to install.

## Let users add it

Users install your app from your repository. A [My link](/glossary/my-link/) badge in your README opens the dialog to add your repository in their own Home Assistant, with the URL filled in. See [make it one step](/apps/guides/repository/#make-it-one-step).
