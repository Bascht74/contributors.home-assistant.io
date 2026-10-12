---
title: Searching in media players
description: Media players can now allow users to search through the media, by adding MediaEntityFeature.SEARCH_MEDIA and implementing async_search_media.
date: 2025-04-17
authors:
  - Josef Zweck
areas:
  - core
---

Media players can now allow users to search through the media, by adding `MediaEntityFeature.SEARCH_MEDIA` and implementing `async_search_media`. The users can filter the search result by a search query and a list of `MediaClasses` that the returned results should have. For more info, see [the updated documentation.](/core/entities/media-player/#searching-media)
