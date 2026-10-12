---
title: Backup agents can now report upload progress
description: The BackupAgent.async_upload_backup method now receives a new on_progress callback parameter.
date: 2026-03-11
authors:
  - Josef Zweck
areas:
  - core
---

The `BackupAgent.async_upload_backup` method now receives a new `on_progress` callback parameter. Backup agents can call this callback periodically during upload to report the number of bytes uploaded so far:

```python
class ExampleBackupAgent(BackupAgent):

    async def async_upload_backup(
        self,
        *,
        open_stream: Callable[[], Coroutine[Any, Any, AsyncIterator[bytes]]],
        backup: AgentBackup,
        on_progress: OnProgressCallback,
        **kwargs: Any,
    ) -> None:
        """Upload a backup."""
        ...
        bytes_uploaded = 0
        async for chunk in await open_stream():
            await do_upload(chunk)
            bytes_uploaded += len(chunk)
            on_progress(bytes_uploaded=bytes_uploaded)
        ...
```

The backup manager uses these progress reports to fire `UploadBackupEvent` events, enabling the frontend to display real-time upload progress to the user.

Check the [backup agent documentation](/core/integrations/backup/#add-a-backup-agent) for more details.
