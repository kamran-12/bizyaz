<template>
  <fragment>
    <Header v-if="desktop" />
    <div v-if="desktop" class="forms">
      <Login v-if="login" @changeform="changeform" />
      <Signup v-if="!login" @changeform="changeform" />
    </div>
    <slot />
    <Like fill="red" />
    <span v-html="linker(text)" />
  </fragment>
</template>

<script>
import Login from "./login";
import Signup from "./signup";
import Header from "./header";
import linker from "../api/util/linker"
import Like from "./like";
export default {
  name: "LeftPanel",
  components: { Like, Login, Signup, Header },
  props: ["desktop"],
  data() {
    return {
      login: true,
      text: "haha nokia.com m.facebook.com www.azel.net kkkkkk@gmail.com http://www.t.me https://www.t.me <script>alert('ejifnef')<\/script>"
    };
  },
  methods: {
    changeform() {
      this.login = !this.login;
    },
    linker
  },
};
</script>

<style scoped>
div.forms {
  background: rgb(204, 204, 204);
  flex-grow: 1;
  width: 100%;
}
div.forms >>> form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
div.forms >>> .inputwithlabel {
  display: inline-block;
  padding: 8px;
  font-size: 16px;
}
div.forms >>> .input {
  font-size: 16px;
  padding: 4px;
}
div.forms >>> .label {
  margin: 8px 0;
}
div.forms >>> .suggestion {
  margin: 6px;
}
div.forms >>> .suggestion a {
  color: blue;
  cursor: pointer;
}
</style>