const API_KEY = 'c296e0f5b5b7f5d9144c595627f4ee14';

function onGeoSuccess(position){
    alert('성공!');
    console.dir(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data =>{
        const weatherContainer = document.querySelector('#weather');
        const location = weatherContainer.querySelector('span:first-child');
        const weather = weatherContainer.querySelector('span:last-child');

        location.innerText = `${data.sys.country}, ${data.name}`;
        weather.innerHTML = `${data.weather[0].description} ${data.main.temp}&#8451;`; 
    });
}
function onGeoFail(){
    alert('날씨를 가져올 수 없습니다.');
}
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);