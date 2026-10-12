---
title: Local OAuth2 Updates
description: As of Home Assistant Core 2022.5, integrations that register a config_entry_oauth2_flow.LocalOAuth2Implementation must have a manifest dependency on the auth component.
date: 2022-04-16
authors:
  - Allen Porter
areas:
  - core
---

As of Home Assistant Core 2022.5, integrations that register a `config_entry_oauth2_flow.LocalOAuth2Implementation` must have a [manifest dependency](/core/integrations/manifest/#dependencies-and-requirements) on the `auth` component.

This is motivated by a broader effort to improve OAuth [Application Credentials](https://github.com/home-assistant/architecture/discussions/692#discussioncomment-2121633) handling, which required changing how the HTTP endpoint for the OAuth callback is registered.