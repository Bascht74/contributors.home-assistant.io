---
title: Architecture
description: How everything fits together, and the decisions behind it.
---

Home Assistant runs millions of homes, on anything from a small Raspberry Pi to a server in a closet. Under the hood, it is a set of pieces that work together, built by thousands of people over more than a decade. This area explains how.

You don't need to understand all of it to contribute. Start with the big picture, and go deeper when your work takes you there. Every page starts with the short version, and goes into detail after, for those who want it.

## Start here

- [The big picture](/architecture/big-picture/): every piece on one page, and how they connect.
- [Principles](/architecture/principles/): the ideas behind how Home Assistant is built.
- [How architecture decisions are made](/architecture/decisions/): where architecture is discussed, and how to take part.
- [Repositories](/architecture/repositories/): where the code lives.

## Go deeper

- [Inside Home Assistant Core](/architecture/core/): from startup to entities, the Python application at the center.
- [How the pieces talk](/architecture/connections/): the APIs, and logging in.
- [The frontend](/architecture/frontend/): the web interface, and how dashboards work.
- [Around Core](/architecture/platform/): the Supervisor, Home Assistant OS, apps, the companion apps, the cloud, and voice.
- [How Home Assistant handles trust](/security/how-it-works/), in the Security area: who Home Assistant trusts, and where it can be attacked.

## Ready to contribute?

This area explains how things work. The work itself happens in the other areas of this site. Each one starts with a small first contribution:

| You want to work on | Go to | First step |
| --- | --- | --- |
| Home Assistant Core and integrations | [Core and integrations](/core/) | [Your first contribution to Core](/core/first-contribution/) |
| The web interface and dashboards | [Frontend](/frontend/) | [Your first frontend contribution](/frontend/first-contribution/) |
| How the interface looks, works, and reads | [Design](/design/) | [Your first design contribution](/design/first-contribution/) |
| The Android and Apple apps | [Companion apps](/companion/) | [Your first companion app contribution](/companion/first-contribution/) |
| The Supervisor and Home Assistant OS | [OS and Supervisor](/os/) | [Your first contribution to the Supervisor](/os/first-contribution/) |
| Software that runs next to Home Assistant | [Apps](/apps/) | [Your first app](/apps/first-app/) |
| The sentences Assist understands | [Voice translations](/translate/voice/) | [Contribute sentences and responses](/translate/voice/contributing/) |
| Home Assistant in your language | [Translations](/translate/) | [Your first translation](/translate/first-contribution/) |
| The user documentation | [Writing docs](/writing/) | [Your first docs fix](/writing/first-contribution/) |
| Keeping homes safe | [Security](/security/) | [Your first security contribution](/security/first-contribution/) |
| Testing and shipping releases | [Releases](/releases/) | [Your first beta test](/releases/first-contribution/) |

Not sure yet? [Your first contribution](/start/first-contribution/) in Get started helps you pick.

## Who this is for

Everyone who wants to know how Home Assistant works under the hood. The pages assume you know Home Assistant as a user. Where code comes in, it is Python for Core and TypeScript for the frontend, but the explanation around it doesn't need you to read it.

The code is the source of truth. Pages point to where the code they describe lives, so you can check, and read further. Every page ends with _Work on this_: where to go when you want to change what it describes.

## Who to talk to

- **Architecture discussions** happen in the [architecture repository](https://github.com/home-assistant/architecture/discussions).
- **Questions while you work** go to the **#developers** channel on [Discord](https://www.home-assistant.io/join-chat). Can't see it? Under **Channels & Roles**, choose **I want to contribute dev skills to Home Assistant**.
- Found something on these pages that is wrong or outdated? Use the edit link at the bottom of the page.
