---
title: Changes to the icon translations schema
description: The icon translations schema has been adjusted to allow assigning icons for sections in services.
date: 2024-08-27
authors:
  - Erik Montnémery
areas:
  - core
---

The icon translations schema has been adjusted to allow assigning icons for [sections in services](/core/integrations/actions/).
Icons for services should now be provided according to a more explicit schema, which allows specifying icons for sections.

This allows specifying service icons like this:
```json
  "services": {
    "test_service_1": {
      "service": "mdi:flask",
      "sections": {
        "section_1": "mdi:test-tube"
      }
    }
  }
```

The old format is supported during a deprecation period of one year, to give time for custom integrations to migrate to the new schema:
```json
  "services": {
    "test_service_1": "mdi:flask"
  }
```

See [core PR #124656](https://github.com/home-assistant/core/pull/124656) for implementation details.

### Impact on custom cards

Icons data sent to the frontend will always be according to the new format, custom cards displaying service icons need to be adjusted.
