#!/bin/bash
set -e
VERSION=$1
IMAGE=10.60.156.72/vbcs/ng-vts:$VERSION

echo "Node version"
node -v

echo "NPM version"
npm -v

echo "Start build source"
export PUPPETEER_SKIP_DOWNLOAD='true'
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD='true'
npm ci --verbose
npm i --no-cache @ui-vts/icons-angular@latest @ui-vts/theme@latest
npm run build:doc

echo "Start build docker"
docker build -t $IMAGE .
echo "Finish build docker"

echo "Push image to registry server"
docker --config ~/.docker/.phuhk push $IMAGE
docker rmi $IMAGE
echo "Finish push image to registry server"
