---
title: "Merge"
description: "Taking the changes of a pull request into the repository it was proposed to. Merged means your change is in."
sidebarGroup: "Contributing"
term:
  aliases:
    - "merged"
    - "merging"
    - "merge conflict"
  related:
    - "pull-request"
    - "maintainer"
    - "branch"
  autolink:
    - "merge conflict"
    - "merge conflicts"
---

Only maintainers can merge a pull request. Once it is merged, GitHub marks it **Merged**. What happens next depends on the repository: a fix to the documentation on the `current` branch goes live on home-assistant.io as soon as the site is rebuilt, while a change to the code reaches people with the next release.

A merge conflict happens when your branch and the base branch changed the same lines of the same file, so Git can't combine them by itself. Someone has to choose which version to keep. GitHub can resolve simple conflicts in the browser, with **Resolve conflicts** on the pull request.
