# Wol-NodeJS

A NodeJS based express server that sends Wake On Lan packets.  
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/joshua-noakes1/Wol-NodeJS/Docker-BuildX-CI-MultiArch?style=for-the-badge)](https://github.com/Joshua-Noakes1/Wol-NodeJS/actions/workflows/docker.yml)

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
    docker run -d --name Wol-NodeJS --restart=unless-stopped -e password=Pa55Word! -p 3000:3000 ghcr.io/joshua-noakes1/wol-nodejs:master
```

### Docker Compose (recomended)

```yaml
version: "3"
services:
  wol-nodejs:
    image: ghcr.io/joshua-noakes1/wol-nodejs:master
    container_name: wol-nodejs
    restart: unless-stopped
    environment:
      - password=Pa55Word!
    ports:
      - 3000:3000
```
