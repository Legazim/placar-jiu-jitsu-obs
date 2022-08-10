const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const IP_ADDR = urlParams.has('ip') ? urlParams.get('ip') : 'localhost';
const PORT = 8082;

var wsConnection = false;

const ws = new WebSocket(`ws://${IP_ADDR}:${PORT}`);

ws.addEventListener('open', () => {
    console.log('Connected');
    wsConnection = true;
});

ws.addEventListener('close', () => {
    console.log('Disconnected');
    wsConnection = false;
})
