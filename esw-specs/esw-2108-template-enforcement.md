ESW 8: Hash Transaction Template Enforcement
============================================

# Status
Draft

# Authors
* Connor Murray <connor@britevue.com>
* Dylan Murray <dylan@britevue.com>

# Dependencies
* ESW 107

# Specification

Reserve a space after the transaction header to add mechanism to enforce transaction structure

## Benefits
* Enables applications to enforce a transaction template for spending inputs
* The transaction template is stripped from the locking script and hashed using Stamps Script opcodes, enabling applications to offload validation of transaction template enforcement to the mining network
* Allows the creation of DAGs where the template only needs to be validated for unspent transaction
* Since the checking is done in script, easily allows applications to be confident in filtered subsets of transactions they care about
* Together with ESW 107 and ESW 109, enables a filtered overlay network

## Requirements

* Requires the use of the "transaction template identifier" outlined in ESW 107
* Requires access to this identifier prior to it dropping from the stack
* OP_PUSH_TX Technique
	* Preimage of transaction must be included in the unlocking script

## Additional Reading
* This idea was first fleshed out in [this post](https://mdtechnologies.medium.com/how-to-create-overlay-networks-inside-Stamps-script-a5f1a0504386) 

## Disclaimer
* The following format needs proper discussion and technical details solidified. Proposed format is used solely for the purposes of opening discussion.

## Proposed Extension to ESW 107
* Our "packet" structure becomes:
	* Header | Enforcement Mechanism | Data
* Where "Enforcement Mechanism" takes the form (using opcodes):
	* Get Transaction Template Identifier From Header | Get Input's Locking Script From Preimage | Strip Data From Locking Script | Hash Template | OP_EQUALVERIFY | OP_PUSH_TX
		* OP_PUSH_TX is used to ensure that we are working in the current transaction

## Discussion Items

* Similar to ESW 107, we should discuss where this goes in our "packet" structure
* "Enforcement Mechanism" will have variable size, so we should define size either in the header or in this structure

