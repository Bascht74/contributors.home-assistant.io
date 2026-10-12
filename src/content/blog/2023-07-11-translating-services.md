---
title: Translating services
description: We now support translating services in Home Assistant. Previously, the names & descriptions of services and their service fields have been hardcoded into the services.yaml files of each integration.
date: 2023-07-11
authors:
  - Franck Nijhof
areas:
  - core
---

We now support translating services in Home Assistant. Previously, the names & descriptions of services and their service fields have been hardcoded into the `services.yaml` files of each integration.

We have now added support for translating these names & descriptions using our translation system. This means that the names & descriptions of services and their service fields can now be translated into any language.

To achieve this, the `name` and `description` keys from each service and service field moves from the hardcoded `services.yaml` files to the translation files of each integration.

An updated example of a `services.yaml` service description can be [found in our documentation](/core/integrations/actions/#names-and-descriptions). The [backend localization](/core/integrations/translations/#actions) has been extended to have an example of a translated service, matching the example from the service description.

The services translation is available as of Home Assistant 2023.8. We hope this will make Home Assistant more accessible to non-English users.
