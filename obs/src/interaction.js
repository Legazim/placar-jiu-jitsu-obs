const sponsorsNumber = 12;
const slider = document.querySelector('.carrousel-slider');
var index = 0;
var sponsors = [];
var sponsorInterval;

// Sponsors slideshow

for (let i = 1; i <= sponsorsNumber; i++) {
    sponsors.push(`sponsors/${i}.jpg`);
}

insertSponsors();
loopSponsors();

function insertSponsors() {
    for (let i = 0; i < sponsors.length; i++) {
        let html = `<img class="img-item img-item${i} off" src="${sponsors[i]}"/>`;
        slider.insertAdjacentHTML('beforeend', html);
    }
}

function loopSponsors() {
    sponsorInterval = setInterval(() => {
        nextSponsor();
    }, 10000);
}

function nextSponsor() {
    let sponsors = document.querySelectorAll('.img-item');
    index++;
    if (index <= sponsors.length - 1) {
        changeSponsor(index);
    } else {
        index = 0;
        changeSponsor(0);
    }
}

function changeSponsor(index) {
    let images = document.querySelectorAll(`.img-item`);
    let selected = document.querySelector(`.img-item${index}`);
    images.forEach((img) => {
        img.classList.add('off');
    });
    selected.classList.remove('off');
}
