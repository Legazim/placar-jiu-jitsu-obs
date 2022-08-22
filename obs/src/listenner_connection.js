const statusDisplay = document.getElementById('time-status');
const counter = document.getElementById('counter');
const mmCounter = document.getElementById('minutes');
const ssCounter = document.getElementById('seconds');
const text = document.getElementById('pop-up-text');
const divValue = document.getElementById('value');
const popUp = document.getElementById('pop-up')
const increment = document.getElementById('increment');
const points = document.getElementById('points');
var popUpInterval;
var fieldsId = [];

ws.addEventListener('message', msg => {
    try {
        let parsedData = JSON.parse(msg.data);

        if ('counter' in parsedData) {
            updateCounter(parsedData.counter)
        }

        if ('timerStatus' in parsedData) {
            updateTimer(parsedData.timerStatus);
        };

        if ('placar' in parsedData) {
            updatePlacar(parsedData.placar);
        };

        if ('point' in parsedData) {
            showPoint(parsedData.point);
        };

        if ('winner' in parsedData) {
            declareWinner(parsedData.winner, parsedData.pun);
        };
    } catch (error) {
        console.log(`An error has occurred: ${error.message}`);
    };
});


const getFields = document.querySelectorAll('.-js-get-id');

getFields.forEach(field => {
    fieldsId.push(field.getAttribute('id'));
});

function updateCounter(values) {
    mmCounter.textContent = addZeroes(values.mm, 2);
    ssCounter.textContent = addZeroes(values.ss, 2);
};

function updateTimer(values) {
    ['paused', 'running', 'stopped'].forEach(status => {
        statusDisplay.classList.remove(status);
    });

    statusDisplay.textContent = values.timerStatus.text;

    statusDisplay.classList.add(values.timerStatus.status);
};

function updatePlacar(values) {
    fieldsId.forEach(id => {
        let element = document.getElementById(id);
        let content = values[id[0]][id.slice([-1])];

        element.textContent = addZeroes(content, 2);
    });
};

function showPoint(data) {
    divValue.style.backgroundColor = `var(--clr-background-${data.color})`;
    divValue.style.color = data.color == 'b' ? 'white' : divValue.style.color = 'black';
    points.textContent = isNaN(data.type) ? '1' : data.type;

    switch (data.type) {
        case 'v':
            text.textContent = 'Vantagem';
            points.textContent = '1';
            break;
        case 'p':
            text.textContent = 'Punição';
            points.textContent = '1';
            break;
        default:
            text.textContent = 'Pontos';
            points.textContent = data.type;
            break;
    }

    if (data.click) {
        increment.textContent = (data.type == 'v' || data.type == 'p') ? '' : '+'
    } else {
        text.textContent += ' (Correção)'
        increment.textContent = '-'
    }

    popUp.classList.add('show')

    clearTimeout(popUpInterval)
    popUpInterval = setTimeout(() => {
        popUp.classList.remove('show')
    }, 2000)
};

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
    };

    if (id == 'none') {
        removeWinner();
    };
};

function removeWinner() {
    ['w', 'b'].forEach(cor => {
        document.getElementById(`${cor}status`).classList.remove('show');
    });
};

function addZeroes(num, len) {
    let numberWithZeroes = String(num);
    let counter = numberWithZeroes.length;

    while (counter < len) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    };
    return numberWithZeroes;
};