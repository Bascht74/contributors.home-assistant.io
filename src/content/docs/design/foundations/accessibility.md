---
title: Accessibility
description: How to design and build an interface everyone can use. The WCAG requirements that apply, and how the Home Assistant frontend meets them in practice.
order: 4
---

Home Assistant runs the homes of people who see, hear, move, and think in many different ways. Some use a screen reader, some only a keyboard, some a phone with large text, some a wall tablet across the room. Accessibility is what makes the interface work for all of them, and it is part of every design and every pull request, not a separate step at the end.

This page uses the [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) as the bar, and shows how the frontend meets it. Every section separates two things:

- **WCAG**: what the standard requires, with the number of the success criterion so you can look it up. Level A is the minimum, AA is the level to aim for, AAA goes further.
- **In the frontend**: what the Home Assistant code does today, so your design or code can build on it instead of working around it.

The frontend review checklist asks for a UI that is accessible to screen readers and keyboard users, and the frontend styling guidance asks to maintain WCAG AA contrast for text and essential UI affordances.

## Contrast

**WCAG**

- Text needs a contrast ratio of at least 4.5:1 against its background. Large text, from 18 point (24 CSS pixels), or 14 point (about 18.7 CSS pixels) in bold, needs 3:1. (1.4.3 Contrast (Minimum), AA)
- The parts of a control you need to see to use it, like the border of a text field or the thumb of a switch, and meaningful graphics like icons, need 3:1 against what is next to them. (1.4.11 Non-text Contrast, AA)
- Disabled controls and pure decoration are exempt.
- Color is never the only way to tell something. An error is red, and it also says it is an error. (1.4.1 Use of Color, A)

**In the frontend**

The colors come from the [color tokens](/design/foundations/color/). These are the contrast ratios of common text and fill pairs, computed from the token values in the frontend for the default light and dark theme:

| Pair | Light | Dark |
| --- | --- | --- |
| `--primary-text-color` on `--card-background-color` | 18.42:1 | 13.03:1 |
| `--primary-text-color` on `--primary-background-color` | 17.65:1 | 14.44:1 |
| `--secondary-text-color` on `--card-background-color` | 6.48:1 | 6.13:1 |
| `--ha-color-text-link` on `--card-background-color` | 3.26:1 | 8.80:1 |
| White text on `--ha-color-fill-primary-loud-resting` | 3.26:1 | 3.26:1 |
| White text on `--ha-color-fill-danger-loud-resting` | 4.59:1 | 7.04:1 |
| White text on `--ha-color-fill-success-loud-resting` | 4.58:1 | 7.03:1 |
| White text on `--ha-color-fill-warning-loud-resting` | 2.21:1 | 7.00:1 |
| `--ha-color-on-primary-normal` on `--ha-color-fill-primary-normal-resting` | 2.85:1 | 7.42:1 |
| `--ha-color-on-danger-normal` on `--ha-color-fill-danger-normal-resting` | 5.61:1 | 5.56:1 |
| `--ha-color-focus` (the focus ring) on `--card-background-color` | 2.88:1 | 5.91:1 |

Compare each pair with the WCAG numbers above before you use it for something new. Text on a quiet or normal fill uses the matching `on` token: `--ha-color-on-danger-normal` on `--ha-color-fill-danger-normal-resting`, not any red you like. A combination that is not in the token system has no contrast promise at all, so check it yourself, in both themes.

The [alert](/design/components/alert/) is a good example of not relying on color alone: every type has its own icon next to the color.

## Focus

**WCAG**

- When you use a keyboard, you always see which element has focus. (2.4.7 Focus Visible, AA)
- The focused element is not hidden behind something else, like a sticky footer or a toast. (2.4.11 Focus Not Obscured (Minimum), AA)
- Focus moves in an order that makes sense. (2.4.3 Focus Order, A)
- Getting focus alone never triggers a change, like submitting a form. (3.2.1 On Focus, A)
- At AAA, the focus indicator is at least 2 CSS pixels thick, with 3:1 contrast between the focused and unfocused look. (2.4.13 Focus Appearance, AAA)

**In the frontend**

- Components built on Web Awesome, like [button](/design/components/button/), [text input](/design/components/input/), and [switch](/design/components/switch/), share one focus ring: a solid line of 2 pixels, 2 pixels away from the element, in `--ha-color-focus`. The tokens are `--wa-focus-ring-style`, `--wa-focus-ring-width`, `--wa-focus-ring-offset`, and `--wa-focus-ring-color`.
- The big device [controls](/design/components/controls/), like the control button, switch, and slider, draw their own ring of 2 pixels with a box shadow on `:focus-visible`, in the color of the control.
- Focus styles use `:focus-visible`, so the ring shows for keyboard users and stays out of the way for touch and mouse.
- A dialog moves focus to the element with the `autofocus` attribute when it opens. Components like the [form](/design/components/form/) pass that focus on to their first field.
- When a form is checked and a field is not valid, focus moves to the first field with a problem.

Never remove a focus ring without putting a visible one in its place.

## Keyboard

**WCAG**

- Everything you can do with a pointer, you can do with a keyboard. (2.1.1 Keyboard, A)
- Focus never gets stuck in a component. (2.1.2 No Keyboard Trap, A)
- Shortcuts of a single character can be turned off or remapped. (2.1.4 Character Key Shortcuts, A)
- Content that shows on hover or focus, like a tooltip, can be dismissed, can be hovered itself, and stays until you move away. (1.4.13 Content on Hover or Focus, AA)

**In the frontend**

- Use native elements and the `ha-*` components instead of building your own controls. A `<div>` with a `click` listener can't be reached with a keyboard at all.
- Pickers have a full keyboard model: arrow keys move through the list, <kbd>Home</kbd> and <kbd>End</kbd> jump to the first and last item, <kbd>Page Up</kbd> and <kbd>Page Down</kbd> move a page, and <kbd>Enter</kbd> picks. Focus stays in the search field while you move through the list. See the [entity picker](/design/components/entity-picker/).
- Home Assistant has global shortcuts, like <kbd>e</kbd> to search entities and <kbd>Shift</kbd> + <kbd>?</kbd> for the list of shortcuts. People can turn them off under **Keyboard shortcuts** in their profile. In code, shortcuts go through the `ShortcutManager`, which ignores them while you type in a field.
- [Tooltips](/design/components/tooltip/) show on hover and on focus, so keyboard users get the same hint.

## Labels and accessible names

**WCAG**

- Every control has a name that assistive technology can read, and exposes its role and state, like "switch, on". (4.1.2 Name, Role, Value, A)
- Fields have a visible label or instructions. (3.3.2 Labels or Instructions, A)
- When a control has visible text, its accessible name contains that text, so people using voice control can say what they see. (2.5.3 Label in Name, A)
- Structure that you see, like headings and lists, is also in the markup. (1.3.1 Info and Relationships, A)

**In the frontend**

- Give every field a `label`. The [text input](/design/components/input/), [textarea](/design/components/textarea/), and fields in a [form](/design/components/form/) render it as a real label. A placeholder is not a label: it disappears as soon as someone types.
- An icon button has no visible text, so its `label` is the only name it has. `ha-icon-button` uses it as the accessible name and as the tooltip, and hides the icon itself from screen readers.
- Required fields show a `*` after the label. Helper text sits below the field.
- A dialog needs a title. `ha-dialog` uses its `header-title` as the accessible name of the dialog. When the title is custom content in a slot, set `accessibleLabel` instead.
- All visible text, including accessible names, goes through the translation system. See [UI text](/design/ui-text/).

## Target size

**WCAG**

- Pointer targets are at least 24 by 24 CSS pixels, or have enough space around them that a 24 pixel circle around each one does not overlap another. (2.5.8 Target Size (Minimum), AA)
- At AAA, targets are at least 44 by 44 CSS pixels. (2.5.5 Target Size (Enhanced), AAA)

**In the frontend**

- [Buttons](/design/components/button/) are 40 pixels high by default. The sizes run from `xs` at 24 pixels, through `s` at 32, to `l` at 48.
- Icon buttons are 48 by 48 pixels by default.
- The frontend review guidelines ask for interactive areas that are large enough for touch, so treat 24 pixels as the floor, not the goal.

## Motion

**WCAG**

- Anything that moves, blinks, or scrolls on its own for more than five seconds can be paused, stopped, or hidden. (2.2.2 Pause, Stop, Hide, A)
- At AAA, motion that is triggered by an interaction can be turned off, unless it is essential. (2.3.3 Animation from Interactions, AAA)

**In the frontend**

When the operating system asks for reduced motion (`prefers-reduced-motion: reduce`), the frontend sets all animation duration tokens to 1 millisecond. Dialogs, the skeleton loaders, ripples, the sidebar, and several cards also turn off their own animations. Use the duration tokens and motion follows that setting for free. See [Motion](/design/foundations/motion/).

## Screen readers and status messages

**WCAG**

- A message about a status change, like "Saved" or an error, reaches screen reader users without moving their focus. (4.1.3 Status Messages, AA)
- An error says which field is wrong and what is wrong with it, in text. (3.3.1 Error Identification, A)
- When the fix is known, the error suggests it. (3.3.3 Error Suggestion, AA)

**In the frontend**

- An [alert](/design/components/alert/) has `role="alert"`. Most screen readers announce an alert as soon as it appears. An alert that is already on the page when it loads is usually not announced, so do not rely on it for something people must hear.
- A toast, the short message at the bottom of the screen, has `role="status"` and is announced politely, without interrupting.
- When a [text input](/design/components/input/) is not valid, it sets `aria-invalid`, and its validation message replaces the helper text and is announced.
- The [spinner](/design/components/spinner/) is built on the Web Awesome spinner, which has the role of a progress bar and a translated "Loading" label.

## Check your work

Before you share a design or open a pull request:

1. Use it with only a keyboard. Can you reach everything, see where focus is, and get out again?
2. Check the contrast of every new color pair, in light and dark.
3. Turn on reduced motion in your operating system, and check that nothing important depends on an animation.
4. Try it with a screen reader, like VoiceOver, TalkBack, or NVDA. Does every control say what it is?
5. Zoom the browser to 200% and try it on a phone.

## Related

- [Color](/design/foundations/color/): the tokens behind the contrast table.
- [Patterns](/design/patterns/): forms, errors, and loading, with their accessibility details.
- The **Accessibility** category of the [UX design discussions](https://github.com/OpenHomeFoundation/ux-design/discussions), and the `Accessibility` label in the [frontend repository](https://github.com/home-assistant/frontend/labels/Accessibility).
