const statusDisplay = document.getElementById('time-status');
const counter = document.getElementById('counter');
const mmCounter = document.getElementById('minutes');
const ssCounter = document.getElementById('seconds');

fieldsId = [];
const getFields = document.querySelectorAll('.-js-get-id');
getFields.forEach(field => {
    fieldsId.push(field.getAttribute('id'));
});

ws.addEventListener('message', msg => {
    try {
        let parsedData = JSON.parse(msg.data);

        if ('pTimer' in parsedData) {
            updateTimer(parsedData['pTimer']);
        };

        if ('placar' in parsedData) {
            updatePlacar(parsedData['placar']);
        };
    } catch (error) {
        console.log(`An error has occurred: ${error.message}`);
    }
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

function addZeroes(num, len) {
    let numberWithZeroes = String(num);
    let counter = numberWithZeroes.length;

    while (counter < len) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    };
    return numberWithZeroes;
};