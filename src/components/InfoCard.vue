<template>
  <v-card width="400" class="c" color="#283747" dark>
    <div class="c__info" v-for="(value, name, index) in getInfo" :key="index">
      <div class="c__info__title">{{ name }}:</div>
      <div class="c__info__text">{{ value }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    infoList: Object
  },
  computed: {
    getInfo() {
      return this.infoList;
    }
  }
};
</script>

<style lang="scss" scoped>
.c {
  padding: 8px;
  &__info {
    display: flex;
    margin-top: 8px;
    color: #f3f3f3;

    &__title {
      margin-right: 2px;
      font-size: 18px;
      font-weight: bold;
    }
    &__text {
      margin-left: 4px;
      font-size: 18px;
    }
  }
}
</style>
