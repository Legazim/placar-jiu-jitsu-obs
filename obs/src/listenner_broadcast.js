const bc = new BroadcastChannel('controller');

// Handle incoming messages
bc.addEventListener('message', (msg) => {
    let broadcastData = msg.data
    console.log(broadcastData);

    if ('show' in broadcastData) {
        scoreboardState(broadcastData)
    }

    if ('scoreboardInput' in broadcastData) {
        updateNames(broadcastData.scoreboardInput)
    }
});

function scoreboardState(data) {
    const scoreboard = document.getElementById('scoreboard')
    if (data.show == true) {
        scoreboard.classList.remove('off')
    } else {
        scoreboard.classList.add('off')
    }
}

function updateNames(data) {
    document.getElementById('bname').textContent = data.blue.name
    document.getElementById('bteam').textContent = `(${data.blue.team})`
    document.getElementById('wname').textContent = data.white.name
    document.getElementById('wteam').textContent = `(${data.white.team})`
}