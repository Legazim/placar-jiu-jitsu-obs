const bc = new BroadcastChannel('controller');
loadFights();

var fights = document
    .getElementById('mostrar-placar')
    .addEventListener('change', (event) => {
        let mostrar = event.currentTarget.checked
            ? { showPlacar: true }
            : { showPlacar: false };
        bc.postMessage(mostrar);
    });

document
    .getElementById('mostrar-patrocinios')
    .addEventListener('change', (event) => {
        let mostrar = event.currentTarget.checked
            ? { showPatrocinios: true }
            : { showPatrocinios: false };
        bc.postMessage(mostrar);
    });

document
    .getElementById('mostrar-pop-up')
    .addEventListener('change', (event) => {
        let mostrar = event.currentTarget.checked
            ? { showPopUp: true }
            : { showPopUp: false };
        bc.postMessage(mostrar);
    });

document.getElementById('alterNames').onclick = () => {
    bcAlterNames();
};

document.getElementById('toggle-lutadores').onclick = () => {
    document
        .getElementById('toggle-lutadores')
        .classList.toggle('btn-secondary');
    document
        .getElementById('toggle-lutadores')
        .classList.toggle('btn-outline-secondary');
    document.getElementById('lutadores').classList.toggle('invisible');
};

document.getElementById('switchNames').onclick = () => {
    let oldBlueName = document.getElementById('blue-name').value;
    let oldBlueTeam = document.getElementById('blue-team').value;
    let oldWhiteName = document.getElementById('white-name').value;
    let oldWhiteTeam = document.getElementById('white-team').value;

    document.getElementById('blue-name').value = oldWhiteName;
    document.getElementById('blue-team').value = oldWhiteTeam;
    document.getElementById('white-name').value = oldBlueName;
    document.getElementById('white-team').value = oldBlueTeam;
};

document.getElementById('submit-ip').onclick = () => {
    let ip = document.getElementById('ip').value
        ? document.getElementById('ip').value
        : '127.0.0.1';
    bc.postMessage({ IP: ip });
};

document.getElementById('alterNames').onclick = () => {
    broadcastSelectedFight();
};

function broadcastSelectedFight() {
    let val = {
        scoreboardInput: {
            blue: {
                name: document.getElementById('blue-name').value,
                team: document.getElementById('blue-team').value,
            },
            white: {
                name: document.getElementById('white-name').value,
                team: document.getElementById('white-team').value,
            },
        },
    };
    bc.postMessage(val);
}

async function getAllFights() {
    const response = await fetch('./lutas.json');
    const fights = await response.json();
    return fights;
}

async function getFight(id) {
    const response = await fetch('./lutas.json');
    const fights = await response.json();
    const fight = fights[id];
    return fight;
}

async function loadFights() {
    const fights = await getAllFights();
    appendFights(fights);
}

const lutas = document.getElementById('lutas');

async function appendFights(fights) {
    let arrayIds = [];
    Object.keys(fights).forEach((id) => {
        arrayIds.push(id);
    });

    // Sort fights
    arrayIds.sort();

    // Insert fights
    arrayIds.forEach((id) => {
        let opt = document.createElement('option');
        opt.value = id;
        opt.classList.add('luta');
        opt.innerHTML = `${id}: ${fights[id]['blue']['name']} X ${fights[id]['white']['name']}`;
        lutas.appendChild(opt);
    });
}

async function changeInputNames(fightId) {
    let luta = getFight(fightId);
    let selectedLuta = await luta;

    document.getElementById('blue-name').value = selectedLuta.blue.name;
    document.getElementById('blue-team').value = selectedLuta.blue.team;
    document.getElementById('white-name').value = selectedLuta.white.name;
    document.getElementById('white-team').value = selectedLuta.white.team;
}

lutas.addEventListener('change', () => {
    let selected = lutas.options[lutas.selectedIndex].value;
    changeInputNames(selected);
});
