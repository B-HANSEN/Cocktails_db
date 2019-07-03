import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')