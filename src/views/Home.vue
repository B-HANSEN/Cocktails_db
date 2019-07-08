<template>
  <div class="mainItems">
    <div>
      <input
        type="text"
        class="searchfield"
        v-model="search"
        placeholder="Search by Name or Ingredient..."
      />
      <div id="button-holder">
        <img src="../../public/images/magnifier.png" />
      </div>
    </div>

    <div>
      <v-container>
        <v-layout class="pb-2 justify-center" v-for="(cocktail,i) in cocktails" :key="i">
          <!-- photo container -->
          <v-card class="action">
            <v-layout class="pa-3">
              <v-flex>
                <v-img :src="cocktail.src" width="180px"></v-img>
              </v-flex>
            </v-layout>
          </v-card>

          <!-- general info container -->
          <v-card>
            <v-layout column pa-3>
              <v-flex>
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

      <back-to-top bottom="0px" right="50px" visibleoffset="200px">
        <button type="button" class="btn btn-info btn-to-top">
          <i class="fas fa-arrow-circle-up"></i>
        </button>
      </back-to-top>
    </div>
  </div>
</template>

<script>
import BackToTop from "vue-backtotop";

export default {
  data() {
    return {
      cocktails: [
        {
          title: "First Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "images/cocktail1.jpeg",
          id: 1
        },
        {
          title: "Second Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "images/cocktail2.jpeg",
          id: 2
        },
        {
          title: "Third Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "images/cocktail_flame.jpeg",
          id: 3
        },
        {
          title: "Fourth Cocktail",
          key1: "Category: alcoholic",
          key2: "Group: Contemporary Classic",
          key3: "Glass: Cocktail Glass",
          src: "images/cocktail3.jpeg",
          id: 4
        }
      ],
      search: ""
    };
  },
  components: { BackToTop }
};
</script>


<style scoped>
.mainItems {
  display: flex;
  flex-direction: column;
}

.searchfield {
  border-top: thin solid #e5e5e5;
  border-right: thin solid #e5e5e5;
  border-bottom: 0;
  border-left: thin solid #e5e5e5;
  box-shadow: 0px 1px 1px 1px #e5e5e5;
  float: left;
  height: 40px;
  margin: 0.8em 0 0 0.5em;
  outline: 0;
  padding: 0.4em 0 0.4em 0.6em;
  width: 230px;
  background-color: white;
}

#button-holder {
  background-color: #f1f1f1;
  border-top: thin solid #e5e5e5;
  box-shadow: 1px 1px 1px 1px #e5e5e5;
  cursor: pointer;
  float: left;
  height: 40px;
  margin: 11px 0 0 0;
  text-align: center;
  width: 50px;
  background-color: white;
}

#button-holder img {
  margin: 4px;
  width: 30px;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .background {
  z-index: -1;
} */

.btn-to-top {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 45px;
  line-height: 22px;
  color: #546e7a;
}
</style>
