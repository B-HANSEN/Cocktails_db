<template>
  <div class="team">
    <v-layout justify-space-around>
      <h1 class="subheading grey--text">All chats</h1>
    </v-layout>

    <!-- loader while chats are loading -->
    <v-flex class="loader">
      <v-progress-circular indeterminate class="primary--text" :size="70" v-if="loading"></v-progress-circular>
    </v-flex>

    <!-- cards for each existing chat + button to create new chat -->
    <v-container class="my-5" v-if="!loading">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(chat, index) in chats" :key="index">
          <!-- existing chats -->
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="profile.url" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ chat.name }}</div>
              <div class="grey--text">{{ chat.chatTitle }}</div>
            </v-card-text>

            <!-- button to add post to existing chat -->
            <router-link :to="'chatroom/' + chat.id">
              <v-btn @click="createNewChat">Go to chat</v-btn>
            </router-link>
          </v-card>

          <!-- button to add post to new chat -->
          <v-card>
            <router-link :to="'chatroom/' + chat.key">
              <v-btn @click="createNewChat">Create new chat</v-btn>
            </router-link>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      loading: false,
      chatTitle: "",
      chats: []
      //   key: ""
    };
  },
  methods: {
    getAllChats() {
      // load chats from firebase
      let that = this;
      that.loading = true;
      that.chats = [];
      firebase
        .database()
        .ref()
        .child("chatTitle")
        .on("value", data => {
          const obj = data.val();

          for (let key in obj) {
            that.chats.push({
              chatTitle: obj[key].chatTitle,
              name: obj[key].name
            });
            that.loading = false;
          }
        });
    }
    // ,
    // createNewChat() {
    //   // create new chat
    //   let chatTitle = prompt("Please enter a chat title:");
    //   let that = this;
    //   firebase
    //     .database()
    //     .ref()
    //     .child("chatTitle")
    //     .push({
    //       chatTitle: that.chatTitle,
    //       name: that.getUser.displayName
    //     });
    // }
  },
  created() {
    this.getAllChats();
  }
};
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
</style>