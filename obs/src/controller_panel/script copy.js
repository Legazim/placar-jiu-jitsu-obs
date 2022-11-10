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

document.getElementById('toggle-ip').onclick = () => {
    document.getElementById('toggle-ip').classList.toggle('btn-secondary');
    document
        .getElementById('toggle-ip')
        .classList.toggle('btn-outline-secondary');
    document.getElementById('ip-options').classList.toggle('invisible');
};

document.getElementById('submit-ip').onclick = () => {
    let ip = document.getElementById('ip').value
        ? document.getElementById('ip').value
        : '127.0.0.1';
    bc.postMessage({ IP: ip });
};

const lutas = document.getElementById('lutas');

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

async function loadFights() {
    const response = await fetch('./lutas.json');
    const fights = await response.json();

    appendFights(fights);
}

async function appendFights(fights) {
    Object.keys(fights).forEach((id) => {
        console.log(fights[id]);

        let opt = document.createElement('option');
        opt.value = id;
        opt.classList.add('luta');
        opt.innerHTML = `${id}: ${fights[id]['blue']['name']} X ${fights[id]['white']['name']}`;
        lutas.appendChild(opt);
    });
}

lutas.addEventListener('change', () => {
    let selected = lutas.options[lutas.selectedIndex].value;
    let selectedLuta = JSON.parse(localStorage.getItem(selected));
    document.getElementById('blue-name').value = selectedLuta.blue.name;
    document.getElementById('blue-team').value = selectedLuta.blue.team;
    document.getElementById('white-name').value = selectedLuta.white.name;
    document.getElementById('white-team').value = selectedLuta.white.team;
});
