#!/bin/zsh

# make sure we are in the btb source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

cd $dir/heartmail-web

echo Building heartmail-web

docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t heartmail-web --platform linux/amd64
docker tag heartmail-web ryanxcharles/heartmail-web:${version}
docker push ryanxcharles/heartmail-web:${version}

echo Deploying heartmail-web

ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 "docker run --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 "docker run --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
