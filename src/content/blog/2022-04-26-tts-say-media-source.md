---
title: Text-to-speech say service to use media source IDs
description: Starting with Home Assistant 2022.5, the TTS say service will set the media content ID to be a media source URI.
date: 2022-04-26
authors:
  - Paulus Schoutsen
areas:
  - core
---

Starting with Home Assistant 2022.5, the TTS say service will set the media content ID to be a media source URI. These need to be resolved inside the media player using the media source integration.

Previously the TTS integration would set the media content ID to a URL that pointed at Home Assistant and it required no extra work from the media players.

Media players need to support the media source integration as [documented here](/core/entities/media-player/#browsing-media).
