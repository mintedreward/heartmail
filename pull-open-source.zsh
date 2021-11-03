#!/bin/zsh
git subtree add --prefix public/bitcoin-sv git@github.com:bitcoin-sv/bitcoin-sv.git master --squash
git subtree pull --prefix=public/bitcoin-sv bitcoin-sv master
git subtree add --prefix public/openspv git@github.com:openspv/openspv.git master --squash
git subtree pull --prefix=public/openspv openspv master
