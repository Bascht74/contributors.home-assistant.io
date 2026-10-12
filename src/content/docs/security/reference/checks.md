---
title: Automated security checks
description: The tools that check the code, dependencies, and workflows of Home Assistant for security problems, and where they run.
order: 2
sidebarLabel: Automated checks
---

These checks run on their own, so a lot of problems are caught before a reviewer even looks. They do not replace a review: they catch known patterns, not every mistake. All of them are in the [core repository](https://github.com/home-assistant/core), unless the table says otherwise.

| Check | Where it runs | What it catches |
| --- | --- | --- |
| hassfest requirements | CI, and locally with `python3 -m script.hassfest` | Requirements of Core integrations that are not pinned with `==`. Packages in the dependency tree that should not be runtime dependencies, or are unmaintained. Packages that install a top-level `test`, `tests`, `doc`, or `docs` folder, or a top-level `.pth` or `.start` file. |
| License audit | CI, when requirements change | Installed packages without an OSI-approved license (`script/licenses.py`). |
| Check requirements | Pull requests that change requirement files | Known vulnerabilities and yanked releases on PyPI, a private source repository, a release without a publishing attestation, a weak release pipeline, obvious red flags in the source, a missing changelog link, and blocking calls in `async` code. See [dependencies and supply chain](/security/guides/dependencies/#check-requirements). |
| Ruff security rules | pre-commit hook, also in CI | Calls like `exec` (`S102`), `eval` (`S307`), `subprocess` with `shell=True` (`S602`), unsafe XML parsing, `pickle`, hardcoded temporary files, and hardcoded passwords as a default value. The full list is under `select` in `[tool.ruff.lint]` of `pyproject.toml`. |
| CodeQL | Once a week | Code scanning of the Python code by GitHub. |
| zizmor | pre-commit hook, also in CI | Security problems in GitHub workflows, in pedantic mode. |
| actionlint | CI of the [frontend repository](https://github.com/home-assistant/frontend) | Mistakes in GitHub workflows. |
| Renovate | Its own pull requests | Pull requests that update dependencies, pre-commit hooks, and the pinned GitHub Actions. |

## Related

- [Dependencies and supply chain](/security/guides/dependencies/): what these checks mean for your pull request.
- [Checks on your pull request](/core/development/checks/): all checks of Core, not only security.
