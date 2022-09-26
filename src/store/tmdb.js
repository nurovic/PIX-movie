import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const actions = {
  FETCH_POPULAR_MOVIE: "FETCH_POPULAR_MOVIE",
  MOVIE_ID: "MOVIE_ID",
  MOVIE_CREDITS: "MOVIE_CREDITS",
  MOVIE_SIMILAR: "MOVIE_SIMILAR",
  MOVIE_REVIEWS: "MOVIE_REVIEWS",
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
      const res = await axios.get(`popular?api_key=${process.env.VUE_APP_API}&language=en-US&page=1`);
      commit(mutations.FETCH_POPULAR_MOVIE, res.data.results);
    },
    async [actions.MOVIE_ID]({dispatch}, id) {
      const res = await axios.get(
        `/${id}?api_key=${process.env.VUE_APP_API}&language=en-US`);
        dispatch("MOVIE_CREDITS")
        return res.data
    },
    async [actions.MOVIE_CREDITS](_, id) {
        const res = await axios.get(`/${id}/credits?api_key=${process.env.VUE_APP_API}&language=en-US`)
        return  res.data.cast.slice(0, 16)
    },
    async [actions.MOVIE_SIMILAR](_, id) {
        const res = await axios.get(`/${id}/similar?api_key=${process.env.VUE_APP_API}&language=en-US&page=1`)
        return  res.data.results.slice(0, 5)
    },
    async [actions.MOVIE_REVIEWS](_, id) {
        const res = await axios.get(`/${id}/reviews?api_key=${process.env.VUE_APP_API}&language=en-US&page=1`)
        console.log(res.data.results)
        return  res.data.results.slice(0, 3)
    }
  },
  modules: {},
};

export default tmdb;
