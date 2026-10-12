---
title: Use transparent dependencies
description: "Bronze rule dependency-transparency: dependencies are open source, on PyPI, and built and published in public CI."
sidebarLabel: dependency-transparency
sidebarGroup: Bronze
order: 7
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `dependency-transparency`.

Every Python package the integration depends on, its [requirements](/glossary/requirement/), meets these requirements:

- The source code is available under an OSI-approved license.
- The package is published on PyPI.
- The package on PyPI is built and published from a public CI pipeline.
- Each version on PyPI matches a tagged release in a public repository.

## Why it matters

Home Assistant ships the dependencies of every integration to every user, with every release. The project has to be able to trust them. When the source is open, the build is public, and every release is tagged, anyone can see what code ends up on millions of systems, and how it got there. A package that was built on someone's laptop and uploaded by hand cannot offer that.

## What to do

Usually, the dependency is a library that talks to the device or service, and you write it yourself or contribute to an existing one:

- Publish the source in a public repository, with an OSI-approved license like MIT or Apache 2.0.
- Release from CI, for example with a GitHub Actions workflow that builds the package and publishes it to PyPI when you publish a release. PyPI trusted publishing makes this straightforward.
- Tag every release in the repository, with the same version as on PyPI.

Then pin the exact version in the `requirements` of `manifest.json`, like `"requirements": ["mylibrary==1.2.3"]`.

## How it is checked

- Hassfest requires every requirement of a core integration to be pinned to an exact version with `==`.
- CI audits the licenses of all requirements, and fails when it cannot find an OSI-approved license, unless the package is on the short list of known exceptions in `script/licenses.py` of core.
- That the package is built in public CI and matches a tagged release is checked in review. Link to the release workflow and the tag in your pull request.

## Exceptions

If the integration does not have any external dependencies, this rule does not apply.

## Related rules

- [async-dependency](/core/quality-scale/async-dependency/): use an async dependency.
