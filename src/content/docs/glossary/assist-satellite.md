---
title: "Assist satellite"
description: "A device that listens for voice commands and sends them to Home Assistant, like Home Assistant Voice Preview Edition."
sidebarGroup: "Voice"
term:
  aliases:
    - "voice satellite"
    - "satellite"
    - "satellites"
  code:
    - "assist_satellite"
    - "AssistSatelliteEntity"
  related:
    - "assist"
    - "assist-pipeline"
    - "wake-word"
  autolink:
    - "Assist satellite"
    - "Assist satellites"
    - "voice satellite"
    - "voice satellites"
---

A satellite does not understand commands itself. It listens, often for a [wake word](/glossary/wake-word/), streams the audio to Home Assistant, and plays the answer. Each satellite uses one [Assist pipeline](/glossary/assist-pipeline/), and knows the area it is in, so "turn on the lights" works in the room you are in.

In Core, a satellite is an entity of the `assist_satellite` type. See [Assist satellite entity](/core/entities/assist-satellite/).
