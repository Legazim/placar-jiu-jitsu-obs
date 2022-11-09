const bc = new BroadcastChannel('controller');

// Handle incoming messages from BroadcastChannel
bc.addEventListener('message', (msg) => {
    let broadcastData = msg.data;
    console.log(broadcastData);

    if ('IP' in broadcastData) {
        ws.close();
        setConnection(broadcastData.IP);
    }

    if ('showPlacar' in broadcastData) {
        scoreboardState(broadcastData);
    }

    if ('scoreboardInput' in broadcastData) {
        updateNames(broadcastData.scoreboardInput);
    }

    if ('showPatrocinios' in broadcastData) {
        sponsorsState(broadcastData);
    }

    if ('showPopUp' in broadcastData) {
        popUpState(broadcastData);
    }
});

function scoreboardState(data) {
    const scoreboard = document.getElementById('scoreboard');
    if (data.showPlacar == true) {
        scoreboard.classList.remove('off');
    } else {
        scoreboard.classList.add('off');
    }
}

function sponsorsState(data) {
    let sponsors = document.getElementById('sponsors');
    if (data.showPatrocinios == true) {
        sponsors.classList.remove('off');
    } else {
        sponsors.classList.add('off');
    }
}

function popUpState(data) {
    let popUp = document.getElementById('pop-up-wrapper');
    if (data.showPopUp == true) {
        popUp.style.opacity = 1;
    } else {
        popUp.style.opacity = 0;
    }
}

function updateNames(data) {
    document.getElementById('bname').textContent = data.blue.name;
    document.getElementById('bteam').textContent = `(${data.blue.team})`;
    document.getElementById('wname').textContent = data.white.name;
    document.getElementById('wteam').textContent = `(${data.white.team})`;
}
