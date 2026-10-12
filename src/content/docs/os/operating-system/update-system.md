---
title: The update system
description: How Home Assistant OS updates itself with RAUC and two boot slots, how bundles are signed, and how to install your own build.
sidebarGroup: Reference
order: 2
---

Home Assistant OS updates with [RAUC](https://rauc.io/), an image based update system for embedded Linux. An update does not change files on a running system. It writes a complete new kernel and root file system to the slot that is not running, and boots into it. If that does not work, the device goes back to the slot it came from.

The [RAUC documentation](https://rauc.readthedocs.io/) explains RAUC itself. This page covers how Home Assistant OS uses it.

## Update bundles

Every build produces a disk image for new installations, and a RAUC update bundle, a `.raucb` file, for existing ones. Both are made from the same partition images. A bundle contains:

- The boot partition content
- The kernel image
- The root file system
- The secondary program loader (SPL), on boards that have one

The manifest template, `buildroot-external/ota/manifest.raucm.gtpl`, defines the content. It is the same for every board. The bundle's `compatible` value is `haos-<board id>`, like `haos-rpi4-64`, so a bundle only installs on the board it was built for.

The boot partition is not part of the A/B scheme: an update writes it in place. The update hook, `buildroot-external/ota/rauc-hook`, keeps the `.txt` files on it, like `cmdline.txt` and `config.txt`, so user changes to those survive updates.

## How an update runs

RAUC runs as a system service and offers a D-Bus API. In normal use, the Supervisor drives it:

1. The Supervisor downloads the bundle of the new version.
2. It asks RAUC over D-Bus to install it. For RAUC, this is a local installation from a file.
3. RAUC writes the inactive slot, and tells the bootloader to try that slot next.
4. The update is now installed, but not active. The Supervisor reports it as `version_pending` and raises a repair issue that a reboot is needed. It does not reboot by itself.
5. The user, or whatever started the update, reboots the system, and it boots into the new slot.
6. Once the Supervisor has started, it marks the booted slot as good.

You can do the same by hand on the host shell. To install a bundle, see [debug the host](/os/operating-system/debugging/) for a shell:

```shell
cd /mnt/data
REPO=https://github.com/home-assistant/operating-system
curl -LO "$REPO/releases/download/18.3/haos_rpi4-64-18.3.raucb"
rauc install haos_rpi4-64-18.3.raucb
systemctl reboot
```

> [!NOTE]
> On Raspberry Pi 5, always reboot with `systemctl reboot`. It boots the new slot with the firmware's tryboot mechanism, which needs the reboot parameter that `systemctl reboot` passes. A plain `reboot` starts the old slot again.

## Boot slots

There are two slots, A and B. A new installation only has slot A filled. The first update goes to B, the next one to A again, and so on.

`ha os info` shows the slot that is running. On the host shell, `rauc status` shows the full picture:

```text
=== System Info ===
Compatible:  haos-rpi4-64
Booted from: kernel.0 (A)

=== Slot States ===
x [kernel.0] (/dev/disk/by-partlabel/hassos-kernel0, raw, booted)
        bootname: A
        boot status: good
    [rootfs.0] (/dev/disk/by-partlabel/hassos-system0, raw, active)

o [kernel.1] (/dev/disk/by-partlabel/hassos-kernel1, raw, inactive)
        bootname: B
        boot status: good
    [rootfs.1] (/dev/disk/by-partlabel/hassos-system1, raw, inactive)
```

After an update, the bootloader tries the new slot a limited number of times, three on GRUB. If it never gets marked as good, the bootloader falls back to the other slot. How this works depends on the bootloader:

- **GRUB** keeps the slot order and attempts in its environment file, `EFI/BOOT/grubenv` on the boot partition. Its boot menu also lets you pick a slot by hand.
- **U-Boot** keeps them in its environment, on the `hassos-bootstate` partition.
- **Raspberry Pi 5** uses the firmware's tryboot mechanism, through a custom RAUC backend.

To switch slots yourself, use `ha os boot-slot A` or `ha os boot-slot B`. The chosen slot stays the default until you change it again, or an update does.

## Security

Update bundles are signed, and RAUC checks the signature against the keyring in `/etc/rauc/keyring.pem` before it installs anything. Home Assistant OS has its own public key infrastructure, with a development and a release certificate authority. All public builds are signed by the release chain.

Which certificates an image trusts depends on its [deployment type](/os/operating-system/releases/#deployment-types):

- **Production and staging** images trust the release certificate authority.
- **Development** images trust the development and the release certificate authorities.

On top of that, every image you build yourself trusts your own self-signed certificate, the `cert.pem` in the root of the repository. See [build an image](/os/operating-system/build/#signing). So an image you built accepts bundles from your later builds, and still accepts official releases.

### Install a self-signed build

An official installation does not trust your certificate. Installing your bundle there fails:

```text
LastError: signature verification failed: Verify error:self signed certificate
```

Home Assistant OS is not locked down, though. With root on the host, you can add your certificate to the keyring for the current boot. Copy `cert.pem` from the root of your repository to `/mnt/data` on the device first:

```shell
cp -r /etc/rauc/ /tmp/rauc
cat /mnt/data/cert.pem >> /tmp/rauc/keyring.pem
mount -o bind /tmp/rauc/ /etc/rauc/
systemctl restart rauc
rauc install /mnt/data/haos_rpi4-64-18.4.dev0.raucb
```

The bind mount is gone after a reboot, but your build has your certificate in its own keyring. From then on, the device accepts your later builds, and official releases too, so you can always update back to a release.
