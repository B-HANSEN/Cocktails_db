import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase'

import {
  store
} from './store/store'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBWHtcolvYTlBSV-9ixQELpTZdyk9Pg1ss",
  authDomain: "c0cktailbar.firebaseapp.com",
  databaseURL: "https://c0cktailbar.firebaseio.com",
  projectId: "c0cktailbar",
  storageBucket: "c0cktailbar.appspot.com",
  messagingSenderId: "25542268186",
  appId: "1:25542268186:web:275abe5d9d649490"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store: store,
  render: h => h(App),
  created() {
    this.$store.dispatch('getCocktails')

  }
}).$mount('#app')