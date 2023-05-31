let dailyValues, hourlyValues;
let url;
let dateIndex;

const loadCity = (lat, lng) => {
  url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&`;
  fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&appid=ca0bc81789a77b485742ed7b77c9a1b9&limit=0`)
  .then((response) => response.json())
  .then((data) => {
    $("h1").append(data[0].name);
    loadHourlyData();
    loadDailyData();
  });
}

const getWeatherImg = (code, is_day) => {
  var img;
  if (code == 0)
    img = "clear";
  else if ([1, 2, 3].includes(code))
    img = "partly_cloudly";
  else if ([45, 48].includes(code))
    img = "foggy";
  else if ([51, 53, 55, 56, 57, 61, 66, 80].includes(code))
    img = "drizzle";
  else if ([63, 65, 67, 81, 82].includes(code))
    img = "rain";
  else if ([71, 73, 75, 77, 85, 86].includes(code))
    img = "snow";
  else if ([95,96, 99].includes(code))
    img = "thunder";

  return img = "resources/" + img + "_" + is_day + ".svg";
}

const loadDailyData = () => {
  const dailyUrl = url + 'timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weathercode,sunrise,sunset';
  console.log(dailyUrl);
  fetch(dailyUrl)
  .then((response) => response.json())
  .then((data) => {
    dailyValues = data;
    data.daily.time.forEach((item, index) => {
      const date = new Date(item);
      const temp = Math.round((data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2);
      const svg = getWeatherImg(data.daily.weathercode[index], 1);
      console.log(svg);
      $("#dateBar").append(`
      <label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio-${date.getDate()}" autocomplete="off" onclick="setWeatherDate(${index})">
        <div class="card d-flex flex-column justify-content-between">
          <div class="card-body">
            <h5 class="card-title">${temp} °C</h5>
            <img src="${svg}"/>
            <h5 class="card-title day">${date.toLocaleDateString('it-IT', {weekday: 'short'})}</h5>
          </div>
        </div>

        <!-- <img src="..." class="card-img-top" alt="...">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>-->
      </label>`);
    });
  });
}

const loadHourlyData = (lat,lng) => {
  const hourlyUrl = url + 'hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m,winddirection_10m,precipitation,precipitation_probability,weathercode,is_day';
  console.log(hourlyUrl);
  fetch(hourlyUrl)
  .then((response) => response.json())
  .then((data) => {
    hourlyValues = data;
    setWeatherDate(0);
  });
}

const setWeatherDate = (dateIdx) => {
  console.log(`Called setWeatherDate(${dateIdx})`);
  $("#dateBar .card.selected").removeClass("selected");
  $("#dateBar .card").eq(dateIdx).addClass("selected");
  dateIndex = dateIdx;
  const now = new Date();
  let date = new Date(dailyValues.daily.time[dateIdx]);
  // YYYY-MM-DD format
  const dateString = date.toLocaleDateString('it-IT', {year: "numeric"}) + "-" + date.toLocaleDateString('it-IT', {month: "2-digit"}) + "-" + date.toLocaleDateString('it-IT', {day: "2-digit"});
  $("#sunrise").html(`${new Date(dailyValues.daily.sunrise[dateIndex]).toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})}`);
  $("#sunset").html(`${new Date(dailyValues.daily.sunset[dateIndex]).toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})}`);
  $("#temp_min").html(`${dailyValues.daily.temperature_2m_min[dateIndex]} °C`);
  $("#temp_max").html(`${dailyValues.daily.temperature_2m_max[dateIndex]} °C`);

  let htmlHourlyWeather = '';

  hourlyValues.hourly.time.forEach((time, index) => {
    date = new Date(time);
    if (time.startsWith(dateString)) {
      const svg = getWeatherImg(hourlyValues.hourly.weathercode[index], hourlyValues.hourly.is_day[index]);
      minIdx = hourlyValues.hourly.time.findIndex(time => new Date(time) >= now);
      if (dateIdx == 0 && index == minIdx || dateIdx != 0 && date.getHours() == 10) {
        $("#main-weather").parent().css({"background-image": "url(resources/background_" + hourlyValues.hourly.is_day[index] + ".png)"});
        $("#main-weather").html(`
            <div class="col-5 text-center d-flex flex-column justify-content-evenly">
              <img src="${svg}">
              <h5 class="card-title">${date.toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'})}</h5>
            </div>
            <div class="col-7 d-flex flex-column justify-content-evenly">
              <h5 class="card-title fs-1">${hourlyValues.hourly.temperature_2m[index]} °C</h5>
              <p class="card-text fs-3">${date.toLocaleDateString('it-IT', {day: 'numeric', month: "long", year: "numeric"})}</p>
              <div class="row">
                <div class="col-2">
                  <img src="resources/humidity.svg" class="d-block">
                </div>
                <div class="col-4">
                  <h5 class="card-title">Umidità</h5>
                  <p class="card-text">${hourlyValues.hourly.relativehumidity_2m[index]} %</p>
                </div>
                <div class="col-2">
                  <img src="resources/wind.svg" class="d-block">
                </div>
                <div class="col-4">
                  <h5 class="card-title">Vento</h5>
                  <p class="card-text">${hourlyValues.hourly.windspeed_10m[index]} km/h</p>
                </div>
              </div>
            </div>
            `
        );
      }
      htmlHourlyWeather = htmlHourlyWeather + `
        <div class="d-flex my-4 flex-column justify-content-between">
          <p class="card-text fs-3">${date.toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'})}</p>
          <img src="${svg}" class="d-block">
          <p class="card-text fs-3">${hourlyValues.hourly.temperature_2m[index]} °C</p>
        </div>
      `;
    }
  });

  $("#hourlyWeather").html(htmlHourlyWeather);
}

$(document).ready(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    loadCity(lat, lng);
  });
});