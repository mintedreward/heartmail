SW 2017: Transaction ancestry data structure
===========================================

Dependencies
------------

* SW 2016: Merkle proof data structure

Introduction
------------

When sending a transaction p2p, it is important to send both the input
transactions and the Merkle proofs of those transactions in order for the
recipient to verify (offline) that the transaction is valid. The **transaction
ancestry** is a data structure that includes all input transactions, and
possibly inputs of inputs, all the way back to the most recently confirmed
transactions, along with the Merkle proofs for all of those (confirmed)
transactions.

When a wallet receives a transaction with the transaction ancestry, the wallet
must verify that all input transactions contain valid Merkle proofs with a
Merkle root of a block that the wallet knows exists in the longest chain. And
they must verify that the transaction itself is actually valid using the usual
transaction verification method.