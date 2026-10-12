---
title: Bluetooth updates for 2023.2 and later
description: Integrations that need to use a Bluetooth adapter should add bluetooth_adapters in dependencies in their manifest.json.
date: 2023-01-12
authors:
  - J. Nick Koston
areas:
  - core
---

Integrations that need to use a Bluetooth adapter should add `bluetooth_adapters` in [`dependencies`](/core/integrations/manifest/#dependencies) in their [`manifest.json`](/core/integrations/manifest/). The [`manifest.json`](/core/integrations/manifest/) entry ensures that all supported remote adapters are connected before the integration tries to use them. This replaces the need to add `bluetooth` in [`dependencies`](/core/integrations/manifest/#dependencies).

Integrations that provide a Bluetooth adapter should add `bluetooth` in [`dependencies`](/core/integrations/manifest/#dependencies) in their [`manifest.json`](/core/integrations/manifest/) and be added to [`after_dependencies`](/core/integrations/manifest/#after_dependencies) to the `bluetooth_adapters` integration.

Be sure to check out [Best practices for integration authors](/core/integrations/bluetooth/) when building new Bluetooth integrations.
