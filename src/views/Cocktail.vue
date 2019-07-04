  <!-- <v-card>
      <v-container fluid grid-list-md>
        <v-layout row>
          <v-flex v-for="card in cards" :key="card.title" v-bind="{ [`xs${card.flex}`]: true }">
            <v-card>
              <v-img :src="card.src" height="200px">
                <v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    <v-flex xs12>
                      <span class="headline black--text" v-text="card.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
            </v-card>

            <v-card>
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12>
                    <p class="line black--text" v-text="card.key1"></p>
                    <p class="line black--text" v-text="card.key2"></p>
                    <p class="line black--text" v-text="card.key3"></p>
                    <v-btn color="info">Info</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
</template>-->

    <template>
  <div>
    <h1>OLD HOME VIEW</h1>
    <v-btn color="orange darken-2" dark @click="$router.go(-1)">
      <v-icon dark left>arrow_back</v-icon>Go Back
    </v-btn>
    <input
      type="text"
      class="searchfield"
      v-model="search"
      placeholder="Search by Name or Ingredient..."
    />

    <v-container>
      <!-- <v-card> -->
      <v-layout row v-layout justify-center>
        <v-card class="pa-3">
          <v-layout column>
            <v-flex v-for="card in cards" :key="card.title" xs6 md6>
              <v-img :src="card.src" width="180px"></v-img>
            </v-flex>
          </v-layout>
        </v-card>

        <v-card class="pa-3">
          <v-layout column>
            <v-flex v-for="card in cards" :key="card.title" xs6 md6>
              <p class="line black--text" v-text="card.key1"></p>
              <p class="line black--text" v-text="card.key2"></p>
              <p class="line black--text" v-text="card.key3"></p>
              <v-btn color="info">Info</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-layout>
      <!-- </v-card> -->
    </v-container>
  </div>
</template>


<script>
export default {
  data: () => ({
    cards: [
      {
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6
      },
      {
        title: "First Cocktail",
        key1: "Category: alcoholic",
        key2: "Group: Contemporary Classic",
        key3: "Glass: Cocktail Glass",
        flex: 6
      }
    ]
  })
};
</script>



<style scoped>
.searchfield {
  width: 300px;
  padding: 10px;
  margin: 10px;
}
</style>