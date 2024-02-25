# DOCKER IMAGE

```bash
# -t tagname
# automatically search file Dockerimage
docker build -t express/be-kelas-programmer:1.0.0 .

# create docker image with specific docker file name
# : [docker file name. ex: Dockerfile.dev]
docker build -t express/be-kelas-programmer:1.0.0 -f Dockerfile.dev .

# get docker images
docker images
docker image ls

# remove image: [name:tag]
docker image rm namaimage:tag
```

# DOCKER IMAGE REGISTRY

```bash
# get docker iamge from registry : [nama:tag]
docker image pull nama:tag
```

# DOCKER CONTAINER

# create container

```bash
# create container : --name [nama] [image:tag]

docker container create --name contohredis redis:latest
# create container with port --name [nama] --publish/-p [porthost]:[portcontainer] [image:tag]
docker container create --name contohredis -p 5000:3000 redis:latest
docker container create --name contohredis --publish 5000:3000 redis:latest

# contoh nginx web server
# nginx run on 80, but expose to 8080. check your browser http://localhost:8080
docker container create --name contohnginx --publish 8080:80 nginx:latest

# CHANGE PORT
# can not change port, just re-create container

```

# START STOP REMOVE container

```bash
# see all container
docker container ls -a

# see running container
docker container ls

# start container [name]
docker container start contoh

# restart container [name]
docker container restart contoh

# stop container [name]
docker container stop contoh

# remove docker "make sure it's not running" : [name]
docker container rm contoh

# multiple remove docker "make sure it's not running" : [name1] [name2]
docker container rm contoh1 contoh2
```

# CONTAINER LOG

```bash
# [id/nama container]
docker container logs containerID
docker container logs containerName

# realtime
docker container logs containerID -f
```

# CONTAINER EXEC

```bash
# -i -> interactive
# -t -> tty
# [name/id]
docker container exec -i -t containerID /bin/bash
docker container exec -i -t containerNAME /bin/bash
```

# CONTAINER ENV

```bash
# create mongo container, env key check masing2 image di dokumentasi
docker container create --name contohmongo --publish 27017:27017
--env MONGO_INITDB_ROOT_USERNAME=eko
--env MONGO_INITDB_ROOT_PASSWORD=password
mongo:latest
```

# CONTAINER STATS

```bash
# untuk melihat detail dari penggunaan resource dari container
docker container stats

# limit container cpu/memory
docker container create --name contohnginx --publish 8080:80
--memory 100m
--cpu 0.5
nginx:latest
```

# MOUNT

```bash
# type: bind / volume
# source: host path
# destination: container path
# readonly: jika ada, hanya bisa dibaca di container, tidak bisa di tulis

# supaya data tidak hilang saat container di remove

docker container create --name contohmongo
--mount "type=bind,source=/home/putera/project/images,destination=/data/db"
--publish 27017:27017
--env MONGO_INITDB_ROOT_USERNAME=eko
--env MONGO_INITDB_ROOT_PASSWORD=password
mongo:latest
```

# VOLUME

```bash
# secara default, container disimpan didalam volume

# create
docker volume create mongovolume

# remove, make sure tidak di gunakan di container
docker volume rm mongovolume

# use volume at container
# source=[volume name]
docker container create --name contohmongo
--mount "type=volume,source=mongovolume,destination=/data/db"
--publish 27017:27017
--env MONGO_INITDB_ROOT_USERNAME=eko
--env MONGO_INITDB_ROOT_PASSWORD=password
mongo:latest
```

# NETWORK

```bash
# driver none|bridge|host
# host driver can only run on linu

# create
docker network create --driver bridge contohnetwork

# get
docker network ls
# remove
docker network rm contohnetwork


# add container to network: [nama network] [nama container]
docker network connect contohnetwork namacontainer
# remove container from network: [nama network] [nama container]
docker network disconnect contohnetwork namacontainer
```

# INSPECT

```bash
docker image inspect namaimage
docker container inspect namacontainer
docker volume inspect namavolume
docker network inspect namanetwork
```

# PRUNE

```bash
# to remove unsuse image, container, volume & network
docker image prune
docker container prune
docker volume prune
docker network prune

# auto detect
docker system prune
```

# DOCKERFILE

# BUILD

```bash
# create docker image from Dockerfile
# -t [namaimage]:[tag] . -> current path
docker build -t putera:1.0.0 .
# multiple create
docker build -t putera:1.0.0 putera:latest .

# -t [namaimage]:[tag] [cutomfile]
docker build -t putera:1.0.0 DockerFileCustom

# with progress
docker build -t putera:1.0.0 . --progress=plain
# no cache
docker build -t putera:1.0.0 . --no-cache
```

```docker
# Example of simple Dockerfile
# small linux
FROM alpine:3

# RUN
# RUN will execute when build. not start
# RUN [command]
# RUN ["command 1"] ["command 2"] ["..."]
RUN echo "helloo bro!"

# CMD
# CMD will execute when container start
# only 1 CMD will be executed
# CMD [command]
CMD npm run start
CMD ["npm"] ["run"] ["start"]

# ADD
# add file from source to destination/docker image
# can download file from URL
# auto detect if file source is compress, then it will be extract in the image
# ADD [source] [destination]
ADD world.txt hello # file world.txt to path /hello
ADD *.txt hello     # all file with .txt to path /hello

# COPY
# copy file from source to destination/docker image
# CAN NOT download file from URL
# NOT auto detect if file source is compress, then it will NOT be extract in the image
# COPY [source] [destination]
COPY world.txt hello # file world.txt to path /hello
COPY *.txt hello     # all file with .txt to path /hello

# EXPOSE
# to tell container that image will listen to port
# will not publish any port, just information
EXPOSE 5000 # with default tcp protocol
EXPOSE 5000/tcp # set to tcp protocl
EXPOSE 5000/udp # set to udp protocl

# ENV
# env & default value that will use in the app
ENV PORT=5000

to custom it, when create container, add --env PORT=5001

# VOLUME
VOLUME /path
VOLUME /path1, /path2

# WORKDIR
# to select path/working_area where the app will be run
# auto crate
WORKDIR /app
WORKDIR /home/app
```

# DOCKERIGNORE

.dockerignore

like git ignore

docker container create --name db --network webweb -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_USER=uda -e MYSQL_PASSWORD=my-secret-pw -p 3306:3306 mysql:8.0.3
