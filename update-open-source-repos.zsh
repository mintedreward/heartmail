#!/bin/zsh

# Sync all public code to external repos by pulling and then pushing. Right now
# this means just the OpenSPV repo containing all OpenSPV subprojects.

git subtree add --prefix private/openspv git@github.com:openspv/openspv.git master --squash

# get all open-source repos ("subtree" - currently only OpenSPV)
git subtree pull --prefix=private/openspv openspv master

# update on github
version=`npm view @openspv/lib version`
git add .
git commit -m "$version"
git subtree push --prefix=private/openspv openspv master
