---
title: Add a more-info view
description: Give the entities of a domain their own controls in the more-info dialog.
order: 1
---

The [more-info dialog](/glossary/more-info-dialog/) opens when you select an entity. What it shows depends on the domain of the entity: a light gets a brightness slider, a lock a big lock button. Domains without a view of their own get the default content: a state row, the history, and, for most domains, the logbook. The attributes of an entity are not part of the view: the dialog shows them in a separate details view, from its three-dots menu.

Before you build one, look at the [more-info views](/design/more-info/) in the Design area. They show every existing view, and the principles new ones follow: one big main control, secondary controls below it, and only the controls the device supports.

## Add a view for a domain

This example adds a view for a domain called `example`.

1. Create `src/dialogs/more-info/controls/more-info-example.ts`, with an element called `more-info-example`. The dialog sets `hass`, `stateObj`, and `entry` (the entity registry entry) on it.

   ```ts
   @customElement("more-info-example")
   class MoreInfoExample extends LitElement {
     @property({ attribute: false }) public hass!: HomeAssistant;

     @property({ attribute: false }) public stateObj?: HassEntity;

     protected render() {
       if (!this.stateObj) {
         return nothing;
       }
       return html`<!-- the controls of the domain -->`;
     }
   }
   ```

2. Add `"example"` to `DOMAINS_WITH_MORE_INFO` in `src/dialogs/more-info/const.ts`.
3. Add a lazy import to `LAZY_LOADED_MORE_INFO_CONTROL` in `src/dialogs/more-info/state_more_info_control.ts`:

   ```ts
   example: () => import("./controls/more-info-example"),
   ```

4. For a view that follows the newer design, which starts with the large state instead of a state row, also add the domain to `DOMAINS_WITH_NEW_MORE_INFO` in the same `const.ts`.

The other lists in `const.ts` fine-tune the dialog. `DOMAINS_HIDE_DEFAULT_MORE_INFO` lists domains without a view of their own that skip the default view element, and `DOMAINS_MORE_INFO_NO_HISTORY` hides the history and the logbook.

## Reuse the controls

Don't build the controls from scratch. The more-info views share components from `src/dialogs/more-info/components/` and the big touch controls, like `ha-control-slider` and `ha-control-switch`, from `src/components/`. The existing views, like `more-info-lock.ts` or `more-info-fan.ts`, are good starting points.

Show only what the entity supports: check its `supported_features` and attributes before you render a control.

## Add it to the gallery

Add the new view to the more-info section of the [gallery](/frontend/development/gallery-and-demo/), with a few entities in different states, so reviewers can see it without the device.
