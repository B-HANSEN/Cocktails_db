import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        drinks: []
    },
    created: function () {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
            .then(r => r.json())
            .then(json => {
                console.log(json.drinks);
                this.json = json.drinks;
            });
    },


})