#!/usr/bin/env bash

set -e

if [[ -z ${BUILD_NUMBER} ]]; then
    BUILD_NUMBER="dev"
fi

IMAGE=dockerhub.fino.digital/fino/contractsafe-ui

BUILD_IMAGE=${IMAGE}:build

docker build --build-arg BUILD=${BUILD_NUMBER} -t ${BUILD_IMAGE} -f Dockerfile-build .

ID=$(docker create ${BUILD_IMAGE})

docker cp ${ID}:/app/dist/ .
docker rm -v ${ID}
docker rmi ${BUILD_IMAGE}

docker build -t ${IMAGE}:${BUILD_NUMBER} .
