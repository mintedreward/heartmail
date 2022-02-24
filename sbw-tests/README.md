SBW Test Vectors
================

The Social Bitcoin Web (SBW) is a set of protocols specifying standard ways to
link identity/social to Bitcoin/tokens and the web. OpenSPV is the reference
implementation of each protocol in every language.

In order to faciliate the creation of implementations in different langauges,
the tests should be specified as JSON files that can be run in each programming
language. This directory contains the test vectors for each protocol which are
re-used in each implementation to ensure correctness.

JSON is used as the standard method for storing test vectors because this is
already what is used by the node implementation and JSON has wide support
across all programming languages.
