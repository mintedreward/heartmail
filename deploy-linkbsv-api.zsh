#!/bin/zsh

# make sure we are in the btb source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

cd $dir/linkbsv-api
yarn version minor

echo Building linkbsv-api

docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t linkbsv-api --platform linux/amd64
docker tag linkbsv-api ryanxcharles/linkbsv-api:${version}
docker push ryanxcharles/linkbsv-api:${version}

echo Deploying linkbsv-api

ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-1 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-1 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-1 "docker run --detach -p 80:3000 ryanxcharles/linkbsv-api:${version}"
ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-2 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-2 'docker rm $(docker ps -a -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t linkbsv-api-2 "docker run --detach -p 80:3000 ryanxcharles/linkbsv-api:${version}"
