---
title: Logbook API removal of `entity_matches_only` flag
description: Before 2022.6, the entity_matches_only flag prevented the logbook from providing context data in exchange for performance improvement when querying specific entities.
date: 2022-05-24
authors:
  - J. Nick Koston
areas:
  - core
---

Before 2022.6, the `entity_matches_only` flag prevented the logbook from providing context data in exchange for performance improvement when querying specific entities. Selecting the context data for particular entities is no longer an intensive process with the new logbook design. No immediate action is required as the flag will be ignored, and removing the flag from any active code paths can be done at your leisure.