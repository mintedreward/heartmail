#!/bin/zsh

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source keys/.env.prod

# publish latest version to npm
lerna publish

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

# deploy tob-web
cd $dir/js/tob-web
echo Building tob-web
echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t tob-web
rm .npmrc
docker tag tob-web ryanxcharles/tob-web:${version}
docker push ryanxcharles/tob-web:${version}
echo Deploying tob-web
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-1 "docker run --detach -p 80:3000 ryanxcharles/tob-web:${version}"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t tob-web-2 "docker run --detach -p 80:3000 ryanxcharles/tob-web:${version}"
