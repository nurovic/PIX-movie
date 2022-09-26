import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const actions = {
  FETCH_POPULAR_MOVIE: "FETCH_POPULAR_MOVIE",
};
const mutations = {
  FETCH_POPULAR_MOVIE: "FETCH_POPULAR_MOVIE",
};

const tmdb = {
  namespaced: true,
  state: { movies: [] },
  mutations: {
    [mutations.FETCH_POPULAR_MOVIE](state, data) {
        state.movies = data
    },
  },
  actions: {
    async [actions.FETCH_POPULAR_MOVIE]({ commit }) {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_API}&language=en-US&page=1`
      );
      commit(mutations.FETCH_POPULAR_MOVIE, res.data.results);
    },
  },
  modules: {},
};

export default tmdb;
