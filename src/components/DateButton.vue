<script setup>
defineProps({
  data: {
    required: true,
    type: Object
  },
  index: {
    required: true,
    type: Number
  },
  measures: {
    required: true,
    type: Object
  }
})
</script>

<template>
<label>
  <input type="radio" class="btn-check" name="btnradio" :id="'btnradio-' + data.date.getDate()" autocomplete="off" :onclick="'setWeatherDate(' + index + ')'">
  <div class="card d-flex flex-column justify-content-between">
    <div class="card-body">
      <h5 class="card-title">{{data.temperature_2m_avg + ' ' + measures.apparent_temperature_max}}</h5>
      <img :src="data.svg"/>
      <h5 class="card-title day">{{data.date.toLocaleDateString('it-IT', {weekday: 'short'})}}</h5>
    </div>
  </div>
</label>
</template>

<style lang="scss" scoped>
@import '../assets/main';
.card {
		@extend %glass;
		text-align: center;
		top: auto;
		height: 100%;

		&.selected {
			background: rgba(255, 255, 255, 0.75);
		}

		img {
			width: 5vw;
			height: 10vh;
		}

		.card-title.day {
			text-transform: capitalize;
		}
}
</style>
