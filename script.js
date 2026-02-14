
const apiKey = "put your API";


function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {

            if (data.cod !== 200) {
                alert("City not found");
                return;
            }
            document.getElementById("city").innerText = data.name;
            document.getElementById("temp").innerText = Math.round(data.main.temp) + "°";
            document.getElementById("description").innerText = data.weather[0].description;


            const weather = data.weather[0].main;
            changeBackground(weather);
            getForecast(data.coord.lat, data.coord.lon);
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong");
        });
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            const forecastDiv = document.getElementById("forecast");
            forecastDiv.innerHTML = "";

            // Take one forecast per day (every 8 entries = 24h)
            for (let i = 8; i < data.list.length; i += 8) {
                const day = data.list[i];
                const date = new Date(day.dt * 1000)
                    .toLocaleDateString("en-US", { weekday: "short" });

                forecastDiv.innerHTML += `
          <div class="forecast-day">
            <span>${date}</span>
            <span>${Math.round(day.main.temp)}°</span>
          </div>
        `;
            }
        })
        .catch(err => console.error(err));
}



function changeBackground(weather) {
    const body = document.body;
    const effect = document.getElementById("weather-effect");

    effect.innerHTML = ""; // reset effects

    switch (weather) {
        case "Rain":
            body.style.background = "linear-gradient(180deg, #0f172a, #020617)";
            createRain();
            break;

        case "Clouds":
            body.style.background = "linear-gradient(180deg, #1e293b, #020617)";
            break;

        case "Clear":
            body.style.background = "linear-gradient(180deg, #60a5fa, #1e3a8a)";
            break;

        case "Snow":
            body.style.background = "linear-gradient(180deg, #e5e7eb, #94a3b8)";
            createSnow();
            break;

        case "Thunderstorm":
            body.style.background = "linear-gradient(180deg, #020617, #000)";
            createRain();
            break;

        default:
            body.style.background = "linear-gradient(180deg, #0f172a, #020617)";
    }
    document.querySelector(".app").classList.remove("sun-glow");

    if (weather === "Clear") {
        document.querySelector(".app").classList.add("sun-glow");
    }

}

function createRain() {
    const effect = document.getElementById("weather-effect");

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement("div");
        drop.className = "rain";

        drop.style.left = Math.random() * window.innerWidth + "px";
        drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
        drop.style.opacity = Math.random();

        effect.appendChild(drop);
    }
}

const icon = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;


