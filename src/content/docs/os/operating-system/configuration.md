---
title: Configure the host
description: Change host settings on Home Assistant OS with a CONFIG USB drive, or directly in the persistent folders on the host.
sidebarLabel: Configure the host
sidebarGroup: Guides
order: 3
---

The root file system of Home Assistant OS is read-only. Settings that need to survive a reboot or an update live on the overlay partition, and are bind mounted into place. You can change them in two ways: with a `CONFIG` USB drive, or directly on the host shell.

Most users never need any of this. The Supervisor covers networking, the hostname, swap, and the data disk through the UI and the `ha` command line. This page is for what it does not cover, and for development and debugging.

## The CONFIG USB drive

Format a USB drive with FAT32, exFAT, ext4, or NTFS, and give it the label `CONFIG`, in capitals. It has to be the label of the file system: Home Assistant OS ignores the name of the partition. Put the files you need in its root:

```text
network/
modules/
modprobe/
udev/
authorized_keys
timesyncd.conf
haos_<board>-<version>.raucb
```

| Entry | What it does |
| --- | --- |
| `network/` | NetworkManager connection files. Replaces all existing connections. See [configure networking](/os/operating-system/networking/). |
| `modules/` | Files for `/etc/modules-load.d`, to load kernel modules at boot. Replaces the existing files. |
| `modprobe/` | Files for `/etc/modprobe.d`, to set kernel module options. Replaces the existing files. |
| `udev/` | Files for `/etc/udev/rules.d`. Replaces the existing rules. |
| `authorized_keys` | Public SSH keys for root, and starts SSH on port 22222. See [debug the host](/os/operating-system/debugging/). |
| `timesyncd.conf` | Your own time server settings. Stored as a drop-in in `/etc/systemd/timesyncd.conf.d/`. |
| `*.raucb` | An update bundle to install. Only from a USB drive, and only when the system has been up for 5 minutes. |

Use Unix line endings (LF) in every text file. Windows line endings (CRLF) break them. Most code editors, like Visual Studio Code, can switch the line endings of a file.

> [!WARNING]
> The import mirrors the drive. A drive without an `authorized_keys` file removes the keys that are on the host, and stops SSH on port 22222. The same goes for the folders: whatever is in `network/` replaces every connection on the host.

### When the drive is read

`haos-config.service` reads the drive at every boot. To import it on a running system, run one of these:

```shell
# From the Home Assistant CLI
ha os import

# From the host shell
systemctl restart haos-config
```

You only need the drive plugged in while it imports. You can remove it afterwards.

Because of the 5 minute rule, an update bundle is never installed during boot. Plug in the drive once the system is running, and run `ha os import`.

### Without a USB drive

You can also create a `CONFIG` folder in the root of the boot partition, with the same content. That is handy for virtual machines, or before the first boot of a freshly flashed SD card. It is only used when there is no USB drive labeled `CONFIG`, and the folder is deleted after the import. Update bundles are not installed from it.

## Persistent folders on the host

On the host shell, these paths are bind mounts from the overlay partition. What you change there survives reboots and OS updates:

| Path | What for |
| --- | --- |
| `/etc/NetworkManager/system-connections` | Network connections |
| `/etc/modules-load.d` | Kernel modules to load at boot |
| `/etc/modprobe.d` | Kernel module options |
| `/etc/udev/rules.d` | udev rules |
| `/etc/sysctl.d` | Kernel parameters |
| `/etc/systemd/timesyncd.conf.d` | Time server settings |
| `/etc/hostname`, `/etc/hosts` | The hostname, and static host names |
| `/etc/default` | Settings for host services, like the swap file |
| `/etc/usb_modeswitch.d` | USB mode switching for modems |
| `/root/.ssh` | SSH keys for root |

Everything else under `/etc` comes from the read-only image, and changes there are lost on the next reboot.

## Kernel command line

Add kernel parameters to `cmdline.txt` on the boot partition. The bootloader reads it and appends it to the kernel command line. On the host, the boot partition is mounted at `/mnt/boot`. On most boards, it is also the first partition that shows up when you put the SD card or disk in another computer.

The defaults differ per board. On many boards, `cmdline.txt` sets the consoles, see [debug the host](/os/operating-system/debugging/#serial-console).

## Time servers

Home Assistant OS uses systemd-timesyncd. It uses the time servers a DHCP server announces, and falls back to `time.cloudflare.com`. To use your own, put them in a `timesyncd.conf` on the `CONFIG` drive:

```ini
[Time]
NTP=ntp.example.com
```

Or create a file in `/etc/systemd/timesyncd.conf.d/` on the host directly.

## Swap

Home Assistant OS uses a swap file on the data partition. By default, it is a third of the memory, at least 1 GiB and at most 4 GiB. Change it with the CLI:

```shell
ha os config swap options --swap-size=2G --swappiness=10
```

The OS Agent stores the size in `/etc/default/haos-swapfile`, as `SWAPSIZE`. A size of 0 turns the swap file off. The change takes effect after a reboot, and the Supervisor raises a repair issue to say so.
