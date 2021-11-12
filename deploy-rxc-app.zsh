#!/bin/zsh

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
source .env.prod

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

echo Building rxc-app

cd $dir/private/rxc/app
yarn version minor
yarn npm publish

echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
docker build --build-arg NPM_TOKEN=${NPM_TOKEN} . -t rxc-app --platform linux/amd64
rm .npmrc

docker tag rxc-app ryanxcharles/rxc-app:${version}
docker push ryanxcharles/rxc-app:${version}

echo Deploying rxc-app

ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-1 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-1 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-1 "docker run --detach -p 80:3000 ryanxcharles/rxc-web:${version}"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-2 'docker kill $(docker ps -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-2 'docker rm $(docker ps -a -q)'
ssh -F $dir/ssh_config -i $dir/coasian.pem -t rxc-web-2 "docker run --detach -p 80:3000 ryanxcharles/rxc-web:${version}"
