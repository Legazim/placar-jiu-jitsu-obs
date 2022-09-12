const WebSocket = require('ws');

const PORT = 8082;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
    console.log('New connection');

    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg);
            wss.broadcast(JSON.stringify(data));
        } catch (error) {
            console.log(`Message has an error: ${error.message}`);
        }
    });

    ws.on('close', () => {
        console.log('Client has disconnected');
    });
});

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach((client) => {
        client.send(msg);
    });
};
