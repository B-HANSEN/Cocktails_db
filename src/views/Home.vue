<template>
  <div class="mainItems">
    <div>
      <input
        type="text"
        class="searchfield"
        v-model="search"
        placeholder="Search by Name or Ingredient..."
      />
      <div id="button-holder">
        <img src="../../public/images/magnifier.png" />
      </div>
    </div>

    <div>
      <v-container>
        <p v-if="!filteredDrinks.length">There was no match for your search.</p>
        <v-layout
          class="pb-2 justify-center"
          v-for="(drink,idDrink) in filteredDrinks"
          :key="idDrink"
        >
          <!-- photo container -->
          <v-card class="action">
            <v-layout class="pa-3">
              <v-flex>
                <v-img :src="drink.strDrinkThumb" width="180px"></v-img>
              </v-flex>
            </v-layout>
          </v-card>

          <!-- general info container -->
          <v-card>
            <v-layout column pa-3>
              <v-flex>
                <h2>{{ drink.strDrink }}</h2>
                <p>Type: {{ drink.strAlcoholic }}</p>
                <p>Category: {{ drink.strCategory }}</p>
                <p>Glass: {{ drink.strGlass }}</p>

                <router-link :to="'cocktail/' + drink.idDrink">
                  <v-btn color="info">How to make it</v-btn>
                </router-link>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-container>

      <back-to-top bottom="0px" right="50px" visibleoffset="200px">
        <button type="button" class="btn btn-info btn-to-top">
          <i class="fas fa-angle-double-up"></i>
        </button>
      </back-to-top>
    </div>
  </div>
</template>

<script>
import BackToTop from "vue-backtotop";
// import { mapActions } from "vuex";
// import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: ""
    };
  },
  components: { BackToTop },
  computed: {
    drinks() {
      return this.$store.state.drinks;
    },
    // ...mapActions(["addCocktails"]),
    filteredDrinks: function() {
      return this.drinks.filter(drink => {
        return (
          drink.strDrink.toLowerCase().includes(this.search.toLowerCase()) ||
          drink.strIngredient1
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          drink.strIngredient2
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          drink.strIngredient3.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  }
};
</script>

<style scoped>
.mainItems {
  display: flex;
  flex-direction: column;
}

.searchfield {
  border-top: thin solid #e5e5e5;
  border-right: thin solid #e5e5e5;
  border-bottom: 0;
  border-left: thin solid #e5e5e5;
  box-shadow: 0px 1px 1px 1px #e5e5e5;
  float: left;
  height: 40px;
  margin: 0.8em 0 0 0.5em;
  outline: 0;
  padding: 0.4em 0 0.4em 0.6em;
  width: 230px;
  background-color: white;
}

#button-holder {
  background-color: #f1f1f1;
  border-top: thin solid #e5e5e5;
  box-shadow: 1px 1px 1px 1px #e5e5e5;
  cursor: pointer;
  float: left;
  height: 40px;
  margin: 11px 0 0 0;
  text-align: center;
  width: 50px;
  background-color: white;
}

#button-holder img {
  margin: 4px;
  width: 30px;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-to-top {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 45px;
  line-height: 22px;
  color: #546e7a;
}
</style>
