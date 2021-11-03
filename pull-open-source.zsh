#!/bin/zsh
git subtree add --prefix public/openspv git@github.com:openspv/openspv.git master --squash
git subtree pull --prefix=public/openspv openspv master
