---
title: Extend deprecation period of hass.helpers
description: On March 30, 2024, we announced the deprecation of the hass.helpers attribute for the Home Assistant 2024.11 release.
date: 2024-10-09
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

On March 30, 2024, we [announced the deprecation](/blog/2024/03/30/deprecate-hass-helpers/) of the `hass.helpers` attribute for the Home Assistant 2024.11 release.
Due to the large number of custom integrations that still use them and the recent HACS v2 update, we have decided to extend the deprecation period for another six months.

This means that starting with Home Assistant 2025.5, `hass.helpers` will be removed.

We encourage all developers of custom integrations to update their code to avoid any issues prior to the Home Assistant 2025.5 release.
