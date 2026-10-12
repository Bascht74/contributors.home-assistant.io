---
title: Support context in update coordinator
description: Starting with Home Assistant 2022.7, the update coordinator supports keeping track of context for each listening entity.
date: 2022-06-02
authors:
  - Joakim Plate
areas:
  - core
---

Starting with Home Assistant 2022.7, the update coordinator supports keeping track of context for each listening entity. This can be used to limit the requests against APIs based on enabled entities.

This could be a breaking change for custom components that rely on update coordinators and inspect the internal variable `self._listeners` and/or overload the method async_remove_listener() to detect when there is no listeners anymore. Switch to using `async_update_listeners()` to trigger updates on all listeners, and overload `_unschedule_refresh()` to detect when there is no listeners.

See the updated [integration fetching documentation](/core/integrations/fetching-data/) for more information on current use.
