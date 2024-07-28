const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const loading = document.querySelector('.loading');

const APIKey = '5c3836b154b74b028fa64629242807';  

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value.trim();
    if (city === '') return;

    loading.style.display = 'block';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'none';

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
        .then(response => response.json())
        .then(json => {
            loading.style.display = 'none';
            if (json.error) {
                showError(json.error.message);
                return;
            }
            displayWeather(json);
        })
        .catch(error => {
            loading.style.display = 'none';
            showError("An error occurred while fetching the weather data.");
        });
});

function showError(message) {
    container.style.height = '400px';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
    error404.querySelector('p').textContent = message;
}

function displayWeather(data) {
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    const feelsLike = document.querySelector('.weather-details .feels-like span');
    const pressure = document.querySelector('.weather-details .pressure span');
    const visibility = document.querySelector('.weather-details .visibility span');

    const condition = data.current.condition.text.toLowerCase();
    image.src = getImageSrc(condition);

    temperature.innerHTML = `${Math.round(data.current.temp_c)}<span>°C</span>`;
    description.textContent = data.current.condition.text;
    humidity.textContent = `${data.current.humidity}%`;
    wind.textContent = `${Math.round(data.current.wind_kph)} Km/h`;
    feelsLike.textContent = `${Math.round(data.current.feelslike_c)}°C`;
    pressure.textContent = `${data.current.pressure_mb} hPa`;
    visibility.textContent = `${data.current.vis_km} Km`;

    weatherBox.style.display = 'block';
    weatherDetails.style.display = 'block';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}

function getImageSrc(condition) {
    if (condition.includes('clear') || condition.includes('sunny')) {
        document.body.style.backgroundImage = "url('images/clear.png')";
    } else if (condition.includes('cloud')) {
        document.body.style.backgroundImage = "url('images/cloud.png')";
    } else if (condition.includes('fog') || condition.includes('mist')) {
        document.body.style.backgroundImage = "url('images/mist.png')";
    } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
        document.body.style.backgroundImage = "url('images/rain.png')";
    } else if (condition.includes('snow')) {
        document.body.style.backgroundImage = "url('images/snow.png')";
    } else {
        document.body.style.backgroundImage = "url('images/default.png')";
    }
}