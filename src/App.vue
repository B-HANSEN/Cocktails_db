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
};
</script>

<style>
body {
  font-family: "Nunito SemiBold";
}
</style>