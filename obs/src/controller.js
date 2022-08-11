const bc = new BroadcastChannel('controller');

// Handle posting messages
bc.postMessage([40, 50, 60, 70])


const checkbox = document.getElementById('mostrar-placar')

checkbox.addEventListener('change', (event) => {
    mostrar = event.currentTarget.checked ? { 'show': true } : { 'show': false }
    bc.postMessage(mostrar)
})