<script setup>
defineProps({
  data: {
    required: true,
    type: Object
  },
  measures: {
    required: true,
    type: Object
  },
  index: {
    required: true,
    type: Number
  },
})
</script>

<template>
  <div class="card h-100 glass">
    <img :src="data[index].backgroundSvg" class="card-img">
    <div class="card-img-overlay row">
      <div class="col-5 text-center d-flex flex-column justify-content-evenly">
        <img :src="data[index].svg">
        <h5 class="card-title">{{data[index].date.toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'})}}</h5>
      </div>
      <div class="col-7 d-flex flex-column justify-content-evenly">
        <h5 class="card-title fs-1">{{data[index].temperature_2m + " " + measures.temperature_2m}}</h5>
        <p class="card-text fs-3">{{data[index].date.toLocaleDateString('it-IT', {day: 'numeric', month: "long", year: "numeric"})}}</p>
        <div class="row">
          <div class="col-2">
            <img src="images/humidity.svg" class="d-block">
          </div>
          <div class="col-4">
            <h5 class="card-title">Umidità</h5>
            <p class="card-text">{{data[index].relativehumidity_2m + " " + measures.relativehumidity_2m}}</p>
          </div>
          <div class="col-2">
            <img src="images/wind.svg" class="d-block">
          </div>
          <div class="col-4">
            <h5 class="card-title">Vento</h5>
            <p class="card-text">{{data[index].windspeed_10m + " " + measures.windspeed_10m}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img.card-img {
  border-radius: 2.5em;
}
</style>
