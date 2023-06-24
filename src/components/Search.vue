<script>
export default {
	data() {
		return {
			location: ''
		};
	},
	methods: {
		search() {
			if (this.location.length > 0) {
      			this.$emit('search', this.location);
				this.location = "";
			}
    	}
  	}
}
</script>

<template>
	<div class="mb-3 form mt-3">
		<div class="input-group">
			<input class="form-control border-end-0 border rounded-pill" id="floatingInput" placeholder="Choose location" type="location" v-model="location" @keyup.enter="search">
			<button class="btn btn-primary btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5" @click="search">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 20 20">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
				</svg>
			</button>
		</div>
	</div>
</template>

<style scoped>
.ms-n5 {
    margin-left: -40px !important;
}

svg {
	transform: scale(.8);
	transition-duration: 0.5s;
}

.btn:hover svg {
	color: blue;
	transform: scale(1);
	transition-duration: 0.5s;
}

input:focus {
	z-index: 0 !important;
}

</style>