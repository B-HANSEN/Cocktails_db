<template>
  <div>
    <button @click="$router.go(-1)">GO BACK</button>
    <h1>HOME VIEW</h1>
    <input
      type="text"
      class="searchfield"
      v-model="search"
      placeholder="Search by Name or Ingredient..."
    />
    <v-container>
      <v-layout row justify-center v-for="(cocktail,i) in cocktails" :key="i">
        <!-- photo container -->
        <v-card class="pa-3">
          <v-layout column>
            <v-flex xs6 md6>
              <v-img :src="cocktail.src" width="180px"></v-img>
            </v-flex>
          </v-layout>
        </v-card>

        <!-- general info container -->
        <v-card class="pa-3">
          <v-layout column>
            <v-flex xs6 md6>
              <h2>{{ cocktail.title }}</h2>
              <p class="line black--text" v-text="cocktail.key1"></p>
              <p class="line black--text" v-text="cocktail.key2"></p>
              <p class="line black--text" v-text="cocktail.key3"></p>
              <router-link :to="'cocktail/' + cocktail.id">
                <v-btn color="info">How to make it</v-btn>
              </router-link>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cocktails: [
        {
          title: "First Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          id: 1
        },
        {
          title: "Second Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          id: 2
        },
        {
          title: "Third Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          id: 3
        },
        {
          title: "Fourth Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          id: 4
        }
      ],
      search: ""
    };
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