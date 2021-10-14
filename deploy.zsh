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
echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t coasian-web
rm .npmrc
docker tag coasian-web ryanxcharles/coasian-web:${version}
docker push ryanxcharles/coasian-web:${version}
echo Deploying coasian-web
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-1 "docker run --detach -p 80:3000 ryanxcharles/coasian-web:${version}"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t coasian-web-2 "docker run --detach -p 80:3000 ryanxcharles/coasian-web:${version}"

# deploy openspv-web
cd $dir/js/openspv-web
echo Building openspv-web
echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t openspv-web
rm .npmrc
docker tag openspv-web ryanxcharles/openspv-web:${version}
docker push ryanxcharles/openspv-web:${version}
echo Deploying openspv-web
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-1 "docker run --detach -p 80:3000 ryanxcharles/openspv-web:${version}"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t openspv-web-2 "docker run --detach -p 80:3000 ryanxcharles/openspv-web:${version}"

# deploy heartmail-web
cd $dir/js/heartmail-web
echo Building heartmail-web
echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t heartmail-web
rm .npmrc
docker tag heartmail-web ryanxcharles/heartmail-web:${version}
docker push ryanxcharles/heartmail-web:${version}
echo Deploying heartmail-web
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-1 "docker run --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/keys/coasian.pem -t heartmail-web-2 "docker run --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
