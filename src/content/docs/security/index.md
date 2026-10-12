---
title: Security
description: Report a vulnerability, and build software that protects the homes it runs in.
---

Home Assistant runs the locks, alarms, cameras, and heating of the people who use it. A security bug in Home Assistant is a bug in someone's front door. That is why security is not a separate team's problem here: it shows up in every integration, every card, every app, and every dependency bump.

This area is for everyone who contributes. You will find how to report a vulnerability, what to watch for in the code you write or review, and which checks already have your back.

> [!IMPORTANT]
> Found a vulnerability? Do not open a public issue, pull request, or chat message about it. Report it privately through a [GitHub security advisory](https://github.com/home-assistant/core/security/advisories/new). See [Report a vulnerability](/security/report-a-vulnerability/) for what to include and what happens next.

## Who this is for

- **Security researchers and users** who found something: start with [Report a vulnerability](/security/report-a-vulnerability/).
- **Integration developers**: the code you write runs inside Core, with access to everything. The [integration guide](/security/guides/integrations/) covers credentials, certificates, redaction, admin-only access, webhooks, and file paths.
- **Frontend developers**: names, attributes, and Markdown that reach the interface can come from anywhere. See [untrusted content in the frontend](/security/guides/frontend/).
- **App developers**: your app runs in its own container, next to the rest of the system. See [Secure your app](/apps/guides/security/) and the [security rating](/apps/reference/security-rating/), and the lessons from past advisories in [secure apps](/security/guides/apps/).
- **Companion app developers**: the app holds the login of the user, so anything that can make it act on its own is a risk. See [secure companion apps](/security/guides/companion-apps/).
- **Reviewers**: you are the last pair of eyes before code reaches people's homes. See [Review with security in mind](/security/guides/reviewing/).

## Start here

- [Your first contribution](/security/first-contribution/): check the diagnostics of an integration you use for data that should not be in there.
- [How Home Assistant handles trust](/security/how-it-works/): who Home Assistant trusts, where it can be attacked, and what the system already does for you.
- [Report a vulnerability](/security/report-a-vulnerability/): how to report, what qualifies, and what to expect.

## Guides

- [Secure integrations](/security/guides/integrations/): the patterns and helpers that keep an integration safe.
- [Untrusted content in the frontend](/security/guides/frontend/): escaping, sanitizing, and safe links.
- [Secure apps](/security/guides/apps/): what the advisories about apps and the Supervisor teach.
- [Secure companion apps](/security/guides/companion-apps/): links, exported components, the WebView, and the JavaScript bridge.
- [Dependencies and supply chain](/security/guides/dependencies/): what Home Assistant asks of a library, and how it checks.
- [Review with security in mind](/security/guides/reviewing/): what to look for in a pull request.

## Reference

- [Security helpers](/security/reference/helpers/): every helper on one page, for Core and the frontend.
- [Automated security checks](/security/reference/checks/): the tools that check code, dependencies, and workflows.
- [Past advisories](/security/reference/advisories/): every published advisory, grouped by kind, with what went wrong and the lesson.

## Related

- [Authentication](/core/internals/auth/) and [permissions](/core/internals/permissions/): users, tokens, and how to check what someone may do.
- [Diagnostics](/core/integrations/diagnostics/): let users share data, without the secrets.
- [Securing your Home Assistant](https://www.home-assistant.io/docs/configuration/securing/): the user side, from passwords to remote access.

## Who to talk to

- **A vulnerability**: report it through a [GitHub security advisory](https://github.com/home-assistant/core/security/advisories/new), never in public. The [security.txt](https://www.home-assistant.io/.well-known/security.txt) of the project lists `security@home-assistant.io` as its contact.
- **Writing about the security of Home Assistant**: the [security policy](https://www.home-assistant.io/security/) asks you to get in touch at [hello@home-assistant.io](mailto:hello@home-assistant.io) first, so all claims can be checked.
- **A question about writing secure code** that is not a vulnerability: ask in the **#developers** channel on the [Home Assistant Discord](https://www.home-assistant.io/join-chat/), or in your pull request. Can't see the channel? Under **Channels & Roles**, choose **I want to contribute dev skills to Home Assistant**.
