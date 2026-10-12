---
title: Present your app
description: What users see of your app before and after they install it. The introduction, documentation, changelog, icon, logo, and translations.
order: 10
---

If you share your app, its presentation decides whether people trust it enough to install it. A clear introduction, honest documentation, and a changelog go a long way. None of these files are required, but a published app without them feels unfinished.

## Introduction

`README.md` in the app folder is the introduction. The app store shows it on the page of the app before it is installed. Keep it short: what the app does, and why someone would want it. It is also what people see when they browse your repository on GitHub.

## Documentation

`DOCS.md` is the documentation, shown on the **Documentation** tab of the app. This is where users go when something does not work, so cover:

- How to install and set up the app.
- Every option, what it does, and an example.
- Anything the user needs to do outside the app, like setting up an integration.
- Known limitations.
- Where to ask for help and report bugs.
- The license of the app.

If your app needs more privileges than usual, like `host_network` or turning off protection mode, explain why here. Users see the warnings, and they deserve to know the reason.

## Changelog

`CHANGELOG.md` lists the changes per version. Users see it when an update is available, and they read it to decide whether to update now. Put the newest version on top, and call out backward-incompatible changes clearly. [Keep a Changelog](https://keepachangelog.com/) is a good format to follow.

## Icon and logo

| File | Format | Size |
| --- | --- | --- |
| `icon.png` | PNG, square | 128 × 128 pixels recommended |
| `logo.png` | PNG | Around 250 × 100 pixels recommended, other sizes are fine |

The icon shows up in the app store and the list of installed apps, the logo on the app page. Both are optional. Make sure they look good on light and dark backgrounds.

## Translations

The **Configuration** tab shows your options and ports. Without translations, it shows the raw keys, like `log_level` or `8080/tcp`. Add a file per language to the `translations` folder to give them readable names and descriptions:

```yaml
# translations/en.yaml
configuration:
  log_level:
    name: "Log level"
    description: "How much detail to write to the log."
network:
  8080/tcp: "Web interface (not needed with ingress)"
```

See [Add options](/apps/guides/options/#translate-the-options) and the [translation file format](/apps/reference/files/#translation-file).

## Stage

Not every app is ready for everyone. Set `stage` in `config.yaml` to tell users where your app stands:

- `stable`: the default.
- `experimental`: works, but expect rough edges and changes.
- `deprecated`: no longer maintained. Point users to an alternative in the documentation.

## Offer a beta channel

To let users try new versions before everyone else, keep them in a separate branch. Users add your repository with the branch name after a `#`:

```text
https://github.com/me/my-apps#next
```

Give the repository a different `name` in the `repository.yaml` of that branch, like "My apps (beta)", so users can tell them apart in the app store. Mention the beta channel in your documentation.
