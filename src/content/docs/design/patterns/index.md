---
title: Patterns
description: Recurring situations in the Home Assistant interface, like a form, a wait, an empty list, or an error, and how the frontend handles them.
order: 22
---

A component is one building block. A pattern is how several of them work together to handle a situation that comes back all over the interface: filling in a form, waiting for something, finding a list empty, or running into an error.

Home Assistant already has an answer for most of these situations. Using the same answer everywhere means people learn it once. Before you design a new way to show an error or a wait, check here.

Each pattern describes when it applies, how it works, which [components](/design/components/) it uses, and what to watch for in accessibility and text.

## The patterns

- [Forms and validation](/design/patterns/forms/): collecting input, helper text, required fields, and showing what is wrong.
- [Loading](/design/patterns/loading/): spinners, buttons that show progress, and skeletons.
- [Empty states](/design/patterns/empty-states/): what to show when there is nothing to show yet, or no results.
- [Errors and messages](/design/patterns/errors/): alerts, toasts, and repairs. Which one to pick, and how to word it.
- [Confirmations and undo](/design/patterns/confirmations/): asking before something can't be undone, offering undo when it can, and not losing unsaved changes.

## Related

- [Accessibility](/design/foundations/accessibility/): the requirements every pattern has to meet.
- [UI text](/design/ui-text/): the words that go into these patterns.
- Missing a pattern, or think one should change? Start a discussion in the **Design system** category of the [UX design discussions](https://github.com/OpenHomeFoundation/ux-design/discussions).
