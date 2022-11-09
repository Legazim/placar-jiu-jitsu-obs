var isConnected = false;
var ws;
setConnection();

function setConnection(ip = 'localhost') {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const IP_ADDR = urlParams.has('ip') ? urlParams.get('ip') : ip;
    const PORT = 8082;

    ws = new WebSocket(`ws://${IP_ADDR}:${PORT}`);

    ws.addEventListener('open', () => {
        console.log('Connected');
        isConnected = true;
    });

    ws.addEventListener('close', () => {
        console.log('Disconnected');
        isConnected = false;
    });

    ws.addEventListener('message', (msg) => {
        wsListener(msg);
    });
}
