import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import DetailFooter from "./views/DetailFooter"
import store from "./store"

createApp(App).use(router).use(store).component("DetailFooter",DetailFooter).mount('#app')
