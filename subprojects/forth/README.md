# Coasian Forth

Coasian Forth is a distributed Forth interpreter on Bitcoin that can be used to
build, sign, and send arbitrarily complex Bitcoin transactions as well as
encrypt and decrypt data, on-chain or off-chain. You can think of it like a
Forth layer on top of a Hardware Security module (HSM) except written entirely
in software. In can become compatible with actual HSMs over time.

## API

On web: Coasian Forth = iframe, all APIs are postMessage API. So therefore,
Handcash needs to provide the iframe and standardized postMessage API.

```js
const forth = new CoasianForth ()

await forth.getPermission(config)

await forth.getUtxos(config)

await forth.getBalance(config)

await forth.txBuilder()

await forth.registerForth(outputForthTemplate, inputForthTemplate)
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
