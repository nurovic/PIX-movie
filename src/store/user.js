import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
  ADD_FAVOURITE: "ADD_FAVOURITE",
  REMOVE_FAVOURITE: "REMOVE_FAVOURITE",
};
const actions = {
  CHECK_FAVOURITE: "checkFavourite",
  ADD_FAVOURITE: "addFavourite",
  REMOVE_FAVOURITE: "removeFavourite",
};

const user = {
  namespaced: true,
  state: {favourites: []},
  mutations: {
    [mutations.ADD_FAVOURITE](state, data) {
        state.favourites.push(data)
    },
    [mutations.REMOVE_FAVOURITE](state, data){
      const index = state.favourites.indexOf(data)
      state.favourites.splice(index, 1)
    }
  },
  actions: {
    [actions.CHECK_FAVOURITE]({state}, data){
      return state.favourites.some(list =>  list.id == data.id)
    },
    [actions.ADD_FAVOURITE]({commit}, data){
      commit(mutations.ADD_FAVOURITE, data)
    },
    [actions.REMOVE_FAVOURITE]({commit}, data){
      commit(mutations.REMOVE_FAVOURITE, data)
    }

  },
  modules: {},
};

export default user;
