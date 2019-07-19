<template>
  <v-toolbar app class="blue-grey darken-1 white--text">
    <v-btn icon @click="$router.go(-1)">
      <v-icon class="white--text">arrow_back</v-icon>
    </v-btn>
    <v-layout align-center>
      <img class="logo" src="../assets/new_logo2.png" alt="logo" />
    </v-layout>

    <v-spacer></v-spacer>

    <v-menu :nudge-width="150" align-center>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
        </v-btn>
      </template>

      <v-list two-line>
        <v-layout justify-center class="bg">
          <h3>NAVIGATION</h3>
        </v-layout>
        <v-divider></v-divider>
        <template v-for="(link, index) in links">
          <v-list-tile :key="index" ripple :to="link.to">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title style="font-size:15px">{{ link.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < links.length" :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    links: [
      { icon: "home", name: "HOME", to: "/" },
      { icon: "panorama", name: "GALLERY", to: "/gallery" },
      { icon: "fingerprint", name: "SIGNUP", to: "/signup" },
      { icon: "input", name: "LOGIN/ OUT", to: "/login" },
      // { icon: "face", name: "PROFILE", to: "/profile" },
      { icon: "question_answer", name: "CHATROOMS", to: "/chatrooms" }
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
  width: 250px;
}
</style>
