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
var timerStatus = ['Parado', 'stopped']
var cron
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

document.getElementById('set-time').onclick = () => {
    redefineInitialTime()
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

        if (timerStatus[0] == 'Tempo esgotado') {
            removeWinner()
            declareWinner(checkWinner())
        }

        updatePlacarDOM()
    }
})

function startTimer() {
    timerRunning = true
    timerStatus = ['Tempo restante', 'running']
    cron = setInterval(() => {
        milesimo += 100
        if (milesimo >= 1000) {
            milesimo = 0
            clearInterval(cron)
            startTimer()
            timer()
        }
    }, 100)
}

function pauseTimer() {
    clearInterval(cron)
    timerRunning = false
    timerStatus = ['Pausa', 'paused']
    updateTimerDOM()
}



function timer() {
    ss--
    if (ss < 0) {
        ss = 59
        mm--
        if (mm <= 0) {
            timesUp()
        }
    }
    updateTimerDOM()
}



function timerCommand(command) {
    if (timerRunning == false) {
        if (command.ctrlKey) {
            if (confirm('Deseja reiniciar o tempo e a contagem atual'))
                removeWinner()
                resetScoreAndTime()
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
    format[1] = format[1] == undefined ? 00 : format[1]

    mm = Number(format[0])
    ss = Number(format[1])

    updateTimerDOM()
}

function timesUp() {
    mm = 0
    ss = 0
    clearInterval(cron)
    timerRunning = false
    timerStatus = ['Tempo esgotado', 'stopped']

    updateTimerDOM()
    declareWinner(checkWinner())
}

function updateTimerDOM() {
    if (timerStatus[1] == 'stopped') {
        document.getElementById('set-time').classList.remove('hide')
    } else {
        document.getElementById('set-time').classList.add('hide')
    }

    ['paused', 'running', 'stopped'].forEach(status => {
        statusDisplay.classList.remove(status)
    })

    mmCounter.textContent = addZeroes(mm, 2)
    ssCounter.textContent = addZeroes(ss, 2)

    statusDisplay.textContent = timerStatus[0]
    statusDisplay.classList.add(timerStatus[1])
}

//  Placar funções
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
            break
        case 4:
            declareWinner(id[0], true)
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
        case 3:
            removeWinner()
        default:
            break
    }
}

function checkWinner() {
    blue = placar['b']
    white = placar['w']

    if (blue['t'] == white['t'] &&
        blue['v'] == white['v'] &&
        blue['p'] == white['p']) {
        return 'empate'
    }

    if (blue['t'] > white['t']) {
        return 'b'
    } else if (blue['t'] < white['t']) {
        return 'w'
    } else if (blue['v'] > white['v']) {
        return 'b'
    } else if (blue['v'] < white['v']) {
        return 'w'
    } else if (blue['p'] < white['p']) {
        return 'b'
    } else if (blue['p'] > white['p']) {
        return 'w'
    }
}

function declareWinner(id, pun = false) {
    removeWinner()
    if (pun) {
        document.getElementById(`${id}status`).textContent = 'Desclassificado'
        document.getElementById(`${id}status`).classList.add('show')
    } else if (id == 'empate') {
        document.getElementById('wstatus').textContent = 'Empate'
        document.getElementById('bstatus').textContent = 'Empate'
        document.getElementById('wstatus').classList.add('show')
        document.getElementById('bstatus').classList.add('show')
    } else {
        document.getElementById(`${id}status`).textContent = 'Vencedor'
        document.getElementById(`${id}status`).classList.add('show')
    }
}

function removeWinner() {
    ['w', 'b'].forEach(cor => {
        document.getElementById(`${cor}status`).classList.remove('show')
    })
}

function resetScoreAndTime() {
    timerRunning = false
    timerStatus = ['Parado', 'stopped']
    clearInterval(cron)

    mm = mmInitialTime
    ss = ssInitialTime

    milesimo = 0

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

    updateTimerDOM()
    updatePlacarDOM()
}

['resize', 'load', 'scroll'].forEach(evt => {
    window.addEventListener(evt, () => {
        setTimerDOMPosition()
    })
})

function setTimerDOMPosition() {
    let referenceRect = document.getElementById('bt').getBoundingClientRect()
    let elementRect =  document.getElementById('time-status').getBoundingClientRect()
    let distance = (referenceRect.right - elementRect.width)
    // let distance = referenceRect.left
    document.documentElement.style.cssText = `--transform: ${distance}px`
}

