import './assets/main.scss'

import VueApexCharts from "vue3-apexcharts";
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(VueApexCharts);
app.mount('#app');
