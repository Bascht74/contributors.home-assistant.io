---
title: Extend deprecation period of @bind_hass and hass.components
description: On February 27, 2024, we announced the deprecation of the @bind_hass decorator and the hass.components attribute for the Home Assistant 2024.9 release.
date: 2024-09-11
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

On February 27, 2024, we [announced the deprecation](/blog/2024/02/27/deprecate-bind-hass-and-hass-components/) of the `@bind_hass` decorator and the `hass.components` attribute for the Home Assistant 2024.9 release.
Due to the large number of custom integrations that still use them and the recent HACS v2 update, we have decided to extend the deprecation period for another six months.

This means that starting with Home Assistant 2025.3, the `@bind_hass` decorator and `hass.components` will be removed.

We encourage all developers of custom integrations to update their code to avoid any issues prior to the Home Assistant 2025.3 release.
