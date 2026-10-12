---
title: Releases and builds
description: How a change to Home Assistant OS goes from a pull request to a release, with the branches, version numbers, and build pipelines involved.
sidebarGroup: Guides
order: 6
---

Home Assistant OS has no fixed release schedule. The maintainers release when there is something worth releasing, like a kernel update, a fix, or a new feature. This page explains the path your change takes.

## Open a pull request

Fork [home-assistant/operating-system](https://github.com/home-assistant/operating-system), create a branch, and open your pull request against `dev`.

Explain *why* the change matters, not only what it does. "Update the kernel" is visible in the diff. "Update the kernel, because it fixes Ethernet on board X" is what the reviewer needs to know. A short reason is fine, as long as it is there.

Pull requests that change the build or the system can get the `run-ova-test` label. That builds the OVA image and runs the automated tests on it, see [test your build](/os/operating-system/test/#run-the-automated-tests). Only maintainers can set labels, and builds only run for branches in the main repository.

## Branches

- `dev` carries the next version during development. Every change goes here first, also fixes meant for the current release.
- `rc` carries the release candidates. The maintainers bring the changes from `dev` that are ready over to it.
- `main` carries the stable releases. After a release, `main` is merged back into `dev`.

Older major versions had their own `rel-<major>` branches. Those are no longer used for new releases.

## Version numbers

A version is `MAJOR.MINOR`, like `18.3`. The numbers live in `buildroot-external/meta`, together with an optional suffix:

| Kind | Example | Where it comes from |
| --- | --- | --- |
| Development build | `18.4.dev20261006` | `dev`, the suffix is the build date |
| Release candidate | `18.4.rc1` | `rc` |
| Stable release | `18.4` | `main`, no suffix |

A local build gets the suffix from `meta` as it is, like `18.4.dev0`. CI replaces it with the date for development builds.

## Deployment types

The `DEPLOYMENT` value in `buildroot-external/meta` sets which certificates the image trusts for updates, see [the update system](/os/operating-system/update-system/#security).

| Deployment | Channel | Used for |
| --- | --- | --- |
| `development` | dev | Development builds |
| `staging` | beta | Release candidates |
| `production` | stable | Releases |

The build pipeline refuses to publish a build when the deployment, the version format, and the channel don't match.

## Build pipelines

GitHub Actions builds every public image, with `.github/workflows/build.yaml`. It runs in two situations:

- **When a GitHub release is published.** It builds every board, runs the tests, and attaches the images to the release. A pre-release goes to the beta channel, a release to stable.
- **When a maintainer starts it by hand.** It builds a development version of the boards they pick, or all of them. The images are published on [os-artifacts.home-assistant.io](https://os-artifacts.home-assistant.io/index.html).

A build for a fork does not publish anything, and signs with a throwaway self-signed certificate instead of the release one.

## After the release

The release notes are drafted automatically from the labels of the merged pull requests, like `board/raspberrypi` or `build`. Users get the new version through the Supervisor, which checks [version.home-assistant.io](https://version.home-assistant.io/stable.json) for the latest OS version of their channel. The update itself goes through RAUC, see [the update system](/os/operating-system/update-system/).
