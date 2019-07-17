<template>
  <div>
    <h2 class="pa-2">CHATROOM</h2>

    <!-- loader while chats are loading -->
    <v-flex class="loader">
      <v-progress-circular indeterminate class="primary--text" :size="70" v-if="loading"></v-progress-circular>
    </v-flex>

    <!-- chat title -->
    <v-card class="mx-auto" color="#26c6da" dark max-width="600" v-if="!loading">
      <v-layout justify-center>
        <v-card-title>
          <span class="title font-weight-light">get chat titled inserted</span>
        </v-card-title>
      </v-layout>

      <!-- display user name -->
      <v-layout align-center justify-start fill-height>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-6" src="https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>User {{getUser.displayName}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-card-actions>
      </v-layout>

      <!-- chat history -->
      <form>
        <p v-if="chats.length == 0">No messages yet!</p>
        <ul class="messages">
          <li v-for="(chat, index) in chats" :key="index">
            <p
              v-if="chat.name === getUser.displayName"
              class="text-xs-right"
            >{{chat.msg}} : {{chat.name}}</p>
            <p v-else class="text-xs-left">{{chat.name}}: {{chat.msg}}</p>
          </li>
        </ul>
      </form>

      <!-- display user local name -->
      <v-layout align-center justify-end>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img class="elevation-6" src="https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Me</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-card-actions>
      </v-layout>

      <!-- new chats -->
      <form @submit.prevent="writeNewPost" style="padding-bottom:10px; margin-bottom:30px">
        <input
          class="input"
          type="text"
          name="chat"
          v-model="inputText"
          placeholder="Please input chat text here..."
        />
      </form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      inputText: "",
      chats: [],
      loading: false,
      chatTitle: ""
    };
  },
  methods: {
    getPosts() {
      // load posts from firebase
      let that = this;
      that.loading = true;
      firebase
        .database()
        .ref("chats")
        .on("value", data => {
          console.log(data.val());
          // obj with property-value pairs ==>
          const obj = data.val();
          that.chats = [];
          for (let key in obj) {
            that.chats.push({
              name: obj[key].name,
              msg: obj[key].msg
            });
            that.loading = false;
          }
        });
    },
    writeNewPost() {
      // write new post into firebase
      let that = this;
      firebase
        .database()
        // define node under which chats are supposed to be saved, with ref-method:
        .ref("chats")
        // writing data into db:
        .push({
          name: that.getUser.displayName,
          msg: that.inputText
        });
      that.inputText = "";
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getPosts();
  }
};

// computed: {
//   drinks() {
//     let cocktail = this.$store.getters.getSingleCocktail(
//       this.$route.params.idDrink
//     );
//     this.getIngredients(cocktail);
//     return cocktail;
//   }
// }
</script>


<style>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  display: block;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;
  background-color: white;
  color: black;
  width: 95%;
}
p {
  margin: 0px 5px 0px 0px;
  padding: 0;
}

ul {
  list-style: none;
}
</style>