<template>
  <div>
    <h2 class="pa-2">CHATROOM</h2>

    <!-- loader while chats are loading -->
    <v-flex class="loader" v-if="loading">
      <v-progress-circular indeterminate class="primary--text" :size="70"></v-progress-circular>
    </v-flex>

    <div v-if="!loading">
      <v-card class="mx-auto" color="#26c6da" dark style="width: 95%">
        <!-- chat title -->
        <v-layout justify-center>
          <v-card-title>
            <span class="title font-weight-bold">{{ id }}</span>
          </v-card-title>
        </v-layout>

        <div id="chat">
          <div id="chat_child">
            <!-- chat history: -->
            <div v-if="chats.length == 0">
              <p class="pl-3 pb-3">No messages yet!</p>
            </div>

            <div v-else>
              <!-- load other users and their posts -->
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

                <!-- display user local name -->
                <div v-else>
                  <v-layout align-center justify-end>
                    <v-card-actions>
                      <v-list-tile-content>
                        <v-list-tile-title>{{chat.name}}{{chat.img}}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile class="grow">
                        <v-list-tile-avatar color="grey darken-3">
                          <v-img
                            class="elevation-6"
                            src="https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"
                          ></v-img>
                        </v-list-tile-avatar>
                      </v-list-tile>
                    </v-card-actions>
                  </v-layout>
                  <p class="text-xs-right pr-3 pb-3">{{chat.msg}}</p>
                </div>
              </div>
            </div>
            <!-- button to top +++ TODO: how to refer to #chat_child??? -->
            <back-to-top bottom="5px" right="10px" visibleoffset="0px">
              <button type="button" class="btn btn-info btn-to-top">
                <i class="fas fa-angle-double-up"></i>
              </button>
            </back-to-top>
          </div>
        </div>
      </v-card>

      <!-- new chat input field and post button: -->
      <form @submit.prevent="writeNewPost" style="padding-bottom:10px; margin-bottom:30px">
        <v-layout pa-3>
          <input
            class="input"
            type="text"
            name="chat"
            v-model="inputText"
            placeholder="Please input chat text here..."
          />
          <v-btn left small flat color="#26c6da" @click="writeNewPost" style="width:20px">
            <i class="material-icons">send</i>
          </v-btn>
        </v-layout>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import BackToTop from "vue-backtotop";

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
  components: { BackToTop },
  methods: {
    getPosts() {
      // load posts from firebase
      let that = this;
      that.loading = true;
      that.chats = [];
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
      // scroll to bottom functionality
      let container = document.getElementById("chat");
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth"
        });
      }, 200);
      // that.loading = false;
    },
    writeNewPost() {
      // write new post into firebase
      let that = this;
      that.loading = true;
      console.log(that.getUser);
      if (this.getUser) {
        firebase
          .database()
          // define node under which chats are supposed to be saved, with ref-method. If not exist, it creates it:
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
        that.loading = false;
      }
    }
  },
  updated() {
    let container = document.getElementById("chat");
    if (this.chats && container.scrollTop == 0) {
      container.scrollTop = container.scrollHeight;
    }
  },
  computed: {
    getUser() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
    refreshPosts() {
      // load posts from firebase
      let that = this;
      that.loading = true;
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
  mounted() {
    this.getPosts();
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

#chat {
  height: 500px;
  overflow: auto;
}
</style>