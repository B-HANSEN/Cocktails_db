<template>
  <v-toolbar app class="blue-grey darken-1 white--text">
    <v-btn depressed color="blue-grey darken-1" dark @click="$router.go(-1)">
      <v-icon big>arrow_back_ios</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    <img class="logo" src="../assets/cocktail_logo.png" alt="logo" />
    <v-spacer></v-spacer>

    <v-menu :nudge-width="150">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile v-for="(link, index) in links" :key="index" :to="link.to">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    links: [
      { icon: "home", name: "home", to: "/" },
      { icon: "fingerprint", name: "login", to: "/login" },
      { icon: "face", name: "profile", to: "/profile" },
      { icon: "question_answer", name: "chatroom", to: "/chatroom" }
    ],
    drawer: false
  }),
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  }
};
</script>

<style scoped>
.logo {
  width: 200px;
}
</style>
