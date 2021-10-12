#!/bin/zsh
cd ~/Code/coasian
cp -r !(node_modules) js/openspv/* ../openspv
cd ../openspv
git add .
git commit -m "0.9.0"
git push origin master
