---
title: Changes to the BackupAgent API
description: "The BackupAgent API has been adjusted such that the following methods should now raise BackupNotFound when a backup is not found:"
date: 2025-03-04
authors:
  - Erik Montnémery
areas:
  - core
---

The `BackupAgent` API has been adjusted such that the following methods should now raise `BackupNotFound` when a backup is not found:
- `BackupAgent.async_delete_backup`
- `BackupAgent.async_download_backup`
- `BackupAgent.async_get_backup`

Check the [backup agent documentation](/core/integrations/backup/#add-a-backup-agent), and the [home assistant core PR #139754](https://github.com/home-assistant/core/pull/139754) for additional background.
