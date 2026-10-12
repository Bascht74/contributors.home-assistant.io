---
title: How the Marketplace works
description: How the Marketplace finds your repository, checks it, installs it, and keeps it up to date, and how blueprints are shared and updated without it.
sidebarLabel: How it works
order: 2
---

The [Marketplace](/glossary/marketplace/) is an integration in Home Assistant Core, `marketplace`, with a panel under **Settings** > **Marketplace**. It ships with Home Assistant 2026.11, and is set up by default. This page follows your work from your GitHub repository to a user's Home Assistant, so you know what happens to it on the way.

The Marketplace is [HACS](/glossary/hacs/), brought into Home Assistant with as few changes as possible. The [pull request that added it](https://github.com/home-assistant/core/pull/183502) says so, and says that ideas to grow it further come later. Everything below describes the Marketplace as it is in core today. Where it differs from HACS, the page says so.

## The catalog

The Marketplace shows what is in the catalog. The catalog is a list of GitHub repositories per type, kept in the [hacs/default](https://github.com/hacs/default) repository: one file for integrations, one for `plugin` (dashboard cards and plugins), one for themes, one for templates. You get your repository in by opening a pull request there: see [Get into the catalog](/marketplace/guides/catalog/).

The catalog is served as data from `data-v2.hacs.xyz`, the same data HACS uses. It holds more than the list: the latest version of each repository, its description, its stars, and two lists of repositories that were taken out:

- **Removed**: the repository is no longer offered, for example because it was abandoned or archived. Installed copies keep working, but get no updates, and the user gets a repair that explains why.
- **Critical**: the repository is harmful. The Marketplace uninstalls it immediately, and restarts Home Assistant.

The Marketplace reads the catalog when it starts, and again every 6 hours.

A user can also add a repository that is not in the catalog, from a [link](/marketplace/guides/catalog/#the-link-to-your-repository): a custom repository. That needs a GitHub connection, and the repository has to meet the same requirements as one in the catalog. The Marketplace refuses the core repository, and repositories with apps.

## The types

The Marketplace knows four types. Each has its own folder in the user's configuration folder:

| Type | In the catalog | Installed to | After install |
| --- | --- | --- | --- |
| Integration | `integration` | `custom_components/<domain>/` | Loads right away when it has a config flow and was not loaded before. Otherwise a repair asks for a restart. |
| Dashboard | `plugin` | `www/community/<repository name>/` | Added as a dashboard resource. The user reloads the browser. |
| Theme | `theme` | `themes/<theme file name>/` | Themes are reloaded. |
| Template | `template` | `custom_templates/` | Custom templates are reloaded. |

HACS also handled AppDaemon apps and Python scripts. The Marketplace does not. Users who had them installed keep the files, but get no updates, and a repair tells them so.

## What it checks

The Marketplace reads `hacs.json` from the root of your repository, for every version it installs. Without that file, it can not install or update your repository. The [hacs.json reference](/marketplace/reference/hacs-json/) lists every key.

Then it looks for the files of your type, in the places the [repository structure](/marketplace/reference/repository-structure/) describes. If they are not there, the repository does not comply, and it can not be installed.

After it wrote the files, but before it calls the install done, it checks that Home Assistant can use them. When a check fails, the install fails, and the files are put back the way they were:

- An integration needs a `manifest.json` with the same `domain`, and a `version` that the loader accepts.
- A theme file has to be valid YAML without tags like `!include`, and pass the same validation as themes in `configuration.yaml`.
- A template file has to be UTF-8, and not larger than Home Assistant reads.
- A dashboard plugin needs its JavaScript file to be there.

The full list, next to the checks of the HACS action, is in [validation checks](/marketplace/reference/validation/).

## Versions

When your repository has GitHub releases, the tag of the latest release is the version users get. A pre-release is only offered to users who turned on the pre-release switch of your repository, and only while it is newer than your latest release. Without releases, users get the latest commit of your default branch. The [releases guide](/marketplace/guides/releases/) has the details.

A version from the catalog installs straight from the release asset or the archive of that version, without the GitHub API, so it works without a GitHub connection. Other versions, and custom repositories, go through the GitHub API.

Every installed repository gets an [update entity](https://www.home-assistant.io/integrations/update/), so new versions show up under **Settings** > **Updates**, next to the updates of Home Assistant itself. Users read your release notes there.

## Before Home Assistant 2026.11

Before the Marketplace, HACS was a custom integration that users installed themselves. On the first start after the update, the Marketplace takes over a HACS installation: installed repositories, custom repositories, and update entities carry over, and HACS is removed. Links to `/hacs` open the Marketplace, and dashboard files stay reachable on the old `/hacsfiles/` path.

For you as a publisher, little changes. The catalog, `hacs.json`, the folder structure, and the [HACS action](https://github.com/hacs/action) are the same. [My Home Assistant](/glossary/my-link/) links of the type `hacs_repository` still work, and open your repository in the Marketplace. The new type is `marketplace_repository`.

## Blueprints

[Blueprints](/glossary/blueprint/) are not in the Marketplace. Home Assistant imports them from a URL:

- A topic on the [community forum](https://community.home-assistant.io/). Home Assistant takes the first YAML code block with a blueprint from the first post.
- A file on GitHub, or a GitHub gist.
- A YAML file on home-assistant.io.
- Any other URL that returns the YAML of a blueprint. The import dialog warns the user when the URL is not on GitHub or a Home Assistant website.

Home Assistant saves the URL in the blueprint, as `source_url`. That URL is how updates work: the user selects **Re-import blueprint**, and Home Assistant downloads the blueprint again from the same place, and overwrites the copy it has. Automations and scripts built on the blueprint use the new version from then on. There is no update entity, and no notice that a new version exists: users re-import when they hear about it. The [blueprints guide](/marketplace/guides/blueprints/) explains how to change a blueprint without breaking what people built on it.
