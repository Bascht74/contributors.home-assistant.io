---
title: How voice works
description: "How a spoken sentence becomes an action: wake word, speech-to-text, a conversation agent, and text-to-speech, and where each runs."
order: 8
sidebarLabel: Voice
---

[Assist](/glossary/assist/) is the voice assistant of Home Assistant. You say "turn on the kitchen lights", and the lights turn on. Behind that sentence is a chain of steps, and each step can run somewhere else: on the device you speak to, on your Home Assistant, or in the cloud.

## In short

- An [Assist pipeline](/glossary/assist-pipeline/) runs four steps: wake word, speech-to-text, the conversation agent, and text-to-speech.
- Each step is a separate engine, and users pick one per step: local, from an integration, or from Home Assistant Link.
- The conversation agent turns the text into an action. The built-in one matches sentences to [intents](/glossary/intent/). AI agents use a large language model.
- Voice satellites, like Home Assistant Voice Preview Edition, are the microphones and speakers around the house.

## The pipeline

| Step | Turns | Into | Engines |
| --- | --- | --- | --- |
| Wake word | Sound | "Someone said the wake word" | On the satellite, or in Home Assistant |
| Speech-to-text | Sound | Text | Local, like Whisper or Speech-to-Phrase, or in the cloud |
| Conversation agent | Text | An action and an answer | The built-in agent, or an AI agent |
| Text-to-speech | The answer | Sound | Local, like Piper, or in the cloud |

Users set up pipelines in **Settings** > **Voice assistants**, and each satellite uses one. Typing in the Assist dialog runs the same pipeline, from the conversation agent on.

## Conversation agents

The **built-in agent** works fully locally. It matches the sentence against templates, with the hassil library, using the sentences per language from the [intents repository](https://github.com/OHF-Voice/intents) of the [Open Home Foundation](/glossary/open-home-foundation/). A match gives an intent, like `HassTurnOn` with the area kitchen and the domain light, and Home Assistant handles it.

**AI agents** come from integrations that connect to a large language model. Home Assistant gives the model tools, through its LLM API, to see and control the entities the user exposed to Assist. Users can let the built-in agent try first, and only go to the AI when it doesn't understand.

## Satellites

A satellite is a device with a microphone and a speaker. It listens for the wake word, streams the audio to Home Assistant, and plays the answer. ESPHome devices, like Home Assistant Voice Preview Edition, and devices that speak the Wyoming protocol can be satellites. Each satellite is an `assist_satellite` entity.

## Go deeper

- [Assist pipelines](/core/internals/assist-pipelines/): run a pipeline, its events, and how audio is sent
- [Intents](/core/internals/intents/) and the [built-in intents](/core/internals/built-in-intents/): how a sentence becomes an action
- [The conversation API](/core/internals/conversation-api/) and the [LLM API](/core/internals/llm-api/): for agents and AI integrations
- The entities behind each step: [wake word](/core/entities/wake-word/), [speech-to-text](/core/entities/stt/), [conversation](/core/entities/conversation/), [text-to-speech](/core/entities/tts/), and [Assist satellite](/core/entities/assist-satellite/)
- [Voice translations](/translate/voice/): the sentences Assist understands, per language

## Work on this

- Speak a language Assist doesn't understand well yet? [Voice translations](/translate/voice/) is the place to start, no programming needed.
- Building a speech engine, an AI agent, or a satellite? Start with [your first contribution to Core](/core/first-contribution/), then the pages under Go deeper.
