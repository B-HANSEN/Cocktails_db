<template>
  <v-flex xs10 offset-xs1>
    <h2 class="py-2">Random Cocktail of the day!</h2>
    <div>
      Here you can see a variety of different cocktails. Click on the button to a random drink.
      <br />If you cannot find the recipe on our homepage, please let us know and we will add it to the database.
    </div>

    <v-layout align-center justify-start row py-3>
      <v-btn small v-on:click="reloadButton" color="#009688" fab>
        <v-icon>replay</v-icon>
      </v-btn>
      <h3 style="padding-left:30px">{{ cocktails.strDrink }}</h3>
    </v-layout>

    <v-img class="randomImage" :src="cocktails.strDrinkThumb" alt="Cocktail"></v-img>
  </v-flex>
</template>


<script>
export default {
  data() {
    return {
      cocktails: []
    };
  },
  methods: {
    getCocktails() {
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php", {})
        .then(data => data.json())
        .then(json => (this.cocktails = json.drinks[0]));
    },
    reloadButton() {
      this.getCocktails();
    }
  },
  created() {
    this.getCocktails();
    this.reloadButton();
  }
};
</script>


<style scoped>
.button {
  text-decoration: none;
  vertical-align: bottom;
}
</style>
