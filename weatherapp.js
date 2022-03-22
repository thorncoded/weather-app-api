
let weather = {
    apiKey: "eab98467cf215e739f0860ebca9c3558",
    fetchWeather: function (city, units) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" +
            this.apiKey +
            "&units=" +
            units
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data, units));
    },
    displayWeather: function (data, units) {
        //TO-DO: take value from radio selection button and 
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        const { speed } = data.wind;

        console.log(name,icon,description,temp,humidity,speed,units);

        if (units == "metric") {
            tempUnit = "°C";
            speedUnit = "km/h";
        } else if (units == "imperial") {
            tempUnit = "°F";
            speedUnit = "mph";
        } else {
            console.log("ERROR!");
        }

        console.log(name,icon,description,temp,humidity,speed, units, tempUnit, speedUnit);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + tempUnit;
        document.querySelector(".feelsLike").innerHTML = "(Feels like <strong>" + feels_like + tempUnit + "</strong> )";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " " + speedUnit;
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value, document.querySelector('input[type=radio][name=units]:checked').value);
    },
  };

  
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  weather.fetchWeather("Green Bay", "metric");