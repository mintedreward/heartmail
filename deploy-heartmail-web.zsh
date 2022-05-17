#!/bin/zsh

# make sure we are in the heartmail source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# load environment variables for production
NODE_ENV=production
source .env
source .env.production
source .env.local
source .env.production.local

# get the latest commit hash as the docker version number
version=`git rev-parse --verify HEAD`

echo Building heartmail-web

docker build -f heartmail-web.Dockerfile -t heartmail-web --build-arg NODE_ENV=$NODE_ENV --platform linux/amd64 .
docker tag heartmail-web ryanxcharles/heartmail-web:${version}
docker push ryanxcharles/heartmail-web:${version}

echo Deploying heartmail-web

# heartmail-web-1
# log in to docker
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
# get rid of existing app
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 'docker rm $(docker ps -a -q)'
# copy environment variables to the server
scp .env heartmail-web-1:~/
scp .env.production heartmail-web-1:~/
scp .env.local heartmail-web-1:~/
scp .env.production.local heartmail-web-1:~/
# download and run container
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-1 "docker run --env-file .env --env-file .env.production --env-file .env.local --env-file .env.production.local --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"

# heartmail-web-2
# log in to docker
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"
# get rid of existing app
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 'docker kill $(docker ps -q)'
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 'docker rm $(docker ps -a -q)'
# copy environment variables to the server
scp .env heartmail-web-2:~/
scp .env.production heartmail-web-2:~/
scp .env.local heartmail-web-2:~/
scp .env.production.local heartmail-web-2:~/
# download and run container
ssh -i ~/.ssh/bethebroadcast.pem -t heartmail-web-2 "docker run --env-file .env --env-file .env.production --env-file .env.local --env-file .env.production.local --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
