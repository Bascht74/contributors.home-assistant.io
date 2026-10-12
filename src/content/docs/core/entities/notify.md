---
title: Notify entity
description: Build a notify entity that sends messages to a device or service, like a chat, an email address, or a display.
sidebarLabel: Notify
sidebarGroup: Inputs and helpers
---

A notify entity sends a message to a device or service: an SMS, an email, a chat message, or text on the display of a device. Once the message is sent, it is gone. Inherit from `NotifyEntity` in `homeassistant.components.notify`.

If the device has a text value that stays and that people can change, use a [text](/core/entities/text/) entity instead.

## Properties

A notify entity has no platform specific properties. The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/). A notify entity doesn't poll: `should_poll` is `False` by default.

## Supported features

| Constant | Description |
| --- | --- |
| `NotifyEntityFeature.TITLE` | The entity supports a title next to the message. |

Set the features with `_attr_supported_features`. The default is no features. When you implement the sync `send_message`, the base class only passes `title` to it when you set `TITLE`. See [supported features](/glossary/supported-features/).

## Methods

### Send message

Called when an automation or script calls the `notify.send_message` action. Implement one of the two.

```python
class MyNotifier(NotifyEntity):
    # Implement one of these methods.

    def send_message(self, message: str, title: str | None = None) -> None:
        """Send a message."""

    async def async_send_message(
        self, message: str, title: str | None = None
    ) -> None:
        """Send a message."""
```

### Record a notification

The base class records every message sent through `notify.send_message`. When your integration sends messages in other ways too, like through an action of its own with extra options, record those yourself: call `self._async_record_notification()`, or `self._record_notification()` from a thread outside the event loop. It updates the state and writes it.

Only record messages that Home Assistant sent. Messages that come in from outside, or that another system sent, don't belong on a notify entity: use an [event](/core/entities/event/) entity for those.

## States

The state of a notify entity is the timestamp of the last message sent from Home Assistant, as an ISO 8601 string in UTC. It is `unknown` until the first message. The base class records it after your send method returns, and restores it after a restart. You can't set it yourself: `state` is final.

## Example

```python
from homeassistant.components.notify import (
    NotifyEntity,
    NotifyEntityFeature,
)


class ExampleChatNotifier(NotifyEntity):
    """Send messages to a chat channel."""

    _attr_has_entity_name = True
    _attr_supported_features = NotifyEntityFeature.TITLE

    def __init__(self, client: ExampleClient, channel: str) -> None:
        """Initialize the notifier."""
        self._client = client
        self._channel = channel
        self._attr_name = channel
        self._attr_unique_id = f"{client.account_id}_{channel}"

    async def async_send_message(
        self, message: str, title: str | None = None
    ) -> None:
        """Send a message to the channel."""
        await self._client.post(self._channel, message, title=title)
```

The channel name comes from the chat service, so the example uses it as the name of the entity instead of a translation key. See [naming entities](/core/entities/naming/).
