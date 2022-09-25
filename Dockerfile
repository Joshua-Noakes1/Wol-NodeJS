# https://stackoverflow.com/a/71073989
FROM node:current-alpine3.16
WORKDIR /app

# Copy Files
COPY . .

# Install dependencies
RUN npm install

# Start app
CMD ["npm", "start"]