<template>
  <div>
    <button @click="$router.go(-1)">GO BACK</button>

    <v-container>
      <v-layout row justify-center>
        <!-- photo container -->
        <v-card class="pa-3">
          <v-layout column>
            <v-flex xs6 md6>
              <v-img :src="cocktail.src" width="180px"></v-img>
            </v-flex>
          </v-layout>
        </v-card>

        <!-- general info container -->
        <v-layout column>
          <v-card class="pa-3">
            <v-layout column>
              <v-flex xs6 md6>
                <h2>{{ cocktail.title }}</h2>
                <p class="line black--text" v-text="cocktail.key1"></p>
                <p class="line black--text" v-text="cocktail.key2"></p>
                <p class="line black--text" v-text="cocktail.key3"></p>
              </v-flex>
            </v-layout>
          </v-card>

          <!-- detail info container -->
          <v-card class="pa-3">
            <v-layout column>
              <v-flex xs6 md6>
                <p class="line black--text" v-text="cocktail.key4"></p>
                <p class="line black--text" v-text="cocktail.key5"></p>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import { log } from "util";
export default {
  data() {
    return {
      id: this.$route.params.id,
      cocktail: {
        title: "First Cocktail",
        key1: "Category: alcoholic",
        key2: "Group: Contemporary Classic",
        key3: "Glass: Cocktail Glass",
        key4: "Ingredients: abc",
        key5: "Instructions: xyz",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      }
    };
  },
  created() {
    console.log(this.$routerHistory.previous());

    // this.$http
    //   .get("https://api.myjson.com/bins/1h3vb3/" + this.id)
    //   .then(function(data) {
    //     this.cocktail = data.body;
    //   });
  }
};
</script>


<style scoped>
.searchfield {
  width: 300px;
  padding: 10px;
  margin: 10px;
}
</style>