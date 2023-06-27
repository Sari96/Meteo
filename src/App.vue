<script>
import DateButton from './components/DateButton.vue'
import MainWeather from './components/MainWeather.vue'
import DailyInfo from './components/DailyInfo.vue'
import HourlyWeather from './components/HourlyWeather.vue'
import Search from './components/Search.vue'
import Chart from './components/Chart.vue'

export default {
  data() {
    return {
      cityName: "",
      dailyData: {},
      hourlyData: {},
      selectedDateIndex: -1,
      mainWeatherIndex: -1,
      todayHourlyData: {},
      location: "",
      appid: "ca0bc81789a77b485742ed7b77c9a1b9",
    };
  },
  components: {
    DateButton,
    MainWeather,
    DailyInfo,
    HourlyWeather,
    Search,
    Chart,
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
      fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&appid=${this.appid}&limit=0`)
      .then((response) => response.json())
      .then((data) => {
        console.log("City data from API:");
        console.log(data);
        this.cityName = data[0].name;
        this.loadDailyData(lat, lng);
      });
    },

    loadDailyData(lat, lng) {
      const dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,weathercode,sunrise,sunset`;
      fetch(dailyUrl)
      .then((response) => response.json())
      .then((data) => {
        const tmp = data.daily.time.map((time, index) => ({
          date: new Date(time),
          temperature_2m_avg: Math.round((data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2),
          temperature_2m_min: data.daily.temperature_2m_min[index],
          temperature_2m_max: data.daily.temperature_2m_max[index],
          //apparent_temperature_max: data.daily.apparent_temperature_max[index],
          //apparent_temperature_min: data.daily.apparent_temperature_min[index],
          //precipitation_sum: data.daily.precipitation_sum[index],
          //weathercode: data.daily.weathercode[index],
          sunrise: new Date(data.daily.sunrise[index]),
          sunset: new Date(data.daily.sunset[index]),
          svg: this.getWeatherImg(data.daily.weathercode[index], 1)
        }));
        data.daily = tmp;
        this.dailyData = data;
        this.loadHourlyData(lat, lng);
      });
    },

    loadHourlyData(lat, lng) {
      const hourlyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m,winddirection_10m,precipitation,precipitation_probability,weathercode,is_day`;
      fetch(hourlyUrl)
        .then((response) => response.json())
        .then((data) => {
          const tmp = data.hourly.time.map((time, index) => ({
            time: time,
            date: new Date(time),
            apparent_temperature: data.hourly.apparent_temperature[index],
            is_day: data.hourly.is_day[index],
            precipitation: data.hourly.precipitation[index],
            precipitation_probability: data.hourly.precipitation_probability[index],
            relativehumidity_2m: data.hourly.relativehumidity_2m[index],
            temperature_2m: data.hourly.temperature_2m[index],
            time: data.hourly.time[index],
            weathercode: data.hourly.weathercode[index],
            winddirection_10m: data.hourly.winddirection_10m[index],
            windspeed_10m: data.hourly.windspeed_10m[index],
            svg: this.getWeatherImg(data.hourly.weathercode[index], data.hourly.is_day[index]),
            backgroundSvg: new URL("../images/background_" + data.hourly.is_day[index] + ".png", import.meta.url).href,
          }));
          data.hourly = tmp;
          this.hourlyData = data;
          console.log("Hourly Data:");
          console.log(data);
          this.setWeatherDate(0);
      });
    },

    setWeatherDate(dateIdx) {
      const now = new Date();
      console.log(`Called setWeatherDate(${dateIdx})`);
      this.selectedDateIndex = dateIdx;
      let date = this.dailyData.daily[dateIdx].date;
      // YYYY-MM-DD format
      const dateString = this.dailyData.daily[dateIdx].date.toLocaleDateString('it-IT', {year: "numeric"}) + "-" + this.dailyData.daily[dateIdx].date.toLocaleDateString('it-IT', {month: "2-digit"}) + "-" + this.dailyData.daily[dateIdx].date.toLocaleDateString('it-IT', {day: "2-digit"});
      this.hourlyData.hourly.forEach((item, index) => {
        date = item.date;
        // Considero solo gli elementi del meteo orario per il giorno che sto visualizzando
        if (item.time.startsWith(dateString)) {
          let minIdx = this.hourlyData.hourly.findIndex(item2 => item2.date.getHours() >= now.getHours());
          // Se sto visualizzando il giorno corrente mostro il meteo all'orario corrente
          // altrimenti mostro il meteo alle 10
          if (dateIdx == 0 && index == minIdx || dateIdx != 0 && date.getHours() == 10) {
            this.mainWeatherIndex = index;
          }
        }
      });
      this.todayHourlyData = this.hourlyData.hourly.filter((item, index) => item.time.startsWith(dateString));
    },

    search(location) {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=0&appid=${this.appid}`)
      .then((response) => response.json())
      .then((data) => {
        this.loadCity(data[0].lat, data[0].lon);
      });
    }
  },
  beforeMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
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
      <!-- Quando il componente figlio emette l'evento search verrà richiamata la funzione search -->
      <Search
        @search="search"
      />

      <div id="dateBar" class="my-5 card-group btn-group d-flex justify-content-evenly" role="group" aria-label="Basic radio toggle button group">
        <!-- Quando il componente figlio emette l'evento buttonClicked verrà richiamata la funzione setWeatherDate -->
        <!-- Con v-for richiamo tante volte il componente DateButton, una per ogni data presente in dailyData -->
        <DateButton v-for="(item, index) in dailyData.daily"
          :data="item"
          :index="index"
          :measures="dailyData.daily_units"
          @buttonClicked="setWeatherDate"
          :selectedDateIndex="selectedDateIndex"
        />
      </div>

      <div id="weather" class="row">
        <div class="col-12 col-lg-8 mb-5 mb-lg-0">
          <!-- Mostro il componente MainWeather solo se hourlyData contiene i dati della API e se ho l'indice dell'orario da mostrare -->
          <MainWeather v-if="hourlyData.hourly && mainWeatherIndex >= 0"
            :data="hourlyData.hourly"
            :measures="hourlyData.hourly_units"
            :index="mainWeatherIndex"
          />
        </div>

        <div class="col-12 col-lg-4">
          <!-- Mostro il componente MainWeather solo se dailyData contiene i dati della API e se ho l'indice dell'orario da mostrare -->
          <DailyInfo v-if="dailyData.daily && selectedDateIndex >= 0"
            :data="dailyData.daily[selectedDateIndex]"
            :measures="dailyData.daily_units"
          />
        </div>
      </div>

      <div class="row my-5">
        <div class="col-12 col-lg-6 mb-5 mb-lg-0">
          <Chart v-if="todayHourlyData.length > 0"
            :series="[
              {
                name: 'Temperatura percepita',
                data: todayHourlyData.map(item => item.apparent_temperature)
              },
              {
                name: 'Temperatura effettiva',
                data: todayHourlyData.map(item => item.temperature_2m)
              }
            ]"

            :categories="todayHourlyData.map(item => item.date.toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'}))"
            :title="'Temperatura'"
            :unit="hourlyData.hourly_units.temperature_2m"
            />
        </div>
        <div class="col-12 col-lg-6">
          <Chart v-if="todayHourlyData.length > 0"
            :series="[
              {
                name: 'Probabilità precipitazioni',
                data: todayHourlyData.map(item => item.precipitation_probability)
              },
              {
                name: 'Umidità',
                data: todayHourlyData.map(item => item.relativehumidity_2m)
              }
            ]"

            :categories="todayHourlyData.map(item => item.date.toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'}))"
            :title="'Umidità e precipitazioni'"
            :unit="hourlyData.hourly_units.relativehumidity_2m"
            />
        </div>
      </div>

      <div class="card flex-row flex-nowrap mb-5 align-items-stretch glass overflow-x-scroll text-center pb-2" id="hourlyWeather">
        <HourlyWeather v-for="data in todayHourlyData"
          :data="data"
          :measures="hourlyData.hourly_units"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>

