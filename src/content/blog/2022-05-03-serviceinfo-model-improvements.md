---
title: ServiceInfo model improvements and deprecations
description: As of Home Assistant Core 2022.6, access to discovery information via the, previously deprecated, dictionary methods have been removed.
date: 2022-05-03
authors:
  - epenet
areas:
  - core
---

As of Home Assistant Core 2022.6, access to discovery information via the, previously deprecated, dictionary methods have been removed.


This applies to the `DhcpServiceInfo`, `MqttServiceInfo`, `SsdpServiceInfo`, `UsbServiceInfo`, and `ZeroconfServiceInfo` instances.

Custom integrations are required to migrate to use the new dataclass properties.
