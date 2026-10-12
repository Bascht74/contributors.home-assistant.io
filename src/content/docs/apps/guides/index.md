---
title: App guides
description: How to do things with apps, task by task. From the container image to publishing your repository.
order: 10
sidebarLabel: Guides
---

Each guide covers one task. They build on [your first app](/apps/first-app/) and [build a real app](/apps/build-a-real-app/), so do those first if you have not yet.

## Build

- [Build the container image](/apps/guides/dockerfile/): base images, Bashio, build arguments, and labels.
- [Run services with S6 overlay](/apps/guides/s6-overlay/): oneshot and longrun services, dependencies, finish scripts, and the environment.
- [Add options](/apps/guides/options/): let users configure your app.
- [Access hardware and the host](/apps/guides/hardware/): serial ports, USB, GPIO, audio, and host namespaces.

## Connect

- [Talk to Home Assistant and the Supervisor](/apps/guides/communication/): the internal network and the APIs.
- [Add a web interface with ingress](/apps/guides/ingress/): show your app inside Home Assistant.
- [Share services and discover integrations](/apps/guides/services-discovery/): MQTT, MySQL, and discovery.

## Ship

- [Test your app](/apps/guides/testing/): on your computer and on a real device.
- [Secure your app](/apps/guides/security/): AppArmor, API roles, and authentication.
- [Present your app](/apps/guides/presentation/): what users see in the app store.
- [Publish your app](/apps/guides/publishing/): images, versions, and releases.
- [Create and share a repository](/apps/guides/repository/): where users find your apps.
