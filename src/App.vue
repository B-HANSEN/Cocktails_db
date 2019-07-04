<template>
  <v-app class="grey lighten-3">
    <app-header></app-header>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>


<script>
import Header from "./components/Header2.vue";

export default {
  name: "app",
  components: {
    "app-header": Header
  },
  data() {
    return {
      json: []
    };
  },
  created: function() {
    fetch("https://api.myjson.com/bins/1h3vb3")
      .then(r => r.json())
      .then(json => {
        console.log(json.books);
        this.json = json.books;
      });
  }
  // created: function() {
  //   unirest
  //     .get("https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007")
  //     .header("X-RapidAPI-Host", "the-cocktail-db.p.rapidapi.com")
  //     .header(
  //       "X-RapidAPI-Key",
  //       "21867e0886mshb58d2ae53ca4c8fp172fc8jsn28d7853596c8"
  //     )
  //     .end(function(result) {
  //       console.log(result.status, result.headers, result.body);
  //     });
  // }
};
</script>

<style>
body {
  font-family: "Nunito SemiBold";
}
</style>