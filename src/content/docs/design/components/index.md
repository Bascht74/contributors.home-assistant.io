---
title: Components
description: The building blocks of the Home Assistant interface, with guidelines, specs, accessibility, and code, on one page per component.
order: 20
sidebarGroups:
  - Actions
  - Input
  - Pickers
  - Forms
  - Feedback and status
  - Showing values
  - Layout and content
---

The interface is built from a shared set of components. Reusing them keeps Home Assistant consistent, and saves everyone work. Before you design or build something new, check whether one of these already does the job.

The examples on these pages are the real components from the frontend, running live, in the light or dark theme of the app.

## How a component page is built

Each component has one page, for designers and developers alike. Design comes first, code comes last, and every page uses the same order, so you know where to look:

1. **Overview**: what the component is, in a sentence or two.
2. **When to use**: the job it does, and when another component fits better.
3. **Anatomy**: the parts it is made of.
4. **Variants**: the versions it comes in, and when to pick which.
5. **Behavior**: what it does when people interact with it.
6. **Specs**: sizes, spacing, and colors, in [design tokens](/design/foundations/).
7. **Guidelines**: how to use it well, often with a do and a don't.
8. **Accessibility**: keyboard, focus, target size, and what screen readers announce, with the roles and ARIA in code last.
9. **Related**: components and [patterns](/design/patterns/) that go with it.
10. **In code**: the element, its attributes, slots, events, and how to style it.

Developers can jump straight to **In code**. Designers can stop before it. The **Accessibility** section works the same way: first what people get, like keyboard support, focus, target size, and what a screen reader announces, then an **In the code** part with the roles and ARIA attributes behind it.

## Where the spec lives

These pages are the reference for the components of Home Assistant: how they look, how they behave, and when to use them. They replace design.home-assistant.io.

To change a component:

1. Start a discussion in the **Design system** category of the [UX design discussions](https://github.com/OpenHomeFoundation/ux-design/discussions), and settle the direction there.
2. Open a pull request in the [frontend repository](https://github.com/home-assistant/frontend) that changes the component.
3. Open a pull request to [this site](https://github.com/home-assistant/contributors.home-assistant.io) that updates the page of the component.

See [How we design](/design/how-we-design/#where-a-component-is-specified) for the whole path.

## Actions

- [Button](/design/components/button/): start an action, like saving a form or opening a dialog.
- [Progress button](/design/components/progress-button/): an action that takes a moment, and shows how it went.
- [Dropdown](/design/components/dropdown/): a menu of actions or options, behind a button.

## Input

- [Text input](/design/components/input/): a single line of text, like a name, a number, or a password.
- [Textarea](/design/components/textarea/): text that runs over several lines.
- [Switch](/design/components/switch/): turn a single setting on or off.
- [Slider](/design/components/slider/): pick a number from a range, by dragging.
- [Select box](/design/components/select-box/): pick one of a few options, shown side by side as cards.
- [Color picker](/design/components/color-picker/): pick a hue and saturation on a color wheel, like the color of a light.

## Pickers

- [Entity picker](/design/components/entity-picker/): choose one entity, with search.
- [Device picker](/design/components/device-picker/): choose one device, with search.
- [Area picker](/design/components/area-picker/): choose one area, or create a new one on the spot.

## Forms

- [Form](/design/components/form/): a complete form, rendered from a schema.
- [Selector](/design/components/selector/): the right control for a value, as used by integrations, blueprints, and forms.

## Feedback and status

- [Alert](/design/components/alert/): a short, important message on the page.
- [Dialog](/design/components/dialog/): a decision or input, on top of the current screen.
- [Adaptive dialog](/design/components/adaptive-dialog/): a dialog on a big screen, a bottom sheet on a phone.
- [Badge](/design/components/badge/): a small piece of status, in a pill.
- [Label badge](/design/components/label-badge/): the classic round state badge.
- [Spinner](/design/components/spinner/): something is loading.
- [Tooltip](/design/components/tooltip/): a short hint on hover or focus.
- [Tip](/design/components/tip/): a short, optional hint below the content, like a keyboard shortcut.
- [State icon](/design/components/state-icon/): the icon and color of an entity, based on its state.

## Showing values

- [Bar](/design/components/bar/): how much of something is used.
- [Gauge](/design/components/gauge/): a single value on a dial.
- [Controls](/design/components/controls/): big, touch friendly controls for operating a device.
- [Control scrubber](/design/components/control-scrubber/): drag a strip under a fixed window, for ranges that go round, like hue.
- [Select menu](/design/components/select-menu/): a compact dropdown to pick one option, like the mode of a thermostat.

## Layout and content

- [List](/design/components/list/): rows of items.
- [Expansion panel](/design/components/expansion-panel/): a section that opens when needed.
- [Marquee text](/design/components/marquee-text/): one line of text that scrolls when it does not fit.
- [Faded](/design/components/faded/): the start of a long text, with the rest faded out until people select it.

## Bigger building blocks

Components come together in larger pieces of the interface, each with their own section:

- [Dashboards](/design/dashboards/): the cards people put on their dashboards.
- [More info](/design/more-info/): the dialog that opens when you select an entity, and the view each type of entity gets in it.

## Missing something?

Not every component in the frontend has a page here yet. A missing page is a good contribution in itself: open a pull request to [this site](https://github.com/home-assistant/contributors.home-assistant.io), following the outline above. If you think a component should change, start a discussion in the **Design system** category of the [UX design discussions](https://github.com/OpenHomeFoundation/ux-design/discussions). Developers can find the code of every component in [`src/components`](https://github.com/home-assistant/frontend/tree/dev/src/components) of the frontend, and the [Frontend](/frontend/) area explains how to work with it.
