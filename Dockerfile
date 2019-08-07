FROM node:8.16-alpine

# install wait-for-grid dependency
RUN apk update \
    && apk add jq curl \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# install wait-for-grid
COPY wait-for-grid.sh /app/
RUN ["chmod", "+x", "./wait-for-grid.sh"]

# install test package dependencies
COPY package.json yarn.lock wdio.conf.js /app/
RUN yarn
