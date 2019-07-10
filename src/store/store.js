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
        addCocktails: (state, value) => {
            state.drinks = value
        }, // change state
        setError: (state, payload) => {
            state.errors = payload
        }
    },
    actions: {
        getCocktails(context) {
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s`)
                .then(response => {
                    context.commit("addCocktails", response.data.drinks)
                    // context.state.drinks = response.data.drinks
                }) // fetch and commit the mutation
                .catch(e => {
                    console.log(e);
                })
        },
        setError: (context, payload) => {
            console.log(context, payload);
            context.commit("setError", payload)
        }
    },
    getters: {
        getCocktails: (state) => {
            return state.drinks
        },
        getSingleCocktail: (state) => (id) => {
            return state.drinks.find(drink => drink.idDrink === id)
        }
    }
})