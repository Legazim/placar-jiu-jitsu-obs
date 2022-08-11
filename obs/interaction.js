const statusDisplay = document.getElementById('time-status');
const counter = document.getElementById('counter');
const mmCounter = document.getElementById('minutes');
const ssCounter = document.getElementById('seconds');

fieldsId = [];
const getFields = document.querySelectorAll('.-js-get-id');
getFields.forEach(field => {
    fieldsId.push(field.getAttribute('id'));
});

function updatePlacar(values) {
    fieldsId.forEach(id => {
        let element = document.getElementById(id)
        let content = values[id[0]][id.slice([-1])]

        element.textContent = addZeroes(content, 2)
    })
};

function updateTimer(values) {
    ['paused', 'running', 'stopped'].forEach(status => {
        statusDisplay.classList.remove(status);
    });

    mmCounter.textContent = addZeroes(values.mm, 2);
    ssCounter.textContent = addZeroes(values.ss, 2);

    statusDisplay.textContent = values.timerStatus.text;

    statusDisplay.classList.add(values.timerStatus.status);
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