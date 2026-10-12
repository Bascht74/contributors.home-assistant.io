---
title: Second phase of notify entity platform implementation
description: Recently we added the notify entity platform. The new notify platform method implements service send_message.
date: 2024-05-03
authors:
  - Jan Bouwhuis
areas:
  - core
---

### Title option for send_message service notify entity platform

Recently we added the notify [entity platform](/core/entities/notify/). The new `notify` platform method implements service `send_message`. This service now also accepts an optional `title` as an argument. This allows some new integrations that can be migrated now to use the new entity platform:

- cisco_webex_teams
- file
- sendgrid
- syslog
- tibber

The [architecture discussion](https://github.com/home-assistant/architecture/discussions/1041) is still ongoing.

When integrations are migrated, users will need to use the new `notify.send_message` service, so the migration changes will cause automations to break after the deprecation period is over.
