---
title: Generic systems
description: The generic x86-64 and aarch64 targets, for PCs and other systems that boot with UEFI.
sidebarLabel: Generic x86-64 and aarch64
sidebarGroup: Boards
order: 4
---

Two targets are not made for one board, but for any system that boots with UEFI.

| Target | Build target | For |
| --- | --- | --- |
| Generic x86-64 | `generic_x86_64` | Mini PCs, like an Intel NUC, and other 64-bit x86 computers |
| Generic aarch64 | `generic_aarch64` | 64-bit Arm systems with UEFI, and Arm virtual machines |

Both use GRUB, a GPT partition table, and the mainline Linux kernel. Their board files are in `buildroot-external/board/pc/` and `buildroot-external/board/arm-uefi/`.

## Requirements

- A 64-bit CPU of the right architecture
- UEFI boot, with secure boot turned off
- A disk the kernel supports, like SATA, NVMe, or eMMC
- A supported network card

The x86-64 kernel includes the common Intel and Realtek Ethernet drivers, and Intel Wi-Fi with its firmware. Bluetooth on Intel Wi-Fi cards works. Other hardware depends on what the kernel configuration includes: `buildroot-external/kernel/` and the `kernel.config` in the board folder.

## Installation

There is no installer. You write the image to the internal disk:

1. Boot the computer into a live Linux system, from USB or the network.
2. Download or copy the image, and unpack it with `unxz`.
3. Write it to the internal disk, with `dd` or a tool like balenaEtcher.
4. Reboot.

On first boot, the data partition grows to fill the disk.

## Consoles

The x86-64 image uses the screen as its console. If a system shows no console output, adding `nomodeset` to `cmdline.txt` on the boot partition can help. The aarch64 image also has a serial console on `ttyS0`.

## Generic aarch64 in virtual machines

Besides the disk image, the aarch64 target builds virtual disk images (VMDK, VDI, and QCOW2), for virtual machines on Arm hosts. The [virtual machine](/os/operating-system/virtual-machine/) page covers the requirements, they are the same.
