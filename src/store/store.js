import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios)


export const store = new Vuex.Store({
    state: {
        drinks: [],
        errors: []
    },
    mutations: {
        addCocktails: (state, payload) => {
            state.drinks = payload
        },
        setError: (state, payload) => {
            state.errors = payload
        }
    },
    getters: {

    },
    actions: {
        addCocktails: (context, payload) => {
            console.log(context, payload);
            context.commit("addCocktails", payload)

        },
        setError: (context, payload) => {
            console.log(context, payload);
            context.commit("setError", payload)

        }
    }
})