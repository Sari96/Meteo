<script setup>
defineProps({
  backgroundImage: {
    required: true,
    type: String
  }
})
</script>

<template>
  <div class="card h-100" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="card-body row" id="main-weather">
      aaaaaaaaaaaaaaaa
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/main';
.card {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.card-body {
  @extend %glass;
}
</style>
