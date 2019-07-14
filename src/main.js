import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase'

import {
  store
} from './store/store'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

new Vue({
  router,
  store: store,
  render: h => h(App),
  created() {
    this.$store.dispatch('getCocktails'),
      // always call function from main.js
      firebase.initializeApp({
        apiKey: "AIzaSyBWHtcolvYTlBSV-9ixQELpTZdyk9Pg1ss",
        authDomain: "c0coktailbar.firebaseapp.com",
        databaseURL: "https://c0cktailbar.firebaseio.com",
        projectId: "c0cktailbar",
        storageBucket: "",
      })
  }
}).$mount('#app')


// Initialize Firebase
// firebase.initializeApp(firebaseConfig);