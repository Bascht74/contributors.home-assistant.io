---
title: Data
description: What Home Assistant learns from data, how it respects your privacy while doing so, and how to explore the data of your own home.
---

Home Assistant is private by design. Your data lives in your home, and nothing leaves it unless you decide so. Still, the project needs some numbers to make good decisions: which integrations people use, which versions they run, and which devices work well. This area explains how Home Assistant gets those numbers without giving up on privacy, and how you can work with data yourself.

You do not need to be a data scientist to help. Turning on analytics in your own installation is already a contribution. And if you like digging into numbers, the data of your own home and the public data sets are waiting for you.

## Start here

- [Your first contribution](/data/first-contribution/): share analytics from your installation, and see exactly what you send.
- [Privacy principles](/data/privacy/): the rules Home Assistant follows for any data it collects.
- [How analytics works](/data/how-it-works/): from your installation to the public analytics site.

## Guides

- [Use the public data](/data/guides/public-data/): download the analytics data sets, or scrape them into your own tools.
- [Explore your own data](/data/guides/explore-your-data/): set up JupyterLab and run your first report on the data of your home.
- [Query the database](/data/guides/query-the-database/): example SQL queries for states, events, and context.
- [Analytics in your integration](/data/guides/integration-analytics/): for developers, control what the device database receives from your integration.

## Reference

- [What analytics shares](/data/reference/analytics-data/): every field, per option.
- [The data model](/data/reference/data-model/): events, states, and context, the building blocks of everything Home Assistant records.
- [Database schema](/data/reference/database-schema/): the tables of the recorder database.
- [Statistics](/data/reference/statistics/): short-term and long-term statistics, and how they are stored.

## Who to talk to

- Questions about the analytics site or its data? Open an issue or discussion in the [analytics.home-assistant.io repository](https://github.com/home-assistant/analytics.home-assistant.io).
- Questions about the device database? Join the [device database project channel](discord:device-database) on the Home Assistant Discord server.
- Questions about the recorder database? Ask in the [community forum](https://community.home-assistant.io/).
