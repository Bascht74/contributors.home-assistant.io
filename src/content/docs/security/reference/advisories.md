---
title: Past advisories
description: Every published security advisory of Home Assistant, grouped by kind, with what went wrong and the lesson for contributors.
order: 3
---

Home Assistant publishes an advisory for every valid vulnerability that meets the [criteria of the security policy](/security/report-a-vulnerability/#public-disclosure-and-cve-assignment). This page groups them by kind, says in one sentence what went wrong, and names the lesson. Each advisory links to the full details on GitHub, and each lesson links to the guide that covers it.

The list itself, with severity, CVE, discoverer, and the version with the fix, lives on the [security page](https://www.home-assistant.io/security/#past-advisories). That list is the official one. This page only helps you learn from it.

The same few mistakes keep coming back. Read the group that matches the code you work on.

## Cross-site scripting

Data that reached the frontend was rendered as HTML, so a crafted name or message could run code in the browser of whoever looked at it.

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2026‑03‑27 | A device name with HTML in it ran as code in the tooltip of the [map card](https://github.com/home-assistant/core/security/advisories/GHSA-r584-6283-p7xc). | Names are data, never markup. Let Lit render them, or set `textContent`. See [frontend](/security/guides/frontend/#let-lit-do-the-escaping). |
| 2026‑03‑27 | An entity name ran as code in the tooltip of the [history graph card](https://github.com/home-assistant/core/security/advisories/GHSA-46j8-vpx8-6p72). | The same mistake in another card: check every place that builds an HTML string. See [frontend](/security/guides/frontend/#when-you-must-build-an-html-string). |
| 2025‑10‑14 | An entity name ran as code in a [graph tooltip](https://github.com/home-assistant/core/security/advisories/GHSA-mq77-rv97-285m) of the energy dashboard. The name could come from the cloud service of the integration, not only from a user. | Any name can come from outside, including the default name an integration sets. See [frontend](/security/guides/frontend/). |
| 2017‑10‑11 | The frontend did not sanitize [Markdown output](https://github.com/home-assistant/frontend/pull/514), like in persistent notifications. | Render Markdown through a sanitizer. Today that is `<ha-markdown>`. See [frontend](/security/guides/frontend/#markdown). |

## Login and the frontend

Four findings from the [2023 audit by Cure53](https://www.home-assistant.io/blog/2023/10/19/security-audits-of-home-assistant/), all fixed in Home Assistant Core 2023.9.

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2023‑10‑19 | A `redirect_uri` published by a login client was not checked for its scheme, so a [`javascript:` URL](https://github.com/home-assistant/core/security/advisories/GHSA-jvxq-x42r-f7mv) could run code in the frontend. | Every URL from outside gets its scheme checked before it is used as a link or a redirect. See [frontend](/security/guides/frontend/#links). |
| 2023‑10‑19 | A login link could send the authorization code to [another site](https://github.com/home-assistant/core/security/advisories/GHSA-qhhj-7hrc-gqj5) that the attacker controlled. | Redirect targets need a strict match with the client they belong to. |
| 2023‑10‑19 | A parameter in a login link decided which server the frontend opened its WebSocket to, so a link could [connect it to a fake server](https://github.com/home-assistant/core/security/advisories/GHSA-cr83-q7r2-7f5q). | Never let a URL parameter pick the server the frontend trusts. |
| 2023‑10‑19 | Home Assistant did not set the `X-Frame-Options` header, so other sites could load it in a frame for [clickjacking](https://github.com/home-assistant/core/security/advisories/GHSA-935v-rmg9-44mw). | Core now sends `X-Frame-Options: SAMEORIGIN` by default. Do not work around it. |

## Endpoints without a login

An endpoint that answered without checking who was asking. Being on the local network is not a login.

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2026‑06‑18 | An HTTP view of the legacy [Konnected integration](https://github.com/home-assistant/core/security/advisories/GHSA-x84v-g949-293w) had `requires_auth = False` and checked a token on `POST` and `PUT`, but not on `GET`. Anyone on the network could read the state of the alarm panel. The integration was removed. | With `requires_auth = False`, every method of the view checks the request itself. See [integrations](/security/guides/integrations/#http-views). |
| 2023‑12‑14 | The login page showed [all user accounts](https://github.com/home-assistant/core/security/advisories/GHSA-jqpc-rc7g-vf83) to anyone on the local network who opened it. | Do not hand out information about users before login, not even on the local network. |
| 2023‑10‑19 | Webhooks marked as local only were [reachable from the internet](https://github.com/home-assistant/core/security/advisories/GHSA-wx3j-3v2j-rf45) through the remote connection of Home Assistant Cloud, now Home Assistant Link, which made requests look local. | Where a request comes from is not the same as who sent it. Use `local_only` from the webhook helper, which handles this case. See [integrations](/security/guides/integrations/#webhooks). |

## Server-side request forgery

Data from a caller ended up in a request that Home Assistant itself sent, with its own credentials.

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2023‑10‑19 | The `addon` field of the `hassio.addon_stdin` action was put into the path of a Supervisor API request, so a caller could reach [other Supervisor endpoints](https://github.com/home-assistant/core/security/advisories/GHSA-4r74-h49q-rr3h). | Validate every value that goes into a URL or a path, with a strict pattern. Core now checks that field against a slug pattern. See [integrations](/security/guides/integrations/#treat-what-comes-in-as-untrusted). |

## Certificate checks

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2025‑02‑18 | When the `verify_ssl` option of aiohttp was replaced by `ssl`, some integrations and libraries [passed the old value straight on](https://github.com/home-assistant/core/security/advisories/GHSA-m3pm-rpgg-5wj6). According to the advisory, that turned certificate checks off. | Use the shared web session of Home Assistant, and pass the choice of the user as `verify_ssl`. See [integrations](/security/guides/integrations/#keep-certificate-checks-on). |

## Apps and the Supervisor

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2026‑03‑27 | Apps on the host network served [endpoints without a login](https://github.com/home-assistant/core/security/advisories/GHSA-gh5m-4m97-c95h) on the internal network of the Supervisor, assuming nothing else could reach it. Devices on the local network could. | Binding to an internal address is not a login. See [apps](/security/guides/apps/#do-not-trust-the-network-alone). |
| 2023‑03‑08 | Attackers could bypass authentication and reach the [Supervisor API](https://github.com/home-assistant/core/security/advisories/GHSA-2j8f-h4mr-qr25) through Home Assistant. | A proxy only forwards what is on an explicit list. See [apps](/security/guides/apps/#the-supervisor-api-bypass). |

## Companion apps

The [companion apps](/companion/) hold a token for the server of the user. Anything that can make the app act on its own uses that token.

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2026‑07‑31 | Other apps could open a tag link in the Android app, which sent the [tag scan to the server](https://github.com/home-assistant/core/security/advisories/GHSA-2xqv-hwrf-983f) without asking the user. | An action that comes from outside the app needs the user's approval. See [companion apps](/security/guides/companion-apps/#ask-before-acting-on-a-link). |
| 2026‑07‑31 | The same for the [iOS app](https://github.com/home-assistant/core/security/advisories/GHSA-j23v-9672-677j), through a universal link. | The same lesson, on both platforms. See [companion apps](/security/guides/companion-apps/#ask-before-acting-on-a-link). |
| 2026‑07‑26 | An invite link could start onboarding of the Android app against [any server](https://github.com/home-assistant/core/security/advisories/GHSA-68f4-97mf-f68w), without showing its address. A fake login page could then collect the password. | Show the user where a link takes them before they trust it. See [companion apps](/security/guides/companion-apps/#show-which-server-you-connect-to). |
| 2026‑06‑25 | The iOS app [ignored the list of home Wi-Fi networks](https://github.com/home-assistant/core/security/advisories/GHSA-cm5v-547m-qh5h) for the internal URL, so it could send its token over plain HTTP on any network. | Only use an internal `http:` URL on a network the user marked as home. See [companion apps](/security/guides/companion-apps/#keep-the-internal-url-at-home). |
| 2026‑06‑17 | An [exported receiver](https://github.com/home-assistant/core/security/advisories/GHSA-77r5-pw5w-mgj3) of the Android app accepted location updates from any app, and sent them to the server as the real location. | Do not export components. When something must be reachable, accept only the one action it needs, and drop the data that comes with it. See [companion apps](/security/guides/companion-apps/#keep-components-private). |
| 2026‑05‑11 | The JavaScript bridge of both apps answered frames from [other origins](https://github.com/home-assistant/core/security/advisories/GHSA-7jp2-p2fw-mgvf), like a Webpage card, and put a callback name from the message into code it ran. A page in a frame could get the access token. | Only the main frame of the server talks to the bridge, and nothing from a message becomes code. See [companion apps](/security/guides/companion-apps/#guard-the-javascript-bridge). |
| 2023‑10‑19 | The Android app could be made to load an [arbitrary URL](https://github.com/home-assistant/core/security/advisories/GHSA-jvpm-q3hq-86rg) in its WebView. | The WebView only loads the server of the user. See [companion apps](/security/guides/companion-apps/#load-only-the-server-in-the-webview). |
| 2023‑10‑19 | A link or QR code could make the iOS and macOS app [call actions](https://github.com/home-assistant/core/security/advisories/GHSA-h2jp-7grc-9xpp) on the server without asking. | An action that comes from outside the app needs the user's approval. See [companion apps](/security/guides/companion-apps/#ask-before-acting-on-a-link). |

## Workflows

| Date | What went wrong | Lesson |
| --- | --- | --- |
| 2023‑10‑19 | A shared GitHub Action of the project put the branch name of a pull request straight into a shell script, an [expression injection](https://github.com/home-assistant/core/security/advisories/GHSA-jff5-5j3g-vhqc). | Never put `${{ }}` expressions with outside data in a `run:` step. See [dependencies and supply chain](/security/guides/dependencies/#what-went-wrong-before). |

## Related

- [Report a vulnerability](/security/report-a-vulnerability/): how to report, and what qualifies.
- [Review with security in mind](/security/guides/reviewing/): where to look in a pull request.
