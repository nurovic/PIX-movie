import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
  ADD_FAVOURITE: "ADD_FAVOURITE",
};

const user = {
  namespaced: true,
  state: {favourites: []},
  mutations: {
    [mutations.ADD_FAVOURITE](state, data) {
        const check = state.favourites.some(list =>  list.id == data.id)
        check ? alert("Have in your favorites list...") : state.favourites.push(data)
    }
  },
  actions: {},
  modules: {},
};

export default user;
