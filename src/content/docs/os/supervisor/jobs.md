---
title: Jobs
description: How the Supervisor runs work as jobs, with conditions, concurrency limits, throttling, and progress that clients can follow.
sidebarGroup: How it works
order: 2
---

Almost everything the Supervisor does that takes time is a job: installing an app, updating Core, making a backup. A job is an async method with the `@Job` decorator. The decorator handles what would otherwise be repeated everywhere: checking that the system is in a state where the work may run, preventing two runs at once, and reporting progress.

The code is in `supervisor/jobs/`.

## A job

```python
from ..jobs.const import JobConcurrency, JobCondition
from ..jobs.decorator import Job


class HomeAssistantCore(JobGroup):
    @Job(
        name="home_assistant_core_update",
        conditions=[
            JobCondition.FREE_SPACE,
            JobCondition.HEALTHY,
            JobCondition.INTERNET_HOST,
        ],
        on_condition=HomeAssistantJobError,
        concurrency=JobConcurrency.GROUP_REJECT,
    )
    async def update(self, version: AwesomeVersion | None = None) -> None:
        """Update Home Assistant Core."""
```

This is shortened from `supervisor/homeassistant/core.py`. The parts:

- `name`: unique across the Supervisor. It shows up in the API and the logs.
- `conditions`: what must be true before the job runs.
- `on_condition`: the exception to raise when a condition fails. Without it, the job logs the failure and returns.
- `concurrency`: what happens when the job, or its group, is already running.

## Conditions

Conditions are defined as `JobCondition` in `supervisor/jobs/const.py`. Some common ones:

| Condition | Passes when |
| --- | --- |
| `healthy` | The system is not marked unhealthy |
| `free_space` | There is enough free space on the data disk |
| `internet_host`, `internet_system` | The host, or the Supervisor itself, has internet |
| `running` | The Supervisor is in the running state |
| `haos` | The system runs Home Assistant OS |
| `os_agent` | The OS Agent is available |
| `supervisor_updated` | The Supervisor runs the latest version |
| `plugins_updated` | Every plugin runs its latest version |
| `auto_update` | Automatic updates are on |
| `mount_available` | The host supports network storage mounts |

For debugging, conditions can be ignored with `ha jobs options --ignore-conditions <condition>`. A system that does that is marked as unsupported, with the `job_conditions` reason. Undo it with `ha jobs reset`.

## Concurrency and throttling

`JobConcurrency` controls what happens when a job is called while it already runs:

- `REJECT`: fail right away.
- `QUEUE`: wait for the running one to finish, then run.
- `GROUP_REJECT` and `GROUP_QUEUE`: the same, but for any job in the same group.

A group is a class that inherits from `JobGroup`, like an app or Home Assistant Core. All jobs on one instance share a lock, so an app can't be updated while it is being backed up. A job can call other jobs in its own group without deadlocking.

`JobThrottle` limits how often a job runs. `THROTTLE` skips calls within a period, `RATE_LIMIT` allows a number of calls per period and fails after that. Both have group variants. They need `throttle_period`, and rate limits also `throttle_max_calls`.

## Progress and child jobs

Every job has a UUID, a stage, a progress percentage, and its errors. Jobs started from within a job become its children. With `child_job_syncs`, a job can take its progress from a child, like an update that takes its progress from pulling the image.

Clients follow jobs through the API, with `/jobs/info` and `/jobs/<uuid>`, and through events that Core receives. That is how the frontend shows the progress of an update. Jobs with `internal=True` are not exposed. Jobs with `cleanup=False` stay readable after they finish, so a client can pick up the result later.
