import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from "axios"
import {
  store
} from './store/store'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

new Vue({
  router,
  store: store,
  render: h => h(App),
  created() {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s`)
      .then(response => {
        this.$store.dispatch("addCocktails", response.data.drinks)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.$store.dispatch("setError", e)
      })
  }
}).$mount('#app')