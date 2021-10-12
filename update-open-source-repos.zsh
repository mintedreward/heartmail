#!/bin/zsh

# tool to update all external open source repos that we control from source
# code contained inside the master repo. for now, this means just the OpenSPV
# project.

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

# assume openspv is in the same containing folder as coasian
# delete all non-hidden files in that repo
rm -rf ../openspv/*

# copy all files into external repo
rsync -aq --progress js/openspv/* ../openspv --exclude node_modules

# commit changes and push to github
cd ../openspv
git add .
git commit -m "commit"
git push origin master
