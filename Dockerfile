FROM node:16-alpine AS ui-builder
RUN apk add --update make
RUN npm i -g pnpm

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN make install-ui

COPY . .

RUN make build-ui

FROM golang:1.18-alpine AS api-builder

RUN apk update && apk add alpine-sdk git && rm -rf /var/cache/apk/*
RUN apk add --update make

RUN mkdir -p /app
WORKDIR /app

COPY Makefile .
COPY go.mod .
COPY go.sum .

RUN make install-api

COPY . .
COPY --from=ui-builder /app dist
RUN make build 

FROM alpine:latest

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

RUN mkdir -p /app
WORKDIR /app
COPY --from=api-builder /app .

EXPOSE 8080

ENTRYPOINT ["./shorts-server"]
