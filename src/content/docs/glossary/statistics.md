---
title: "Long-term statistics"
description: "Hourly summaries of sensor values, like the mean, minimum, and maximum, or a running total, that the recorder keeps for good, for graphs over long periods and the energy dashboard."
sidebarGroup: "Data"
term:
  aliases:
    - "statistics"
    - "LTS"
  code:
    - "statistics"
    - "state_class"
  related:
    - "recorder"
    - "state-class"
  autolink:
    - "long-term statistics"
---

Home Assistant keeps statistics for every sensor with a [state class](/glossary/state-class/). Unlike the history, they are not cleaned up after ten days. Five-minute summaries are kept too, but only as long as the history.
