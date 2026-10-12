---
title: Home Assistant Link
description: How Home Assistant Link makes a home reachable from anywhere, and connects it to voice assistants, without opening it to the internet.
order: 7
---

Home Assistant Link is a subscription from [Nabu Casa](/glossary/nabu-casa/). It adds what is hard to do from inside a home: being reachable from anywhere, working with Amazon Alexa and Google Assistant, and speech services for voice. It was called Home Assistant Cloud until [October 2026](https://www.home-assistant.io/blog/2026/10/02/big-tech-ruined-the-cloud-so-were-renaming-ours/). In the code, it is still the `cloud` integration.

It is always optional. Everything it does can be done without it, with more work.

## In short

- The `cloud` integration in Core connects to Nabu Casa, with the hass-nabucasa library.
- **Remote access** goes through an encrypted tunnel that Home Assistant opens itself. No port is opened in the home.
- **Alexa and Google Assistant** send their commands through the cloud to Home Assistant.
- **Cloudhooks** give [webhooks](/architecture/connections/) a public URL, so the companion apps work away from home.
- Speech-to-text and text-to-speech for [voice](/architecture/platform/voice/), and backups off-site.

## Remote access, without opening the door

Normally, reaching Home Assistant from outside means opening a port on the router, and managing certificates. Home Assistant Link turns that around: Home Assistant connects out to the cloud, and keeps that connection open. Requests from outside come back through it.

The connection is encrypted from the user's browser all the way to Home Assistant, with a certificate that belongs to the home. The cloud passes the traffic along, but can't read it.

## Voice assistants

Amazon Alexa and Google Assistant need a service on the internet to talk to. The cloud is that service: it receives their commands, and passes them to the `alexa` and `google_assistant` integrations in Home Assistant, over the same connection. Users choose which entities are exposed to them.

## In the code

| What | Where |
| --- | --- |
| Core's side | [`homeassistant/components/cloud/`](https://github.com/home-assistant/core/tree/dev/homeassistant/components/cloud) |
| The library | [hass-nabucasa](https://pypi.org/project/hass-nabucasa/) |

## Work on this

- The `cloud` integration is part of Core: start with [your first contribution to Core](/core/first-contribution/).
- The cloud makes webhooks reachable from outside, see [how the pieces talk](/architecture/connections/).
