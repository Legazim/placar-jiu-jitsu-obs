const bc = new BroadcastChannel('controller');

const checkboxPlacar = document.getElementById('mostrar-placar');
const checkboxPatrocinios = document.getElementById('mostrar-patrocinios');
const checkboxPopUp = document.getElementById('mostrar-pop-up');
const lutas = document.getElementById('lutas');

document.getElementById('label-ip').onclick = () => {
    document.getElementById('ip-options').classList.remove('hidden');
    document.getElementById('ip-status').innerHTML = '+';
};

document.getElementById('hide-ip').onclick = () => {
    document.getElementById('ip-options').classList.add('hidden');
    document.getElementById('ip-status').innerHTML = '-';
};

document.getElementById('submit-ip').onclick = () => {
    let ip = document.getElementById('ip').value
        ? document.getElementById('ip').value
        : '127.0.0.1';
    bc.postMessage({ IP: ip });
};

checkboxPlacar.addEventListener('change', (event) => {
    let mostrar = event.currentTarget.checked
        ? { showPlacar: true }
        : { showPlacar: false };
    bc.postMessage(mostrar);
});

checkboxPatrocinios.addEventListener('change', (event) => {
    let mostrar = event.currentTarget.checked
        ? { showPatrocinios: true }
        : { showPatrocinios: false };
    bc.postMessage(mostrar);
});

checkboxPopUp.addEventListener('change', (event) => {
    let mostrar = event.currentTarget.checked
        ? { showPopUp: true }
        : { showPopUp: false };
    bc.postMessage(mostrar);
});

document.getElementById('alterNames').onclick = () => {
    bcAlterNames();
};

document.getElementById('apagarLuta').onclick = () => {
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
