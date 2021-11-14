#!/bin/zsh

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env.prod

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

# deploy openspv-web
cd $dir/openspv-web
yarn version minor
yarn npm publish

echo Building openspv-web
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t openspv-web --platform linux/amd64
docker tag openspv-web ryanxcharles/openspv-web:${version}
docker push ryanxcharles/openspv-web:${version}

echo Deploying openspv-web
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-1 "docker run --detach -p 80:3000 ryanxcharles/openspv-web:${version}"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t openspv-web-2 "docker run --detach -p 80:3000 ryanxcharles/openspv-web:${version}"
