import "bootstrap/dist/css/bootstrap.css"
import { createApp } from "vue";
import { createPinia } from "pinia";
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import App from "./App.vue";
import router from "./router";

let app = false;

onAuthStateChanged(auth, () => {
  if (!app) {
    createApp(App).use(router).use(createPinia()).mount("#app")
  }
  app = true
})

import "bootstrap/dist/js/bootstrap.js"
