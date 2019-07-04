<template>
  <v-flex column>
    <v-layout row>
      <img src="../assets/jim_beam.jpeg" width="100px" alt="profile-pic" />

      <v-layout column justify-space-around>
        <h2>Name: Jim Beam</h2>
        <p>Personal profile description comes here.......</p>
      </v-layout>
    </v-layout>

    <v-layout justify-center>
      <v-flex>
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
          <!-- <v-tab v-for="n in 4" :key="n" ripple>Item {{ n }}</v-tab> -->
          <v-tab ripple>My Favourites</v-tab>
          <v-tab ripple>My Reviews</v-tab>
          <v-tab ripple>My Chats</v-tab>
          <v-tab ripple>My Contacts</v-tab>
          <v-tab-item v-for="n in 4" :key="n">
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-flex>
</template>


<script>
export default {
  data() {
    return {
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  }
};
</script>
<style></style>
