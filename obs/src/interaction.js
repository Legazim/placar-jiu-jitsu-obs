const sponsorsNumber = 12
const slider = document.querySelector('.carrousel-slider');
const statusDisplay = document.getElementById('time-status');
const counter = document.getElementById('counter');
const mmCounter = document.getElementById('minutes');
const ssCounter = document.getElementById('seconds');
var index = 0;
var sponsors = []
var fieldsId = [];
var sponsorInterval, popUpInterval;


const getFields = document.querySelectorAll('.-js-get-id');
getFields.forEach(field => {
    fieldsId.push(field.getAttribute('id'));
});


// Scoreboard

function updatePlacar(values) {
    fieldsId.forEach(id => {
        let element = document.getElementById(id);
        let content = values[id[0]][id.slice([-1])];

        element.textContent = addZeroes(content, 2);
    });
};

// Timer

function updateTimer(values) {
    ['paused', 'running', 'stopped'].forEach(status => {
        statusDisplay.classList.remove(status);
    });

    mmCounter.textContent = addZeroes(values.mm, 2);
    ssCounter.textContent = addZeroes(values.ss, 2);

    statusDisplay.textContent = values.timerStatus.text;

    statusDisplay.classList.add(values.timerStatus.status);
};

// Winner

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

// Sponsors slideshow

for (let i = 1; i <= sponsorsNumber; i++) {
    sponsors.push(`sponsors/${i}.jpg`);
};

insertSponsors();
loopSponsors();

function insertSponsors() {
    for (let i = 0; i < sponsors.length; i++) {
        let html = `<img class="img-item img-item${i} off" src="${sponsors[i]}"/>`;
        slider.insertAdjacentHTML('beforeend', html);
    };
};

function loopSponsors() {
    sponsorInterval = setInterval(() => {
        nextSponsor();
    }, 10000);
};

function nextSponsor() {
    let sponsors = document.querySelectorAll('.img-item')
    index++;
    if (index <= sponsors.length - 1) {
        changeSponsor(index);
    } else {
        index = 0;
        changeSponsor(0);
    };
};

function changeSponsor(index) {
    let images = document.querySelectorAll(`.img-item`);
    let selected = document.querySelector(`.img-item${index}`);
    images.forEach(img => {
        img.classList.add('off')
    });
    selected.classList.remove('off')
};

// Points pop ups

function showPoint(data) {
    var divValue = document.getElementById('value');
    const popUp = document.getElementById('pop-up')
    const increment = document.getElementById('increment');
    const text = document.getElementById('pop-up-text');
    const points = document.getElementById('points');
    console.log(data);

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
        increment.textContent = '+'
    } else {
        text.textContent += ' (Correção)'
        increment.textContent = '-'
    }

    popUp.classList.add('show')

    setTimeout(() => {
        popUp.classList.remove('show')
    }, 2000)
};

// Common function

function addZeroes(num, len) {
    let numberWithZeroes = String(num);
    let counter = numberWithZeroes.length;

    while (counter < len) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    };
    return numberWithZeroes;
};