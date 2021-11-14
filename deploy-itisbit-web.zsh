#!/bin/zsh

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env.prod

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

# deploy itisbit-web
cd $dir/itisbit-web
yarn version minor
yarn npm publish

echo Building itisbit-web
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t itisbit-web --platform linux/amd64
docker tag itisbit-web ryanxcharles/itisbit-web:${version}
docker push ryanxcharles/itisbit-web:${version}

echo Deploying itisbit-web
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-1 "docker run --detach -p 80:3000 ryanxcharles/itisbit-web:${version}"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t itisbit-web-2 "docker run --detach -p 80:3000 ryanxcharles/itisbit-web:${version}"
