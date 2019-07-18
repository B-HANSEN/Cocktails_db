<template>
  <div>
    <h2 class="pa-2">CHATROOM</h2>

    <!-- loader while chats are loading -->
    <!-- <v-flex class="loader">
      <v-progress-circular indeterminate class="primary--text" :size="70" v-if="loading"></v-progress-circular>
    </v-flex>-->

    <!-- chat title -->
    <v-card class="mx-auto" color="#26c6da" dark max-width="500">
      <!-- chat title -->
      <v-layout justify-center>
        <v-card-title>
          <span class="title font-weight-bold">{{ id }}</span>
        </v-card-title>
      </v-layout>

      <!-- parent div with fixed height -->
      <!-- <div id="scrollDiv"> -->
      <!-- <div class="scrollTop"> -->
      <!-- child div with overflow -->
      <!-- <div class="scrollHeight"> -->
      <div id="chat">
        <!-- chat history: -->
        <div v-if="chats.length == 0">
          <p class="pb-3">No messages yet!</p>
        </div>
        <div v-else>
          <div v-for="(chat, index) in refreshPosts" :key="index">
            <div v-if="getUser && chat.name !== getUser.displayName">
              <!-- display other user names -->
              <v-layout align-center justify-start fill-height>
                <v-card-actions>
                  <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
                      ></v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{chat.name}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-card-actions>
              </v-layout>

              <!-- display other user message  -->
              <p class="text-xs-left pl-3 pb-3">{{chat.msg}}</p>
            </div>

            <div v-else>
              <!-- display user local name -->
              <v-layout align-center justify-end>
                <p class="text-xs-right">{{chat.msg}}</p>
                <v-card-actions>
                  <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        src="https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"
                      ></v-img>
                    </v-list-tile-avatar>

                    <!-- display local user message  -->
                    <v-list-tile-content>
                      <v-list-tile-title>{{chat.name}}{{chat.img}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-card-actions>
              </v-layout>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <!-- </div> -->
    </v-card>

    <!-- new chats: -->
    <form @submit.prevent="writeNewPost" style="padding-bottom:10px; margin-bottom:30px">
      <v-layout pa-3>
        <input
          class="input"
          type="text"
          name="chat"
          v-model="inputText"
          placeholder="Please input chat text here..."
        />
        <v-btn small @click="writeNewPost">POST</v-btn>
      </v-layout>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["id"],
  data() {
    return {
      inputText: "",
      chats: [],
      loading: false,
      chatTitle: "",
      scrollTop: true,
      scrollHeight: true
    };
  },
  methods: {
    getPosts() {
      // load posts from firebase
      let that = this;
      that.loading = true;
      this.chats = [];
      firebase
        .database()
        .ref("chats")
        .child(that.id)
        .on("value", data => {
          // obj with property-value pairs ==>
          const obj = data.val();
          console.log(obj);

          that.chats = [];
          for (let key in obj) {
            that.chats.push({
              name: obj[key].name,
              msg: obj[key].msg
            });
            that.loading = false;
          }
        });
      let container = document.getElementById("chat");
      if (that.firstTime) {
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
          that.firstTime = false;
        }, 0);
      } else {
        setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth"
          });
        }, 200);
      }
    },
    writeNewPost() {
      // write new post into firebase
      let that = this;

      console.log(that.getUser);
      if (this.getUser) {
        firebase
          .database()
          // define node under which chats are supposed to be saved, with ref-method:
          .ref("chats")
          .child(that.id)
          // writing data into db:
          .push({
            name: that.getUser.displayName,
            msg: that.inputText,
            img: that.getUser.photoURL
          });
        that.inputText = "";
        this.getPosts();
      }
    }
  },
  // create function to set scrollTop equal to scrollHeight
  // scrollDown() {
  // var x = document.getElementsByClassName("scrollTop");
  // var y = document.getElementsByClassName("scrollHeight");
  // x = y;

  // var element = document.getElementById("scrollDiv");
  // element.scrollTop = element.scrollHeight;
  computed: {
    getUser() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
    refreshPosts() {
      // load posts from firebase
      let that = this;
      that.loading = true;
      // this.chats = [];
      firebase
        .database()
        .ref("chats")
        .child(that.id)
        .on("value", data => {
          // obj with property-value pairs ==>
          const obj = data.val();
          console.log(obj);

          that.chats = [];
          for (let key in obj) {
            that.chats.push({
              name: obj[key].name,
              msg: obj[key].msg
            });
            that.loading = false;
          }
        });
      return this.chats;
    }
  },
  created() {
    this.getPosts();
    // this.scrollDown();
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

.scrollTop {
  height: 500px;
  overflow: auto;
}

.scrollHeight {
  height: 100%;
}
</style>