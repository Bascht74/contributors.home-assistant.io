---
title: Have an integration owner
description: "Silver rule integration-owner: the integration has at least one integration owner."
sidebarLabel: integration-owner
sidebarGroup: Silver
order: 6
---

This is a Silver rule. In `quality_scale.yaml`, it is called `integration-owner`.

The integration must have at least one [integration owner](/glossary/integration-owner/), listed in the `codeowners` field of its `manifest.json`. An integration can have more than one.

## Why it matters

Most integrations are written by people outside the core team, who know the device or service far better than anyone else. An integration owner takes care of the integration over time. They are notified of every new issue and pull request for it, they have more say in how its issues and pull requests are handled, and reviewers see them as the expert: their opinion on a change weighs more.

Integrations with an owner are better maintained. That is why every tier from Silver up needs one, and why an integration without an active owner can be downgraded to Bronze, even when it meets every other rule of a higher tier.

## Example

Add your GitHub username, with an `@`, to the manifest:

```json
{
  "domain": "my_integration",
  "name": "My integration",
  "codeowners": ["@my-github-username"]
}
```

Then run `python3 -m script.hassfest` to update the `CODEOWNERS` file of the repository, and commit both files.

To become an owner of an existing integration, open a pull request that adds you to its `codeowners`. It helps to have contributed to the integration first.

## How it is checked

- Hassfest fails when an integration with a Silver, Gold, or Platinum tier in its manifest has no integration owner.
- Hassfest also checks that the `CODEOWNERS` file matches the manifests.
- Whether the owners are still active is checked in review.

## Exceptions

There are no exceptions to this rule.
