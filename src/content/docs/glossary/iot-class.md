---
title: "IoT class"
description: "How an integration gets its data: locally or from the cloud, and by polling or push. Set in the manifest."
sidebarGroup: "Core and integrations"
term:
  code:
    - "\"iot_class\" in manifest.json"
  related:
    - "manifest"
    - "polling"
  autolink:
    - "IoT class"
    - "IoT classes"
---

The IoT class tells users what to expect from an integration before they set it up, like whether it keeps working without internet. The most common ones are `local_push`, `local_polling`, `cloud_push`, and `cloud_polling`.
