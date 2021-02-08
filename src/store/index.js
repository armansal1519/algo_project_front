import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    intFileNameArr: [],
    floatFileNameArr: [],
    stringFileNameArr: [],
    sortedIntFileNameArr: [],
    sortedFloatFileNameArr: [],
    sortedStringFileNameArr: [],
    tab: "unsorted",
    selected: {
      name: "",
      type: ""
    }
  },
  getters: {
    drawer(state) {
      return state.drawer;
    },
    tab(state) {
      return state.tab;
    },
    getSelected(state) {
      return state.selected;
    }
  },
  mutations: {
    updateInt(state, arr) {
      state.intFileNameArr = arr;
    },
    updateFloat(state, arr) {
      state.floatFileNameArr = arr;
    },
    updateString(state, arr) {
      state.stringFileNameArr = arr;
    },
    updateSortedInt(state, arr) {
      state.sortedIntFileNameArr = arr;
    },
    updateSortedFloat(state, arr) {
      state.sortedFloatFileNameArr = arr;
    },
    updateSortedString(state, arr) {
      state.sortedStringFileNameArr = arr;
    }
  },
  actions: {
    unsortedMenu({ commit }) {
      axios.get("http://localhost:5000/int/names?type=unsorted").then(resp => {
        if (resp.status === 200) {
          commit("updateInt", resp.data.filesName);
        }
      });
      axios
        .get("http://localhost:5000/float/names?type=unsorted")
        .then(resp => {
          if (resp.status === 200) {
            commit("updateFloat", resp.data.filesName);
          }
        });
      axios
        .get("http://localhost:5000/string/names?type=unsorted")
        .then(resp => {
          if (resp.status === 200) {
            commit("updateString", resp.data.filesName);
          }
        });
    },
    sortedMenu({ commit }) {
      axios.get("http://localhost:5000/int/names?type=sorted").then(resp => {
        if (resp.status === 200) {
          commit("updateSortedInt", resp.data.filesName);
        }
      });
      axios.get("http://localhost:5000/float/names?type=sorted").then(resp => {
        if (resp.status === 200) {
          commit("updateSortedFloat", resp.data.filesName);
        }
      });
      axios.get("http://localhost:5000/string/names?type=sorted").then(resp => {
        if (resp.status === 200) {
          commit("updateSortedString", resp.data.filesName);
        }
      });
    }
  },
  modules: {}
});
