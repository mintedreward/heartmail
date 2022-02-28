SBW 17: Merkle proof service
============================

Dependencies
------------

* SBW 15: Merkle proof data structures

Introduction
------------

In order for wallets to send around Merkle proof, they must get them from somewhere. The natural place to get them is from a miner, but it may not be. We need to specify a type of service that a wallet can use to get Merkle proofs. These can be miners - if so, the miner uses the standard Merkle proof API to be compatible with all wallets.