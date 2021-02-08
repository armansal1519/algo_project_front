<template>
  <div class="con">
    <div class="home">
      <div class="home__btn">
        <v-btn
          color="red "
          outlined
          class="home__btn__btn "
          @click="deleteFile"
        >
          delete file
          <v-icon color="red">mdi-trash-can-outline </v-icon>
        </v-btn>

        <v-btn
          color="#283747"
          @click="onCheck"
          outlined
          class="home__btn__btn"
          v-if="getTab == 'sorted'"
        >
          check file
          <v-icon color="#283747">mdi-check</v-icon>
        </v-btn>

        <v-menu
          v-if="getTab == 'unsorted'"
          bottom
          :close-on-click="closeOnClick"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#283747"
              @click="isEnabled = !isEnabled"
              outlined
              class="home__btn__btn"
              v-bind="attrs"
              v-on="on"
            >
              sort file
              <v-icon color="#283747">mdi-sort-reverse-variant</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in sortAlgo"
              :key="index"
              @click="onClickAlgo(item.title)"
            >
              <v-list-item-title :style="`color:${item.color}`">
                {{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu bottom :close-on-click="closeOnClick">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#283747"
              @click="isEnabled = !isEnabled"
              outlined
              class="home__btn__btn"
              v-bind="attrs"
              v-on="on"
            >
              new file
              <v-icon color="#283747">mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="onClickMenu(index)"
            >
              <v-list-item-title :style="`color:${item.color}`">
                {{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <div class="rad">
          <div class="rad__text">number of data</div>
          <v-radio-group mandatory v-model="radio">
            <v-radio
              v-for="n in radioVal"
              :key="n"
              :label="`${n}`"
              :value="n"
              color="#283747"
              @change="rrr"
            ></v-radio>
          </v-radio-group>
        </div>
      </div>
    </div>
    <loading
      loader="dots"
      :color="loadingColor"
      :width="128"
      :height="128"
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    ></loading>

    <InfoCard v-if="it" class="info__card" :info-list="infoResp" />
  </div>
</template>

<script>
// import axios from "axios";
import axios from "axios";
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import InfoCard from "@/components/InfoCard";

export default {
  name: "HomePage",
  data: () => ({
    isLoading: false,
    fullPage: true,
    loadingColor: "",
    name: "arman",
    dataFromServer: [],
    isEnabled: true,
    closeOnClick: true,
    items: [
      { title: "new int file", color: "#DE354C" },
      { title: "new float file", color: "#932432" },
      { title: "new string file", color: "#3C1874" }
    ],
    sortAlgo: [
      { title: "default" },
      { title: "merge" },
      { title: "bubble" },
      { title: "insertion" },
      { title: "selection" },
      { title: "counting" },
      { title: "insertion" },
      { title: "heap" },
    ],
    algo: "",
    it: false,
    infoResp: {},
    radio: 10000,
    radioVal: [10000, 100000, 1000000, 10000000]
  }),
  methods: {
    onClickAlgo(n) {
      this.isLoading = true;
      const t = this.$store.getters.getSelected.name[6];
      const s = this.$store.getters.getSelected;
      let dataType = "";
      if (t == "I") dataType = "int";
      else if (t == "F") dataType = "float";
      else dataType = "string";

      axios.get(`/${dataType}/sort/${s.name}/${n}`).then(resp => {
        if (resp.status == 200) {
          this.$store.dispatch("sortedMenu").then(() => {
            this.isLoading = false;
            this.$store.state.tab = "sorted";
            this.infoResp = resp.data;
            this.infoTimeOut();
          }).catch(err=>{
            this.isLoading=false
            this.infoResp = err;
            this.infoTimeOut();
          })
        }
      });
    },
    onCheck() {
      const t = this.$store.getters.getSelected.name[6];
      const s = this.$store.getters.getSelected;
      let dataType = "";
      if (t == "I") dataType = "int";
      else if (t == "F") dataType = "float";
      else dataType = "string";

      axios.get(`/${dataType}/check/${s.name}`).then(resp => {
        if (resp.status == 200) {


            this.infoResp = resp.data;
            this.infoTimeOut();

        }
      });
    },
    onClickMenu(i) {
      let url = "";
      switch (i) {
        case 0:
          url = "/int/gen";
          this.loadingColor = "#DE354C";
          break;
        case 1:
          url = "/float/gen";
          this.loadingColor = "#932432";
          break;
        case 2:
          url = "/string/gen";
          this.loadingColor = "#3C1874";

          break;
      }
      this.isLoading = true;
      console.log("aaaa", this.radio);

      axios.get(`${url}?number=${this.radio.toString()}`).then(resp => {
        if (resp.status == 200) {
          this.$store.dispatch("unsortedMenu").then(() => {
            this.isLoading = false;
            this.$store.state.tab = "unsorted";
            this.infoResp = resp.data;
            this.infoTimeOut();
          });
        }
      });
    },
    infoTimeOut() {
      this.it = true;
      const that = this;
      setTimeout(() => {
        that.it = false;
      }, 5000);
    },
    deleteFile() {
      const t = this.$store.getters.getSelected.name[6];
      const s = this.$store.getters.getSelected;
      let dataType = "";
      if (t == "I") dataType = "int";
      else if (t == "F") dataType = "float";
      else dataType = "string";

      axios.delete(`/${dataType}/${s.name}?type=${s.type}`).then(resp => {
        if (resp.status == 200) {
          this.$store.dispatch("sortedMenu");
          this.$store.dispatch("unsortedMenu");
        }
      });
    },
    rrr() {
      console.log(this.radio);
    }
  },
  mounted() {},
  components: {
    InfoCard,
    Loading
  },
  computed: {
    getTab() {
      return this.$store.getters.tab;
    }
  }
};
</script>

<style lang="scss" scoped>
.con {
  margin-right: 160px;
}

.home {
  width: 1360px;
  padding: 16px;

  &__btn {
    display: flex;
    justify-content: right;
    &__btn {
      margin-right: 24px;
    }
  }
}

.rad {
  position: absolute;
  left: 16px;
  top: 16px;
  &__text {
    font-size: 18px;
  }
}

.tooltip {
  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}

.info__card {
  position: absolute;
  bottom: 15px;
  right: 115px;
}
</style>
