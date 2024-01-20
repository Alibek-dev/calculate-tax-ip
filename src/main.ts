import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {vMaska} from "maska";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive("mask", vMaska)

app.mount('#app')
