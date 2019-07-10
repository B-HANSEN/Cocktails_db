<template>
  <v-container :drinks="drinks" v-if="drinks">
    <v-layout row justify-center pb-2>
      <!-- photo container -->
      <v-card>
        <v-layout pa-3>
          <v-flex xs4>
            <v-img :src="drinks.strDrinkThumb" width="180px"></v-img>
          </v-flex>
        </v-layout>
      </v-card>

      <!-- general info container -->
      <v-layout column>
        <v-card>
          <v-layout column wrap pa-3>
            <v-flex xs12 sm6>
              <h2>{{ drinks.strDrink }}</h2>
            </v-flex>

            <v-layout row justify-end xs12 sm6 pb-4>
              <v-layout column>
                <v-btn @click="this.increment" flat small icon right color="grey lighten-1">
                  <v-icon size="25px">thumb_up</v-icon>
                </v-btn>
                <keep-alive>
                  <span class="count">{{ sumA }}</span>
                </keep-alive>
              </v-layout>

              <v-layout column>
                <v-btn @click="this.decrement" flat small icon right color="grey lighten-1">
                  <v-icon size="25px">thumb_down</v-icon>
                </v-btn>
                <keep-alive>
                  <span class="count">{{ sumB }}</span>
                </keep-alive>
              </v-layout>
            </v-layout>

            <v-flex column>
              <p>Type: {{ drinks.strAlcoholic }}</p>
              <p>Category: {{ drinks.strCategory }}</p>
              <p>Glass: {{ drinks.strGlass }}</p>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-layout>
    <!-- detail info container -->
    <v-card class="pa-3">
      <v-layout column>
        <h3>Ingredients:</h3>
        <v-flex v-for="(ingredient, index) in ingredients" :key="index">
          <p>{{ measures[index] }} {{ ingredient }}</p>
        </v-flex>
        <h3>Instructions:</h3>
        <p>{{ drinks.strInstructions }}</p>
      </v-layout>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data: () => {
    return {
      sumA: 0,
      sumB: 0,
      measures: [],
      ingredients: []
    };
  },
  methods: {
    increment() {
      this.sumA++;
    },
    decrement() {
      this.sumB++;
    },
    getIngredients(drinks) {
      this.measures = [];
      this.ingredients = [];
      for (let key in drinks) {
        if (
          key.includes("strIngredient") &&
          (drinks[key] != null && drinks[key].length != 0)
        ) {
          this.ingredients.push(drinks[key]);
        } else if (
          key.includes("strMeasure") &&
          (drinks[key] != null && drinks[key].length != 0)
        ) {
          this.measures.push(drinks[key]);
        }
      }
    }
  },
  computed: {
    drinks() {
      let cocktail = this.$store.getters.getSingleCocktail(
        this.$route.params.idDrink
      );
      this.getIngredients(cocktail);
      return cocktail;
    }
  }
};
</script>


<style scoped>
.count {
  font-size: 15px;
}

p {
  margin: 0;
  padding: 0;
}
</style>