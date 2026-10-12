---
title: "Wake word"
description: "The word or phrase that makes a voice assistant start listening, like \"Okay Nabu\"."
sidebarGroup: "Voice"
term:
  aliases:
    - "wake words"
    - "wake word detection"
  code:
    - "wake_word"
  ui: "Wake word"
  related:
    - "assist-pipeline"
    - "assist-satellite"
    - "assist"
  autolink:
    - "wake word"
    - "wake words"
---

Detecting the wake word is the first step of an [Assist pipeline](/glossary/assist-pipeline/). It happens in Home Assistant, with the `wake_word` integration and an engine like openWakeWord, or on the device itself, like with microWakeWord on an ESP32 or an Android phone. Only after the wake word does the rest of the command get processed.
