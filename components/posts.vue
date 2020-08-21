<template>
  <div class="posts">
    <Post v-for="post in posts" :key="post._id" :data="post" :view="view" />
  </div>
</template>

<script>
import Post from "./post";
export default {
  name: "Posts",
  components: { Post },
  props: "posts hideAuthor hideCommunity".split(" "),
  computed: {
    view() {
      return {
        author: !this.hideAuthor,
        community: !this.hideCommunity,
        text: "limited",
        image: true,
        link: true,
        comments: false,
      };
    },
  },
};
/*
* example: {
*
*
*
*
*
*
}
*/
</script>

<style>
</style>