#!/bin/bash

docker build -t docker.doit.wisc.edu/myuw/ajsp-docs .

docker stop ajsp-docs
docker rm ajsp-docs
docker run -d --name ajsp-docs -p 8010:8009 docker.doit.wisc.edu/myuw/ajsp-docs
docker ps
