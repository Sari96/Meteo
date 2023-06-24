<script>
export default {
  props: {
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
    },
    selectedDateIndex: {
      required: true,
      type: Number
    }
  },
  methods: {
    setWeatherDate() {
      this.$emit('buttonClicked', this.index);
    }
  }
}
</script>

<template>
<label>
  <input type="radio" class="btn-check" name="btnradio" :id="'btnradio-' + data.date.getDate()" autocomplete="off" @click="setWeatherDate">
  <div class="card d-flex flex-column justify-content-between glass text-center h-100" :class="{ selected:  index == selectedDateIndex}">
    <div class="card-body">
      <h5 class="card-title">{{data.temperature_2m_avg + ' ' + measures.apparent_temperature_max}}</h5>
      <img :src="data.svg"/>
      <h5 class="card-title day">{{data.date.toLocaleDateString('it-IT', {weekday: 'short'})}}</h5>
    </div>
  </div>
</label>
</template>

<style lang="scss" scoped>
.card {
		top: auto;

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

    &:hover {
      cursor: pointer;
    }
}
</style>
