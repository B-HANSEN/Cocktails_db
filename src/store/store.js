import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as firebase from 'firebase'

Vue.use(Vuex);
Vue.use(VueAxios, axios)
Vue.use(firebase)

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
        ],
        user: null
    },
    mutations: {
        // change state
        addCocktails: (state, value) => {
            state.drinks = value
        },
        setError: (state, payload) => {
            state.errors = payload
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        getCocktails(context) {
            // fetch and commit the mutation
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s`)
                .then(response => {
                    context.commit("addCocktails", response.data.drinks)
                })
                .catch(e => {
                    console.log(e);
                })
        },
        setError: (context, payload) => {
            console.log(context, payload);
            context.commit("setError", payload)
        },
        signUserUp({
            commit
        }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        alert("Your account has been created.")
                        user.user.updateProfile({
                            displayName: payload.userName,
                            photoURL: "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"
                        }).then(function () {
                            // Update successful.
                            console.log(user.user);

                            const newUser = {
                                id: user.user.uid,
                                email: user.user.email,
                                name: user.user.displayName,
                                image: user.user.photoURL
                            }
                            commit('setUser', newUser)
                        });
                    }
                )
                .catch(error => {
                    console.log(error)
                })
        },
        signUserIn({
            commit
        }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        console.log(user.user);
                        console.log(user.user.uid);
                        const newUser = {
                            // Firebase has changed the return object, you should pass in user.user now
                            // this.$store.commit('setCurrentUser', user.user) instead of 
                            // this.$store.commit('setCurrentUser', user)
                            id: user.user.uid,
                            email: user.user.email,
                            name: user.user.displayName
                        }
                        commit('setUser', newUser)
                    })
                .catch(error => {
                    console.log(error)
                })
        },
        logout() {
            firebase.auth().signOut()
                .then(() => {
                    // this.$router.push('/')
                    alert("You have been logged out successfully.")
                })
                .catch((err) => {
                    console.log(err)
                })
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
        },
        user: (state) => {
            return state.user
        },
        get: (state) => (id) => {
            return state.drinks.find(drink => drink.idDrink === id)
        },
    }
})