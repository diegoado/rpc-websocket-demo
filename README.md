# React RPC Websocket demo application

After cloning the repository, you need to start the websocket server first.

```shell
cd server
npm i && node .
```

The RPC Websocket server will be running on <http://localhost:8080>.

After that, you can start the client application.

```shell
npm i && npm start
```

The React application will be running on <http://localhost:3000>.

## Using Docker

```shell
docker-compose up --build
```

The React application will be running on <http://localhost:3030>.

The build using docker, actually, cannot a connection open with websocket server running in the container called ``ws-server`` because web app (react) is ultimately run in the user's browser and not in the container. At that moment they are not in the same docker network and using the service name won't work like it does when you use curl from within the container.

To fix this, I will create a docker-compose build using nginx as reverse-proxy to server web app.

## Testing App

To test the application, after start the server and web app (react), just type the login and password as `admin`.
