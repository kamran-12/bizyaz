<template>
  <div class="post">
    <div class="title">
      <nuxt-link :to="'/post/'+data._id">{{data.title}}</nuxt-link>
    </div>
    <div class="subtitle">
      <span v-if="view.author" class="subtitle-component">
        author:
        <nuxt-link :to="'/user/'+data.author.username">data.author.username</nuxt-link>
      </span>
      <span v-if="view.community" class="subtitle-component">
        community:
        <nuxt-link :to="'/community/'+data.community.url">data.community</nuxt-link>
      </span>
      <span class="subtitle-component">
        time:
        <nuxt-link :to="'/post/'+data._id">data.createdAt</nuxt-link>
      </span>
    </div>
    <div class="image-container" v-if="data.kind=`image`">
      <image :src="data.content" />
    </div>
    <ExternalLink :link="data.content" v-if="data.kind=`link`" />
    <PostText :text="data.content" v-if="data.kind=`text`&&data.content.trim().length" />
    <PostInteraction :postId="data._id" />
    <Comments v-if="view.comments" :post="data._id" :limit="limit" />
  </div>
</template>

<script>
import Comments from "./comments";
import PostText from "./PostText";
import PostInteraction from "./PostInteraction";
export default {
  name: "Post",
  components: { Comments, PostInteraction, PostText },
  props: "data view".split(" "),
  computed: {
    limit() {
      if (typeof this.comments == "number") return this.comments;
      else return null;
    },
  },
};
/*
* example: {
*   data: {
*       author, title, author, community, content, createdAt, kind, _id
*   },
*   view: {
*       author, community, text, image, link, comments
*   },
}
*/
</script>

<style>
</style>