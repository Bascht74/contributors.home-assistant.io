---
title: "Media Player updates: enqueue changes, announce added"
description: Starting with Home Assistant 2022.6, the media player integration has received two updates to the media_player.play_media service.
date: 2022-05-31
authors:
  - Paulus Schoutsen
areas:
  - core
---

Starting with Home Assistant 2022.6, the media player integration has received two updates to the `media_player.play_media` service. The `enqueue` attribute has been changed to a string in [PR #72406](https://github.com/home-assistant/core/pull/72406) and a new `announce` boolean attribute was added in [PR #72566](https://github.com/home-assistant/core/pull/72566).

See the updated [media player play_media documentation](/core/entities/media-player/#playing-media) for more information.
