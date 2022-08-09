var wsConnection = false;

const ws = new WebSocket('ws://localhost:8082');

ws.addEventListener('open', () => {
    console.log('Connected');
    wsConnection = true;
});

ws.addEventListener('close', () => {
    console.log('Disconnected');
    wsConnection = false;
})
