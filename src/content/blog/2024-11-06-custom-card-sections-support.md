---
title: Sizing support for custom cards in sections view
description: With Home Assistant 2024.11, "sections" view is now the default view when building a dashboard.
date: 2024-11-06
authors:
  - Paul Bottein
areas:
  - frontend
---

With Home Assistant `2024.11`, "sections" view is now the default view when building a dashboard. One of the new feature of this view type is resizing cards.

While the resizing feature is supported by default for every card, a new method can be implemented for custom cards to provide the best default size as well as minimum and maximum sizes to ensure the card looks good in all situations.

The sections are using a 12 columns grid. In this example, the card will take 6 columns and 2 rows by default and the minimal size is 2 by 2.

```js
public getGridOptions() {
  return {
    rows: 2,
    columns: 6,
    min_rows: 2,
    min_columns: 3,
  };
}
```

For more details, see the [custom card sizing](/frontend/custom-ui/card/#sizing-in-the-sections-view) documentation.
