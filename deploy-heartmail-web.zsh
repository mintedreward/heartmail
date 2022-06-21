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

docker build -f heartmail-web.Dockerfile -t heartmail-web --build-arg NODE_ENV=$NODE_ENV --build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY --build-arg IRON_SESSION_PASSWORD=$IRON_SESSION_PASSWORD --build-arg MB_OAUTH_CLIENT_SECRET=$MB_OAUTH_CLIENT_SECRET --platform linux/amd64 .
docker tag heartmail-web ryanxcharles/heartmail-web:${version}
docker push ryanxcharles/heartmail-web:${version}

echo Deploying heartmail-web

deploy () {
  HOSTNAME=$1

  echo Deploying $HOSTNAME

  echo Logging into Docker
  ssh -t $HOSTNAME "echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin"

  echo Getting rid of existing app
  ssh -t $HOSTNAME 'docker kill $(docker ps -q)'
  ssh -t $HOSTNAME 'docker rm $(docker ps -a -q)'

  echo Copying environment variables to server
  scp .env .env.production .env.local .env.production.local $HOSTNAME:~/

  echo Downloading and running container
  ssh -t $HOSTNAME "docker run --env-file .env --env-file .env.production --env-file .env.local --env-file .env.production.local --detach -p 80:3000 ryanxcharles/heartmail-web:${version}"
}

deploy heartmail-web-1
deploy heartmail-web-2
