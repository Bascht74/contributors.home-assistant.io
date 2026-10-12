---
title: "Integration quality scale"
description: "Tiers that integrations earn by following rules for code quality and user experience: Bronze, Silver, Gold, and Platinum."
sidebarGroup: "Core and integrations"
term:
  aliases:
    - "quality scale"
    - "IQS"
    - "Bronze"
    - "Silver"
    - "Gold"
    - "Platinum"
  code:
    - "quality_scale.yaml"
    - "\"quality_scale\" in manifest.json"
  related:
    - "integration"
    - "integration-owner"
  autolink:
    - "integration quality scale"
    - "quality scale"
---

Every tier adds rules, from a config flow and tests for Bronze, to translated errors and repair issues for Gold, to fully typed, efficient code for Platinum. An integration tracks which rules it follows in its `quality_scale.yaml`.

New integrations need to reach Bronze.
