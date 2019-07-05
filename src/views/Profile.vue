<template>
  <v-flex column>
    <v-layout row>
      <img src="../assets/jim_beam.jpeg" width="140px" class="pa-2" alt="profile-pic" />
      <v-layout column justify-space-between class="pa-2">
        <h2>PROFILE: Jim Beam</h2>
        <p class="font-weight-light font-italic pr-1">
          Personal profile description comes here:
          <br />
          <br />ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco......
        </p>
      </v-layout>
    </v-layout>

    <v-layout>
      <v-flex justify-center class="pa-2">
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
          <v-tab ripple>My Favourites</v-tab>
          <v-tab ripple>My Chats</v-tab>
          <v-tab ripple>My Contacts</v-tab>
          <v-tab-item v-for="n in 3" :key="n">
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
