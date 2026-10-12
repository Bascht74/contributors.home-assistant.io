---
title: Translations 2.0
description: We've migrated our translation scripts in the Home Assisstant Core repository under a single namespace.
date: 2020-04-10
authors:
  - Paulus Schoutsen
areas:
  - core
---

We've migrated our translation scripts in the Home Assisstant Core repository under a single namespace. It can now all be invoked using `python3 -m script.translations`.

| Old command                    | New command                               |
| ------------------------------ | ----------------------------------------- |
| `script/translations_develop`  | `python3 -m script.translations develop`  |
| `script/translations_upload`   | `python3 -m script.translations upload`   |
| `script/translations_download` | `python3 -m script.translations download` |
| `script/translations_clean`    | `python3 -m script.translations clean`    |

This will help us prepare for our [Translations 2.0 effort](https://github.com/home-assistant/architecture/blob/master/adr/0009-translations-2.0.md) that will clean up translations and make it scale better.
