const clock = document.querySelector('#clock');
const clockHour = clock.querySelector('.clockHour');
const clockMin = clock.querySelector('.clockMin');
const clockSec = clock.querySelector('.clockSec');

clockTiking();
setTimeout(clockTiking, 1000);

function clockTiking(){
    let date = new Date();
    const hour = timeToString(date.getHours());
    const min = timeToString(date.getMinutes());
    const sec = timeToString(date.getSeconds());

    clockHour.innerText = hour;
    clockMin.innerText = min;
    clockSec.innerText = sec;
}

function timeToString(time){
    return String(time).padStart(2, '0');
}

setInterval(clockTiking, 1000);

//padStart(characterLong, characterToFill);
//padEnd(characterLong, charanterToFill)