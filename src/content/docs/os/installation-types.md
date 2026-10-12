---
title: Installation types
description: Where Home Assistant OS and the Supervisor are used, where they are not, and what that means for your code.
order: 2
---

Home Assistant has two supported [installation types](/glossary/installation-type/). Only one of them has the operating system and the Supervisor.

| | Home Assistant OS | Home Assistant Container |
| --- | --- | --- |
| Operating system | Home Assistant OS | Whatever the user runs |
| Supervisor | Yes | No |
| Apps | Yes | No |
| Updates of the system | Through the Supervisor | Up to the user |

On Home Assistant Container, Home Assistant Core runs in a container the user manages. Nothing in this area runs there. The [Around Core](/architecture/platform/) page in the architecture area shows how the pieces fit together.

## No longer supported

Two other installation types were deprecated in May 2025, and support ended with Home Assistant 2025.12:

- **Home Assistant Supervised**: the Supervisor installed on a Linux system the user maintains.
- **Home Assistant Core**: Home Assistant installed as a Python package in a virtual environment.

The 32-bit architectures `i386`, `armhf`, and `armv7` were dropped at the same time. Home Assistant OS 17 removed the last 32-bit boards. The [announcement](https://www.home-assistant.io/blog/2025/05/22/deprecating-core-and-supervised-installation-methods-and-32-bit-systems/) explains why.

## What this means for the Supervisor

The Supervisor still starts outside Home Assistant OS, but it marks such a system as unsupported. The check is an evaluation in the [resolution center](/os/supervisor/resolution-center/): when the OS is not available, the system gets the `os` unsupported reason. Some features need Home Assistant OS outright. Those jobs use the `haos` job condition and refuse to run anywhere else.

So when you work on the Supervisor, assume Home Assistant OS. Code that only makes sense on another host is not something the project maintains anymore.
