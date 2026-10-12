---
title: Repositories
description: Where the code of Home Assistant lives on GitHub, and which repository to go to for what.
order: 5
---

Home Assistant is spread over many repositories, most of them in the [home-assistant](https://github.com/home-assistant) organization on GitHub. You'll work in one or two of them. This page tells you which.

## The main ones

| Repository | Holds | Language |
| --- | --- | --- |
| [core](https://github.com/home-assistant/core) | Home Assistant Core and every built-in integration | Python |
| [frontend](https://github.com/home-assistant/frontend) | The web interface, the component gallery, and the demo | TypeScript |
| [android](https://github.com/home-assistant/android) | The Android app, for phones, Wear OS, and cars | Kotlin |
| [iOS](https://github.com/home-assistant/iOS) | The app for iPhone, iPad, Mac, Apple Watch, and CarPlay | Swift |
| [supervisor](https://github.com/home-assistant/supervisor) | The Supervisor | Python |
| [operating-system](https://github.com/home-assistant/operating-system) | Home Assistant OS | Buildroot, shell |

## Documentation and design

| Repository | Holds |
| --- | --- |
| [home-assistant.io](https://github.com/home-assistant/home-assistant.io) | The user documentation, including a page per integration |
| [companion.home-assistant](https://github.com/home-assistant/companion.home-assistant) | The documentation of the companion apps |
| [brands](https://github.com/home-assistant/brands) | Logos and icons of integrations |
| [architecture](https://github.com/home-assistant/architecture) | Architecture discussions and decisions, see [how decisions are made](/architecture/decisions/) |

## Around the Supervisor

| Repository | Holds |
| --- | --- |
| [addons](https://github.com/home-assistant/addons) | The official apps |
| [apps-example](https://github.com/home-assistant/apps-example) | An example to start an app from |
| [cli](https://github.com/home-assistant/cli) | The `ha` command line |
| [os-agent](https://github.com/home-assistant/os-agent) | The helper on the host of Home Assistant OS |
| [docker-base](https://github.com/home-assistant/docker-base) | The base images for Home Assistant and apps |
| `plugin-dns`, `plugin-audio`, `plugin-cli`, `plugin-multicast`, `plugin-observer` | The Supervisor's plugins |

## Libraries

| Repository | Holds |
| --- | --- |
| [home-assistant-js-websocket](https://github.com/home-assistant/home-assistant-js-websocket) | The JavaScript client for the WebSocket API |
| [home-assistant-libs](https://github.com/home-assistant-libs) | An organization with Python libraries maintained by the project, like the Supervisor client |
| [OHF-Voice](https://github.com/OHF-Voice) | Voice projects of the Open Home Foundation, like the sentences Assist understands |

## Where to go for what

| You want to | Go to |
| --- | --- |
| Fix a bug in an integration | core |
| Add a new integration | core, then home-assistant.io for its documentation, and brands for its logo |
| Change something in the UI | frontend, or core if it is text of an integration |
| Fix documentation | home-assistant.io |
| Report a bug | The repository of the part that has the bug. Not sure? Ask on [Discord](https://www.home-assistant.io/join-chat). |
| Suggest a feature | The [feature requests](https://github.com/home-assistant/feature-requests/discussions) discussions |

## Work on this

Every repository above belongs to an area of this site, which explains how to make your first change there. See [Ready to contribute?](/architecture/#ready-to-contribute) for the map.
