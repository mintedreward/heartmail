# HeartMail

<img src='./logo-heartmail.png' alt='HeartMail' width='800'>

## API Documentation

- [API Documentation](https://github.com/heartmail/heartmail/blob/master/heartmail-docs/index.md)

## Architecture

- App: A single horizontally scalable web app
- DB: Cassandra-compatible Amazon Keyspaces
- Deployment: Docker + Kubernetes

## Redirects: www and HTTPS

Our redirect policy is:

- [name].com redirects to www.[name].com
- http://[name].com redirects to https://[name].com

This works by:

- AWS instances ([name]-redirect) are used to add www
- An AWS load balancer rewrites http traffic to https

## Central Points of Failure

All central points of failure should be eliminated over time, including
ourselves. We do not want the failure of one part of the system to create
cascading failures. Any part should be able to be removed and the system should
keep functioning.

* Domain names (AWS)
* Cloud (AWS)
* Database (AWS)
* Send email (AWS)
* Receive email (AWS)
* Full email service (Google)
* Docker Registry (Docker Hub)
* Dependencies (NPM)

Copyright (c) 2022 HeartMail Inc. All rights reserved.
