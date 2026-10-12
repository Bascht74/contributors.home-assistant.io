---
title: The core config class has been moved
description: The definition of the core config class, an instance of which is available as hass.config has been moved from homeassistant/core.py to homeassistant/core_config.py.
date: 2024-10-31
authors:
  - Erik Montnémery
areas:
  - core
---

### Summary of changes

The definition of the core config class, an instance of which is available as [`hass.config`](/core/internals/hass/) has been moved from `homeassistant/core.py` to `homeassistant/core_config.py`. The move was done to make it easier to read and understand the core code. Custom integrations which currently import `Config` from `homeassistant.core` need to be updated to instead import from `homeassistant.core_config`.

> [!NOTE]
> Normally, integrations won't need to use the core `Config` class. But there's been custom integrations that have incorrect type annotations where the `config` object passed to the integration's `async_setup` is specified as a `Config` instance:
> ```py
> from homeassistant.core import Config
>
> async def async_setup(hass: HomeAssistant, config: Config) -> bool:
>     """Set up the integration."""
> ```
>
> A correct type annotation would be like this:
> ```py
> from homeassistant.helpers.typing import ConfigType
>
> async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
>     """Set up the integration."""
> ```


### Backwards compatibility

Until Home Assistant Core 2025.11, it's possible to import from `homeassistant.core`, and doing so will log a warning asking users to open an issue on the custom integration's bug tracker.
