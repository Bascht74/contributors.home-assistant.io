---
title: Media source
description: Expose browsable, searchable, and playable media from your integration in the media browser of Home Assistant.
sidebarGroup: Integration features
order: 10
---

A media source makes media of your integration available in the media browser of Home Assistant: recordings of a camera, a music library, radio stations, or generated speech. Users browse it like folders, and play items on any media player that supports them.

## Add a media source

Create `media_source.py`. Nothing changes in the manifest: Home Assistant finds the file by itself. It must have an `async_get_media_source` function that returns your media source:

```python
from homeassistant.components.media_player import BrowseError, MediaClass
from homeassistant.components.media_source import (
    BrowseMediaSource,
    MediaSource,
    MediaSourceItem,
    PlayMedia,
    Unresolvable,
)
from homeassistant.core import HomeAssistant


async def async_get_media_source(hass: HomeAssistant) -> ExampleMediaSource:
    """Set up the Example media source."""
    return ExampleMediaSource(hass)


class ExampleMediaSource(MediaSource):
    """Provide the recordings of Example cameras."""

    name = "Example"

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the media source."""
        super().__init__(DOMAIN)
        self.hass = hass

    async def async_browse_media(
        self, item: MediaSourceItem
    ) -> BrowseMediaSource:
        """Return the media at a location."""

    async def async_resolve_media(self, item: MediaSourceItem) -> PlayMedia:
        """Return a playable URL for an item."""
```

| Method | What it does |
| --- | --- |
| `async_browse_media(item)` | Returns the `BrowseMediaSource` at a location. Raise `BrowseError` when that fails. |
| `async_resolve_media(item)` | Turns an item into a `PlayMedia` with a URL that can be played. Raise `Unresolvable` when that fails. |
| `async_search_media(item, query)` | Optional. Searches your media. See [search](#search). |

`name` is what users see. Without it, the domain is used.

## Identifiers

Every item has a URI like `media-source://<domain>/<identifier>`. You decide what the identifier looks like. For a hierarchy, a path with `/` works well, like `albums/1234`. Your methods get it as `item.identifier`. It is empty for the root of your media source.

Build and check these URIs with `generate_media_source_id(DOMAIN, "albums/1234")` and `is_media_source_id(value)` from `homeassistant.components.media_source`.

## Browse

Return the item at the location, with its children:

```python
async def async_browse_media(
    self, item: MediaSourceItem
) -> BrowseMediaSource:
    """Return the media at a location."""
    if item.identifier:
        return await self._async_browse_camera(item.identifier)

    return BrowseMediaSource(
        domain=DOMAIN,
        identifier=None,
        media_class=MediaClass.APP,
        media_content_type="",
        title="Example",
        can_play=False,
        can_expand=True,
        children_media_class=MediaClass.DIRECTORY,
        children=[
            BrowseMediaSource(
                domain=DOMAIN,
                identifier=camera.id,
                media_class=MediaClass.DIRECTORY,
                media_content_type="",
                title=camera.name,
                can_play=False,
                can_expand=True,
            )
            for camera in self._cameras
        ],
    )
```

| Field | What it is |
| --- | --- |
| `domain` | Your domain |
| `identifier` | The identifier of the item. `None` for the root. |
| `media_class` | What the item is, like `MediaClass.DIRECTORY`, `MediaClass.MUSIC`, `MediaClass.VIDEO`, or `MediaClass.IMAGE` |
| `media_content_type` | The MIME type or media type of the content, like `"audio/mpeg"` |
| `title` | The name users see |
| `can_play` | Whether the item can be played |
| `can_expand` | Whether the item has children to browse |
| `can_search` | Whether users can search from this item. Defaults to `False`. |
| `search_media_classes` | The media classes users can filter on when they search here |
| `children` | The children. Only on the item that is browsed. |
| `children_media_class` | The media class of the children. Calculated if you leave it out. |
| `thumbnail` | The URL of a thumbnail |
| `not_shown` | The number of children that are left out. Defaults to `0`. |

## Resolve

When a user plays an item, return a URL and MIME type:

```python
async def async_resolve_media(self, item: MediaSourceItem) -> PlayMedia:
    """Return a playable URL for an item."""
    if (recording := self._recordings.get(item.identifier)) is None:
        raise Unresolvable(
            translation_domain=DOMAIN,
            translation_key="recording_not_found",
            translation_placeholders={"item": item.identifier},
        )

    return PlayMedia(recording.url, "video/mp4")
```

The URL can be absolute, or a relative path that Home Assistant serves. `item.target_media_player` holds the entity ID of the media player that will play it, if you need to adapt the URL to it. Both `Unresolvable` and `BrowseError` support translated messages.

## Search

Searching is optional. Set `can_search=True` on the items users can search from, like the root or certain folders, and implement `async_search_media`:

```python
from homeassistant.components.media_player import (
    SearchMedia,
    SearchMediaQuery,
)


async def async_search_media(
    self, item: MediaSourceItem, query: SearchMediaQuery
) -> SearchMedia:
    """Search the media."""
    tracks = await self._client.search(query.search_query)

    return SearchMedia(
        result=[
            BrowseMediaSource(
                domain=DOMAIN,
                identifier=track.id,
                media_class=MediaClass.TRACK,
                media_content_type=track.mime_type,
                title=track.title,
                can_play=True,
                can_expand=False,
            )
            for track in tracks
            if not query.media_filter_classes
            or MediaClass.TRACK in query.media_filter_classes
        ]
    )
```

`item` tells you where the search started, so you can limit the results to that part of your media. The query has `search_query` (what the user typed), and optionally `media_content_type`, `media_content_id`, and `media_filter_classes`.

To let users filter, set `search_media_classes` on the searchable item, like `[MediaClass.ALBUM, MediaClass.ARTIST, MediaClass.TRACK]`. The classes the user picks arrive in `media_filter_classes`. Only return items of those classes.

## Use media sources from another integration

A media player integration can browse, search, and resolve media sources too:

```python
from homeassistant.components.media_source import (
    async_browse_media,
    async_resolve_media,
)

result = await async_browse_media(hass, "media-source://example")
play_media = await async_resolve_media(
    hass,
    "media-source://example/recording_123",
    target_media_player="media_player.living_room",
)
```

`async_search_media(hass, media_content_id, query)` searches the same way.
