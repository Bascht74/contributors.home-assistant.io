---
title: Board metadata
description: The variables in the meta file of every board, and the version file shared by all of them.
sidebarGroup: Reference
order: 3
---

Every board folder in `buildroot-external/board/` has a file named `meta`. It describes the board to the build scripts: how to name the image, which bootloader and partition table to use, and which Supervisor images to pull. The build scripts read it as shell variables, together with the shared `buildroot-external/meta`.

Here is the one for Home Assistant Green:

```shell
BOARD_ID=green
BOARD_NAME="Home Assistant Green"
CHASSIS=embedded
BOOTLOADER=uboot
KERNEL_FILE=Image
PARTITION_TABLE_TYPE=hybrid
BOOT_SIZE=16M
BOOT_SPL=true
BOOT_SPL_SIZE=16M
BOOT_ENV_SIZE=0x8000
SUPERVISOR_MACHINE=green
SUPERVISOR_ARCH=aarch64
```

## Board

| Variable | Meaning |
| --- | --- |
| `BOARD_ID` | The board identifier, in lowercase. Used in the image file name, like `haos_green-18.3.img.xz`, in the RAUC `compatible` value, and as `VARIANT_ID` in `/usr/lib/os-release`. |
| `BOARD_NAME` | The human readable name. Used in `VERSION` and `VARIANT` in `/usr/lib/os-release`. |
| `CHASSIS` | The systemd chassis type, written to `/etc/machine-info`. `embedded` for boards, `vm` for the virtual machine images. |

## Boot

| Variable | Meaning |
| --- | --- |
| `BOOTLOADER` | `uboot`, `grub`, or `tryboot`. GRUB is used on UEFI systems, tryboot on Raspberry Pi 5, U-Boot everywhere else. It sets the RAUC bootloader backend, see [the update system](/os/operating-system/update-system/#boot-slots). |
| `KERNEL_FILE` | The file name of the kernel binary: `Image` on aarch64, `bzImage` on x86-64. |
| `PARTITION_TABLE_TYPE` | `gpt`, `hybrid`, or `mbr`. Home Assistant OS uses GPT where it can. GPT needs the second block of the disk for its header. Some boot ROMs need that block themselves, and then the board uses `mbr`. `hybrid` writes both tables, for boards where GPT works but the firmware still reads the MBR. See [partitions](/os/operating-system/partitions/). |
| `BOOT_SIZE` | The size of the boot partition, like `32M`. |
| `BOOT_SPL` | `true` or `false`. Whether the board has a secondary program loader (SPL), a small first stage loader that U-Boot builds for some boards. With `true`, the image reserves room for it, and update bundles include it. |
| `BOOT_SPL_SIZE` | The room reserved for the SPL, like `8M`. Only with `BOOT_SPL=true`. |
| `BOOT_ENV_SIZE` | The size of the U-Boot environment, in hexadecimal, like `0x4000`. RAUC needs it to read and write the environment on the `hassos-bootstate` partition. Only for U-Boot boards. |

## Supervisor

| Variable | Meaning |
| --- | --- |
| `SUPERVISOR_MACHINE` | The machine type. The Supervisor uses it to pick the right Home Assistant Core image, and apps use it to limit which machines they support. Several boards can share one, like `odroid-m1` for the ODROID-M1 and M1S. The current values are listed on [supported boards](/os/operating-system/boards/). |
| `SUPERVISOR_ARCH` | The CPU architecture of the containers: `aarch64` or `amd64`. 32-bit architectures are no longer supported. |

Both end up in `/usr/lib/os-release`. The `haos-supervisor` service uses the architecture to pick the Supervisor image, and passes the machine to the Supervisor container.

## The shared version file

`buildroot-external/meta` applies to every board:

```shell
VERSION_MAJOR="18"
VERSION_MINOR="4"
VERSION_SUFFIX="dev0"

HAOS_NAME="Home Assistant OS"
HAOS_ID="haos"

DEPLOYMENT="development"
```

| Variable | Meaning |
| --- | --- |
| `VERSION_MAJOR`, `VERSION_MINOR`, `VERSION_SUFFIX` | Together they form the version, like `18.4.dev0`, or `18.4` without a suffix. See [releases and builds](/os/operating-system/releases/#version-numbers). |
| `HAOS_NAME`, `HAOS_ID` | The name and identifier of the operating system, used in `/usr/lib/os-release` and the image file names. |
| `DEPLOYMENT` | `development`, `staging`, or `production`. Sets which certificates the image trusts for updates, see [the update system](/os/operating-system/update-system/#security). |
