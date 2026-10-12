---
title: Your first data contribution
description: Share analytics from your installation, check exactly what it sends, and see your installation counted. It takes a few minutes and one restart.
order: 1
sidebarLabel: Your first contribution
---

The simplest data contribution is sharing analytics from your own Home Assistant installation. It helps the project decide where to spend its time, and it gives the team real numbers when they ask manufacturers for local control. Nothing is shared unless you turn it on.

## 1. Open the analytics settings

In Home Assistant, go to **Settings** > **System** > **Analytics**. If you set up Home Assistant recently, you may have made a choice here during onboarding already.

## 2. Choose what to share

There are several options, and each one is separate:

- **Basic analytics**: your Home Assistant version and installation type, and some details about your system. Needed for usage and statistical data.
- **Usage**: which integrations and apps you use.
- **Statistical data**: counts only, like the number of entities and automations.
- **Diagnostics**: crash reports when an unexpected error occurs, sent to Sentry. For now, this only covers the Supervisor and the OS Agent.

[What analytics shares](/data/reference/analytics-data/) lists every field. Turn on what you are comfortable with. Every option helps.

## 3. Turn on logging for analytics

Every time Home Assistant sends a report, it writes the exact data to its log. It does that at the `info` level, and by default the log only shows warnings and errors. So turn it on for analytics first. Add this to your `configuration.yaml` file. If you already have a `logger:` section, add the line under its `logs:` instead:

```yaml
logger:
  logs:
    homeassistant.components.analytics: info
```

Then restart Home Assistant. See the [logger integration](https://www.home-assistant.io/integrations/logger/) for more about log levels.

Rather not restart? Run the `logger.set_level` action from **Settings** > **Tools** > **Actions**, with `homeassistant.components.analytics: info` as its data. That lasts until the next restart, and the next report can then be up to 24 hours away.

## 4. Check what you sent

Home Assistant sends the first report 15 minutes after it starts, and then once every 24 hours. Go to **Settings** > **System** > **Logs**, select **Show raw logs** in the menu, and look for a message that starts with:

```text
Submitted analytics to Home Assistant servers. Information submitted includes
```

That line is the complete daily report: your basic, usage, and statistical data. No names, no entity IDs, no addresses. The receiving server adds one thing: your country, derived from your IP address, and for the United States, your state.

It is not everything analytics can send. The **Device database** data goes out as a separate report, and the log only says that it was sent, not what was in it. **Diagnostics** crash reports go to Sentry, and do not show up here at all.

When you have seen it, remove the line from `configuration.yaml` and restart again, to keep your log quiet.

## 5. Look at the result

Open [analytics.home-assistant.io](https://analytics.home-assistant.io/). The site shows how many installations share analytics, which versions they run, and which integrations are most popular. Your installation is now one of them, as one anonymous count among many.

## What is next

- Help build the device database: turn on the **Device database** preview feature in **Settings** > **System** > **Labs**, and share anonymized data about your devices. See [How analytics works](/data/how-it-works/#the-device-database).
- Read the [privacy principles](/data/privacy/) behind all of this.
- Curious about the data of your own home? Try [Explore your own data](/data/guides/explore-your-data/).
