<template>
  <span v-html="html" />
</template>

<script>
export default {
  name: "Linker",
  props: ["text"],
  methods: {},
  computed: {
    html() {
      let link = s => {
        let isLink = str =>
          !!/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(
            str
          );
        let improveLink = link => {
          if (!link.startsWith("http")) {
            if (link.split("/")[0].split(".").length < 3) {
              link = "www." + link;
            }
            link = "http://" + link;
          }
          return link;
        };
        return isLink(s)
          ? `<a href="${improveLink(s)}" target="_blank">${s}<a/>`
          : s;
      };
      return this.text
        .replace(
          /[&<>]/g,
          c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] || c)
        )
        .split(" ")
        .map((x) => link(x))
        .join(" ")
        .split("\n")
        .map((x) => link(x))
        .join("\n");
    },
  },
};
</script>

<style>
</style>