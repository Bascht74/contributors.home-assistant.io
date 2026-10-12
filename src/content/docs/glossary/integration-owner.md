---
title: "Integration owner"
description: "A person or team responsible for an integration, listed in its manifest, who gets notified about its issues and asked to review its pull requests."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "integration owners"
  code:
    - "codeowners (manifest)"
    - "CODEOWNERS"
  formerly:
    - "code owner"
  related:
    - "integration"
    - "manifest"
    - "pull-request"
    - "maintainer"
  autolink:
    - "integration owner"
    - "integration owners"
---

Integration owners are listed with their GitHub handles in the `codeowners` field of the manifest of an integration. Hassfest generates the `CODEOWNERS` file of Home Assistant Core from those lists, which GitHub uses to ask them for reviews. When an issue gets the label of their integration, the bot mentions them.

The code calls them code owners: the `codeowners` field, the `CODEOWNERS` file, and labels like `by-code-owner`. In text about integrations, say integration owner. "Code owner" still fits a `CODEOWNERS` file of a repository that is not about integrations, like the teams that own parts of the frontend.
