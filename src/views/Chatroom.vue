<template>
  <div>
    <h2 class="pa-2">CHATROOM</h2>
    <!-- loader while chats are loading -->
    <!-- <v-flex class="loader" v-if="loading">
      <v-progress-circular indeterminate class="primary--text" :size="70"></v-progress-circular>
    </v-flex>-->

    <div>
      <v-card class="mx-auto" color="#26c6da" dark style="width: 95%">
        <!-- chat title -->
        <v-layout justify-center>
          <v-card-title>
            <span class="title font-weight-bold">{{ id }}</span>
          </v-card-title>
        </v-layout>
        <v-divider class="mx-auto" width="95%" color="lightgreen"></v-divider>

        <div id="chat">
          <div id="chat_child">
            <!-- chat history: -->
            <div>
              <v-container>
                <div v-for="(chat, index) in refreshPosts" :key="index">
                  <div v-if="getUser && chat.name !== getUser.displayName">
                    <!-- display other user names -->
                    <v-layout>
                      <v-flex py-1>
                        <span row wrap>{{chat.name}}: {{chat.msg}}</span>
                      </v-flex>
                    </v-layout>
                  </div>

                  <!-- display user local name -->
                  <div v-else>
                    <v-layout>
                      <v-flex py-1>
                        <span style="float:right">{{chat.name}}: {{chat.msg}}</span>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
              </v-container>
            </div>
            <!-- button to top +++ TODO: how to refer to #chat_child??? -->
            <!-- <back-to-top bottom="5px" right="10px" visibleoffset="0px">
              <button type="button" class="btn btn-info btn-to-top">
                <i class="fas fa-angle-double-up"></i>
              </button>
            </back-to-top>-->
          </div>
        </div>
      </v-card>

      <!-- new chat input field and post button: -->
      <form @submit.prevent="writeNewPost" style="padding-bottom:10px">
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
// import BackToTop from "vue-backtotop";

export default {
  props: ["id"],
  data() {
    return {
      inputText: "",
      chats: [],
      // loading: false,
      chatTitle: "",
      scrollTop: true,
      scrollHeight: true
    };
  },
  // components: { BackToTop },
  methods: {
    getPosts() {
      // load posts from firebase
      let that = this;
      // that.loading = true;
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
            // that.loading = false;
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
      // that.loading = true;
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
        // that.loading = false;
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
      // that.loading = true;
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
            // that.loading = false;
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