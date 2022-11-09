// Connection to websocket
placar = {
    b: {
        2: 0,
        3: 0,
        4: 0,
        v: 0,
        p: 0,
        min: {
            2: false,
            v: false,
        },
        t: 0,
    },
    w: {
        2: 0,
        3: 0,
        4: 0,
        v: 0,
        p: 0,
        min: {
            2: false,
            v: false,
        },
        t: 0,
    },
};

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

        if ('winner' in parsedData) {
            declareWinner(parsedData.winner, parsedData.pun);
        }
    } catch (error) {
        console.log(`An error has occurred: ${error.message}`);
    }
}

document.getElementById('ip').addEventListener('click', () => {
    let ip = prompt('IP do servidor', '127.0.0.1');
    ws.close();
    setConnection(ip);
});

const statusDisplay = document.getElementById('time-status');
const counter = document.getElementById('counter');
const mmCounter = document.getElementById('minutes');
const ssCounter = document.getElementById('seconds');
const getFields = document.querySelectorAll('.-js-get-id');
var fieldsId = [];

getFields.forEach((field) => {
    fieldsId.push(field.getAttribute('id'));
});

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

function updatePlacar(values) {
    fieldsId.forEach((id) => {
        let field = document.getElementById(id);
        let score = values[id[0]][id.slice([-1])];

        if (isNaN(id.slice([-1]))) {
            field.textContent = addZeroes(score, 2);
        } else {
            let value = id.slice([-1]) * score;
            field.textContent = addZeroes(value, 2);
        }
    });
}
