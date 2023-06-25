<script>

export default {
	props: {
		series: {
			required: true,
			type: Array
		},
		categories: {
			required: true,
			type: Array
		},
		title: {
			required: true,
			type: String
		},
		unit: {
			required: true,
			type: String
		}
	},
	methods: {
    	ylabels(value) {
			return value + " " + this.unit;
		}
  	},
	data: function() {
		return {
			options: {
				xaxis: {
					type: 'String',
					categories: this.categories,
				},
				yaxis: {
					labels: {
						formatter: this.ylabels
					},
				},
				stroke: {
    				width: 5,
				    curve: 'smooth'
  				},
				title: {
    				text: this.title,
    				align: 'left',
					offsetY: 25,
					style: {
						fontSize:  '1.5rem',
						fontWeight:  'bold',
					},
				},
				chart: {
					animations: {
						enabled: true,
						easing: 'easeinout',
						speed: 800,
						animateGradually: {
							enabled: true,
							delay: 150
						},
						dynamicAnimation: {
							enabled: true,
							speed: 350
						}
					}
				},
				legend: {
					position: 'top',
					horizontalAlign: 'right',
					onItemHover: {
						highlightDataSeries: true
					},
				},
			}
		}
  	},
}

//   tooltip: {
//     custom: function({series, seriesIndex, dataPointIndex, w}) {
//       return `<div class="arrow_box">
//       <img class="icon" src="img/${data.list[dataPointIndex].weather[0].icon}.png" />
//       <p class="text-center">${data.list[dataPointIndex].main.temp}°C</p>
//       </div>`
//     }
//     },

</script>

<template>
	<div>
		<apexchart type="line" :options="options" :series="series"></apexchart>
	</div>
</template>

<style scoped>
</style>