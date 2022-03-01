SBW 13: Paymail authentication with revocation
==============================================

Dependencies
------------

* SBW 5: Paymail authentication without revocation
* SBW 13: Paymail signatures with revocation

Introduction
------------

Logging in with your paymail involves producing a signature. In the simple
formulation, SBW 4 ("without revocation"), we do not require using a
"revocation-enabled" paymail signature. In this formulation we do. This type of
authentication is the most secure and robust possible.