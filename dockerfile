# Slim NodeJS image base
FROM node:lts-alpine3.15
WORKDIR /usr/src/app

# install nodejs packages
COPY . .
RUN npm install

# Install ping
RUN apk update && apk upgrade

CMD ["node", "server.js"]
