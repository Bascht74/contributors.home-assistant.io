---
title: The resolution center
description: How the Supervisor finds problems with checks and evaluations, tracks them as issues, and fixes them with suggestions.
sidebarGroup: How it works
order: 3
---

The resolution center is how the Supervisor keeps an eye on the system. It finds problems, records them, and where it can, offers a fix. Users see the results as [repairs](/glossary/repair/) in Home Assistant: Core's `hassio` integration turns them into repair issues.

The code is in `supervisor/resolution/`, and the manager is `sys_resolution`.

## The concepts

| Concept | What it is | Defined as |
| --- | --- | --- |
| Issue | A problem that was found, like low disk space | `IssueType` |
| Suggestion | A fix for one or more issues, like creating a backup | `SuggestionType` |
| Context | Where the issue is: `system`, `core`, `addon`, `plugin`, `mount`, and more | `ContextType` |
| Unsupported reason | Why the system is not supported, like a modified Docker setup | `UnsupportedReason` |
| Unhealthy reason | Why the system can't be trusted to work, like a broken Docker | `UnhealthyReason` |

All of them are enums in `supervisor/resolution/const.py`.

An issue has a type, a context, and an optional reference, like the slug of an app. A suggestion has the same, and points to the issues it fixes.

## Supported and healthy

These are two different things:

- **Unsupported** means the system works, but is set up in a way the project does not support, like a host that is not Home Assistant OS. Users see a notice, but everything keeps working.
- **Unhealthy** means the system is in a state where the Supervisor can't safely do its work. Jobs with the `healthy` condition refuse to run, which blocks most updates.

Unsupported reasons have a page on home-assistant.io that explains them to users, at `https://www.home-assistant.io/more-info/unsupported/<reason>`. The Supervisor logs that link with the warning.

## Checks, evaluations, and fixups

The resolution center has three kinds of plugins, each in its own folder. Every module in those folders is loaded automatically, through its `setup()` function.

- **Checks** (`checks/`) look for issues, and create them. Each check also re-validates the issues it created earlier, and dismisses them when they are gone.
- **Evaluations** (`evaluations/`) decide whether the system is supported. Each one adds or clears one unsupported reason.
- **Fixups** (`fixups/`) carry out a suggestion. Some run automatically, others wait until the user applies them.

Every hour, and after a suggestion is applied, the Supervisor runs all checks, then all evaluations, then the fixups that may run automatically.

## Write a check

A check subclasses `CheckBase`. This is the free space check, from `supervisor/resolution/checks/free_space.py`, slightly shortened:

```python
class CheckFreeSpace(CheckBase):
    """Check for low free space."""

    async def run_check(self) -> None:
        """Create the issue when the system is affected."""
        if await self.approve_check(Issue(self.issue, self.context)):
            self.sys_resolution.create_issue(
                IssueType.FREE_SPACE, ContextType.SYSTEM
            )

    async def approve_check(self, issue: Issue) -> bool:
        """Return True while the issue still exists."""
        free_space = await self.sys_host.info.free_space()
        return free_space <= MINIMUM_FREE_SPACE_THRESHOLD

    @property
    def issue(self) -> IssueType:
        return IssueType.FREE_SPACE

    @property
    def context(self) -> ContextType:
        return ContextType.SYSTEM

    @property
    def states(self) -> list[CoreState]:
        return [CoreState.RUNNING, CoreState.STARTUP]
```

- `run_check` looks for the problem, and creates the issue, often with a suggestion.
- `approve_check` answers whether an existing issue still applies. The base class uses it to dismiss issues that went away.
- `states` limits when the check runs.

The module also needs a `setup(coresys)` function that returns the check. Evaluations and fixups follow the same pattern, with `EvaluateBase` and `FixupBase`.

When you add a new issue or suggestion type, Core needs translations for it, so the frontend can show a meaningful repair. That is a separate pull request to the `hassio` integration in Core.

## From the command line

`ha resolution info` shows the current issues, suggestions, and reasons. `ha resolution suggestion apply <uuid>` applies a fix, and `ha resolution healthcheck` runs the checks right away. Individual checks can be turned off with `ha resolution check options <slug> --enabled=false`.
