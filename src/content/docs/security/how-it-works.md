---
title: How Home Assistant handles trust
description: Who Home Assistant trusts, where it can be attacked, and what the system already does to protect the homes it runs in.
sidebarLabel: How it works
order: 2
---

Home Assistant controls locks, alarms, cameras, and heating, in people's homes. A security problem in Home Assistant is a problem in someone's front door. This page explains the model underneath: who Home Assistant trusts, where it can be attacked, and which protections are already in place before your code runs. The [guides](/security/guides/) turn that into practice for the code you write.

## Who Home Assistant trusts

| Who | Trusted with |
| --- | --- |
| **Administrators** | Everything. They can install custom integrations and apps, which run code, and read every setting. |
| **Users** | Using the home: seeing states, performing actions. Not changing settings. |
| **Read-only users** | Seeing states. |
| **Anyone else** | Nothing. Except a webhook ID, which is a permission on its own. See [webhooks](/architecture/connections/). |

These roles shape what the interface and the APIs offer, but they are not a security boundary. The [security policy](https://www.home-assistant.io/security/) says Home Assistant assumes every logged-in user is trusted and does not enforce user privileges, so a logged-in user who gains more rights doesn't count as a vulnerability.

Code that runs inside Home Assistant is trusted fully. A [custom integration](/glossary/custom-integration/) is Python in the same process as Core, and can do everything Core can. An [app](/apps/how-apps-work/) runs in its own container, but can ask for broad access. Installing either is an admin's choice, and Home Assistant warns about custom integrations for that reason.

The line that matters most in code is between admins and everyone else. See [authentication](/core/internals/auth/) and [permissions](/core/internals/permissions/).

## Where Home Assistant can be attacked

- **Its web server.** Many homes make Home Assistant reachable from the internet. Every endpoint that doesn't require a login, and every endpoint that does, is a door.
- **Data from devices and services.** An integration reads data from the network, from a cloud service, or from a device. That data can be wrong, or crafted on purpose.
- **Its dependencies.** Every [requirement](/glossary/requirement/) is code that runs in Core. A compromised library compromises Home Assistant.
- **Users' own setups**, like a reverse proxy that forwards the wrong headers. Home Assistant can't fix those, but it can refuse to trust what it shouldn't.

## What Home Assistant already does

- Every request needs a valid token, except webhooks and a few endpoints that are public on purpose, like the login pages.
- Failed logins are reported to the user, and repeated failed logins from one address can lead to a ban, when the user turned that on.
- Requests with path tricks or suspicious bytes are refused before they reach any integration.
- Behind a reverse proxy, forwarded addresses are only trusted from proxies the user configured.
- The shared web session, from `async_get_clientsession`, checks SSL certificates, and refuses redirects from the internet to the local machine.
- Features that read or write a file at a path the user gives, like taking a camera snapshot or attaching a file to a notification, check that path against the folders the user allowed (`allowlist_external_dirs`). This is a check those features call, not a sandbox: an integration runs with the same file access as Core.

These protections are built into Home Assistant. They don't cover what your own code does with the data it gets, or with the access it has. That part is up to you, and the [Security](/security/) area shows how, per kind of contribution.
