---
title: Image entity
description: Show a still image that changes now and then, like a map, a snapshot, or a QR code.
sidebarLabel: Image
sidebarGroup: Media
---

An image entity serves a single still image. Think of a vacuum map, the last snapshot of a doorbell, or a QR code for a guest network. It is a much simpler sibling of the [camera entity](/core/entities/camera/): there is no stream, no recording, and no on or off. When the picture changes, the entity says so, and the frontend fetches the new one.

Inherit from `ImageEntity`, imported from `homeassistant.components.image`. Use it when your device or service has an image that updates every now and then. If it shows live video, or you need to grab frames on demand, use a camera entity instead.

You give the image in one of two ways:

- **A URL**: set `image_url`, and Home Assistant downloads the image, detects its content type, and caches it.
- **Bytes**: implement `async_image` (or `image`) and return the image data yourself.

## Properties

These properties are specific to image entities. The generic properties every entity has are on [the entity class](/core/entities/entity-class/).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `content_type` | `str` | `"image/jpeg"` | The MIME type of the image. Set automatically when the image comes from `image_url`. |
| `image_last_updated` | `datetime \| None` | `None` | When the image last changed. This is the state of the entity, and the frontend refetches the image when it changes. |
| `image_url` | `str \| None` | `UNDEFINED` | A URL to download the image from. Leave it unset if you return bytes from `async_image` instead. |

Image entities do not poll by default (`should_poll` is `False`), because you tell Home Assistant about a new image by changing `image_last_updated`.

> [!IMPORTANT]
> The constructor of `ImageEntity` takes `hass` (and an optional `verify_ssl`, `False` by default). It sets up the HTTP client used for `image_url` and the access tokens. Call `super().__init__(hass)` in your own `__init__`.

## Supported features

Image entities have no supported features.

## Fetching and caching

Home Assistant calls `async_image` whenever someone asks for the image. The frontend asks when a page with the entity loads, and again each time the state changes. The `image.snapshot` action asks too. While a client watches the MJPEG stream at `/api/image_proxy_stream/<entity_id>`, Home Assistant sends a frame on every state change, including the token rotation every five minutes, and at least every 55 seconds. You don't control when `async_image` runs, so keep it cheap.

That means the order matters. When a new image is available (from a coordinator update, a push message, or a timer), you update `image_last_updated` and write the state. The frontend sees the new state and fetches the image. Do not bump `image_last_updated` from inside `async_image`: that would trigger a new fetch on every fetch.

When you use `image_url`, the downloaded image is cached in `self._cached_image`. Set it to `None` when the URL or the image behind it changes, so the next fetch downloads it again.

The entity picture of an image entity points to `/api/image_proxy/<entity_id>` with a short-lived access token. Home Assistant rotates those tokens every five minutes, so you never have to deal with them yourself.

## Methods

### Return the image

Implement one of these when you return bytes instead of setting `image_url`. Return `None` when there is no image.

```python
class MyImage(ImageEntity):
    def image(self) -> bytes | None:
        """Return bytes of the image."""

    async def async_image(self) -> bytes | None:
        """Return bytes of the image."""
```

If you fetch the image from a remote source, cache it and only fetch again after `image_last_updated` changed.

## States

The state is `image_last_updated` as an ISO 8601 timestamp, like `2026-10-10T08:15:00+00:00`. When `image_last_updated` is `None`, the state is `unknown`. You cannot set the state directly: it is final in the base class.

The entity also has an `access_token` attribute, which is excluded from the [recorder](/glossary/recorder/), just like `entity_picture`.

## Example

An image entity for the map of a robot vacuum, refreshed from a [coordinator](/glossary/coordinator/).

```python
from homeassistant.components.image import ImageEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .coordinator import MyCoordinator


class MyMapImage(CoordinatorEntity[MyCoordinator], ImageEntity):
    """The cleaning map of a vacuum."""

    _attr_has_entity_name = True
    _attr_translation_key = "map"
    _attr_content_type = "image/png"

    def __init__(
        self, hass: HomeAssistant, coordinator: MyCoordinator
    ) -> None:
        """Initialize the map image."""
        CoordinatorEntity.__init__(self, coordinator)
        ImageEntity.__init__(self, hass)
        self._attr_unique_id = f"{coordinator.serial}_map"
        self._attr_image_last_updated = dt_util.utcnow()

    @callback
    def _handle_coordinator_update(self) -> None:
        """Mark the image as changed, the frontend fetches it again."""
        self._attr_image_last_updated = dt_util.utcnow()
        super()._handle_coordinator_update()

    async def async_image(self) -> bytes | None:
        """Return the map as PNG bytes."""
        return self.coordinator.data.map_png
```
