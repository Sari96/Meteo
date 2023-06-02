<script>
import DateButton from './components/DateButton.vue'
import MainWeather from './components/MainWeather.vue'

export default {
  data() {
    return {
      cityName: "",
      dailyData: {},
      backgroundImageMainWeather: ""
    };
  },
  components: {
    DateButton,
    MainWeather
  },
  methods: {
    getWeatherImg(code, is_day) {
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

      img = new URL("../images/" + img + "_" + is_day + ".svg", import.meta.url).href;

      return img;
    },

    loadCity(lat, lng) {
      this.url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&`;
      fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&appid=ca0bc81789a77b485742ed7b77c9a1b9&limit=0`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.cityName = data[0].name;
        this.loadDailyData(lat, lng);
      });
    },

    loadDailyData(lat, lng) {
      const dailyUrl = this.url + 'timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weathercode,sunrise,sunset';
      console.log(dailyUrl);
      fetch(dailyUrl)
      .then((response) => response.json())
      .then((data) => {
        const tmp = data.daily.time.map((time, index) => ({
          date: new Date(time),
          temperature_2m_avg: Math.round((data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2),
          //apparent_temperature_max: data.daily.apparent_temperature_max[index],
          //apparent_temperature_min: data.daily.apparent_temperature_min[index],
          //precipitation_sum: data.daily.precipitation_sum[index],
          //weathercode: data.daily.weathercode[index],
          sunrise: data.daily.sunrise[index],
          sunset: data.daily.sunset[index],
          svg: this.getWeatherImg(data.daily.weathercode[index], 1)
        }));
        data.daily = tmp;
        this.dailyData = data;




        this.backgroundImageMainWeather = new URL('../images/background_0.png', import.meta.url).href;
      });
    },

    setWeatherDate(index) {
      if (index % 2 == 0)
        this.backgroundImageMainWeather = new URL('../images/background_0.png', import.meta.url).href;
      else
        this.backgroundImageMainWeather = new URL('../images/background_1.png', import.meta.url).href;
    }
  },
  beforeMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.loadCity(lat, lng);
    });
  }
};
</script>

<template>
  <main>
    <div class="container mt-3">
      <h1 class="text-center">{{ cityName }}</h1>
      <div id="dateBar" class="my-5 card-group btn-group d-flex justify-content-evenly" role="group" aria-label="Basic radio toggle button group">
        <DateButton v-for="(item, index) in dailyData.daily"
          :data="item"
          :index="index"
          :measures="dailyData.daily_units"
          @buttonClicked="setWeatherDate"
        />
      </div>

      <div id="weather" class="row">
        <div class="col-12 col-md-8">
          <MainWeather
            :backgroundImage="backgroundImageMainWeather"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
