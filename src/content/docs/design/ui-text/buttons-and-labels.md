---
title: Buttons and labels
description: The words on buttons, in dialog titles, and next to fields. Short, in sentence case, and saying what happens.
order: 1
---

Buttons, titles, and labels are the text people read most. Often they are the only text people read. Get these right, and the rest of the screen needs less explaining.

## Buttons

- **Say what happens.** The label is the action: **Save**, **Delete**, **Enable**, **Restart**. A confirmation button that says **Delete** needs no explanation. One that says **OK** makes people read the whole dialog to find out.
- **Keep it short.** Like the examples above: one clear verb, sometimes with the thing it acts on.
- **Use sentence case.** **Create new automation**, not **Create New Automation**.
- **Match the action.** **Delete** for something that is gone for good, **Remove** for something that can come back. See [Remove, delete, add, or create](/design/ui-text/remove-delete/).
- **Keep the label on small buttons.** On the smallest button size, the label carries the meaning. Skip the icon there, unless it is a common one that people recognize by its shape alone, like close, add, or settings.

The [button](/design/components/button/) page covers which kind of button to use.

## Icon buttons

A button with only an icon still needs a label. It is the name screen readers announce, and the tooltip people see on hover. Write it like any other button label: **Close**, **Edit**, **Menu**.

## Dialog titles

- Always give a dialog a title. People mainly read the title and the buttons, so put the most important information in those two.
- For a confirmation, ask the question: **Delete dashboard?**
- Avoid content that people entered, like a name, in the title. A long name can make the title unreadable. Put it in the description instead.

## Field labels and helper text

- Every field has a label that says what goes in it: **Name**, **Host**, **Scan interval**.
- Don't use a placeholder as the label. It disappears as soon as people type.
- When a field needs explaining, add helper text below it.

## Accessibility

What people see and what a screen reader says should match. When a button shows text, its accessible name contains that same text, so people who use voice control can say what they see. See [Accessibility](/design/foundations/accessibility/#labels-and-accessible-names).
