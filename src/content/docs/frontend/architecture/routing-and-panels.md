---
title: Routing and panels
description: How a URL becomes a page. Panels registered by Core, the panel resolver, and the routers inside each panel.
order: 6
---

Every page in Home Assistant is a [panel](/glossary/panel/): a dashboard, the map, the logbook, the settings, or a panel added by an integration. The sidebar lists them, and the first part of the URL picks one.

## Panels come from Core

Core decides which panels exist. Integrations register them with `async_register_built_in_panel()` from the `frontend` integration, which takes the name of the frontend component that renders the panel, the URL path, the sidebar title and icon, and whether only administrators may see it:

```python
from homeassistant.components import frontend

frontend.async_register_built_in_panel(
    hass,
    component_name="logbook",
    sidebar_title="logbook",
    sidebar_icon="mdi:format-list-bulleted-type",
)
```

Without a `frontend_url_path`, the URL path is the component name, so this panel opens at `/logbook`. The sidebar title of a built-in panel is a translation key.

The frontend fetches the list of panels at startup, and it is available as `hass.panels`, or in the `uiContext`.

The `component_name` refers to a panel built into the frontend. To add a panel without changing the frontend, integrations and users register a custom panel instead. See [Custom panels](/frontend/custom-ui/panel/).

## From URL to panel

Routing in the frontend is decentralized. Each level only knows about its own part of the URL, and passes the rest down.

1. `src/layouts/partial-panel-resolver.ts` looks at the first part of the URL, finds the panel registered for it, and loads the code of its component. The map of component names to code is at the top of that file, so adding a built-in panel means adding it there.
2. The panel gets a `route` property: an object with a `prefix`, the part of the URL that was already handled, and a `path`, the rest.
3. A panel with pages of its own passes the rest of the route on to them, and so on.

Panels are loaded only when someone opens them.

## Routers inside a panel

A panel with several pages extends `HassRouterPage` from `src/layouts/hass-router-page.ts`. It maps the next part of the URL to an element, and loads that element's code when it is first needed:

```ts
@customElement("ha-panel-profile")
class HaPanelProfile extends HassRouterPage {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean }) public narrow = false;

  protected routerOptions: RouterOptions = {
    defaultPage: "dashboard",
    routes: {
      dashboard: {
        tag: "ha-profile-dashboard",
        load: () => import("./ha-profile-dashboard"),
      },
      security: {
        tag: "ha-profile-section-security",
        load: () => import("./ha-profile-section-security"),
      },
    },
  };

  protected updatePageEl(el) {
    el.route = this.routeTail;
    el.hass = this.hass;
    el.narrow = this.narrow;
  }
}
```

`updatePageEl()` passes the data the page needs, including `routeTail`, the part of the route that is left for the page. `RouterOptions` has more options, like `cacheAll` to keep pages in memory, and `beforeRender` to redirect.

## Navigate

To go to another page, use `navigate()` from `src/common/navigate.ts`, never `history.pushState` directly:

```ts
navigate("/config/areas/dashboard");
navigate("/config/areas/dashboard", { replace: true });
```

`navigate()` updates the history, tells the app the location changed, and respects guards for unsaved changes.
