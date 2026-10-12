---
title: Deprecate old backports and typing alias
description: In the past, we've backported features from upstream CPython to use them early and improve user and developers' experience.
date: 2024-04-08
authors:
  - Marc Mueller
areas:
  - core
---

In the past, we've backported features from upstream CPython to use them early and improve user and developers' experience. Home Assistant only supports Python 3.12, so these can be used directly from Python. These backports are now deprecated and will be removed in the future.

| Deprecated | Replacement | Python version |
| ---------- | ----------- | -------------- |
| `homeassistant.backports.enum.StrEnum` | `enum.StrEnum` | >= 3.11 |
| `homeassistant.backports.functools.cached_property` | `functools.cached_property` | >= 3.8, >= 3.12 (performance improvement) |

In addition, some typing aliases are also deprecated now.

| Deprecated | Replacement |
| ---------- | ----------- |
| `homeassistant.helpers.typing.ContextType` | `homeassistant.core.Context` |
| `homeassistant.helpers.typing.EventType` | `homeassistant.core.Event` |
| `homeassistant.helpers.typing.HomeAssistantType` | `homeassistant.core.HomeAssistant` |
| `homeassistant.helpers.typing.ServiceCallType` | `homeassistant.core.ServiceCall` |
