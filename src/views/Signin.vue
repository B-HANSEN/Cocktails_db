<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <!-- insert email -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      autocomplete="username"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <!-- insert password -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      autocomplete="new-password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-btn type="submit">Sign-in</v-btn>
                <!-- <v-btn type="submit" @submit.prevent="logout">Logout</v-btn> -->
                <v-btn @click="logout">Logout</v-btn>
              </form>
            </v-container>
            <!-- <button @click="logout">Out</button> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  // watch: {
  //   // watch user computed property; receive as value whenever it changes; have router to redirect to home after successful signup
  //   user(value) {
  //     if (value !== null && value !== undefined) {
  //       this.$router.push("/");
  //     }
  //   }
  // },

  //  this.chatTitle = prompt("Please enter a chat title:");

  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    logout() {
      this.$store.dispatch("logout", {
        email: this.email
      });
    }
  }
};
</script>



