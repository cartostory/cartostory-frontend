FROM node:11 AS node_base

FROM node_base AS deps
WORKDIR /opt/app
COPY package.json /opt/app/package.json
COPY package-lock.json /opt/app/package-lock.json
RUN npm install

FROM node_base AS build
WORKDIR /opt/app
COPY --from=deps /opt/app/node_modules /opt/app/node_modules
COPY . /opt/app
RUN npm run build

FROM alpine:latest AS ui
COPY --from=build /opt/app/dist /opt/app

