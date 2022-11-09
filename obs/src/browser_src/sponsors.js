const sponsorsNumber = 11;
const sponsorKindValues = {
    0: { text: 'Patrocínio', time: 10000 },
    5: { text: 'Apoio', time: 3000 },
};
const sponsorKind = document.getElementById('sponsorKind');
const slider = document.querySelector('.carrousel-slider');
var index = -1;
var sponsors = [];
var sponsorInterval;
var timeoutInterval = sponsorKindValues[0]['time'];

// Sponsors slideshow
for (let i = 1; i <= sponsorsNumber; i++) {
    sponsors.push(`sponsors/${i}.jpg`);
}

insertSponsors();
nextSponsor();
sponsorKindChange(sponsorKindValues[0]['text']);

function insertSponsors() {
    for (let i = 0; i < sponsors.length; i++) {
        let html = `<img class="img-item img-item${i} off" src="${sponsors[i]}"/>`;
        slider.insertAdjacentHTML('beforeend', html);
    }
}

function loopSponsors() {
    sponsorInterval = setTimeout(() => {
        nextSponsor();
    }, timeoutInterval);
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
    if (index in sponsorKindValues) {
        sponsorKindChange(sponsorKindValues[index]['text']);
        timeoutInterval = sponsorKindValues[index]['time'];
    }
    loopSponsors();
}

function changeSponsor(index) {
    let images = document.querySelectorAll(`.img-item`);
    let selected = document.querySelector(`.img-item${index}`);
    images.forEach((img) => {
        img.classList.add('off');
    });
    selected.classList.remove('off');
}

function sponsorKindChange(text) {
    if (typeof text === 'undefined') return;

    sponsorKind.classList.add('sponsors__kind--hidden');
    setTimeout(() => {
        sponsorKind.classList.remove('sponsors__kind--hidden');
        text = text.toUpperCase() + ':';
        sponsorKind.innerHTML = text;
    }, 600);
}
