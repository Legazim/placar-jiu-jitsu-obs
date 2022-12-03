const bc = new BroadcastChannel('controller');
const lutas = document.getElementById('lutas');

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

document.getElementById('apagar-luta').onclick = () => {
    let selected = lutas.options[lutas.selectedIndex].value;
    localStorage.removeItem(selected);
    document.querySelector(`[value="${selected}"]`).remove();
};

Object.keys(localStorage).forEach((luta) => {
    appendLuta(luta);
});
document.getElementById('saveNames').onclick = () => {
    if (
        document.getElementById('blue-name').value == '' ||
        document.getElementById('blue-team').value == '' ||
        document.getElementById('white-name').value == '' ||
        document.getElementById('white-team').value == ''
    ) {
        return;
    }

    let id = newId();

    localStorage.setItem(
        id,
        JSON.stringify({
            blue: {
                name: document.getElementById('blue-name').value,
                team: document.getElementById('blue-team').value,
            },
            white: {
                name: document.getElementById('white-name').value,
                team: document.getElementById('white-team').value,
            },
        })
    );

    appendLuta(id);
    lutas.value = id;
};

lutas.addEventListener('change', () => {
    let selected = lutas.options[lutas.selectedIndex].value;
    let selectedLuta = JSON.parse(localStorage.getItem(selected));
    document.getElementById('blue-name').value = selectedLuta.blue.name;
    document.getElementById('blue-team').value = selectedLuta.blue.team;
    document.getElementById('white-name').value = selectedLuta.white.name;
    document.getElementById('white-team').value = selectedLuta.white.team;
});

function appendLuta(luta) {
    let opt = document.createElement('option');
    opt.value = luta;
    opt.classList.add('luta');
    opt.innerHTML = `${JSON.parse(localStorage[luta])['blue']['name']} - ${
        JSON.parse(localStorage[luta])['white']['name']
    }`;
    lutas.appendChild(opt);
}

function bcAlterNames() {
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

function newId() {
    let id = Math.random().toString(36).substring(2, 18);
    if (localStorage.length != 0) {
        Object.keys(localStorage).forEach((existentId) => {
            if (id == existentId) {
                id = newId();
            }
        });
    }
    return id;
}
