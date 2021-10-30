FROM node:14.18
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
WORKDIR /usr/src/app
RUN yarn
COPY ./ /usr/src/app/