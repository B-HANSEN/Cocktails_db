import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import {
  store
} from './store/store'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

new Vue({
  router,
  store: store,
  render: h => h(App),
  created() {
    this.$store.dispatch('getCocktails') // always call function from main.js
  }
}).$mount('#app')