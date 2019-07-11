<template>
  <div class="mainItems">
    <div class="secondLevel">
      <div>
        <v-flex xs12 sm6>
          <!-- search field -->
          <input
            type="text"
            class="searchfield"
            v-model="search"
            placeholder="Search by Name or Ingredient..."
          />
          <!-- search icon: magnifier -->
          <div id="button-holder">
            <img src="../../public/images/magnifier.png" />
          </div>
          <!-- clear Filter button -->
          <v-btn depressed class="btn" v-on:click="clearFilter">CLEAR</v-btn>
        </v-flex>
      </div>

      <!-- drop-down filters -->
      <div class="m-control-wrapper">
        <div>
          <label class="typo__label"></label>
          <multiselect
            v-model="value"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            label="name"
            track-by="code"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
          ></multiselect>
        </div>
      </div>

      <!-- selection box -->
      <!-- <v-flex xs12 sm6>
            <v-select
              :items="ingredients"
              v-model="selections"
              label="Select ingredients"
              multiple
              chips
            ></v-select>
      </v-flex>-->
    </div>

    <!-- container with images and back-to-top-button -->
    <div>
      <v-container>
        <!-- optional paragraph in case no output -->
        <p v-if="!filteredDrinks.length">There was no match for your search.</p>

        <!-- photo container -->
        <v-layout
          class="pb-2 justify-center"
          v-for="(drink,idDrink) in filteredDrinks"
          :key="idDrink"
        >
          <v-card class="action">
            <v-layout class="pa-3">
              <v-flex>
                <v-img :src="drink.strDrinkThumb" width="180px"></v-img>
              </v-flex>
            </v-layout>
          </v-card>

          <!-- general info container -->
          <v-card>
            <v-layout column pa-3>
              <v-flex>
                <h2>{{ drink.strDrink }}</h2>
                <p>Type: {{ drink.strAlcoholic }}</p>
                <p>Category: {{ drink.strCategory }}</p>
                <p>Glass: {{ drink.strGlass }}</p>

                <router-link :to="'cocktail/' + drink.idDrink">
                  <v-btn color="info">Show recipe</v-btn>
                </router-link>
              </v-flex>
            </v-layout>
          </v-card>
        </v-layout>
      </v-container>

      <!-- button to top -->
      <back-to-top bottom="0px" right="50px" visibleoffset="200px">
        <button type="button" class="btn btn-info btn-to-top">
          <i class="fas fa-angle-double-up"></i>
        </button>
      </back-to-top>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
// import { mapGetters } from "vuex";
import BackToTop from "vue-backtotop";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      search: "",
      value: [],
      selections: []
      // function does not work as computed{} refers to selections and Multiselect refers to value
      // but replacing selections with value and value with selections does not work
    };
  },
  components: { BackToTop, Multiselect },
  computed: {
    drinks() {
      return this.$store.getters.getCocktails; // return getters from store; all Cocktails
    },
    options() {
      return this.$store.getters.options; // return options object from store getters
    },
    // ...mapActions(["getCocktails"]),
    filteredDrinks: function() {
      if (this.selections.length == 0) {
        return this.drinks;
      } else {
        return this.drinks.filter(drink => {
          let d = false;
          for (let key in drink) {
            if (key.includes("Ingredient")) {
              let s = this.selections.filter(select => {
                return (
                  drink[key] != null &&
                  drink[key].toLowerCase().includes(select.toLowerCase())
                );
              });
              if (s.length != 0) {
                d = true;
              }
            }
          }
          return d;
        });
      }
    }
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    }
  },
  clearFilter() {
    (search = ""), (selections = []), (value = []);
  }
};
</script>

<style scoped>
.mainItems {
  display: flex;
  flex-direction: column;
}

.secondLevel {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.searchfield {
  border-top: thin solid #e5e5e5;
  border-right: thin solid #e5e5e5;
  border-bottom: 0;
  border-left: thin solid #e5e5e5;
  box-shadow: 0px 1px 1px 1px #e5e5e5;
  float: left;
  height: 40px;
  margin: 0.8em 0 0.5em 0.5em;
  outline: 0;
  padding: 0.4em 0 0.4em 0.6em;
  width: 230px;
  background-color: white;
}

.btn {
  border-top: thin solid #e5e5e5;
  border-right: thin solid #e5e5e5;
  border-bottom: 0;
  border-left: thin solid #e5e5e5;
  box-shadow: 0px 1px 1px 1px #e5e5e5;
  height: 40px;
  margin: 0.8em 0 0em 0.5em;
  outline: 0;
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

.m-control-wrapper {
  margin: 0.8em 0 0.5em 0.5em;
  width: 70%;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
}

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