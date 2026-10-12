---
title: HomeAssistant.__init__ requires passing a string to it
description: The signature of HomeAssistant.init has been changed from no arguments to require the configuration directory as a string to be passed to it.
date: 2023-08-29
authors:
  - Erik Montnémery
areas:
  - core
---

The signature of `HomeAssistant.__init__` has been changed from no arguments to require the configuration directory as a string to be passed to it. Scripts, tests etc. outside of the HomeAssistant core repo which create `HomeAssistant` objects will need to be updated.

The change was introduced in [core PR#98442](https://github.com/home-assistant/core/pull/98442)

If backwards compatibility is important, this is a way to achieve it:

```python
    try:
        hass = HomeAssistant()  # pylint: disable=no-value-for-parameter
    except TypeError:
        hass = HomeAssistant(config_dir)  # pylint: disable=too-many-function-args
```
