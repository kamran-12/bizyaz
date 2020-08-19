<template>
  <form>
    <div class="inputwithlabel">
      <div class="label">Email or Username</div>
      <input class="input" type="text" v-model="ud.login" />
    </div>
    <div class="inputwithlabel">
      <div class="label">Password</div>
      <input class="input" type="password" v-model="ud.password" />
    </div>
    <Message v-bind="message" />
    <div class="suggestion">
      {{"Don't have an account? "}}
      <a @click="changeform">Sign Up</a>
      {{" instead!"}}
    </div>
    <Button @click="submitted" v-if="this.message.type!='loading'" text="Login" color="main" />
  </form>
</template>

<script>
import api from "../services/index";
export default {
  data() {
    return {
      ud: {
        login: null,
        password: null,
      },
      message: {},
    };
  },
  methods: {
    changeform() {
      this.$emit("changeform");
    },
    submitted() {
      this.message = { type: "loading", message: "Loading..." };
      api("account/login", this.ud)
        .then((response) => {
          this.message = {
            type: "success",
            message: "Logged in!",
          };
          this.$store.dispatch("setToken", response.data.token);
          this.$emit("success");
        })
        .catch((error) => {
          this.message = {
            type: "error",
            message: error.response ? error.response.data.errors[0].msg : error,
          };
        });
    },
  },
};
</script>

<style>
</style>