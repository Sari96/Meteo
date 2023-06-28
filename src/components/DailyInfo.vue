<script setup>
defineProps({
	data: {
		required: true,
		type: Object
	},
	measures: {
		required: true,
		type: Object
	}
})
</script>

<template>
	<div class="card glass text-center h-100" id="daily-info">
		<div class="card-body row">
		<div class="col-6 d-flex flex-column justify-content-evenly">
			<h5 class="card-title">Alba</h5>
			<img :src="'images/sunrise.svg'" class="d-block">
			<p class="card-text" id="sunrise">{{data.sunrise.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})}}</p>
			<div>
			<img :src="'images/temp_min.svg'">
			<span class="card-text" id="temp_min">{{ data.temperature_2m_min + " " + measures.temperature_2m_min }}</span>
			</div>
		</div>
		<div class="col-6 d-flex flex-column justify-content-evenly">
			<h5 class="card-title">Tramonto</h5>
			<img :src="'images/sunset.svg'" class="d-block">
			<p class="card-text" id="sunset">{{data.sunset.toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'})}}</p>
			<div>
			<img :src="'images/temp_max.svg'">
			<span class="card-text" id="temp_max">{{ data.temperature_2m_max + " " + measures.temperature_2m_max }}</span>
			</div>
		</div>
		</div>
	</div>
</template>

<style scoped>
</style>
