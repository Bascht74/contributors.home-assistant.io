---
title: Security rating
description: How the Supervisor computes the security rating of an app, from 1 to 8, and which choices move it up or down.
order: 5
---

Every app has a security rating, shown on its page as a number from 1 to 8. Higher is better. Users look at it before they install your app, so it is worth a look before you publish. The Supervisor computes it from your configuration ([`rating_security`](https://github.com/home-assistant/supervisor/blob/main/supervisor/apps/utils.py) in the Supervisor code).

## How it is computed

Every app starts at 5. Then:

| Condition | Change |
| --- | --- |
| A custom AppArmor profile (`apparmor.txt`) is loaded | +1 |
| `apparmor: false` | -1 |
| `ingress: true` | +2 |
| No ingress, but also no host network and no port mapped to the host | +2 |
| No ingress, but `auth_api: true` (and a host network or a mapped port) | +1 |
| Any of the capabilities `BPF`, `CHECKPOINT_RESTORE`, `DAC_READ_SEARCH`, `NET_ADMIN`, `NET_RAW`, `PERFMON`, `SYS_ADMIN`, `SYS_MODULE`, `SYS_PTRACE`, or `SYS_RAWIO` in `privileged`, or `kernel_modules: true` | -1, once |
| `hassio_role: manager` | -1 |
| `hassio_role: admin` | -2 |
| `host_network: true` | -1 |
| `host_pid: true` | -2 |
| `host_uts: true` together with `SYS_ADMIN` in `privileged` | -1 |
| `docker_api: true` or `full_access: true` | Rating is 1, no matter what else |

The result is kept between 1 and 8. Only one of the ingress, no-exposure, and `auth_api` bonuses counts, in that order.

A few things to note:

- The AppArmor bonus counts once your profile is loaded, which happens when the app is installed. Before that, the app store shows the rating without it.
- A port with a host port of `null` in `config.yaml` is off by default and does not count as mapped. The rating looks at your configuration, not at the ports the user turns on.
- The code has a bonus for signed images, but it is not used: no app gets it today.
- `AUDIT_WRITE`, `MKNOD`, `SETFCAP`, `IPC_LOCK`, `SYS_NICE`, `SYS_RESOURCE`, and `SYS_TIME` do not change the rating.

## Example

An app with ingress, a custom AppArmor profile, and no other privileges gets 5 + 2 + 1 = 8. The same app with `host_network: true` and `NET_ADMIN` gets 5 + 2 + 1 - 1 - 1 = 6.

To raise the rating of your app, see [Secure your app](/apps/guides/security/).
