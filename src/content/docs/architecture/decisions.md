---
title: How architecture decisions are made
sidebarLabel: How decisions are made
description: Where architecture is discussed, how a decision gets recorded, and how you can take part.
order: 4
---

The architecture meeting guards the technical architecture of Home Assistant. Every change to how Home Assistant is built needs its approval.

The meeting decides, but it doesn't decide behind closed doors. Every proposal starts as a discussion in the [architecture repository](https://github.com/home-assistant/architecture) on GitHub, and the outcome is posted there too. Anyone can read along, and anyone can start a discussion.

## When something is an architecture question

Most changes don't need a discussion first: a bug fix, a new feature in an integration, or a new integration that is [ready for core](/core/integrations/create/#does-it-belong-in-core). Open a pull request.

Start a discussion when a change affects how everyone builds on Home Assistant, for example:

- A new type of entity, or a big change to an existing one
- A new rule for integrations, or an exception to one
- A change in what the project supports, like an installation method or a Python version
- A new concept that other parts of Home Assistant will build on

If you are not sure, ask in the **#developers** channel on [Discord](https://www.home-assistant.io/join-chat). It saves you from writing code that has to change course.

## From discussion to decision

1. **Discuss.** Someone opens a [discussion](https://github.com/home-assistant/architecture/discussions) with the problem and a proposal. Others ask questions, poke holes, and suggest alternatives. Keep a discussion about one topic.
2. **Decide.** When the discussion has settled, the proposal is decided in the architecture meeting. The outcome is posted on the discussion and marked as its answer: approved or rejected, with the date of the meeting, and remarks or a rationale.
3. **Record.** Decisions that set a lasting rule for the whole project are also written down as an Architecture Decision Record, an ADR, in the [`adr` folder](https://github.com/home-assistant/architecture/tree/master/adr).

## Decisions and the roadmap

The architecture meeting is not part of the roadmap flow. It sits next to it: a change to how Home Assistant is built needs its approval, whether the change comes from the roadmap or from a contributor's own idea.

Larger work is planned on the [roadmap](/roadmap/) of the Open Home Foundation, as opportunities, and delivered through [epics](https://github.com/home-assistant/epics). When an opportunity changes how Home Assistant is built, like new triggers and conditions for an entity component, it needs an architecture decision before the work goes in.

It can go both ways. For the [sun triggers](https://github.com/home-assistant/architecture/discussions/1394), the opportunity came first: the discussion links to it as the place where the reasoning lives, the architecture meeting approved a revised proposal, the opportunity links back to that approval, and the work was planned in an epic. Other opportunities are built on an architecture discussion that was there first. [From idea to release](/roadmap/how-it-works/) follows that example from start to finish.

## Architecture Decision Records

An ADR is a short document with a fixed shape: the context, the decision, and its consequences. It is numbered, and it is never deleted. When a decision changes, its status says so, and links to what replaced it.

That makes the ADRs a history of the project. Some worth knowing:

| ADR | Decision |
| --- | --- |
| [0007](https://github.com/home-assistant/architecture/blob/master/adr/0007-integration-config-yaml-structure.md) | YAML configuration of an integration lives under its own domain. |
| [0008](https://github.com/home-assistant/architecture/blob/master/adr/0008-code-owners.md) | What it means to be an integration owner. |
| [0010](https://github.com/home-assistant/architecture/blob/master/adr/0010-integration-configuration.md) | Integrations that connect to devices or services are set up in the UI. |
| [0011](https://github.com/home-assistant/architecture/blob/master/adr/0011-discovery-requires-unique-id.md) | A discoverable integration sets a unique ID, so users can ignore a discovery. |
| [0012](https://github.com/home-assistant/architecture/blob/master/adr/0012-define-supported-installation-method.md) | What a supported installation method is. |
| [0018](https://github.com/home-assistant/architecture/blob/master/adr/0018-supported-databases.md) | Which databases the recorder supports. |
| [0019](https://github.com/home-assistant/architecture/blob/master/adr/0019-GPIO.md) | No new integrations that use GPIO pins directly. |
| [0020](https://github.com/home-assistant/architecture/blob/master/adr/0020-minimum-supported-python-version.md) | One minor version of Python is supported at a time. |
| [0021](https://github.com/home-assistant/architecture/blob/master/adr/0021-YAML-integration-configuration-deprecation-policy.md) | YAML configuration is deprecated for at least six months before it is removed. |
| [0022](https://github.com/home-assistant/architecture/blob/master/adr/0022-integration-quality-scale.md) | The integration quality scale, with its four tiers. |

Some ADRs have since been reverted: the ones for the Home Assistant Core and Supervised installation methods, for example. Their status says so at the top.

## Using AI in discussions

The architecture repository also holds the [AI policy](https://github.com/home-assistant/architecture/blob/master/AI_POLICY.md) of the Open Home Foundation. It applies to discussions, issues, and pull requests in all projects. In short: you can use AI as a tool, but you must understand and be able to explain everything you post, and autonomous agents are not allowed to contribute.

## Work on this

- Have a proposal? Read the [open discussions](https://github.com/home-assistant/architecture/discussions) first: yours may already be there.
- Want to know how a decision fits into the bigger plan? See [from idea to release](/roadmap/how-it-works/).
- Not sure where to start contributing at all? [Your first contribution](/start/first-contribution/) helps you pick.
