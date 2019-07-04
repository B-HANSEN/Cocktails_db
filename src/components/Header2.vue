<template>
  <v-toolbar color="grey darken-1" dark>
    <v-toolbar-title>Log In</v-toolbar-title>
    <v-spacer></v-spacer>
    <img class="logo" src="../assets/cocktail_logo.png" alt="logo" />
    <v-spacer></v-spacer>

    <v-menu :nudge-width="100">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    items: [
      { name: "home", to: "/" },
      { name: "login", to: "/login" },
      { name: "profile", to: "/profile" },
      { name: "chatroom", to: "/chatroom" }
    ]
  })
};
</script>

<style scoped>
.logo {
  width: 200px;
}
</style>
