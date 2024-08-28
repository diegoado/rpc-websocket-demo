FROM node:18-alpine

WORKDIR /app/server

COPY package.json ./

COPY package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8080