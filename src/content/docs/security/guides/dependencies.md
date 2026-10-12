---
title: Dependencies and supply chain
description: Every library Home Assistant installs runs inside it. What Home Assistant asks of a dependency, what it checks automatically, and how its own workflows are protected.
sidebarLabel: Dependencies and supply chain
order: 5
---

Integrations talk to devices and services through libraries, and those libraries come from PyPI. Every [requirement](/glossary/requirement/) is code that ends up in Home Assistant, in the homes of everyone who installs it. If an attacker takes over a library, or slips a malicious package into its dependencies, they are in. That is a supply chain attack, and it is why Home Assistant is strict about where its dependencies come from.

## What Home Assistant asks of a library

The [dependency transparency](/core/quality-scale/dependency-transparency/) rule of the quality scale sets the baseline. Every integration with an external dependency must meet it, from the Bronze tier up:

- The source code is available under an OSI-approved license.
- The package is available on PyPI.
- The package on PyPI is built and published from a public CI pipeline.
- Every version on PyPI matches a tagged release in a public repository.

The rule exists so the project can trust the dependencies it ships with every release.

## What is checked automatically

You do not have to check all of this by hand. Several tools look at every pull request that changes a requirement.

### hassfest

hassfest validates the `requirements` in the manifest of every integration:

- Core integrations must pin every requirement to an exact version, like `"example-library==1.2.3"`.
- It walks the full dependency tree, not only the direct dependencies, and flags packages that should not be there: tools for tests, builds, or docs as a runtime dependency, `types-` packages, and some unmaintained packages.
- It flags packages that install a top-level `test`, `tests`, `doc`, or `docs` folder, or a top-level `.pth` or `.start` file.

### Check requirements

A pull request that changes the requirement files of Core gets one comment from the **Check requirements** workflow, with a row per changed package:

| Check | What it looks at |
| --- | --- |
| No Advisories | PyPI reports no known vulnerability for the new version. |
| Not Yanked | The new version was not yanked from PyPI. |
| Repo Public | The source repository is publicly accessible. |
| CI Upload | The release on PyPI has an attestation that shows which pipeline published it. |
| Release Pipeline | The publishing workflow of the library: triggered by a tag, a release, or a protected branch, preferably publishing with OIDC instead of a stored token, and no way to upload around it. |
| Security | A quick scan of the source of the library for obvious supply chain red flags. |
| PR Link | A new package links to its source repository. A version bump links to a changelog or a comparison that mentions both versions. |
| Async Safe | Blocking calls inside `async` functions in the library. |

Part of these checks is done by an AI agent, the rest by a script. Take the **Security** row for what it is: a cheap first pass, not a security review. A pass is shown as ☑️, never ✅, so nobody reads it as a seal of approval.

### Licenses

The CI of Core extracts the license of every installed package, and checks that it is OSI approved, with `script/licenses.py`.

## When you add or update a dependency

- Link the source repository in your pull request for a new library, or the changelog or a comparison between the two versions for an update. The Check requirements workflow looks for it, and reviewers need it.
- Change only the version and the regenerated requirement files, plus the code changes the new version needs. Run `python3 -m script.gen_requirements_all` to regenerate the files.
- If the new version pulls in new dependencies of its own, say so in your pull request.
- If you maintain the library: publish it from a public CI pipeline, with trusted publishing on PyPI, so the release can be traced back to its source.

Reviewers go through a [checklist for dependency updates](/core/development/reviewing/#dependency-updates). It is worth reading before you open one.

## GitHub workflows

The CI of the project itself is part of the supply chain too. The workflows in the [core repository](https://github.com/home-assistant/core) follow a few patterns that you will see in review:

- **Actions are pinned to a commit SHA**, with the version in a comment, like `actions/checkout@<sha> # v7.0.1`. Renovate keeps the pins up to date.
- **Permissions start at nothing.** Workflows set `permissions: {}` at the top, and each job lists the permissions it needs, like `contents: read`.
- **Checkouts do not keep credentials**: `persist-credentials: false` on `actions/checkout`.
- **zizmor**, a linter for GitHub workflows, runs in pedantic mode in the core repository, as a pre-commit hook and in CI. The [frontend repository](https://github.com/home-assistant/frontend) runs `actionlint` on its workflows.

If you change a workflow, follow these patterns.

### What went wrong before

In 2023, the GitHub Security Lab found an [expression injection](https://github.com/home-assistant/core/security/advisories/GHSA-jff5-5j3g-vhqc) in `helpers/version`, a shared action in the [actions repository](https://github.com/home-assistant/actions). It put `${{ github.head_ref }}`, the branch name of a pull request, straight into a `run:` script. GitHub fills in an expression before the shell runs, so a branch name with shell code in it becomes part of the script. According to the advisory, an attacker could use that to leak secrets and change the repository.

Never put an expression with outside data, like a branch name, a title, or a comment, in a `run:` script. Pass it in as an environment variable, and let the shell treat it as data:

```yaml
- name: Show the branch
  env:
    HEAD_REF: ${{ github.head_ref }}
  run: echo "Branch: ${HEAD_REF}"
```

zizmor flags this kind of template injection.

## Related

- [Review with security in mind](/security/guides/reviewing/): what to look for in a pull request.
- [Automated checks](/security/reference/checks/): every check in one table.
- [Requirements](/core/integrations/manifest/#requirements): the `requirements` key of the manifest.
