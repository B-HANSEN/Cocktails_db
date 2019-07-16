<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <h2 class="pa-2">CHATROOM</h2>
        <v-btn @click="createNewChat">Create new chat</v-btn>
      </v-flex>
    </v-layout>

    <v-flex xs12 class="text-xs-center">
      <v-progress-circular indeterminate class="primary--text" :size="70" v-if="loading"></v-progress-circular>
    </v-flex>

    <v-card class="mx-auto" color="#26c6da" dark max-width="600" v-if="!loading">
      <v-layout justify-center>
        <v-card-title>
          <span class="title font-weight-light">{{ this.chatTitle }}</span>
          <!-- TODO, create new input field for topic -->
        </v-card-title>
      </v-layout>

      <v-layout align-center justify-start fill-height>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHair&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Green&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Dark"
              ></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>User Brad Peppard</v-list-tile-title>
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
              v-if="chat.name===getUser.displayName"
              class="text-xs-right"
            >{{chat.msg}} : {{chat.name}}</p>
            <p v-else class="text-xs-left">{{chat.name}}: {{chat.msg}}</p>
          </li>
        </ul>
      </form>

      <v-layout align-center justify-end>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
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
      newChat: {
        displayName: "",
        chatTitle: "",
        chatID: ""
      }
    };
  },
  methods: {
    // create new chat
    createNewChat() {
      let chatTitle = prompt("Please enter a chat title");
      let that = this;
      firebase
        .database()
        .ref("newChat")
        .push({
          name: that.getUser.displayName,
          chatTitle: that.chatTitle
        });
    },
    writeNewPost() {
      // write new post into firebase
      let that = this;
      console.log(this.chat, Date.now());
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
    },
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
        })
        .catch(err => {
          console.log(err);
        });
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
</script>


<style>
.input {
  display: block;
  margin-right: auto;
  margin-left: auto;
  padding: 10px;
  background-color: white;
  color: black;
  width: 95%;
}
</style>