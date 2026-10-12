---
title: Motion
description: The animation duration tokens of the Home Assistant interface, and how motion respects people who asked for less of it.
order: 5
---

Motion helps people follow what happens: a dialog opens on top of the page, a toast slides in at the bottom, a control moves to its new value. Used with care, it explains a change. Used too much, it gets in the way, and for some people it makes the interface hard or even unpleasant to use.

## Duration tokens

Animations use one of these tokens, defined in the frontend in `src/resources/theme/core.globals.ts`:

- `--ha-animation-duration-instant`: 75 milliseconds
- `--ha-animation-duration-fast`: 150 milliseconds
- `--ha-animation-duration-normal`: 250 milliseconds
- `--ha-animation-duration-slow`: 350 milliseconds
- `--ha-animation-duration-none`: 1 millisecond

The Web Awesome components use the same values: their normal transition is `--ha-animation-duration-fast`, and their fast transition is `--ha-animation-duration-instant`.

## Reduced motion

People can ask their operating system for less motion. Browsers pass that on as `prefers-reduced-motion: reduce`. When it is set, the frontend sets every duration token to 1 millisecond. Anything that is timed with the tokens then happens at once, without you doing anything for it.

Some components go further and turn off their own animations, like dialogs, the bottom sheet, ripples, the sidebar, and the skeleton loaders. If your component animates in a way the tokens don't cover, like a looping animation, add a `@media (prefers-reduced-motion: reduce)` block for it as well.

Code that needs to know in JavaScript, like a graph deciding whether to animate, can consume the `reducedMotionContext` Lit context.

## Guidelines

These come from the styling guidance of the frontend, most of it written for view transitions:

- Use view transitions only for meaningful continuity between states.
- Keep transitions simple. Subtle fades and crossfades usually work best.
- Time them with `--ha-animation-duration-fast`, `--ha-animation-duration-normal`, or `--ha-animation-duration-slow`.
- Keep motion subtle and tokenized, and respect reduced motion through the existing globals.

For page level transitions, the frontend uses the View Transitions API through the `withViewTransition()` helper in `src/common/util/view-transition.ts`. The [frontend theming](/frontend/architecture/theming/) page covers the code side.

## Related

- [Accessibility](/design/foundations/accessibility/): what WCAG asks of motion.
- [Spinner](/design/components/spinner/) and [loading](/design/patterns/loading/): motion that says "please wait".
