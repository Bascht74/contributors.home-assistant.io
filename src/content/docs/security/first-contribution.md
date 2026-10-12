---
title: Your first security contribution
description: Check the diagnostics of an integration you use for data that should not be in there, and fix what you find.
sidebarLabel: Your first contribution
order: 1
---

You do not need to be a security researcher to make Home Assistant safer. A good first step uses something you already have: your own Home Assistant, and an integration you use every day.

Users attach [diagnostics](/glossary/diagnostics/) files to public GitHub issues, so the integration must remove passwords, tokens, and other private data from them first. It does that with a list of keys to redact. When a key is missing from that list, private data ends up in public. Checking for that is concrete, small, and useful.

## 1. Download a diagnostics file

1. Go to **Settings** > **Devices & services**.
2. Select an integration you use. One that talks to a cloud service or needs a login is a good pick, because it has secrets to protect.
3. Open the three-dot menu and select **Download diagnostics**.

Not every integration has diagnostics. When it has none, the option is not shown: pick another one.

## 2. Read it

Open the file in a text editor. Values that were removed show as `**REDACTED**`. Look for anything that should have been removed too:

- Passwords, API keys, and tokens, including access and refresh tokens
- Location data, like coordinates and addresses
- Personal information, like names and email addresses
- Identifiers that point to you or your device, like serial numbers or account IDs

Data from an API often holds more than the integration author expected, so look at nested data too.

## 3. Decide what it is

Most of the time, you find nothing. That is a good result, and you learned how diagnostics work.

If you find something, think about who can see it. If it is data that should not be in a file that users share in public, it needs fixing. If you think it could put users at risk in another way, or you are not sure, treat it as a vulnerability and [report it privately](/security/report-a-vulnerability/). A private report that turns out to be harmless costs little. A public one that turns out to be a vulnerability puts homes at risk.

## 4. Fix it

The fix is usually a single line. Diagnostics live in `diagnostics.py` in the folder of the integration, in the [core repository](https://github.com/home-assistant/core). Most integrations keep a set of keys, often called `TO_REDACT`, and pass their data through `async_redact_data`:

```python
TO_REDACT = {CONF_API_KEY, CONF_PASSWORD, "serial_number"}
```

Add the missing key to the set. Then update the snapshot of the diagnostics test, so reviewers see the value change to `**REDACTED**`:

```bash
pytest tests/components/example --snapshot-update
```

New to Core? [Your first contribution to core](/core/first-contribution/) sets you up with a development environment and walks you through your first pull request. [Diagnostics](/core/integrations/diagnostics/) explains the code in more detail.

## What is next

- Read [Secure integrations](/security/guides/integrations/) for the other patterns that keep integrations safe.
- Review a pull request with [security in mind](/security/guides/reviewing/). Dependency updates are a good place to start: the [checklist](/core/development/reviewing/#dependency-updates) is short, and the risk is real.
