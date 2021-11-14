#!/bin/zsh

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env.prod

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

cd $dir/coasian-web
yarn version minor

echo Building coasian-web
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t coasian-web --platform linux/amd64
docker tag coasian-web ryanxcharles/coasian-web:${version}
docker push ryanxcharles/coasian-web:${version}

echo Deploying coasian-web
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-1 "docker run --detach -p 80:3000 ryanxcharles/coasian-web:${version}"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t coasian-web-2 "docker run --detach -p 80:3000 ryanxcharles/coasian-web:${version}"
