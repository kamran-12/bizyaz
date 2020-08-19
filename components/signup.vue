<template>
  <form>
    <div class="inputwithlabel">
      <div class="label">Email</div>
      <input class="input" type="email" v-model="ud.email" />
    </div>
    <div class="inputwithlabel">
      <div class="label">Username</div>
      <input class="input" type="text" v-model="ud.username" />
    </div>
    <div class="inputwithlabel">
      <div class="label">Password</div>
      <input class="input" type="password" v-model="ud.password" />
    </div>
    <div class="inputwithlabel">
      <div class="label">Confirm Password</div>
      <input class="input" type="password" v-model="ud.confirm_password" />
    </div>
    <Message v-bind="message" />
    <div class="suggestion">
      {{"Have an account? "}}
      <a @click="changeform">Log in</a>
      {{" instead!"}}
    </div>
    <Button @click="submitted" v-if="this.message.type!='loading'" text="Signup" color="main" />
    <style></style>
  </form>
</template>

<script>
import api from "../services/index";
export default {
  data() {
    return {
      ud: {
        email: null,
        password: null,
        username: null,
        confirm_password: null,
      },
      message: {},
    };
  },
  methods: {
    changeform() {
      this.$emit("changeform");
    },
    submitted() {
      let m = this.message;
      if (this.ud.password != this.ud.confirm_password)
        return m = { type: "error", message: "Passwords do not match" };
      m = { type: "loading", message: "Loading..." };
      api("account/signup", this.ud)
        .then((response) => {
          m = { type: "success", message: "Signed up!" };
          this.$store.dispatch("setToken", response.data.token);
          this.$emit("success");
        })
        .catch((error) => {
          let message = error.response ? error.response.data.errors[0].msg : error
          m = { type: "error", message };
        });
    },
  },
};
</script>

<style>
</style>