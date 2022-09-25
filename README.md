# Wol-NodeJS

A NodeJS based express server that sends Wake On Lan packets to a client.

## Usage

### POST /api/v1/wol - Wake On Lan

```json
{
  "password": "Pa55Word!",
  "macAddress": "01:23:45:67:89:AB"
}
```

## Install

Github Actions builds a docker image for Arm32, Arm64 and Amd64 from the latest node alpine image.

### Docker Compose (recomended)

```yaml
version: "3"
services:
  wol-nodejs:
    image: ghcr.io/joshua-noakes1/wol-nodejs
    container_name: Wol-NodeJS
    restart: unless-stopped
    environment:
      - password=Pa55Word!
      - PORT=3000
    network_mode: host
```

### Docker run

```shell
    docker run -d --name Wol-NodeJS --restart=unless-stopped -e password=Pa55Word! -e PORT=3000 -network_node=host ghcr.io/joshua-noakes1/wol-nodejs
```
