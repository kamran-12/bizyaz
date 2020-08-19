<template>
  <div class="container">
    <textarea type="text" v-model="body" placeholder="body" />
    <textarea type="text" v-model="headers" placeholder="headers" />
    <input type="text" v-model="service" placeholder="service" />
    <button @click="send">Send</button>
    <div>{{response}}</div>
  </div>
</template>

<script>
import Logo from "~/components/logo.vue";
import api from "../services/index";
export default {
  components: {
    Logo
  },
  data() {
    return {
      body: `{"password":"nokialumia", "login":"kamran"}`,
      headers: null,
      response: null,
      service: "account/login"
    };
  },
  methods: {
    send() {
      try {
        console.log(this);
        var body = JSON.parse(this.body),
          headers = JSON.parse(this.headers),
          service = this.service;
        this.response = { type: "waiting", message: "waiting..." };
        api(service, body)
          .then(response => {
            this.response = { type: "success", message: response.data };
            if (service.endsWith("login") || service.endsWith("signup")) {
              this.$store.dispatch("setToken", response.data.token);
            }
          })
          .catch(error => {
            this.response = {
              type: "error",
              message: error.response ? error.response.data : error
            };
          });
      } catch (e) {
        this.response = {
          type: "error",
          message: e
        };
      }
    }
  }
};
</script>

<style scoped>
* {
  font-size: 20px;
  word-break: break-word;
}
input,
textarea {
  width: 600px;
}
input,
textarea,
button {
  margin: 20px auto;
  display: block;
}
textarea {
  height: 200px;
}
</style>
