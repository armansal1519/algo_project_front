<template>
  <!--  <v-btn class="file" text :color="color" block >-->
  <!--    <v-icon>mdi-file-outline</v-icon>-->
  <!--    {{name.toLowerCase()}}-->
  <!--  </v-btn>-->
  <div>
    <div
      class="file"
      @click="onClickFile"
      :style="isActive ? `background-color:${color}` : `color:${color}`"
    >
      <v-icon :color="isActive ? '#f3f3f3' : color">mdi-file-outline</v-icon>
      <div :style="isActive ? `color:#f3f3f3` : `color:${color}`">
        {{ name.toLowerCase() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  props: {
    name: String,
    color: String,
    type: String
  },
  methods: {
    onClickFile() {
      this.$store.state.selected.name = this.name;
      this.$store.state.selected.type = this.type;
    }
  },
  components: {},
  computed: {
    isActive() {
      const s = this.$store.getters.getSelected;
      return s.name === this.name && s.type === this.type;
    }
  }
};
</script>

<style scoped>
.file {
  margin-left: 30px;
  padding: 8px;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  margin-top: 8px;
  cursor: pointer;
  width: 400px;
  border-radius: 4px;
}
</style>
