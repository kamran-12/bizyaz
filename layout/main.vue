<template>
  <div class="page">
    <div class="container">
      <!-- <transition name="mobile_nav">
        <LeftPanel content />
      </transition>
      <transition name="backdrop">
        <div class="backdrop" @click="backdrop_click" v-if="backdrop"></div>
      </transition>
      <transition name="modal">
        <Modal v-if="modal" />
      </transition>-->
      <div class="persistentleft desktop">
        <LeftPanel :desktop="true">
          <slot></slot>
        </LeftPanel>
      </div>
      <div class="main">
        <Header :empty="true" class="desktop"/>
        <Header :empty="false" class="mobile" />
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import LeftPanel from "../components/leftpanel";
import Header from "../components/header";
export default {
  name: "MainLayout",
  props: [],
  components: { LeftPanel, Header },
  data() {
    return {
      backdrop: null,
      modal: null,
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "San Francisco", "Helvetica", "Arial", sans-serif;
}
.page {
  align-items: center;
  flex-direction: column;
  display: flex;
}
.container {
  background: yellow;
  width: 100%;
  display: flex;
  flex-direction: row;
  max-width: calc(800px + 15vw);
  min-height: 100vh;
}
.persistentleft {
  width: 300px;
  min-height: 100vh;
  background: violet;
  display: flex;
  flex-direction: column;
}
@media (max-width: 800px) {
  .desktop {
    display: none;
  }
}
@media (min-width: 801px) {
  .mobile {
    display: none;
  }
}
.main {
  min-height: 100px;
  background: green;
  flex-grow: 1;
}
</style>