<template>
  <button :class="color" @click.prevent="$emit('click')">{{text}}</button>
</template>
<script>
export default {
  name: "Button",
  props: ["color", "text"]
};
</script>
<style scoped>
.danger {
  background: rgb(194, 25, 25);
}
.main {
  background: rgb(51,51,51);
}
button {
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  display: inline-block;
  color: white;
  border-radius: 0px;
  box-shadow: inset 0 0 0px #000000;
  transition: 0.2s;
}
button:active {
  outline: none;
  box-shadow: inset 0 0 10px #000000
}
</style> 