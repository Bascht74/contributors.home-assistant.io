---
title: Backup endpoints
description: Supervisor API endpoints to make, restore, upload, download, and manage backups.
sidebarLabel: Backups
order: 3
---

With these endpoints your app can make and restore backups, like a backup app that copies backups to another location. Your app needs `hassio_api: true` and the `backup` role, or the `manager` or `admin` role.

`<backup>` is the slug of a backup, a short random ID like `a1b2c3d4`.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/backups` | List backups |
| `GET` | `/backups/info` | List backups, and the backup settings |
| `POST` | `/backups/options` | Change the backup settings |
| `POST` | `/backups/reload` | Read the backup locations again |
| `POST` | `/backups/new/full` | Make a full backup |
| `POST` | `/backups/new/partial` | Make a partial backup |
| `POST` | `/backups/new/upload` | Upload a backup file |
| `GET` | `/backups/<backup>/info` | Details of a backup |
| `GET` | `/backups/<backup>/download` | Download a backup file |
| `DELETE` | `/backups/<backup>` | Delete a backup |
| `POST` | `/backups/<backup>/restore/full` | Restore everything from a backup |
| `POST` | `/backups/<backup>/restore/partial` | Restore parts of a backup |
| `POST` | `/backups/freeze` | Prepare the system for an external backup |
| `POST` | `/backups/thaw` | Undo a freeze |

## Locations

A backup can be stored in more than one place. A location is one of:

- `null` or `.local`: the local backup folder of the system
- The name of a [network mount](/apps/supervisor-api/host/#mounts) that is used for backups
- `.cloud_backup`: Home Assistant Link. Only Home Assistant Core can use this location

## Folders

Backups can include these folders: `share`, `ssl`, `media`, and `addons/local` (the local apps). The API also accepts `apps/local` for the local apps. In requests, the folder `homeassistant` means the same as `homeassistant: true`.

## List and settings

### `GET /backups`

Returns the backups.

| Key | Type | Description |
| --- | --- | --- |
| `backups` | list | A list of [backup models](/apps/supervisor-api/models/#backup) |

```json
{
  "backups": [
    {
      "slug": "a1b2c3d4",
      "name": "Before the update",
      "date": "2026-10-01T09:30:00.000000+00:00",
      "type": "partial",
      "size": 0.17,
      "size_bytes": 178257,
      "location": null,
      "locations": [null],
      "protected": false,
      "location_attributes": {
        ".local": {
          "protected": false,
          "size_bytes": 178257
        }
      },
      "compressed": true,
      "content": {
        "homeassistant": false,
        "addons": ["core_mosquitto"],
        "folders": ["share"]
      }
    }
  ]
}
```

### `GET /backups/info`

Returns the same list as `GET /backups`, plus the backup settings.

| Key | Type | Description |
| --- | --- | --- |
| `backups` | list | A list of [backup models](/apps/supervisor-api/models/#backup) |
| `days_until_stale` | integer | After how many days a backup counts as old |

### `POST /backups/options`

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `days_until_stale` | integer | No | After how many days a backup counts as old. At least 1 |

### `POST /backups/reload`

Reads all backup locations again, to pick up backup files that were added or removed outside of the Supervisor.

## Make a backup

### `POST /backups/new/full`

Makes a backup of everything: Home Assistant, all apps, and all folders.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | No | Name of the backup |
| `filename` | string | No | File name of the backup. Must end in `.tar` and contain no slashes |
| `password` | string or null | No | Password to encrypt the backup with |
| `compressed` | boolean or null | No | Compress the backup. Default `true` |
| `location` | string, null, or list | No | Where to store the backup. With a list, the first entry is the main location, and copies go to the others |
| `homeassistant_exclude_database` | boolean | No | Leave the Home Assistant database out |
| `background` | boolean | No | Return a `job_id` right away instead of waiting. Default `false` |
| `extra` | dictionary | No | Extra data to store with the backup |

When the backup is done, the response has the `job_id` and the `slug` of the new backup:

```json
{
  "job_id": "e2b7a9c4f1d34e5a8b6c0d1e2f3a4b5c",
  "slug": "a1b2c3d4"
}
```

### `POST /backups/new/partial`

Makes a backup of the parts you choose. Takes all keys of `POST /backups/new/full`, plus:

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `addons` | list or string | No | Slugs of the apps to include, or `ALL` for all installed apps |
| `folders` | list | No | [Folders](#folders) to include |
| `homeassistant` | boolean | No | Include Home Assistant |

```json
{
  "name": "Mosquitto and share",
  "addons": ["core_mosquitto"],
  "folders": ["share"]
}
```

### `POST /backups/new/upload`

Uploads a backup file. Send the `.tar` file as `multipart/form-data`. Responds with the `slug` of the backup.

| Query parameter | Description |
| --- | --- |
| `location` | Where to store the backup. Repeat it to store copies in more than one location |
| `filename` | File name to store the backup under. Must end in `.tar` |

## Use a backup

### `GET /backups/<backup>/info`

Returns the details of a backup.

| Key | Type | Description |
| --- | --- | --- |
| `slug` | string | ID of the backup |
| `type` | string | `full` or `partial` |
| `name` | string | Name of the backup |
| `date` | string | When the backup was made, in ISO 8601 |
| `size` | float | Size in MB |
| `size_bytes` | integer | Size in bytes |
| `compressed` | boolean | `true` if the backup is compressed |
| `protected` | boolean | `true` if the backup has a password |
| `location_attributes` | dictionary | `protected` and `size_bytes` per location. The local folder is `.local` |
| `supervisor_version` | string | Version of the Supervisor that made the backup |
| `homeassistant` | string or null | Version of Home Assistant in the backup, `null` if it is not included |
| `location` | string or null | The main location |
| `locations` | list | All locations the backup is stored in |
| `addons` | list | Apps in the backup, each with `slug`, `name`, `version`, and `size` |
| `repositories` | list | URLs of the app repositories that were added at the time |
| `folders` | list | Folders in the backup |
| `homeassistant_exclude_database` | boolean | `true` if the Home Assistant database was left out |
| `extra` | dictionary | Extra data stored with the backup |

### `GET /backups/<backup>/download`

Returns the backup as a `.tar` file. Use the `location` query parameter to pick the copy to download. Without it, you get the copy in the main location.

### `DELETE /backups/<backup>`

Deletes a backup.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `location` | string, null, or list | No | Only delete the copies in these locations. Without it, all copies are deleted |

### `POST /backups/<backup>/restore/full`

Restores everything in the backup. Home Assistant and the apps restart during the restore.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `password` | string or null | No | Password of the backup |
| `location` | string or null | No | The copy to restore from |
| `background` | boolean | No | Return a `job_id` right away instead of waiting. Default `false` |

Responds with the `job_id` of the restore.

### `POST /backups/<backup>/restore/partial`

Restores the parts you choose. Takes all keys of the full restore, plus:

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `addons` | list | No | Slugs of the apps to restore |
| `folders` | list | No | [Folders](#folders) to restore |
| `homeassistant` | boolean | No | Restore Home Assistant |

## External backups

### `POST /backups/freeze`

Prepares the system for a backup made outside the Supervisor, like a snapshot of a virtual machine. Home Assistant and the running apps get ready for the backup, the same way they do for a normal one. Apps with `backup: cold` stop.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `timeout` | integer | No | Seconds after which the system thaws by itself. Default 600 |

### `POST /backups/thaw`

Ends a freeze. Home Assistant and the apps go back to normal.
