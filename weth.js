let city_search = document.getElementById("city-input");
let city_name = document.getElementById("city-name");
let temp = document.getElementById("temperature");
let humd = document.getElementById("humidity");
let wind = document.getElementById("wind-speed");
let desc = document.getElementById("weather-description");
let search_btn = document.getElementById("search-btn");
let icon = document.getElementById("weather-icon");

const accessKey = '962132a7e3b75efa048c2b62366761c4';

async function getWeather(city) {
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function display(data) {
  if (!data || !data.current) {
    alert("City not found or API error.");
    return;
  }

  city_name.textContent = data.location.name;
  temp.textContent = `${data.current.temperature} °C`;
  humd.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_speed} km/h`;
  desc.textContent = data.current.weather_descriptions[0];

  let condition = data.current.weather_descriptions[0].toLowerCase();

  // ✅ Weather Image (with folder "assets/")
  if (icon) {
    if (condition.includes("sunny") || condition.includes("clear")) {
      icon.src = "assets/clear.jpg";
    } else if (condition.includes("cloud")) {
      icon.src = "assets/cloudy.jpg";
    } else if (condition.includes("rain")) {
      icon.src = "assets/rainy.jpg";
    } else if (condition.includes("storm") || condition.includes("thunder")) {
      icon.src = "assets/storm.png";
    } else if (condition.includes("snow")) {
      icon.src = "assets/snow.png";
    } else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
      icon.src = "assets/haze.png";
    } else {
      icon.src = ""; // no match
    }
  }
}




search_btn.addEventListener('click', async () => {
  const city = city_search.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const weatherData = await getWeather(city);
  display(weatherData);
});

document.addEventListener('DOMContentLoaded', function() {
  // Hide cat animation after it completes
  setTimeout(function() {
    document.querySelector('.cat-welcome').style.display = 'none';
  }, 6000); // 6 seconds total (3s visible + 3s fade out)
  
  // Optional: Show again when clicking logo
  document.querySelector('.header h1').addEventListener('click', function() {
    const cat = document.querySelector('.cat-welcome');
    cat.style.display = 'flex';
    cat.style.animation = 'none';
    setTimeout(() => {
      cat.style.animation = 'fadeOut 3s forwards 3s';
    }, 10);
  });
});
