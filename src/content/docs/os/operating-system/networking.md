---
title: Configure networking
description: How Home Assistant OS manages the network with NetworkManager, and how to configure what the UI does not cover.
sidebarLabel: Configure networking
sidebarGroup: Guides
order: 4
---

Home Assistant OS uses [NetworkManager](https://networkmanager.dev/) for the host network. Out of the box there is no connection profile at all: NetworkManager connects wired interfaces automatically, with DHCP for IPv4 and automatic configuration for IPv6.

## Three ways to configure it

1. **The UI**: under **Settings** > **System** > **Network**. Most users never need anything else.
2. **The CLI**: `ha network` covers what the UI does, and more, like VLANs.
3. **NetworkManager directly**: connection files on a `CONFIG` USB drive, or `nmcli` on the host. For anything the first two do not support.

When you change a setting through the UI or the CLI, the Supervisor updates the active connection profile of that interface. If there is none, it creates one named `Supervisor <interface>`, like `Supervisor eth0`. So a profile you wrote yourself can be changed later by a user in the UI.

## With the CLI

`ha network info` lists the interfaces. `default` is a shortcut for the primary interface. To go back to DHCP on it:

```shell
ha network update default --ipv4-method auto
```

A static IPv4 address:

```shell
ha network update eth0 --ipv4-method static \
  --ipv4-address 192.168.1.10/24 --ipv4-gateway 192.168.1.1 \
  --ipv4-nameserver 192.168.1.1
```

Wi-Fi works too, on boards that have it. A wired connection is more reliable, so recommend that where you can:

```shell
ha network update wlan0 --ipv4-method auto \
  --wifi-mode infrastructure --wifi-ssid "My network" \
  --wifi-auth wpa-psk --wifi-psk "My password"
```

Run `ha network update --help` for every option.

## With connection files

NetworkManager reads connection profiles in its keyfile format from `/etc/NetworkManager/system-connections`, which is persistent. You can put files there on the host shell, or ship them in the `network/` folder of a [CONFIG USB drive](/os/operating-system/configuration/#the-config-usb-drive). The drive replaces all existing connections with its own.

Only connection files are supported. Changes to `NetworkManager.conf` itself are not, it is part of the read-only image. The [NetworkManager settings reference](https://networkmanager.dev/docs/api/latest/nm-settings-keyfile.html) documents every option.

Give each connection its own UUID, generated once, like with `uuidgen`. Without a fixed UUID, the connection changes identity, and can get a different address after every boot. Save files with Unix line endings (LF).

### Wired, with DHCP

```ini
[connection]
id=my-network
uuid=d55162b4-6152-4310-9312-8f4c54d86afa
type=ethernet

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

### Static IPv4 address

Replace the `[ipv4]` section:

```ini
[ipv4]
method=manual
address1=192.168.1.111/24,192.168.1.1
dns=192.168.1.1;
```

`address1` is the address with its prefix length, then the gateway.

### Wi-Fi with WPA

```ini
[connection]
id=my-wifi
uuid=72111c67-4a5d-4d5c-925e-f8ee26efb3c3
type=wifi

[wifi]
mode=infrastructure
ssid=MY_SSID
# Uncomment when the network does not broadcast its name
# hidden=true

[wifi-security]
auth-alg=open
key-mgmt=wpa-psk
psk=MY_PASSWORD

[ipv4]
method=auto

[ipv6]
addr-gen-mode=stable-privacy
method=auto
```

Home Assistant OS turns Wi-Fi power saving off by default. To turn it on for one connection, add `powersave=3` to its `[wifi]` section.

## With nmcli on the host

On the host shell, `nmcli` gives you all of NetworkManager. `nmcli con show` lists the profiles. For example, to set a static address on a profile named `Supervisor eth0`:

```shell
nmcli con mod "Supervisor eth0" ipv4.method manual \
  ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 \
  ipv4.dns 192.168.1.1
nmcli con up "Supervisor eth0"
```

If there is no profile yet, create one with `nmcli con add`, or set the interface once through the CLI first.

## Reset the network

To throw away every connection profile and go back to the defaults, remove them on the host shell and reboot:

```shell
rm -r /mnt/overlay/etc/NetworkManager/system-connections/*
reboot
```

## Defaults worth knowing

Most of these come from `NetworkManager.conf` in the image:

- mDNS and LLMNR are on for every connection, so the system answers to `homeassistant.local`.
- NetworkManager checks connectivity every 10 minutes, against `checkonline.home-assistant.io`.
- Docker's bridges and virtual interfaces are not managed by NetworkManager.
- Time servers that a DHCP server announces are passed on to systemd-timesyncd, by the NetworkManager dispatcher script `10-ntp`.
