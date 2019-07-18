<template>
  <div>
    <!-- loader while chats are loading -->
    <v-flex class="loader" v-if="loading">
      <v-progress-circular indeterminate class="primary--text" :size="70"></v-progress-circular>
    </v-flex>

    <!-- cards for each existing chat + button to create new chat -->
    <v-container>
      <v-layout justify-space-around>
        <h1 class="heading grey--text">All chats</h1>
      </v-layout>

      <v-layout align-center column>
        <div class="pt-3">You would like to start a new chat:</div>
        <v-btn @click="createNewChat">Create chat</v-btn>
      </v-layout>

      <v-layout row wrap v-if="!loading">
        <v-flex v-for="(chat, index) in chats" :key="index" xs6>
          <!-- existing chats -->
          <v-card flat class="text-xs-center ma-3" color="#26c6da" dark>
            <v-layout align-center column>
              <v-responsive class="pt-4"></v-responsive>
              <v-card-text>
                <div class="subheading">{{ chat }}</div>
              </v-card-text>

              <!-- button to add post to existing chat -->
              <router-link :to="'chatroom/' + chat">
                <v-layout align-center>
                  <v-card-actions>
                    <v-btn flat color="black">Go to chat</v-btn>
                  </v-card-actions>
                </v-layout>
              </router-link>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- button to top -->
    <back-to-top bottom="5px" right="10px" visibleoffset="20px">
      <button type="button" class="btn btn-info btn-to-top">
        <i class="fas fa-angle-double-up"></i>
      </button>
    </back-to-top>
  </div>
</template>

<script>
import firebase from "firebase";
import BackToTop from "vue-backtotop";

export default {
  data() {
    return {
      loading: false,
      chatTitle: "",
      chats: []
    };
  },
  components: { BackToTop },
  methods: {
    // load chats from firebase:
    getAllChats() {
      let that = this;
      that.loading = true;
      firebase
        .database()
        .ref("chats")
        .on("value", data => {
          const obj = data.val();
          console.log(obj);

          for (let key in obj) {
            that.chats.push(key);
          }
          that.loading = false;
        });
    },
    // create new chat:
    createNewChat() {
      this.chatTitle = prompt("Please enter a chat title:");
      this.$router.push("/chatroom/" + this.chatTitle);
    }
  },
  created() {
    // this.loading = true;
    this.getAllChats();
    // this.loading = false;
  },
  computed: {
    getUser() {
      return this.$store.getters.user;
    }
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

.btn-to-top {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 30px;
  line-height: 22px;
  color: white;
  background-color: #546e7a;
}
</style>