<template>
  <v-container :drinks="drinks">
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
                <v-btn @click="increment" flat small icon right color="grey lighten-1">
                  <v-icon size="25px">thumb_up</v-icon>
                </v-btn>
                <span class="count">{{ countA }}</span>
              </v-layout>

              <v-layout column>
                <v-btn @click="decrement" flat small icon right color="grey lighten-1">
                  <v-icon size="25px">thumb_down</v-icon>
                </v-btn>
                <span class="count">{{ countB }}</span>
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
        <v-flex>
          <h3>Ingredients:</h3>
          <p>- {{ drinks.strMeasure1 }} {{ drinks.strIngredient1 }}</p>
          <p>- {{ drinks.strMeasure2 }} {{ drinks.strIngredient2 }}</p>
          <p>- {{ drinks.strMeasure3 }} {{ drinks.strIngredient3 }}</p>

          <h3>Instructions:</h3>
          <p>{{ drinks.strInstructions }}</p>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      countA: 0,
      countB: 0
    };
  },
  methods: {
    increment() {
      this.countA++;
    },
    decrement() {
      this.countB++;
    }
  },
  computed: {
    drinks() {
      return this.$store.getters.getTodoById(this.$route.params.idDrink);
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