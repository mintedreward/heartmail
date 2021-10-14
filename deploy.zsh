#!/bin/zsh

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source keys/.env.prod

# publish latest version to npm
lerna publish

# get the latest verision number we just created
version=`git describe --tags --exact-match`

# deploy coasian-web
cd $dir/js/coasian-web
echo Building coasian-web
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t coasian-web
docker tag coasian-web ryanxcharles/coasian-web:${version}
docker push ryanxcharles/coasian-web:${version}
echo Deploying coasian-web
ssh -F ssh_config -t coasian-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F ssh_config -t coasian-web-1 'docker kill $(docker ps -q)'
ssh -F ssh_config -t coasian-web-1 'docker rm $(docker ps -a -q)'
ssh -F ssh_config -t coasian-web-1 "docker run --detach -p 80:3000 ryanxcharles/coasian-web:${version}"
ssh -F ssh_config -t coasian-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F ssh_config -t coasian-web-2 'docker kill $(docker ps -q)'
ssh -F ssh_config -t coasian-web-2 'docker rm $(docker ps -a -q)'
ssh -F ssh_config -t coasian-web-2 "docker run --detach -p 80:3000 ryanxcharles/coasian-web:${version}"

# deploy openspv-web
cd $dir/js/openspv-web
echo Building openspv-web
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t openspv-web
docker tag openspv-web ryanxcharles/openspv-web:${version}
docker push ryanxcharles/openspv-web:${version}
echo Deploying openspv-web
ssh -F ssh_config -t openspv-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F ssh_config -t openspv-web-1 'docker kill $(docker ps -q)'
ssh -F ssh_config -t openspv-web-1 'docker rm $(docker ps -a -q)'
ssh -F ssh_config -t openspv-web-1 "docker run --detach -p 80:3000 ryanxcharles/openspv-web:${version}"
ssh -F ssh_config -t openspv-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F ssh_config -t openspv-web-2 'docker kill $(docker ps -q)'
ssh -F ssh_config -t openspv-web-2 'docker rm $(docker ps -a -q)'
ssh -F ssh_config -t openspv-web-2 "docker run --detach -p 80:3000 ryanxcharles/openspv-web:${version}"

# deploy heartmail-web
cd $dir/js/heartmail-web
echo Building heartmail-web
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t heartmail-web
docker tag heartmail-web ryanxcharles/heartmail-web:${version}
docker push ryanxcharles/heartmail-web:${version}
echo Deploying heartmail-web
ssh -F ssh_config -t heartmail-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F ssh_config -t heartmail-web-1 'docker kill $(docker ps -q)'
ssh -F ssh_config -t heartmail-web-1 'docker rm $(docker ps -a -q)'
ssh -F ssh_config -t heartmail-web-1 "docker run --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
ssh -F ssh_config -t heartmail-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F ssh_config -t heartmail-web-2 'docker kill $(docker ps -q)'
ssh -F ssh_config -t heartmail-web-2 'docker rm $(docker ps -a -q)'
ssh -F ssh_config -t heartmail-web-2 "docker run --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
