# Coasian Keys

Coasian Keys is a secure container for Bitcoin keys that can be used to build,
sign, and send Bitcoin transactions as well as encrypt and decrypt data,
on-chain or off-chain. You can think of it like a Hardware Security module (HSM)
except written entirely in software. In can become compatible with actual HSMs
over time.

## API

```js
const keys = new CoasianKeys ()

await keys.getPermission(config)

await keys.getUtxos(config)

await keys.getBalance(config)

await keys.txBuilder()
```

## Web browser

The interface works through an iframe.

## Node.js

The keys are copied to the server but are not exposed and must be accessed
through the API. The user must acknowledge that the keys are being copied to the
server and must grant permission for this mechanism to work.

Because the user may not want to copy their root keys, it is possible

## Mobile

The implementation will be done in javascript first which works on mobile web
and through web views. After the working javascript version, we will produce an
Apple version (Swift) and an Android version (Java).
