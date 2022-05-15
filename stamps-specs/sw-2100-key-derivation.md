SW 3: Key Derivation
=====================

We do not need mnemonics or BIP32/BIP44. Because the user never needs to see
their keys with 2FF, we can use normal private keys. And because the recovery
feature of BIP32/BIP44 is incompatible with large blocks, we should simply drop
it and do key derivation simpler.

The simplest way to do key derivation is to generate a new random key stored on
a server (possible operated by the user) which can be *added* to the user's
master key to get new keys. This version allows third parties to generate keys
on behalf of the user and is far simpler than BIP32/BIP44. The biggest
difference is that the user must keep track of a key for every key they
generate. This is not a problem with modern cloud storage as the user can have
ever-growing amounts of data with almost zero risk of data loss.