<template>
  <header>
    
    <Logo v-if="!empty" />
  </header>
</template>

<script>
import Logo from "./logo"
export default {
  name: "Header",
  components: { Logo },
  props: ["empty"],
};
</script>

<style scoped>
header {
  background-color: rgb(51, 51, 51);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
svg {
  height: 90%;
}
</style>

