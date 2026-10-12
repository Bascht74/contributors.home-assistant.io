---
title: Translating the state of entities
description: The method for integrations to provide translations for states of its entities under other integrations, for example to translate an integration's sensors has changed.
date: 2022-12-01
authors:
  - Erik Montnémery
areas:
  - core
---

The method for integrations to provide translations for states of its entities under other integrations, for example to translate an integration's sensors has changed.

Integrations should no longer use custom device classes together with a `strings.<platform name>.json` file. Instead, entities should set the `translation_key` property on an entity and include that `translation_key` in the integration's `strings.json`.

> [!WARNING]
> Pointing to translations via the `translation_key` property is currently only supported for entities with a `unique_id`.

The following example `strings.json` is for a Moon domain `sensor` entity with its `translation_key` property set to `phase`:

```json
{
  "entity": {
    "sensor": {
      "phase": {
        "state": {
          "new_moon": "New moon",
          "first_quarter": "First quarter",
          "full_moon": "Full moon",
          "last_quarter": "Last quarter"
        }
      }
    }
  }
}
```

For more details, see the [`translation`](/core/integrations/translations/#entities) and [`entity`](/core/entities/entity-class/) documentation.
