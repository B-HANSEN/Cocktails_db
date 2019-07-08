<template>
  <v-app class="grey lighten-3">
    <app-header></app-header>
    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>


<script>
import Header from "./components/Header.vue";

export default {
  name: "app",
  components: {
    "app-header": Header
  }
  //   ,
  //   data() {
  //     return {
  //       json: []
  //     };
  //   },
  //   created: function() {
  //     fetch("https://api.myjson.com/bins/1h3vb3")
  //       .then(r => r.json())
  //       .then(json => {
  //         console.log(json.books);
  //         this.json = json.books;
  //       });
  //   }
};
</script>

<style>
body {
  font-family: "Nunito SemiBold";
}
</style>