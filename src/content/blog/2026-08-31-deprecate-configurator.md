---
title: Configurator integration is now deprecated
description: The Configurator integration has been deprecated and will be removed in Home Assistant 2027.10.
date: 2026-08-31
authors:
  - Martin Hjelmare
areas:
  - core
---

The Configurator integration has been deprecated and will be removed in Home Assistant 2027.10. The integration was originally created to provide a web-based configuration interface for Home Assistant, but it is no longer recommended for use. No core integrations use the Configurator integration anymore, and it is not recommended for custom integrations either.

The modern way to configure integrations in Home Assistant is via config flows and config entries. [Config flows](/core/integrations/config-flow/) provide a user-friendly interface for setting up and configuring integrations, while config entries allow for easy management of integration settings.
