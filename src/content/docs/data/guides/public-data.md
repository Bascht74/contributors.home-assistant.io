---
title: Use the public data
description: Download the analytics data sets as JSON, or scrape them with Prometheus, and build your own charts.
order: 1
---

Everything on [analytics.home-assistant.io](https://analytics.home-assistant.io/) is also available as data files, free for anyone to use. They contain the aggregated totals only, never data of a single installation. The files are rebuilt every time the analytics are processed.

## The data sets

| File | What is in it |
| --- | --- |
| [`/data.json`](https://analytics.home-assistant.io/data.json) | Everything: the current totals under `current`, and the history over time under `history`. |
| [`/current_data.json`](https://analytics.home-assistant.io/current_data.json) | Only the current totals. Start here. |
| [`/custom_integrations.json`](https://analytics.home-assistant.io/custom_integrations.json) | How many installations use each custom integration, and which versions. |
| [`/addons.json`](https://analytics.home-assistant.io/addons.json) | How many installations use each app, and which versions. The file name still uses the old name for apps. |

## What the current totals contain

`current_data.json` has, among other things:

- `active_installations`: the number of installations that reported in the last 60 days.
- `installation_types`: installations per installation type.
- `versions`: installations per Home Assistant version.
- `countries`: installations per country code.
- `integrations`: installations per integration domain.
- `operating_system` and `supervisor`: boards, operating system versions, and architectures.
- `avg_automations`, `avg_integrations`, `avg_states`, `avg_users`, and `avg_addons`: averages over the installations that share statistical data.
- `reports_integrations`, `reports_addons`, and `reports_statistics`: how many installations share usage data and statistical data. Use these, not `active_installations`, to calculate percentages for integrations, apps, or counts.
- `energy` and `recorder`: how many installations use the energy dashboard, and which database engines.
- `last_updated`: when the data was last processed, as a timestamp in milliseconds.

## A quick look

To see the ten most used integrations, with `curl` and `jq`:

```bash
curl -s https://analytics.home-assistant.io/current_data.json \
  | jq '.integrations | to_entries | sort_by(-.value) | .[:10]'
```

Or in Python:

```python
import json
from urllib.request import urlopen

URL = "https://analytics.home-assistant.io/current_data.json"

with urlopen(URL) as response:
    data = json.load(response)

total = data["reports_integrations"]
top = sorted(data["integrations"].items(), key=lambda item: -item[1])

for domain, count in top[:10]:
    print(f"{domain}: {count / total:.1%}")
```

## Prometheus

The same data is also published in the Prometheus text format, so you can scrape it into your own monitoring:

- `/prometheus/base`
- `/prometheus/integrations`
- `/prometheus/custom_integrations`
- `/prometheus/addons`

For example, as a scrape job:

```yaml
scrape_configs:
  - job_name: "homeassistant_analytics_integrations"
    scrape_interval: 1h
    metrics_path: /prometheus/integrations
    scheme: https
    static_configs:
      - targets:
          - "analytics.home-assistant.io"
```

The data only changes when it is processed, so scraping more often than once an hour is pointless.

## Things to keep in mind

- The numbers only include installations that opted in. The real number of installations is higher, and nobody knows by how much.
- Not everyone who shares basic analytics also shares usage or statistics. Always divide by the matching `reports_*` number.
- Installations disappear from the data 60 days after their last report.

Want to change the website or the processing? The code is in the [analytics.home-assistant.io repository](https://github.com/home-assistant/analytics.home-assistant.io). Pull requests go against the `dev` branch.
