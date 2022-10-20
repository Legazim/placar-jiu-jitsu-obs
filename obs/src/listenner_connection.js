const statusDisplay = document.getElementById('time-status');
const counter = document.getElementById('counter');
const mmCounter = document.getElementById('minutes');
const ssCounter = document.getElementById('seconds');
const getFields = document.querySelectorAll('.-js-get-id');
var popUpInterval;
var fieldsId = [];
var isConnected = false;
var ws;
setConnection();

getFields.forEach((field) => {
    fieldsId.push(field.getAttribute('id'));
});

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

function wsListener(msg) {
    try {
        let parsedData = JSON.parse(msg.data);

        if ('counter' in parsedData) {
            updateCounter(parsedData.counter);
        }

        if ('timerStatus' in parsedData) {
            updateTimer(parsedData.timerStatus);
        }

        if ('placar' in parsedData) {
            updatePlacar(parsedData.placar);
        }

        if ('point' in parsedData) {
            showPoint(parsedData.point);
        }

        if ('winner' in parsedData) {
            declareWinner(parsedData.winner, parsedData.pun);
        }
    } catch (error) {
        console.log(`An error has occurred: ${error.message}`);
    }
}

function updateCounter(values) {
    mmCounter.textContent = addZeroes(values.mm, 2);
    ssCounter.textContent = addZeroes(values.ss, 2);
}

function updateTimer(values) {
    ['paused', 'running', 'stopped'].forEach((status) => {
        statusDisplay.classList.remove(status);
    });

    statusDisplay.textContent = values.timerStatus.text;

    statusDisplay.classList.add(values.timerStatus.status);
}

function updatePlacar(values) {
    fieldsId.forEach((id) => {
        let element = document.getElementById(id);
        let content = values[id[0]][id.slice([-1])];
        let len = id[1] == 'p' ? 1 : 2;

        element.textContent = addZeroes(content, len);
    });
}
const popUpWrapper = document.getElementById('pop-up-wrapper');
function showPoint(data) {
    var text, points, increment;
    switch (data.type) {
        case 'v':
            text = 'Vantagem';
            points = '1';
            break;
        case 'p':
            text = 'Punição';
            points = '1';
            break;
        default:
            text = 'Pontos';
            points = data.type;
            break;
    }

    if (data.click) {
        increment = data.type == 'v' || data.type == 'p' ? '' : '+';
    } else {
        text += ' (Correção)';
        increment = '-';
    }

    const popUp = document.createElement('div');
    content = `<div id="value" class="value ${data.color}">
            <span>${increment}</span><span id="points">${points}</span>
        </div>
        <div id="pop-up-text" class="text">
            <span>${text}</span>
        </div>`;
    popUp.innerHTML = content;
    popUp.classList.add('pop-up');
    popUpWrapper.appendChild(popUp);

    setTimeout(() => {
        popUp.classList.add('show');
    }, 1);

    setTimeout(() => {
        popUp.classList.remove('show');
        setTimeout(() => {
            popUpWrapper.removeChild(popUp);
        }, 500);
    }, 2500);
}

function declareWinner(id, pun = false) {
    removeWinner();
    if (pun) {
        document.getElementById(`${id}status`).textContent = 'Desclassificado';
        document.getElementById(`${id}status`).classList.add('show');
    } else if (id == 'empate') {
        document.getElementById('wstatus').textContent = 'Empate';
        document.getElementById('bstatus').textContent = 'Empate';
        document.getElementById('wstatus').classList.add('show');
        document.getElementById('bstatus').classList.add('show');
    } else {
        document.getElementById(`${id}status`).textContent = 'Vencedor';
        document.getElementById(`${id}status`).classList.add('show');
    }

    if (id == 'none') {
        removeWinner();
    }
}

function removeWinner() {
    ['w', 'b'].forEach((cor) => {
        document.getElementById(`${cor}status`).classList.remove('show');
    });
}

function addZeroes(num, len) {
    let numberWithZeroes = String(num);
    let counter = numberWithZeroes.length;

    while (counter < len) {
        numberWithZeroes = '0' + numberWithZeroes;
        counter++;
    }
    return numberWithZeroes;
}
