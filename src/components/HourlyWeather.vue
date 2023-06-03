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
	<div class="d-flex my-4 flex-column justify-content-between">
		<p class="card-text fs-3">{{data.date.toLocaleTimeString('it-IT', {hour: '2-digit', minute:'2-digit'})}}</p>
		<img :src="data.svg" class="d-block">
		<p class="card-text fs-3">{{data.temperature_2m + " " + measures.temperature_2m}}</p>
	</div>
</template>

<style scoped>
</style>
