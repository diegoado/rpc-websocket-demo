FROM node:18-alpine

WORKDIR /app/server

COPY package.json ./server

COPY package-lock.json ./server

RUN npm ci

COPY . .