#!/bin/zsh

# tool to update all external open source repos that we control from source
# code contained inside the master repo. for now, this means just the OpenSPV
# project.

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# get all open-source repos ("subtree" - currently only OpenSPV)
git subtree pull --prefix=private/openspv openspv master

# update on github
version=`npm view @openspv/lib version`
git add .
git commit -m "$version"
cd $dir
git subtree push --prefix=private/openspv openspv master
