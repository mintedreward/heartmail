# Coasian SPV

Coasian SPV is an implementation of Simplified Payment Verification (SPV) as
described in the Bitcoin white paper [1].

---------------------------

* [ ] txbuilder: allow zero fee transactions
* [ ] txbuilder: allow zero dust transactions
* [ ] txbuilder: remove change requirement
* [ ] have documentation that is at least as good as bsv 1.x
* [ ] create migration guide from 1.x
* [ ] check types for all common methods
* [ ] update script interpreter to match genesis
* [ ] support spanish and chinese for bip 39 without increasing file size
* [ ] document benchmarks
* [ ] restore workers
* [ ] make it so that in TESTNET/MAINNET mode when you generate a new object, it gives you what you expect

---------------------------

Goals:

1. Support ease-of-use by being internally consistent. It should not be
   necessary to read the source code of a class or function to know how to use it.
   Once you know how to use part of the library, the other parts should feel
   natural.

2. Have 100% test coverage, or nearly so, so that the library is known to be
   reliable. This should include running standard test vectors from the reference
   implementation.

3. Library objects have an interface suitable for use with a command-line
   interface or other libraries and tools, in particular having toString,
   fromString, toJSON, fromJSON, toBuffer, fromBuffer, toHex, fromHex methods.

4. All standard features of the blockchain are implemented (or will be) and
   saved in lib/. All BIPs are correctly implemented and, where appropriate, saved
   as bip-xx.js in lib/ (since that is their standard name). In order to allow
   rapid development, Yours Bitcoin includes non-standard and experimental
   features. Any non-standard features (such as colored coins or stealth
   addresses) are labeled as such in index.js as well as in comments.

5. Expose everything, including dependencies. This makes it possible to develop
   apps that require fine-grained control over the basics, such as big numbers and
   points. However, it also means that you can hurt yourself if you misuse these
   primitives.

6. Use standard javascript conventions wherever possible so that other
   developers find the code easy to understand.

7. Minimize the use of dependencies so that all code can be easily audited.

8. All instance methods modify the state of the object and return the object,
   unless there is a good reason to do something different. To access the result
   of an instance method, you must access the object property(s) that it modifies.

9. Support web workers to unblock web wallet UIs when performing cryptography.

## Environment Variables

* `SPV_JS_BASE_URL` - Default "/".
* `SPV_JS_BUNDLE_FILE` - Default "spv.js"
* `SPV_JS_WORKER_FILE` - Default "spv-worker.js"
* `NETWORK` - Default "mainnet"

You can change the network to run the CLI in testnet mode:

```
NETWORK=testnet ./bin/spv.js
```

[1] "Bitcoin: A Peer-to-Peer Electronic Cash System", Satoshi Nakamoto.
https://craigwright.net/bitcoin-white-paper.pdf
