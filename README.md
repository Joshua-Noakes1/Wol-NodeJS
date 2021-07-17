# Wol-NodeJS

A NodeJS based express server that sends Wake On Lan packets - [Image on Docker](https://hub.docker.com/r/joshuanoakes1/wol-nodejs)   
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/joshua-noakes1/Wol-NodeJS/Docker-BuildX-CI-MultiArch?style=for-the-badge)](https://github.com/Joshua-Noakes1/Wol-NodeJS/actions/workflows/docker.yml) [![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/joshuanoakes1/wol-nodejs?style=for-the-badge)](https://hub.docker.com/r/joshuanoakes1/wol-nodejs)

## Usage

### POST /wol - Wake On Lan

```json
{
  "password": "Pa55Word!",
  "macAddress": "01:23:45:67:89:AB"
}
```

### POST /check - Check if a client is alive

```json
{
  "password": "Pa55Word!",
  "ipAddress": "192.168.10.30"
}
```

## Install

Github Actions builds a docker image for Arm32, Arm64 and Amd64 from the NodeJS 16-slim Image.

### Docker run

```shell
    docker run -d --name Wol-NodeJS --restart=unless-stopped -e password=Pa55Word! -p 3000:3000 joshuanoakes1/wol-nodejs
```

### Docker Compose (recomended)

```yaml
version: "3"
services:
  wol-nodejs:
    image: joshuanoakes1/wol-nodejs:latest
    container_name: wol-nodejs
    restart: unless-stopped
    environment:
      - password: Pa55Word!
    ports:
      - 3000:3000
```
