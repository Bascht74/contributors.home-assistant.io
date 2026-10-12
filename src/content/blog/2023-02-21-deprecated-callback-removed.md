---
title: Deprecated callback signatures for MQTT subscribe removed
description: Home Assistant's MQTT integration no longer supports deprecated callback signatures for MQTT subscribe.
date: 2023-02-21
authors:
  - Jan Bouwhuis
areas:
  - core
---

Home Assistant's MQTT integration [no longer supports](https://github.com/home-assistant/core/pull/88543)
deprecated callback signatures for MQTT subscribe.

Custome integrations that still used the deprecated callback signature for the callback function on MQTT subscribe will break unless updated. An exception will be raised if a not supported callback type is detected.

Examples of deprecated callback functions that will no longer work:

```python
async def async_deprecated_callback1(topic: str, payload: ReceivePayloadType, qos: int) -> None:
    """Deprecated async callback example 1."""
    ...


@callback
def async_deprecated_callback2(topic: str, payload: ReceivePayloadType, qos: int) -> None:
    """Deprecated async callback example 2."""
    ...
```

Example of a correct callback signature:

```python
@callback
def async_correct_callback(msg: ReceiveMessage) -> None:
    """Callback example 1."""
    ...
```
