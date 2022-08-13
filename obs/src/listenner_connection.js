ws.addEventListener('message', msg => {
    try {
        let parsedData = JSON.parse(msg.data);
        console.log(parsedData);

        if ('pTimer' in parsedData) {
            updateTimer(parsedData.pTimer);
        };

        if ('placar' in parsedData) {
            updatePlacar(parsedData.placar);
        };

        if ('point' in parsedData) {
            showPoint(parsedData.point);
        };

        if ('winner' in parsedData) {
            declareWinner(parsedData.winner, parsedData.pun);
        };
    } catch (error) {
        console.log(`An error has occurred: ${error.message}`);
    };
});
