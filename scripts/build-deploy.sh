#!/bin/bash

#build docker file
docker build \
  --build-arg NODE_VERSION=16.14.0 \
  --build-arg PORT=8080 \
  -t "express-graphql-api-boilerplate" \
  .

#upload to gcr
#docker tag LOCAL-IMAGE-NAME LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE
#docker push LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE
