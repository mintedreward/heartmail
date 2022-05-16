ESW 107: Hash Transaction Templates
==================================

# Status
Draft

# Authors
* Connor Murray - connor@britevue.com
* Dylan Murray - dylan@britevue.com

# Dependencies
* Does not depend on ESW 108, but its structure does depend on what comes out of ESW 108

# Specification

Standardize the format of transaction templates such that new templates can be easily defined and recognized by various services. Model a Transaction after IPv4/IPv6 structuring

## Benefits
* Enables applications to easily recognize "non-standard" transaction templates from other services
* Enables miners to easily recognize templates, allowing them to more easily offer varying fee rates based on templating
* Enables infrastructure services to easily parse scripts for data APIs

## Requirements

* The first X bytes of the transaction output contain a script template header, similar to IP Packet Header
* Included in the header is 20-32 bytes containing a hash of the entire transaction template
* The hash is used as the template identifier for other services
* A hash is utilized so that services can utilize the hashing opcodes in Stamps Script to enforce transaction templates across inputs and outputs, as defined in ESW 108
* We define "transaction template" as the entire locking script stripped of all data in the script, leaving only opcodes

## Disclaimer
* The following proposed header format needs proper discussion and technical details solidified. Proposed format is used solely for the purposes of opening discussion.

## Proposed Template Header Structure

### Header
Proposed Header Fields:

* Version
	* Version of Template

* Transaction Header Length (THL)
	* The header will most likely be variable in size similar to Internet Header Length, to enable other options to be included in header
* Template Length
	* This field defines the template size in bytes. Should be equivalent to what OP_SIZE returns given script template
* Hashing Algorithm
	* Hashing Algorithm to Determine Transaction Template Identifier: Restrict to the hashing algorithms used in Stamps Script
		* 0: SHA1
		* 1: SHA256
		* 2: RIPEMD160
		* 3: HASH160 (SHA256 then RIPEMD-160)
		* 4: HASH256 (Double SHA256 Hash)
* Fixed Length PUSHDATA
	* Denotes whether the byte prefix of each PUSHDATA operation is included in the transaction template
	* Since some transaction templates will contain data of varying lengths this is necessary when defining the template
		* 0: No
		* 1: Yes
* Script Template Length
	* Length of script template - should match exactly what OP_SIZE would return if the template was fed into Stamps Script
* Transaction Template Identifier
	* Hash of Transaction Template 
* Header Checksum
	* TODO: This is omitted from IPV6 - not sure if it's really needed here
	* A checksum (or hash) of the header. If hash is invalid the transaction is dropped from broadcast. Can be such that this field is formatted:
		* [checksum] OP_HASH OP_EQUALVERIFY

### Template Enforcement
* Outlined in ESW 108

## Discussion Items

* The header should be dropped from the stack through either an EQUALVERIFY function or through OP_DROP
	* Should checksum be separated from header? Should it always be dropped via EQUALVERIFY
	* Or, should header fields be separate pushdatas? And OP_CAT is performed in the checksum field, or something like that
	* We will want access to header fields (such as transaction template identifier outlined in ESW 108), so there must exist a way for these fields to be accessed prior to dropping from the stack


