---
title: Encryption
description: Encrypt mobile_app webhook requests and responses with libsodium secret-key encryption.
order: 3
---

Webhook requests often travel over plain HTTP on the home network, and they carry location and sensor data. `mobile_app` can encrypt them both ways with [libsodium](https://doc.libsodium.org/). Always encrypt when you can.

## Turn it on

There are two ways:

- **At registration**: set `supports_encryption` to `true`. The response contains a `secret`.
- **Later**: send an [`enable_encryption`](#enable-it-later) request.

The `secret` is your key. Store it securely, and keep it for as long as the registration exists. There is no way to get it back: the user can't look it up in the UI, and you should not ask them to dig through hidden storage files. If you lose the key, or encryption keeps failing, create a new registration and tell the user.

Once encryption is on, Home Assistant refuses unencrypted requests from that registration, with a `400` and the error code `encryption_required`.

## How it works

The webhook uses the [secret-key authenticated encryption](https://doc.libsodium.org/secret-key_cryptography/secretbox) of libsodium, `crypto_secretbox` (XSalsa20 with Poly1305).

- **The key** is the `secret`, a string of 64 hexadecimal characters. Decode it from hex into the 32 byte key.
- **The plaintext** is the JSON of what would otherwise be in `data`. If a request type has no `data`, like `get_config`, encrypt an empty object, `{}`.
- **The ciphertext** is the nonce followed by the encrypted message, encoded as Base64 with the original alphabet and padding. That is `sodium_base64_VARIANT_ORIGINAL`.

Put it in the request instead of `data`:

```json
{
  "type": "update_location",
  "encrypted": true,
  "encrypted_data": "<Base64 nonce and ciphertext>"
}
```

Responses with content come back in the same shape, `{"encrypted": true, "encrypted_data": "..."}`, encrypted with the same key. Decrypt them the same way. A few responses are never encrypted, like the empty `{}` and the `encryption_required` error: [the response](/companion/mobile-app-api/sending-data/#the-response) lists them. Check whether a body has `encrypted` set before you decrypt it.

> [!NOTE]
> Older app versions used the secret differently: its first 32 characters as the raw key bytes. Home Assistant still accepts that for registrations that have never sent a request with the hex key. The first request that decrypts with the hex key switches the registration over for good, and responses follow. New apps should only use the hex-decoded key.

## Choose a library

Libsodium has bindings for most languages. For Swift, the official [swift-sodium](https://github.com/jedisct1/swift-sodium) is a good choice. For other languages, see the [list of bindings](https://doc.libsodium.org/bindings_for_other_languages). When there are several, pick one that is actively maintained and widely used.

## Enable it later

A registration may not have encryption, for example because it was made by an older app. Turn it on with:

```json
{
  "type": "enable_encryption"
}
```

The response contains the new secret:

```json
{
  "secret": "<64 hexadecimal characters>"
}
```

This request is not encrypted, and neither is its response. If encryption is already on, an unencrypted request gets the usual `encryption_required` error, and an encrypted one gets a `400` with the error code `encryption_already_enabled`.
