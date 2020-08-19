<template>
  <div class="msg-out" v-if="['error','success','loading'].includes(type)">
    <div :class="['message', type]">{{message}}</div>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: ["message", "type"],
};
</script>
<style scoped>
.msg-out {
    width: 100%;
    padding: 6px 20px;
    box-sizing: border-box;
}
.message {
  padding: 6px;
  display: block;
  width: calc(100% - calc(2 * var(--margin-side-for-message)));
  text-align: center;
  border-radius: 6px;
  box-sizing: border-box;
}
.error {
  color: black;
  border: 1px solid rgb(122, 7, 7);
  background: #F4433622;
}
.success {
  color: black;
  border: 1px solid rgba(16, 134, 12, 1);
  background: rgb(20, 177, 15, 0.3);
}
.loading {
  color: black;
  border: 1px solid rgb(0, 0, 0);
  background: rgb(128, 128, 120, 0.3);
}
</style>