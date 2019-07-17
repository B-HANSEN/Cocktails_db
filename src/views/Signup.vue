<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <!-- user name creation -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="username"
                      label="User Name"
                      id="username"
                      v-model="userName"
                      type="text"
                      autocomplete="username"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <!-- name creation -->
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

                <!-- password creation -->
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

                <!-- confirm password -->
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      autocomplete="new-password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <!-- sign-up button -->
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Sign-up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
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
      password: "",
      confirmPassword: "",
      userName: "",
      photoURL: ""
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match."
        : "";
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    // watch user computed property; receive as value whenever it changes; have router to redirect to home after successful signup
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
        userName: this.userName,
        photoURL: this.photoURL
      });
    }
  }
};
</script>



