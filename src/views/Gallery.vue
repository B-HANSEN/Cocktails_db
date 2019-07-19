<template>
  <v-flex xs10 offset-xs1>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card-title primary-title>
            <h3 class="headline">Browse our gallery</h3>
          </v-card-title>
          <v-carousel hide-delimiters>
            <v-carousel-item
              v-for="(drink,idDrink) in drinks"
              :key="idDrink"
              :src="drink.strDrinkThumb"
            >
              <v-layout align-end justify-center row fill-height>
                <router-link class="button" :to="'cocktail/' + drink.idDrink">
                  <v-btn small color="orange">Show recipe</v-btn>
                </router-link>
              </v-layout>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>




<script>
export default {
  data() {
    return {};
  },
  computed: {
    drinks() {
      return this.$store.getters.getCocktails; // return getters from store; all Cocktailss
    }
  }
};
</script>


<style scoped>
.button {
  text-decoration: none;
  vertical-align: bottom;
}
</style>
