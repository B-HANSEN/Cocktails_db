<template>
  <v-container :cocktails="json">
    <v-layout row justify-center pb-2>
      <!-- photo container -->
      <v-card>
        <v-layout pa-3>
          <v-flex xs4>
            <v-img :src="cocktails.src" width="120px"></v-img>
          </v-flex>
        </v-layout>
      </v-card>

      <!-- general info container -->
      <v-layout column>
        <v-card>
          <v-layout column wrap pa-3>
            <v-flex xs12 sm6>
              <h2>{{ cocktails.title }}</h2>
            </v-flex>

            <v-layout row justify-end xs12 sm6 pb-4>
              <v-layout column>
                <v-btn @click="increment" flat small icon right color="grey lighten-1">
                  <v-icon size="25px">thumb_up</v-icon>
                </v-btn>
                <span class="count">{{ countA }}</span>
              </v-layout>

              <v-layout column>
                <v-btn @click="decrement" flat small icon right color="grey lighten-1">
                  <v-icon size="25px">thumb_down</v-icon>
                </v-btn>
                <span class="count">{{ countB }}</span>
              </v-layout>
            </v-layout>

            <v-flex column>
              <p class="line black--text" v-text="cocktails.key1"></p>
              <p class="line black--text" v-text="cocktails.key2"></p>
              <p class="line black--text" v-text="cocktails.key3"></p>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-layout>
    <!-- detail info container -->
    <v-card class="pa-3">
      <v-layout column>
        <v-flex>
          <p class="line black--text" v-text="cocktails.key4"></p>
          <p class="line black--text" v-text="cocktails.key5"></p>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      cocktails: [],
      //   title: "First Cocktail",
      //   key1: "Category: alcoholic",
      //   key2: "Group: Contemporary Classic",
      //   key3: "Glass: Cocktail Glass",
      //   key4: "Ingredients: abc",
      //   key5: "Instructions: xyz",
      //   src: "../images/cocktail1.jpeg"
      // }
      countA: 0,
      countB: 0,
      json: []
    };
  },
  created: function() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(r => r.json())
      .then(json => {
        console.log(json);
        this.json = cocktails;
      });
  },
  methods: {
    increment() {
      this.countA++;
    },
    decrement() {
      this.countB++;
    }
  }
};
</script>


<style scoped>
.searchfield {
  width: 300px;
  padding: 10px;
  margin: 10px;
}

.count {
  font-size: 15px;
}
</style>



// check netninja #42 