---
title: App files
description: The files the Supervisor reads from an app folder and from a repository, and what each one is for.
order: 3
---

The Supervisor reads a fixed set of file names from your app folder. Everything else in the folder is only used by your `Dockerfile`.

## App folder

```text
hello_world/
  translations/
    en.yaml
  rootfs/
  apparmor.txt
  CHANGELOG.md
  config.yaml
  Dockerfile
  DOCS.md
  icon.png
  logo.png
  README.md
```

| File | Required | What the Supervisor does with it |
| --- | --- | --- |
| `config.yaml` | Yes | The [app configuration](/apps/reference/configuration/). Also accepted as `config.yml` or `config.json`. |
| `Dockerfile` | To build locally | Builds the image when `config.yaml` has no `image`. A `Dockerfile.aarch64` or `Dockerfile.amd64` takes precedence for that architecture. |
| `README.md` | No | The introduction of the app in the app store. |
| `DOCS.md` | No | The **Documentation** tab of the app. |
| `CHANGELOG.md` | No | The changes, shown when an update is available. |
| `icon.png` | No | The square icon of the app. |
| `logo.png` | No | The logo, shown on the app page. |
| `apparmor.txt` | No | A custom AppArmor profile, loaded instead of the default one. |
| `translations/` | No | Translated names and descriptions of options and ports, one file per language, like `en.yaml`. YAML or JSON. |
| `build.yaml` | No | Deprecated. See [Build the container image](/apps/guides/dockerfile/#buildyaml). |

`rootfs/` is not special to the Supervisor, but it is the convention in the example and official apps: a folder that the `Dockerfile` copies into the image with `COPY rootfs /`. The Supervisor skips folders called `rootfs` when it looks for `config.yaml` files, so configuration files inside it are safe.

What goes in the documentation files, the icon, and the logo is in [Present your app](/apps/guides/presentation/).

## Translation file

A translation file has two keys: `configuration` for the options, and `network` for the ports.

```yaml
configuration:
  ssl:
    name: "Enable SSL"
    description: "Use SSL for the web server of the app."
  ssh:
    name: "SSH options"
    description: "Configure SSH authentication."
    fields:
      public_key:
        name: "Public key"
        description: "The public key of your client."
network:
  80/tcp: "The web server port (not used for ingress)"
```

| Key | Description |
| --- | --- |
| `configuration.<option>.name` | Required. The label of the option. `<option>` matches a key in `schema`. |
| `configuration.<option>.description` | The help text below the option. |
| `configuration.<option>.fields` | The same structure, for the keys of a nested option. |
| `network.<port>` | The description of a port. `<port>` matches a key in `ports`. |

The file name is the language code, like `en.yaml` or `pt-BR.yaml`. The UI falls back to English when a language is missing. See [Add options](/apps/guides/options/#translate-the-options) for how to use it.

## Repository

A repository is a Git repository with a `repository.yaml` (or `repository.yml`, or `repository.json`) at the root, and one folder per app.

```text
my-apps/
  hello_world/
    config.yaml
    Dockerfile
  another_app/
    config.yaml
  repository.yaml
```

```yaml
name: "My apps"
url: "https://github.com/me/my-apps"
maintainer: "Jane Doe <jane@example.com>"
```

| Key | Required | Description |
| --- | --- | --- |
| `name` | Yes | The name of the repository, shown in the app store. |
| `url` | No | The homepage of the repository. |
| `maintainer` | No | Who maintains the repository, and how to reach them. |

Without a valid `repository.yaml`, the Supervisor does not load the repository. See [Create and share a repository](/apps/guides/repository/).
