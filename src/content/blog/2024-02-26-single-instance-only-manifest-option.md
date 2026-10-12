---
title: New single instance only manifest option
description: In Home Assistant 2024.3, we introduced a new single_config_entry option for the integration manifest file.
date: 2024-02-26
authors:
  - Jan-Philipp Benecke
areas:
  - core
---

In Home Assistant 2024.3, we introduced a new `single_config_entry` option for the integration manifest file.
This option allows you to set that your integration supports only one config entry.

Home Assistant will take care and prevent the initialization of a config flow if there is already a config entry for the integration.
This way you won't have to implement any check in the config flow.

Integrations that have this option not set in their manifest and do the check in the config flow should replace it with the new option.