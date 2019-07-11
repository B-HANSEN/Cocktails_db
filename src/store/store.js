import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios)


export const store = new Vuex.Store({
    state: {
        drinks: [],
        errors: [],
        options: [{
                name: "Amaretto",
                code: "am"
            },
            {
                name: "Applejack",
                code: "app"
            },
            {
                name: "Apricot brandy",
                code: "apr"
            },
            {
                name: "Creme de Cacao",
                code: "cacao"
            },
            {
                name: "Creme de Cassis",
                code: "cassis"
            },
            {
                name: "Dry Vermouth",
                code: "verm"
            },
            {
                name: "Galliano",
                code: "gall"
            },
            {
                name: "Gin",
                code: "gin"
            },
            {
                name: "Kahlua",
                code: "kah"
            },
            {
                name: "Red Wine",
                code: "wine"
            },
            {
                name: "Rum",
                code: "rum"
            },
            {
                name: "Strawberry schnapps",
                code: "schn"
            },
            {
                name: "Triple Sec",
                code: "sec"
            },
            {
                name: "Vodka",
                code: "vod"
            },
            {
                name: "Whisky",
                code: "whi"
            }
        ]
    },
    mutations: {
        addCocktails: (state, value) => {
            state.drinks = value
        }, // change state
        setError: (state, payload) => {
            state.errors = payload
        }
    },
    // https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
    actions: {
        getCocktails(context) {
            // axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i`)
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
        },
        options: (state) => {
            return state.options
        }
    }
})