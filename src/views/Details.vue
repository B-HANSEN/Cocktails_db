<template>
  <v-container>
    <v-layout row justify-center pb-2>
      <!-- photo container -->
      <v-card>
        <v-layout pa-3>
          <v-flex xs4>
            <v-img :src="cocktail.src" width="120px"></v-img>
          </v-flex>
        </v-layout>
      </v-card>

      <!-- general info container -->
      <v-layout column>
        <v-card>
          <v-layout column wrap pa-3>
            <v-flex xs12 sm6>
              <h2>{{ cocktail.title }}</h2>
            </v-flex>

            <v-layout row xs12 sm6 pb-4>
              <v-layout column>
                <v-btn @click="increment" flat small icon right color="grey lighten-1">
                  <v-icon size="15px">thumb_up</v-icon>
                </v-btn>
                <span class="count">{{ countA }}</span>
              </v-layout>

              <v-layout column>
                <v-btn @click="decrement" flat small icon right color="grey lighten-1">
                  <v-icon size="15px">thumb_down</v-icon>
                </v-btn>
                <span class="count">{{ countB }}</span>
              </v-layout>

              <v-layout column>
                <v-btn flat small icon right color="grey lighten-1">
                  <v-icon size="15px">share</v-icon>
                </v-btn>
              </v-layout>
            </v-layout>

            <v-flex column>
              <p class="line black--text" v-text="cocktail.key1"></p>
              <p class="line black--text" v-text="cocktail.key2"></p>
              <p class="line black--text" v-text="cocktail.key3"></p>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
    </v-layout>
    <!-- detail info container -->
    <v-card class="pa-3">
      <v-layout column>
        <v-flex>
          <p class="line black--text" v-text="cocktail.key4"></p>
          <p class="line black--text" v-text="cocktail.key5"></p>
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
      cocktail: {
        title: "First Cocktail",
        key1: "Category: alcoholic",
        key2: "Group: Contemporary Classic",
        key3: "Glass: Cocktail Glass",
        key4: "Ingredients: abc",
        key5: "Instructions: xyz",
        src: "images/cocktail1.jpeg"
      },
      countA: 0,
      countB: 0
    };
  },
  created() {
    // console.log(this.$routerHistory.previous());
    // this.$http
    //   .get("https://api.myjson.com/bins/1h3vb3/" + this.id)
    //   .then(function(data) {
    //     this.cocktail = data.body;
    //   });
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
  font-size: 10px;
}
</style>