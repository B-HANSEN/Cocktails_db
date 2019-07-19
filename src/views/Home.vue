<template>
  <div class="mainItems">
    <div>
      <v-flex xs12 px-3 pt-2>
        <v-card>
          <!-- <v-img src="./images/pic8.jpeg" height="150px"></v-img> -->
          <v-img src="./images/pic8.jpeg" aspect-ratio="2"></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-1">The Cocktail database</h3>
              <div>
                <p>Welcome to our database listing a variety of classic and modern drinks.</p>
                <p
                  style="font-size:12px"
                >This is a database which enables you to search for your favourite cocktails and see all required ingredients and the instructions how to mix them.</p>
                <p
                  style="font-size:12px"
                  v-if="show"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ratione architecto debitis maxime reprehenderit? Eveniet, in architecto, rerum veniam sapiente eligendi deserunt temporibus quis fugit beatae id consectetur dolorum quos?</p>
                <v-btn color="info" @click="toggleButton">{{ button.text }}</v-btn>
              </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <a class="contact" href="mailto:info@cocktails.org">
              <v-btn flat color="orange">Contact us</v-btn>
            </a>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>

    <div class="secondLevel">
      <v-layout wrap>
        <v-flex wrap="false" xs12 sm6 class="input-parent">
          <!-- search field -->
          <input
            type="text"
            class="searchfield"
            v-model="search"
            placeholder="Search by name or ingredient..."
          />

          <!-- search icon: magnifier -->
          <div id="button-holder">
            <img src="../../public/images/magnifier.png" />
          </div>
          <!-- clear Filter button -->
          <v-btn depressed class="btn" @click="clearFilter">CLEAR</v-btn>
        </v-flex>

        <!-- drop-down filters -->
        <v-flex xs12 sm6>
          <div class="m-control-wrapper">
            <div>
              <label class="typo__label"></label>
              <multiselect
                v-model="selections"
                tag-placeholder="Add this as new tag"
                placeholder="Filter by ingredients..."
                label="name"
                track-by="code"
                :options="options"
                :multiple="true"
                :taggable="true"
                @tag="addTag"
              ></multiselect>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </div>

    <!-- container with images and back-to-top-button -->
    <div>
      <v-container>
        <!-- optional paragraph in case no output -->
        <p v-if="!filteredDrinks.length">There was no match for your search.</p>

        <!-- photo container -->
        <v-layout class="justify-center" wrap>
          <v-flex
            class="pb-2 input-parent"
            xs12
            sm8
            v-for="(drink,idDrink) in filteredDrinks"
            :key="idDrink"
          >
            <v-layout align-center>
              <v-flex xs6 class="card">
                <v-card class="action">
                  <v-img :src="drink.strDrinkThumb"></v-img>
                </v-card>
              </v-flex>

              <!-- general info container -->
              <v-flex xs6 class="card">
                <v-card height="100%" class="action">
                  <v-layout column pl-3 pt-1>
                    <v-flex xs6 md3>
                      <h2>{{ drink.strDrink }}</h2>
                      <p>Type: {{ drink.strAlcoholic }}</p>
                      <p>Category: {{ drink.strCategory }}</p>
                      <p>Glass: {{ drink.strGlass }}</p>

                      <router-link :to="'cocktail/' + drink.idDrink">
                        <v-btn small color="info">Show recipe</v-btn>
                      </router-link>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>

      <!-- button to top -->
      <back-to-top bottom="5px" right="10px" visibleoffset="120px">
        <button type="button" class="btn btn-info btn-to-top">
          <i class="fas fa-angle-double-up"></i>
        </button>
      </back-to-top>
    </div>
  </div>
</template>

<script>
import BackToTop from "vue-backtotop";
import Multiselect from "vue-multiselect";

export default {
  data() {
    return {
      search: "",
      selections: [],
      show: false,
      button: {
        text: "Show More"
      }
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
    filteredDrinks: function() {
      if (this.selections.length == 0) {
        // search field
        return this.drinks.filter(
          drink =>
            drink.strDrink.toLowerCase().includes(this.search.toLowerCase()) ||
            drink.strIngredient1
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            drink.strIngredient2
              .toLowerCase()
              .includes(this.search.toLowerCase())
        );
      } else {
        // selections drop-down
        return this.drinks
          .filter(drink => {
            let d = false;
            for (let key in drink) {
              if (key.includes("Ingredient")) {
                let s = this.selections.filter(select => {
                  return (
                    drink[key] != null &&
                    drink[key].toLowerCase().includes(select.name.toLowerCase())
                  );
                });
                if (s.length != 0) {
                  d = true;
                }
              }
            }
            return d;
          })
          .filter(
            drink =>
              drink.strDrink
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              drink.strIngredient1
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              drink.strIngredient2
                .toLowerCase()
                .includes(this.search.toLowerCase())
          );
      }
    }
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag
      };
      this.options.push(tag);
      this.selections.push(tag);
    },
    clearFilter() {
      this.search = "";
      this.selections = [];
    },
    toggleButton() {
      this.show = !this.show;
      this.button.text = !this.show ? "Show more" : "Show less";
    }
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

.contact {
  text-decoration: none;
}

.input-parent {
  display: flex;
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
  background-color: white;
  flex-grow: 1;
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
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-to-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 30px;
  line-height: 22px;
  color: white;
  background-color: #546e7a;
}

.card {
  height: 100%;
}
</style>