placar = {
    'b' : {
        '2' : 0,
        '3' : 0,
        '4' : 0,
        'v' : 0,
        'p' : 0
    },
    'w' : {
        '2' : 0,
        '3' : 0,
        '4' : 0,
        'v' : 0,
        'p' : 0
    }
}

fieldsId = [
    'bs2', 'bs3', 'bs4', 'bv', 'bp',
    'ws2', 'ws3', 'ws4', 'wv', 'wp'
]

fieldsId.forEach(id => {
    let element = document.getElementById(id)
    let oponent = (id[0] == 'b') ? 'w' : 'b'
    element.onclick = click => {

        clickType(id.slice([-1]))

        if (clickType(click)) {
            placar[id[0]][id.slice([-1])]++
        } else if (placar[id[0]][id.slice([-1])] != 0) {
            placar[id[0]][id.slice([-1])]--
        }

        updatePlacarDOM()
    }
})

function updatePlacarDOM() {
    fieldsId.forEach(id => {
        let element = document.getElementById(id)
        let content = placar[id[0]][id.slice([-1])]

        // if (content < 0) content = 0

        if (!isNaN([id.slice([-1])])) {
            content = content * parseInt([id.slice([-1])])
        }

        element.textContent = addZeroes(content, 2)
    })
}

function addZeroes(num, len) {
    let numberWithZeroes = String(num)
    let counter = numberWithZeroes.length

    while(counter < len) {
        numberWithZeroes = "0" + numberWithZeroes
        counter++
    }
    return numberWithZeroes
}

function clickType(event) {
    if (event.ctrlKey) return false
    return true
}

function isPunicao(element) {
    let id = element.getAttribute('id')
    if (id.slice([-1]) != 'p') {
        return 0
    } else {

        return 1
    }
}

function clickType(tipo) {
    switch (tipo) {
        case 'p':

            break;

        default:
            break;
    }
}