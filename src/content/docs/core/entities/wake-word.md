---
title: Wake word detection entity
description: Build a wake word entity that listens to a stream of audio and reports when someone says the wake word.
sidebarLabel: Wake word detection
sidebarGroup: Voice and AI
---

A wake word detection entity listens to a stream of audio and tells Home Assistant when it hears a wake word (also called a hotword), like "Okay Nabu". It is the first step of an [Assist pipeline](/glossary/assist-pipeline/) that runs wake word detection in Home Assistant instead of on the device. Inherit from `WakeWordDetectionEntity` in `homeassistant.components.wake_word`. The domain is `wake_word`.

Many voice satellites detect the wake word on the device itself. They don't need this entity: it is for engines that run on the Home Assistant side, like openWakeWord through the Wyoming integration.

## Properties

Wake word detection entities have no properties of their own. The [generic entity properties](/core/entities/entity-class/) apply. The base class sets `entity_category` to `EntityCategory.DIAGNOSTIC` and turns off polling.

## Supported features

Wake word detection entities have no supported features.

## Audio

The audio stream is an async iterable of `(audio_chunk, timestamp)` tuples:

- `audio_chunk`: 16-bit signed mono PCM samples at 16 kHz.
- `timestamp`: the number of milliseconds since the start of the stream.

In a pipeline, wake word detection and speech-to-text share one audio stream. A chunk your entity consumes is gone for speech-to-text, unless you hand it back. If your engine buffers audio, return the buffered chunks in `queued_audio` of the result, so the start of the voice command is not lost.

## Methods

### Get supported wake words

Implement `get_supported_wake_words` to return the wake words the entity can detect. It is async, despite the name.

```python
async def get_supported_wake_words(self) -> list[WakeWord]:
    """Return a list of supported wake words."""
```

A `WakeWord` has an `id` (unique within the entity), a `name` for the UI, and an optional `phrase`, the words people actually say. The frontend fetches this list through the `wake_word/info` WebSocket command, which gives up after 10 seconds, so keep it fast.

### Process an audio stream

Implement `_async_process_audio_stream`. Note the leading underscore: the public `async_process_audio_stream` wraps it and updates the state.

```python
async def _async_process_audio_stream(
    self,
    stream: AsyncIterable[tuple[bytes, int]],
    wake_word_id: str | None,
) -> DetectionResult | None:
    """Try to detect a wake word in an audio stream."""
```

`wake_word_id` is the wake word to listen for, or `None` to listen for any of them. Return `None` when the stream ends without a detection. When you hear a wake word, return a `DetectionResult`:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `wake_word_id` | `str` | The ID of the detected wake word. |
| `wake_word_phrase` | `str` | The phrase of the detected wake word. |
| `timestamp` | `int \| None` | The timestamp of the chunk in which you detected it. |
| `queued_audio` | `list[tuple[bytes, int]] \| None` | Chunks you consumed that speech-to-text still needs. |

## States

The state is the timestamp of the last detection, or `unknown` before the first one. Home Assistant sets and restores it; the `state` property is final.

## Example

```python
from collections.abc import AsyncIterable

from homeassistant.components import wake_word


class MyWakeWord(wake_word.WakeWordDetectionEntity):
    """Wake word detection with a local engine."""

    _attr_has_entity_name = True
    _attr_name = None

    def __init__(self, entry: MyConfigEntry) -> None:
        """Set up the entity."""
        self.engine = entry.runtime_data
        self._attr_unique_id = f"{entry.entry_id}_wake_word"

    async def get_supported_wake_words(self) -> list[wake_word.WakeWord]:
        """Return the wake words of the engine."""
        return [wake_word.WakeWord(id="okay_nabu", name="Okay Nabu")]

    async def _async_process_audio_stream(
        self,
        stream: AsyncIterable[tuple[bytes, int]],
        wake_word_id: str | None,
    ) -> wake_word.DetectionResult | None:
        """Feed audio to the engine until it hears the wake word."""
        async for chunk, timestamp in stream:
            if self.engine.process(chunk):
                return wake_word.DetectionResult(
                    wake_word_id="okay_nabu",
                    wake_word_phrase="okay nabu",
                    timestamp=timestamp,
                )

        return None
```
