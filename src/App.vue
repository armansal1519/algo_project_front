<template>
  <v-app class="app">
    <Header />

    <v-main class="main">
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HomePage";
import Header from "@/components/Header";

export default {
  name: "App",

  components: {
    Header,
    HelloWorld
  },

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("unsortedMenu");
    this.$store.dispatch("sortedMenu");
  }
};
</script>

<style lang="scss">
.app {
  background-color: #f3f3f3 !important;
  font-family: "Roboto", sans-serif !important;
}
</style>
