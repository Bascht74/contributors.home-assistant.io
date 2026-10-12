---
title: Raise the tier of an integration
description: Work your way up the quality scale one rule at a time, and get the new tier reviewed and released.
sidebarLabel: Raise the tier
order: -3
---

Moving an integration up the scale is one of the most useful things you can do in core. It makes the integration better for everyone who uses it, and you learn a lot about Home Assistant on the way. It is also work that splits up nicely: one rule is often one small pull request.

## Before you start

- Check who owns the integration. The `codeowners` in its `manifest.json` are the people to talk to. Mention them in an issue or on [Discord](https://www.home-assistant.io/join-chat/) before you start on a big change, so you do not collide with work in progress.
- Read its `quality_scale.yaml`. It tells you which rules are done, which are `todo`, and which are exempt.
- No `quality_scale.yaml` yet? Then the integration is below Bronze, or it predates the file. Start by adding the file, with an honest status for every rule. Copy the template from `script/scaffold/templates/integration/integration/quality_scale.yaml` in core.

## Work your way up

1. Pick a rule that is `todo` on the lowest tier that is not complete yet. Bronze rules come before Silver rules, because a tier needs all the rules below it.
2. Read the rule page. It explains what the rule asks, and the "Exceptions" section tells you if it might not apply.
3. Implement the rule, with tests. Keep the pull request to that one rule where you can. Small pull requests get reviewed faster.
4. In the same pull request, set the rule to `done` in `quality_scale.yaml`. Or set it to `exempt` with a comment, if it does not apply.
5. Run hassfest and the tests of the integration before you push. See [check it yourself](#check-it-yourself).

Repeat until every rule of the tier is `done` or `exempt`. You do not need to wait for a tier change to merge rule by rule: every pull request makes the integration better, and the file shows the progress.

> [!TIP]
> Some rules depend on others. [dynamic-devices](/core/quality-scale/dynamic-devices/) and [stale-devices](/core/quality-scale/stale-devices/) need [devices](/core/quality-scale/devices/), [reauthentication-flow](/core/quality-scale/reauthentication-flow/) needs [test-before-setup](/core/quality-scale/test-before-setup/) to raise `ConfigEntryAuthFailed`, and the Gold translation rules build on [has-entity-name](/core/quality-scale/has-entity-name/). The "Related rules" at the bottom of each rule page point out these links.

## Check it yourself

Reading the code is not enough to know that a rule is met. Many rules have a threshold or a validator that CI enforces, so run the tools and read their result. The steps below follow the `ha-quality-scale-verify` skill in the [core repository](https://github.com/home-assistant/core) (`.claude/skills/ha-quality-scale-verify/SKILL.md`), which describes how a rule is verified.

Use the versions your change pins: `ruff` from `requirements_test_pre_commit.txt`, `syrupy` from `requirements_test.txt`, and the library from `manifest.json`. A different version gives false passes and false failures.

### Hassfest

Validate one integration with:

```shell
python3 -m script.hassfest --integration-path homeassistant/components/example
```

This checks `quality_scale.yaml`, and the rules that have a validator, like `config-flow`, `runtime-data`, `test-before-setup`, `unique-config-entry`, `discovery`, `reconfiguration-flow`, and `strict-typing`. Two things to know:

- A validator only runs for a rule that is marked `done`. A clean run says nothing about rules that are `todo` or `exempt`: check those yourself.
- `--integration-path` only runs the plugins that check one integration. The checks for the whole repository are skipped, like `mypy_config`, and the check of the brand metadata that only runs on a full `python3 -m script.hassfest`.

### Strict typing

For [strict-typing](/core/quality-scale/strict-typing/), the integration must be listed in `.strict-typing`, or mypy runs without strict settings and passes for the wrong reason. Run mypy on the integration, and check that `mypy.ini` is in sync, without regenerating it:

```shell
python3 -m script.hassfest -p mypy_config --action validate
```

Without `--action validate`, hassfest regenerates the file, and hides that it was out of date.

### Test coverage

Regenerate the English translations before you measure coverage. Tests read the generated `translations/en.json`, not `strings.json`:

```shell
python3 -m script.translations develop --integration example
pytest tests/components/example \
  --cov=homeassistant.components.example \
  --cov-report term-missing
```

For [test-coverage](/core/quality-scale/test-coverage/), every module must be above 95%, not the integration on average. Look at the exact numbers: a rounded 95% can be 94.7%.

### Config flow tests

For [config-flow-test-coverage](/core/quality-scale/config-flow-test-coverage/), 100% line coverage of `config_flow.py` is not enough on its own. The verification skill also looks for:

- Every flow tested through its errors to the right end result: a created entry (`CREATE_ENTRY`) for the user, discovery, and import flows, and an abort with `reauth_successful` or `reconfigure_successful` for reauthentication and reconfiguration.
- A test that a duplicate is rejected: setting up the same device or account a second time must end in an abort, like `already_configured` or `single_instance_allowed`.
- Options flows, which live in `config_flow.py` too.

### What tools do not check

- **brands**: hassfest does not check the icons and logos. They live in the [brands repository](https://github.com/home-assistant/brands): check them there, or in your pull request to it.
- **The documentation rules**: check that the sections exist on the integration page of [home-assistant.io](https://www.home-assistant.io/), or in the documentation pull request that goes with your change.

## Ask for the new tier

When every rule of the next tier is `done` or `exempt`, open a pull request that changes `quality_scale` in the `manifest.json` of the integration.

1. Change the tier, for example from `"bronze"` to `"silver"`.
2. In the description of the pull request, add the checklist from [All rules](/core/quality-scale/rules/#checklist) for the new tier and every tier below it. Check every rule that is done, and mark the exempt ones as exempt.
3. For every rule, link to the code that implements it, or explain the exemption. This is what makes the review fast: the reviewer does not have to search.

Hassfest fails the pull request when a rule of the tier is not `done` or `exempt`, so you find out early when something is missing.

### The review

A reviewer goes through the checklist, rule by rule, and checks the parts that tools cannot check. Expect questions, especially about exemptions. Once a member of the core team approves and merges the pull request, the new tier ships with the next major release.

You do not need a separate pull request for the documentation. The tier on the integration page of home-assistant.io is updated from the manifest at release time.

## Keep the tier

A tier needs care after it is reached. When you change an integration, keep its rules: tests for new code, translations for new strings, and an updated `quality_scale.yaml` when something changes. Several pylint checks and an automated reviewer compare pull requests to the rules the integration claims, so a change that breaks a rule is usually caught early. See [The quality scale file](/core/quality-scale/quality-scale-file/) for what is checked.

An integration can also lose its tier, for example when it loses its last active integration owner. See [A tier can go down](/core/quality-scale/tiers/#a-tier-can-go-down).
