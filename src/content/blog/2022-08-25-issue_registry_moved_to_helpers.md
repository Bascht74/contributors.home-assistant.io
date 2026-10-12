---
title: The issue registry has been moved to homeassistant.helpers
description: The issue registry has been moved from homeassistant.components.repairs to homeassistant.helpers and is now loaded together with the other registries very early during bootstrapping, before setup of any integrations.
date: 2022-08-25
authors:
  - Erik Montnémery
areas:
  - core
---

The issue registry has been moved from `homeassistant.components.repairs` to `homeassistant.helpers` and is now loaded together with the other registries very early during bootstrapping, before setup of any integrations.

This allows creating issues during validation of the configuration.
