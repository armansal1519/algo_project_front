<template>
  <div>
    <v-app-bar app clipped-left color="#f3f3f3" style="padding: 0 72px">
      <!--      <v-app-bar-nav-icon @click="drawer=!drawer" class="header-icon"></v-app-bar-nav-icon>-->
      <v-spacer />

      <div class="h_title">
        Arman Salehi
      </div>
    </v-app-bar>
    <v-navigation-drawer
      fixed
      class="d"
      app
      clipped
      color="#f3f3f3"
      width="460px"
      :key="k"
    >
      <div class="file__tabs">
        <div
          @click="onChangeTab"
          :class="tab == 'unsorted' ? 'tab-active' : ''"
          class="file__tab"
        >
          unsorted files
        </div>
        <div
          @click="onChangeTab"
          :class="tab == 'sorted' ? 'tab-active' : ''"
          class="file__tab"
        >
          sorted files
        </div>
      </div>

      <div v-if="tab == 'unsorted'">
        <div class="file">
          <div class="file__title" style="color:#DE354C ">random ints :</div>
          <div v-for="(int, i) in getInt" :key="i">
            <File :name="int" :color="'#DE354C'" :type="'unsorted'" />
          </div>
        </div>
        <div class="file">
          <div class="file__title" style="color: #932432">random floats :</div>
          <div v-for="(int, i) in getFloat" :key="i">
            <File :name="int" :color="'#932432'" :type="'unsorted'" />
          </div>
        </div>
        <div class="file">
          <div class="file__title" style="color: #3C1874">random strings :</div>
          <div v-for="(int, i) in getString" :key="i">
            <File :name="int" :color="'#3C1874'" :type="'unsorted'" />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="file">
          <div class="file__title" style="color:#DE354C ">random ints :</div>
          <div v-for="(int, i) in getSortedInt" :key="i">
            <File :name="int" :color="'#DE354C'" :type="'sorted'" />
          </div>
        </div>
        <div class="file">
          <div class="file__title" style="color: #932432">random floats :</div>
          <div v-for="(int, i) in getSortedFloat" :key="i">
            <File :name="int" :color="'#932432'" :type="'sorted'" />
          </div>
        </div>
        <div class="file">
          <div class="file__title" style="color: #3C1874">random strings :</div>
          <div v-for="(int, i) in getSortedString" :key="i">
            <File :name="int" :color="'#3C1874'" :type="'sorted'" />
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import axios from "axios";
import File from "@/components/File";

export default {
  name: "Header",
  components: { File },
  data: function() {
    return {
      drawer: false,
      k: 1
    };
  },
  mounted() {},
  computed: {
    getInt() {
      if (this.$store.state.intFileNameArr) {
        if (this.tab == "unsorted") {
          return this.$store.state.intFileNameArr;
        } else {
          return this.$store.state.sortedIntFileNameArr;
        }
      } else {
        return [];
      }
    },
    getFloat() {
      if (this.$store.state.floatFileNameArr) {
        return this.$store.state.floatFileNameArr;
      } else {
        return [];
      }
    },
    getString() {
      if (this.$store.state.stringFileNameArr) {
        return this.$store.state.stringFileNameArr;
      } else {
        return [];
      }
    },
    getSortedInt() {
      if (this.$store.state.sortedIntFileNameArr) {
        return this.$store.state.sortedIntFileNameArr;
      } else {
        return [];
      }
    },
    getSortedFloat() {
      if (this.$store.state.sortedFloatFileNameArr) {
        return this.$store.state.sortedFloatFileNameArr;
      } else {
        return [];
      }
    },
    getSortedString() {
      if (this.$store.state.sortedStringFileNameArr) {
        return this.$store.state.sortedStringFileNameArr;
      } else {
        return [];
      }
    },
    tab() {
      return this.$store.getters.tab;
    }
  },
  methods: {
    onChangeTab() {
      if (this.tab == "unsorted") {
        this.$store.state.tab = "sorted";
      } else {
        this.$store.state.tab = "unsorted";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-icon {
  color: #283747;
}

.h_title {
  font-family: "Sacramento", cursive !important;
  font-size: 50px;
}

.d {
  //border-bottom-right-radius: 160px 100px !important;
  border-bottom: #28374744 1px solid !important;
  border-right: #28374744 1px solid !important;
  //background: rgb(243,243,243);
  //background: linear-gradient(160deg, rgba(243,243,243,1) 0%, rgba(40,55,71,0.7) 100%);
}

.file-tab {
}

.file {
  &__title {
    margin-top: 22px;

    margin-left: 4px;
    font-size: 24px;
  }

  &__tabs {
    height: 48px;
    width: 100%;
    display: flex;
  }

  &__tab {
    border: #28374744 solid 1px;
    color: #283747;
    font-size: 18px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

.tab-active {
  background-color: #283747;
  color: #f3f3f3;
  //font-weight: bold;
  font-size: 20px;
}
</style>
