---
title: Untrusted content in the frontend
description: Entity names, attributes, Markdown, and URLs can come from anywhere. How the frontend escapes, sanitizes, and checks them, and what you need to do.
sidebarLabel: Frontend
order: 2
---

The frontend shows data that it did not write. A device name comes from the device. An attribute comes from a cloud service. A Markdown card shows what a user, or a template, put in it. Any of these can contain HTML, and if the frontend renders that HTML as-is, it runs in the browser of everyone who opens the dashboard. That is cross-site scripting (XSS).

This is not theoretical. XSS is the most common kind of mistake in the [past advisories](/security/reference/advisories/#cross-site-scripting) of Home Assistant. See [what went wrong before](#what-went-wrong-before).

The rule is simple: treat every string that reaches the frontend as data, never as markup.

## Let Lit do the escaping

Lit escapes values that you put in a template, so a name full of HTML shows up as text. That is the safest way to render anything, and it is why the frontend moved its chart tooltips to Lit templates: user-controlled fields like friendly names and device names are escaped automatically, instead of relying on a filter for each string.

```ts
// Escaped by Lit: a name with HTML in it shows as text
return html`${entityName}: ${value}`;
```

Trouble starts when you build HTML as a string, and hand that string to something that renders it.

- Do not set `innerHTML` with outside data. Set `textContent` instead. The fix for the map card did exactly that.
- Avoid `unsafeHTML`. Today, the frontend only uses it in `ha-markdown-element`, to render Markdown that was already sanitized.
- Some libraries, like charts and maps, take an HTML string for a tooltip or a popup. Prefer a Lit template when the library supports one.

## When you must build an HTML string

If there is no way around a string, pass every untrusted part through `filterXSS` from `src/common/util/xss.ts`:

```ts
import { filterXSS } from "../../common/util/xss";

return `${filterXSS(path.name ?? "")}<br>${formattedTime}`;
```

`filterXSS` has an empty allowlist, so no tag gets through. Use it for plain text that ends up in HTML, not for content that should keep its formatting.

## Markdown

Render Markdown with the `<ha-markdown>` component. It converts the Markdown to HTML, and then filters the result with an allowlist of tags and attributes. Only what is on the list gets through.

`<ha-markdown>` has an `allow-svg` option. The code is clear about it: do not allow SVG on untrusted content, it allows XSS. In the frontend, it is turned on in places like the config flow dialogs and the action editor.

## Links

A URL can be dangerous too: a `javascript:` URL in a link runs code when someone selects it. Every URL that reaches the frontend as data, from an integration manifest, an app, a config flow, or an entity attribute, should go through a check first. The helpers live in `src/common/url/sanitize-http-url.ts`:

- `sanitizeHttpUrl(url)` returns the URL only if it is an absolute `http:` or `https:` URL, and `undefined` otherwise.
- `sanitizeLinkUrl(url)` also accepts `homeassistant://` deep links, and turns them into a path inside the frontend. Swapping the scheme alone is not enough: `homeassistant:///example.com` would become `//example.com`, which points to another site.

```ts
const releaseUrl = sanitizeHttpUrl(stateObj.attributes.release_url);
```

## What went wrong before

- **Names in tooltips.** An entity name in a [graph tooltip of the energy dashboard](https://github.com/home-assistant/core/security/advisories/GHSA-mq77-rv97-285m), an entity name in the [history graph card](https://github.com/home-assistant/core/security/advisories/GHSA-46j8-vpx8-6p72), and a device name in the [map card](https://github.com/home-assistant/core/security/advisories/GHSA-r584-6283-p7xc) all ended up in an HTML string. The name in the energy dashboard could come from the cloud service of an integration, not only from a user.
- **Markdown without a sanitizer.** The very first advisory, from 2017, was [XSS in Markdown output](https://github.com/home-assistant/frontend/pull/514).
- **A `javascript:` URL.** A `redirect_uri` that a login client published was not checked for its scheme, and [ran code](https://github.com/home-assistant/core/security/advisories/GHSA-jvxq-x42r-f7mv) in the frontend.
- **A URL parameter that picked the server.** A login link could make the frontend [connect to a fake WebSocket server](https://github.com/home-assistant/core/security/advisories/GHSA-cr83-q7r2-7f5q), which then sent it whatever it liked.

## Related

- [Past advisories](/security/reference/advisories/): every advisory, grouped by kind.
- [Security helpers](/security/reference/helpers/#frontend): the frontend helpers in a table.
- [Secure integrations](/security/guides/integrations/): the other side, where the data comes from.
- [Frontend](/frontend/): how the frontend is built.
