<template>
  <div>
    <h1 class="pa-2">CHATROOM</h1>

    <v-card class="mx-auto" color="#26c6da" dark max-width="400">
      <v-layout justify-center>
        <v-card-title>
          <span class="title font-weight-light">Chat topic</span>
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
            <span>{{chat.name}}</span>
            <span>{{chat.msg}}</span>
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
      <form @submit.prevent="writeNewPost">
        <input class="input" type="text" name="chat" v-model="inputText" />
        <button type="submit">Post chat</button>
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
      // TODO: define topic before first chat
      topic: ""
    };
  },
  methods: {
    writeNewPost() {
      let that = this;
      console.log(this.chat, Date.now());
      firebase
        .database()
        // define node under which chats are supposed to be saved, with ref-method:
        .ref("chats")
        // writing data into db:
        .push({
          name: that.getUser.email,
          msg: that.inputText
          // topic: that.topic,
        });
    },
    getPosts() {
      let that = this;
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
  background-color: white;
  margin: 5px;
  color: black;
  width: 350px;
}
</style>