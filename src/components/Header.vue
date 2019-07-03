<template>
  <div>
    <div class="share-options">
      <!-- facebook, instagram >> share options -->
    </div>
    <!-- 
    <div class="logo">
      <img src="../../src/assets/cocktail_logo.png" alt="logo" />
    </div>-->

    <v-app id="inspire">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card height="200px">
            <v-card-title class="blue white--text">
              <span class="headline">Menu</span>

              <v-spacer></v-spacer>

              <v-menu bottom left>
                <template v-slot:activator="{ on }">
                  <v-btn dark icon v-on="on">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-tile v-for="(item, i) in items" :key="i" to="/home">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-card-text>Lorem Ipsum</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Home" },
      { title: "Login" },
      { title: "Profile" },
      { title: "Chatroom" }
    ]
  })
};
</script>

<style>
/* header {
  padding-bottom: 30px;
  border: 1px dashed lightgrey;
  background-color: #fdf7f7 !important;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
}
.logo {
  width: 500px;
  padding-left: 50px;
  padding-top: 20px;
} */
</style>
