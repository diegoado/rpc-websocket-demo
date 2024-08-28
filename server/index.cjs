const WebSocketServer = require('rpc-websockets').Server;

const rpcServerPort = process.env.RPC_SERVER_PORT || 8080;
const rpcServerHost = process.env.RPC_SERVER_HOST || 'localhost';

const user = {'username': 'admin', 'password': 'admin'};

var server = new WebSocketServer({
    port: rpcServerPort,
    host: rpcServerHost,
});

server.setAuth((data) => {
    console.log('New call to method setAuth');
    return data.login === user.username && data.password === user.password 
});

server.register('sayhello', (data) => {
    console.log('New call to method sayhello');
    return { message: `Hi ${data.user || 'Unknown'}, I'm a RPC Websocket Server` }
}).protected();

server.on('connection', (ws) => {
    console.log('New connection opened');

    ws.on('close', (code, reason) => {
        console.log(`Connection closed: ${code} ${reason}!`);
    });
});
