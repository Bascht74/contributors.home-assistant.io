---
title: Calendar best practices
description: Home Assistant has improved best practices for Calendar entities to ensure that calendar triggers/automations and the UI work correctly in all cases.
date: 2023-03-28
authors:
  - Allen Porter
areas:
  - core
---

Home Assistant has improved best practices for Calendar entities to ensure
that calendar triggers/automations and the UI work correctly in all cases.

In particular, there are now more documented expectations and enforcement of invariants including:
- A `CalendarEvent` property `end` is exclusive. e.g. An all day event that lasts one day should have an end date with 1 day after the start date.
- A `CalendarEvent` can accept a `datetime` in any timezone.  Floating dates without a timezone are not allowed.
- The `CalendarEvent` invariants are now enforced when created.
- Events returned by `async_get_events` are expected to be returned in order.
- All Day events returned by `async_get_events` must be evaluated in the Home Assistant local timezone. That is, an all day event should be ordered as if it starts at midnight in the local time.

The [Calendar Entity developer documentation](/core/entities/calendar/) has been updated with additional detail.
