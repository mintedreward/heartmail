SBW 2020: Paid Merkle proof service
=================================

Dependencies
------------
* SBW 2019: SPV payments

Introduction
------------
It costs money to produce and send Merkle proofs. Although SPV wallets need them
to function, they also need to pay for them somehow (this does not necessarily
mean the user has to pay for them - but somebody does). Thus true SPV wallets
need to use SPV to actually pay for the Merkle proofs.

A way this is likely to be configured is that the wallet provider will actually
pay miners or Merkle proof services for the Merkle proofs, and the user will pay
some fixed fee (or look at ads) to use the wallet.

What this protocol is for is just a standard way for anyone to pay a Merkle
proof service for the Merkle proofs.

This specification closes the loop on SPV and means all aspects of SPV
implementation are complete.