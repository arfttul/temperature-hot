const weatherInfo = () => {
    const city = document.getElementById('input-field').value;
    const API_KEY = `e7f74bbb25ed363ba507a90184450d99`;
    fetchUrl(city, API_KEY);
}
const setInnerText = (id, innerText) => {
    const element = document.getElementById(id);
    element.innerText = ` ${innerText}`;
}
const removerInnerText = (id) => {
    const element = document.getElementById(id);
    element.innerText = "";
}
const fetchUrl = async (cityName, API_KEY) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (data.cod !== '404') {
        updateWeather(data);

    }
    else {
        const warning = document.getElementById('warning');
        warning.classList.add('text-danger');
        warning.classList.add('text-center');
        setInnerText('warning', data.message);
        removerInnerText('current-temparature');
        removerInnerText('current-city-name');
        removerInnerText('current-weather-status');
        removerInnerText('weather-icon');
        setTimeout(function () {
            warning.textContent = "";
        }, 1300);
    }

}

const updateWeather = weatherData => {
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const imgTag = document.getElementById('weather-icon');
    imgTag.setAttribute('src', iconUrl);
    imgTag.setAttribute('alt', 'icon');
    setInnerText('current-temparature', weatherData.main.temp);
    setInnerText('current-city-name', weatherData.name);
    setInnerText('current-weather-status', weatherData.weather[0].main);
    setInnerText('weather-icon', weatherData.weather[0].icon);

}