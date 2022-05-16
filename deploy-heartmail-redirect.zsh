#!/bin/zsh

# make sure we are in the btb source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env.local

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

cd $dir/heartmail-redirect

echo Building heartmail-redirect

docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t heartmail-redirect --platform linux/amd64
docker tag heartmail-redirect ryanxcharles/heartmail-redirect:${version}
docker push ryanxcharles/heartmail-redirect:${version}

echo Deploying heartmail-redirect

ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-1 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-1 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-1 "docker run --detach -p 80:3000 ryanxcharles/heartmail-redirect:${version}"
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-2 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-2 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-redirect-2 "docker run --detach -p 80:3000 ryanxcharles/heartmail-redirect:${version}"
