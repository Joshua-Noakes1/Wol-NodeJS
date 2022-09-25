# Wol-NodeJS

A NodeJS based express server that sends Wake On Lan packets to a client.  
[![Docker-BuildX-CI-MultiArch](https://github.com/Joshua-Noakes1/Wol-NodeJS/actions/workflows/docker.yml/badge.svg?branch=master)](https://github.com/Joshua-Noakes1/Wol-NodeJS/actions/workflows/docker.yml)

## Usage

Every request to the server gets send to /api/v1/.

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
    docker run -d --name Wol-NodeJS --restart=unless-stopped -e password=Pa55Word! -e PORT=3000 -network_node=host ghcr.io/joshua-noakes1/wol-nodejs:master
```

### Docker Compose (recomended)

```yaml
version: "3"
services:
  wol-nodejs:
    image: ghcr.io/joshua-noakes1/wol-nodejs:master
    container_name: Wol-NodeJS
    restart: unless-stopped
    environment:
      - password=Pa55Word!
      - PORT=3000
    network_mode: host
```
