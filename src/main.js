import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {
  store
} from './store/store'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import {
  store
} from './store/store';



new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')