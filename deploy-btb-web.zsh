#!/bin/zsh

# make sure we are in the btb source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

cd $dir/btb-web

echo Building btb-web

docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t btb-web --platform linux/amd64
docker tag btb-web ryanxcharles/btb-web:${version}
docker push ryanxcharles/btb-web:${version}

echo Deploying btb-web

ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-1 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-1 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-1 "docker run --detach -p 80:3000 ryanxcharles/btb-web:${version}"
ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-2 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-2 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t btb-web-2 "docker run --detach -p 80:3000 ryanxcharles/btb-web:${version}"
