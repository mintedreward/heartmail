#!/bin/zsh
version=`npm view @openspv/lib version`
git add .
git commit -m "$version"
git subtree push --prefix=public/openspv openspv master
