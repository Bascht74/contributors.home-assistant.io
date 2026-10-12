---
title: Translations for custom Lovelace
description: If you are the author of a custom Lovelace card and use translations, please pay attention as the state translation keys have changed.
date: 2020-04-23
authors:
  - Paulus Schoutsen
areas:
  - frontend
---

If you are the author of a custom Lovelace card and use translations, please pay attention as the state translation keys have changed.

Before 0.109, state translations lived under `state.<domain>.<state>` or `state.<domain>.<device class>.<state>` for binary sensors. Starting with version 0.109, these translations are now part of the backend and so they have the key format for backend translations. We have standardized the state format to always include a device class. The device class `_` is reserved as a fallback for entities without a device class.

| Old                                     | New                                               |
| --------------------------------------- | ------------------------------------------------- |
| `state.<domain>.<state>`                | `component.<domain>.state._.<state>`              |
| `state.<domain>.<device class>.<state>` | `component.<domain>.state.<device class>.<state>` |

In future releases, we're planning to migrate state attribute translations to the backend too. We'll publish this on this blog when it happens.
