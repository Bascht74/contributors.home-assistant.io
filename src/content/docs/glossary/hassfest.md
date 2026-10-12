---
title: "Hassfest"
description: "The tool in Home Assistant Core that validates the files of every integration, like its manifest and translations, and generates files from them."
sidebarGroup: "Core and integrations"
term:
  code:
    - "script/hassfest"
    - "python -m script.hassfest"
  related:
    - "manifest"
    - "translation-key"
    - "quality-scale"
    - "ci"
  autolink:
    - "hassfest"
---

Hassfest checks that the files around the code of an integration, like `manifest.json`, `strings.json`, `services.yaml`, and `quality_scale.yaml`, are complete and consistent. It also generates files from them, like `CODEOWNERS` and the lists in `homeassistant/generated/`.

It runs in [CI](/glossary/ci/) on every pull request to Home Assistant Core, and you can run it yourself with `python -m script.hassfest`. Custom integrations can use it too, with the hassfest action from the home-assistant/actions repository. See [Linters, hassfest, and CI](/core/development/checks/).
