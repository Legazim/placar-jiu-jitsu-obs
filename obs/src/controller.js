const bc = new BroadcastChannel('controller');

const checkboxPlacar = document.getElementById('mostrar-placar')
const checkboxPatrocinios = document.getElementById('mostrar-patrocinios')
const checkboxPopUp = document.getElementById('mostrar-pop-up')
const form = document.getElementById('informacoes');

checkboxPlacar.addEventListener('change', (event) => {
    let mostrar = event.currentTarget.checked ? {
        'showPlacar': true
    } : {
        'showPlacar': false
    };
    bc.postMessage(mostrar);
});

checkboxPatrocinios.addEventListener('change', (event) => {
    let mostrar = event.currentTarget.checked ? {
        'showPatrocinios': true
    } : {
        'showPatrocinios': false
    };
    bc.postMessage(mostrar);
});

checkboxPopUp.addEventListener('change', (event) => {
    let mostrar = event.currentTarget.checked ? {
        'showPopUp': true
    } : {
        'showPopUp': false
    };
    bc.postMessage(mostrar);
});

form.addEventListener('submit', evt => {
    evt.preventDefault();
});

document.getElementById('alterNames').onclick = () => {
    alterNames()
}

document.getElementById('reset').onclick = () => {
    localStorage.clear();
    document.querySelectorAll('.luta').forEach(luta => {
        luta.remove()
    })
}

Object.keys(localStorage).forEach(luta => {
    appendLuta(luta)
});

document.getElementById('saveNames').onclick = () => {
    if (document.getElementById('blue-name').value == '' ||
        document.getElementById('blue-team').value == '' ||
        document.getElementById('white-name').value == '' ||
        document.getElementById('white-team').value == ''
    ) { return };


    localStorage.setItem(`Luta_${localStorage.length + 1}`, JSON.stringify({
        'blue': {
            'name': document.getElementById('blue-name').value,
            'team': document.getElementById('blue-team').value,
        },
        'white': {
            'name': document.getElementById('white-name').value,
            'team': document.getElementById('white-team').value
        }
    }))

    appendLuta(`Luta_${localStorage.length}`)
    document.getElementById('lutas').value =`Luta_${localStorage.length}`;
}

function appendLuta(luta) {
    let opt = document.createElement('option')
    opt.value = luta;
    opt.classList.add('luta')
    opt.innerHTML = `${luta}: ${JSON.parse(localStorage[luta])['blue']['name']} - ${JSON.parse(localStorage[luta])['white']['name']}`;
    document.getElementById('lutas').appendChild(opt);
}

function alterNames() {
    let val = {
        'scoreboardInput': {
            'blue': {
                'name': document.getElementById('blue-name').value,
                'team': document.getElementById('blue-team').value,
            },
            'white': {
                'name': document.getElementById('white-name').value,
                'team': document.getElementById('white-team').value
            }
        }
    };
    bc.postMessage(val);
}