#!/bin/zsh

# tool to update all external open source repos that we control from source
# code contained inside the master repo. for now, this means just the OpenSPV
# project.

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# get all open-source repos ("subtree" - currently only OpenSPV)
git subtree pull-all

# delete all non-hidden files in OpenSPV
cd $dir/open-source/openspv
rm -rf ./*
rm ./.*

# copy all files from the latest version on npm
curl `npm view openspv dist.tarball` > openspv.tgz
tar -xzf openspv.tgz
mv package/* ./
mv package/.* ./
rmdir package

# update on github
#version=`npm view openspv version`
#git add .
#git commit -m "$version"
#git push origin master
