#!/bin/sh
set -e

VERSION=$1
IMAGE=10.60.156.72/vbcs/ng-vts:$VERSION

echo "Apply k8s config"
sed -i -e "s|image:.*|image: $IMAGE|g" cicd/rnd-ng-vts.yaml

sudo kubectl -n vts-design-system apply -f cicd/rnd-ng-vts.yaml --kubeconfig=cicd/config
echo  "Waiting for deploy"
sleep 30
echo  "View result deploy"
sudo kubectl -n vts-design-system get pods,svc --kubeconfig=cicd/config
echo "Finish run odp-console-webapp"