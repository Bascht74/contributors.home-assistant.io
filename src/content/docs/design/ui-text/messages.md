---
title: Messages
description: How to word errors, warnings, empty states, confirmations, and success messages, so people know what happened and what to do next.
order: 2
---

A message interrupts what someone was doing, even if only for a second. Make that second count: say what happened, and what people can do about it.

Which component shows the message is a separate choice. See [Errors and messages](/design/patterns/errors/) for that.

## Errors

An error is the moment the [personality](/brand/personality/) of Home Assistant matters most. Be welcoming and candid: explain what went wrong in plain words, and help people fix it.

- **Say what happened**, in words people understand without knowing the code.
- **Say what to do next**, when there is something people can do.
- **Be specific.** Use the name of the device or the field that has the problem.
- **Put it where the problem is.** An error about one field goes at that field, not at the top of the form.

### Repairs

A repair asks people to fix something in their setup, so it needs more than one line. A good repair:

- Explains what is happening, and why it matters.
- Gives the exact steps to fix it, as a numbered list when there are several. Not just "update the firmware", but how.
- Says what to expect after the steps.
- Includes the details people need, like the name of the device.

Only raise a repair for a problem people can solve.

## Warnings

A warning is about something that works now, but may stop working later. Say what can happen, and what people can do about it.

## Empty states

An empty state has a short heading and, when it helps, a description that points to the next step. Two kinds need different words:

- **Nothing yet**: the history panel says **Nothing to show yet**, and "Select areas, devices, entities or labels to see their history".
- **No results**: it says **No results found**, and "No history for the current selection. Try changing the targets, filters, or time range."

See [Empty states](/design/patterns/empty-states/) for the pattern.

## Confirmations

A confirmation dialog asks before something happens that can't be undone. People mostly read the title and the buttons, so those carry the message:

- The title asks the question: **Delete dashboard?**
- The description says what will happen, plainly: "Dashboard Kitchen will be permanently deleted from Home Assistant."
- The button repeats the action: **Delete**, next to **Cancel**.

When people are about to lose unsaved work, say so, and give the choice. The automation editor asks **Save changes?**: "You have made some changes in this automation. You can save these changes, or discard them and leave. You can't undo this action."

See [Confirmations and undo](/design/patterns/confirmations/) for the pattern.

## Success

Confirm that something worked when people can't see it otherwise. Keep it short: **Successfully saved**, **Successfully deleted**. If the action can be reverted, offer **Undo** with it.

## Related

- [Buttons and labels](/design/ui-text/buttons-and-labels/)
- [Remove, delete, add, or create](/design/ui-text/remove-delete/)
- [Make your strings translatable](/translate/guides/developers/)
