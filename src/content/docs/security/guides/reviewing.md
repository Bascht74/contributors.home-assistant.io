---
title: Review with security in mind
description: What to look for in a pull request so security problems do not reach people's homes, and what to do when you find one.
sidebarLabel: Reviewing
order: 6
---

Reviewers are the last line before code ships. You do not need to be a security expert to catch most problems: they tend to show up in the same few places. This page lists those places, so you know where to look.

It adds a security lens to the regular review guides. For the full process, see [reviewing pull requests](/core/development/reviewing/) for Core.

## If you find a vulnerability

Some things you spot in review are not a missing check in new code, but a hole in code that has already shipped. Do not discuss that in the pull request, where everyone can read it. [Report it privately](/security/report-a-vulnerability/) instead.

## Learn from what went wrong before

The [past advisories](/security/reference/advisories/) of Home Assistant are the best training material there is. They keep coming back to the same themes:

- **Names rendered as HTML.** Stored XSS through an entity name in a graph tooltip and in the history graph card, and through a device name in the map card.
- **Unsafe URLs.** A full takeover through a `javascript:` URL in the login callback, and a partial server-side request forgery in Core.
- **Endpoints without a login.** The alarm panel state of an integration, and the user accounts of Home Assistant, readable by anyone on the local network. Unauthenticated endpoints of apps, reachable on the local network through host network mode.
- **Certificate checks.** SSL validation of outgoing requests that was not correct, in Core and the libraries it uses.
- **Companion apps acting on their own.** Links and other apps that made the app send tag scans, location, or actions to the server without asking, and web pages in a frame that reached the JavaScript bridge.
- **The project's own tooling.** An expression injection in a GitHub Action.

The [reference page](/security/reference/advisories/) groups every advisory by kind, with the lesson and a link to the details on GitHub. Reading a few of them changes how you read code.

## What to look for

### Ways in

- A new HTTP view: does it need `requires_auth = False`? If so, does every method check the request itself, `get` included?
- A new action, WebSocket command, or view that changes configuration: is it admin-only? See [guard the ways in](/security/guides/integrations/#guard-the-ways-in).
- A new webhook: should it be `local_only`? Is its ID generated with `webhook.async_generate_id()`?
- A path from a user: is it checked with `hass.config.is_allowed_path()`?

### Data

- Credentials go in the `data` of the config entry, and nowhere else.
- Diagnostics redact everything private. Check the snapshot in the tests: you see exactly what users would share.
- Log lines do not contain passwords, tokens, or full keys.
- Data from devices or services is not passed to `eval()`, `exec()`, or a shell.

Do not ask for extra checks on fields that the schema of an action already validates. Home Assistant checks those before the handler runs. Ask for checks where data skips the schema, or is turned into something less safe.

### Network

- The integration uses the shared web session of Home Assistant.
- Certificate checks are on by default. If there is an option to turn them off, it is the user's choice, and off is not the default.

### Frontend

- Names, attributes, and other data reach the page through Lit templates, not `innerHTML` or HTML strings.
- If a library needs an HTML string, untrusted parts go through `filterXSS`.
- URLs from data go through `sanitizeHttpUrl` or `sanitizeLinkUrl`.
- `<ha-markdown>` with `allow-svg` only renders trusted content.

### Dependencies

- A new library meets the [dependency transparency](/core/quality-scale/dependency-transparency/) rule.
- For an update, read the upstream diff, and look at the comment of the Check requirements workflow. See [dependencies and supply chain](/security/guides/dependencies/).

### Apps

- Every endpoint of an app that changes something has a login, or only accepts the Supervisor through ingress. Listening on an internal address is not a login. See [secure apps](/security/guides/apps/).

### Companion apps

- A new link, intent, or shortcut that changes something on the server asks the user first.
- A new Android component is not exported, unless another app must reach it.
- Messages to the JavaScript bridge only come from the main frame of the server, and no value from a message becomes code. See [secure companion apps](/security/guides/companion-apps/).

### Workflows

- New actions are pinned to a commit SHA.
- No `${{ }}` expression with outside data, like a branch name or a title, inside a `run:` script. See [what went wrong before](/security/guides/dependencies/#what-went-wrong-before).
- Permissions are as small as the job allows, and checkouts use `persist-credentials: false`.

## When you are not sure

Ask. Say what worries you, and why. A question is always better than a guess. If the author is unsure too, bring it to the **#developers** channel on the [Home Assistant Discord](https://www.home-assistant.io/join-chat/), as long as it is about new code and not a vulnerability in released code.

If you write the code yourself and something about its security worries you, say so in your pull request. That helps your reviewer look in the right place.
