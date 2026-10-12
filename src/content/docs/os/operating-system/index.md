---
title: Home Assistant OS
description: What Home Assistant OS is made of, how it boots, and how its repository is organized.
order: 3
sidebarGroups:
  - Guides
  - Reference
  - Boards
---

Home Assistant OS is a Linux system with one job: running Home Assistant. It is not based on a distribution like Debian or Ubuntu. It is built from source with [Buildroot](https://buildroot.org/), one image per board, with only what Home Assistant needs.

Buildroot is a build system, not a distribution. It cross-compiles a toolchain, the kernel, a bootloader, and every package, and puts them together into a disk image. That makes it a good fit for small Arm boards, where building on the device itself would take forever.

## What is in it

- **Bootloader**: [GRUB](https://www.gnu.org/software/grub/) on UEFI systems (x86-64, generic Arm, and virtual machines), [U-Boot](https://docs.u-boot.org/) on most single board computers, and the firmware's own tryboot mechanism on Raspberry Pi 5.
- **Kernel**: mainline Linux on most boards, and the Raspberry Pi fork of Linux on Raspberry Pi and Home Assistant Yellow. `Documentation/kernel.md` in the repository lists the current versions.
- **Root file system**: [EROFS](https://docs.kernel.org/filesystems/erofs.html), compressed and read-only.
- **Init and services**: systemd, with NetworkManager for networking, systemd-timesyncd for time, and BlueZ for Bluetooth.
- **Containers**: the Docker engine, which runs the Supervisor and everything it manages.
- **Updates**: [RAUC](https://rauc.io/), with two system slots. See [the update system](/os/operating-system/update-system/).
- **Security**: the [AppArmor](https://apparmor.net/) kernel security module, with profiles for the Supervisor and apps.
- **Memory**: ZRAM for `/var` and `/tmp`, and a swap file on the data partition.
- **OS Agent**: a small program in the [os-agent](https://github.com/home-assistant/os-agent) repository. The Supervisor uses it over D-Bus for host tasks, like moving the data disk.

## How it boots

1. The bootloader picks a slot, A or B, and boots its kernel and root file system.
2. systemd mounts the overlay and data partitions, and binds the persistent folders into place. See [partitions](/os/operating-system/partitions/).
3. `haos-config.service` imports a `CONFIG` USB drive, if one is plugged in. See [configure the host](/os/operating-system/configuration/).
4. Docker starts, and `haos-supervisor.service` starts the Supervisor container, `hassio_supervisor`. If the image is missing or broken, the service downloads a fresh one first.
5. The Supervisor marks the slot as good with RAUC, and starts its plugins, Home Assistant Core, and the apps.

A fresh image contains the Supervisor and its plugins already, but not Home Assistant Core. It ships a small landing page instead. On first start, the Supervisor downloads the latest Core, so every new installation starts on a current version.

## The repository

[home-assistant/operating-system](https://github.com/home-assistant/operating-system) uses Buildroot's [br2-external mechanism](https://buildroot.org/downloads/manual/manual.html#outside-br-custom): everything specific to Home Assistant OS lives outside Buildroot, in `buildroot-external/`. Buildroot itself is a Git submodule in `buildroot/`, pointing at the [home-assistant/buildroot](https://github.com/home-assistant/buildroot) fork. That fork carries as few patches on top of upstream as possible.

| Path | What it holds |
| --- | --- |
| `buildroot-external/configs/` | One `<target>_defconfig` per build target |
| `buildroot-external/board/` | Per board: [metadata](/os/operating-system/board-metadata/), boot files, kernel config, and hooks |
| `buildroot-external/kernel/` | Kernel config fragments shared by all boards |
| `buildroot-external/package/` | Extra packages, like `hassio` (preloads the Supervisor) and `os-agent` |
| `buildroot-external/rootfs-overlay/` | Files copied into every image, like the `haos-*` systemd units |
| `buildroot-external/genimage/` | The disk layout, see [partitions](/os/operating-system/partitions/) |
| `buildroot-external/ota/` | The RAUC configuration, update manifest, and certificates |
| `buildroot-external/meta` | The OS version and deployment type |
| `scripts/` | Helper scripts, like `enter.sh` for the build container |
| `tests/` | Automated tests that boot the image in QEMU |

## Where to go next

- [Build an image](/os/operating-system/build/) to get a working setup.
- [Supported boards](/os/operating-system/boards/) lists every build target.
- [Releases and builds](/os/operating-system/releases/) explains how your change ends up in a release.
