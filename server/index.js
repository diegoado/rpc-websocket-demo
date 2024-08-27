const WebSocketServer = require('rpc-websockets').Server;
const rpcPort = process.env.rpcport || 3000;
const rpcHost = process.env.rpchost || '127.0.0.1';

const user = {'username': 'admin', 'password': 'admin'};

var server = new WebSocketServer({
    port: rpcPort,
    host: rpcHost,
});

server.setAuth((data) => { return data.login === user.username && data.password === user.password });

server.register('sayhello', () => { 
    return { message: "Hi, I'm a RPC Websocket " }
}).protected();

server.on('connection', (ws) => {
    ws.on('close', (code, reason) => {
        console.log(`Connection closed: ${code} ${reason}!`);
    });
});

const serverStats = () => {
    return setInterval(() => {
        let namespaces = Object.keys(server.namespaces) || [];
        let clients = namespaces.length > 0 ? server.namespaces['/'].clients.keys.length : 0;

        process.stdout.write("\u001b[2J\u001b[0;0H");
		console.log(`Connected clients:`)
		console.dir(clients);
		console.log(`Namespace List:`);
		console.dir(namespaces);

    }, 2500);
};

server.on('listening', serverStats);
