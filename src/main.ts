import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {vMaska} from "maska";
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive("mask", vMaska)
app.use<[]>(Vue3TouchEvents);

app.mount('#app')
