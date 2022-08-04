// Timer

const statusDisplay = document.getElementById('time-status')
const counter = document.getElementById('counter')
const mmCounter = document.getElementById('minutes')
const ssCounter = document.getElementById('seconds')

var mmInitialTime = 10
var ssInitialTime = 00

var mm = mmInitialTime // Minutos
var ss = ssInitialTime // Segundos

var timerRunning = false
var cron, timerStatus
var milesimo = 0

updateTimerDOM()

document.body.onkeydown = keyPressed => {
    if (keyPressed.code == 'Space') {
        timerCommand(keyPressed)
    }
}

counter.onclick = click => {
    timerCommand(click)
}

counter.ondblclick = () => {
    redefineInitialTime()
}

function startTimer() {
    timerRunning = true
    timerStatus = 'Tempo restante'
    cron = setInterval(() => {
        milesimo += 100
        console.log(milesimo);
        if (milesimo >= 1000) {
            milesimo = 0
            clearInterval(cron)
            timer()
            startTimer()
        }
    }, 100)
}

function pauseTimer() {
    clearInterval(cron)
    timerRunning = false
    timerStatus = 'Pausa'
    updateTimerDOM()
}

function stopTimer() {
    timerRunning = false
    timerStatus = 'Parado'
    clearInterval(cron)

    mm = mmInitialTime
    ss = ssInitialTime

    updateTimerDOM()
}

function timer() {
    ss--
    if (ss < 0) {
        ss = 59
        mm--
    }
    updateTimerDOM()
}

function timerCommand(command) {
    if (timerRunning == false) {
        if (command.ctrlKey) {
            if (confirm('Deseja reiniciar o tempo atual'))
                stopTimer()
        } else {
            startTimer()
        }
    } else if (!command.ctrlKey) {
        pauseTimer()
    }
}

function redefineInitialTime() {
    format = prompt('Atualizar tempo', `${addZeroes(mm, 2)}:${addZeroes(ss, 2)}`)
    format = format != null ? format.split(':') : [mm, ss]
    mm = Number(format[0])
    ss = Number(format[1])
    updateTimerDOM()
}

function updateTimerDOM() {
    mmCounter.textContent = addZeroes(mm, 2)
    ssCounter.textContent = addZeroes(ss, 2)
    statusDisplay.textContent = timerStatus
}

//  Placar
fieldsId = []
placar = {
    'b': {
        '2': 0,
        '3': 0,
        '4': 0,
        'v': 0,
        'p': 0,
        'min': {
            '2': false,
            'v': false
        },
        't': 0
    },
    'w': {
        '2': 0,
        '3': 0,
        '4': 0,
        'v': 0,
        'p': 0,
        'min': {
            '2': false,
            'v': false
        },
        't': 0
    }
}

const getFields = document.querySelectorAll('.-js-get-id')
getFields.forEach(field => {
    fieldsId.push(field.getAttribute('id'))
})

fieldsId.forEach(id => {
    let element = document.getElementById(id)
    let clicked = id.slice([-1])
    element.onclick = click => {

        if (clickType(click)) {
            placar[id[0]][clicked]++

            if (clicked == 'p') {
                scorePunicao(id)
            }
        } else if (placar[id[0]][clicked] != 0) {
            switch (clicked) {
                case 'v':
                case '2':
                    if (placar[id[0]]['min'][clicked] &&
                        placar[id[0]][clicked] == 1)
                        return
                    placar[id[0]][clicked]--
                    break
                case 'p':
                    placar[id[0]][clicked]--
                    removeScorePunicao(id)
                    break
                default:
                    placar[id[0]][clicked]--
                    break
            }
        }

        updateTotal()
        updatePlacarDOM()
    }
})

function updateTotal() {
    let totalScore = {
        'b': 0,
        'w': 0
    }

    fieldsId.forEach(id => {
        let score = placar[id[0]][id.slice([-1])]
        if (!isNaN([id.slice([-1])])) {
            score = score * parseInt([id.slice([-1])])
            totalScore[id[0]] += score
        }
    })

    Object.keys(totalScore).forEach(key => {
        placar[key]['t'] = totalScore[key]
    })
}

function updatePlacarDOM() {
    fieldsId.forEach(id => {
        let element = document.getElementById(id)
        let content = placar[id[0]][id.slice([-1])]

        if (!isNaN([id.slice([-1])])) {
            content = content * parseInt([id.slice([-1])])
        } else {
            content = parseInt(placar[id[0]][id.slice([-1])])
        }

        element.textContent = addZeroes(content, 2)
    })
}

function addZeroes(num, len) {
    let numberWithZeroes = String(num)
    let counter = numberWithZeroes.length

    while (counter < len) {
        numberWithZeroes = "0" + numberWithZeroes
        counter++
    }
    return numberWithZeroes
}

function clickType(event) {
    if (event.ctrlKey) return false
    return true
}

function scorePunicao(id) {
    let opponent = (id[0] == 'b') ? 'w' : 'b'

    switch (placar[id[0]]['p']) {
        case 2:
            placar[opponent]['v']++
            placar[opponent]['min']['v'] = true
            break
        case 3:
            placar[opponent]['2']++
            placar[opponent]['min']['2'] = true
        default:
            break
    }
}

function removeScorePunicao(id) {
    let opponent = (id[0] == 'b') ? 'w' : 'b'

    switch (placar[id[0]]['p']) {
        case 1:
            placar[opponent]['v']--
            placar[opponent]['min']['v'] = false
            break
        case 2:
            placar[opponent]['2']--
            placar[opponent]['min']['2'] = false
        default:
            break
    }
}