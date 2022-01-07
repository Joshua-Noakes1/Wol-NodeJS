# Slim NodeJS image base
FROM node:lts-alpine3.15
WORKDIR /usr/src/app

# install nodejs packages
COPY package*.json ./
RUN npm install

COPY . .

# Install ping
# RUN apt update && apt install iputils-ping -y

# Expose ports 3000, 9 and start server
EXPOSE 3000

CMD ["node", "server.js"]
