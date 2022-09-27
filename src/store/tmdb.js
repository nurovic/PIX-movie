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
  MOVIE_SEARCH: "MOVIE_SEARCH",
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
    }
  },
  actions: {
    async [actions.FETCH_POPULAR_MOVIE]({ commit }) {
      const res = await axios.get(`/movie/popular?api_key=${process.env.VUE_APP_API}&language=en-US&page=1`);
      commit(mutations.FETCH_POPULAR_MOVIE, res.data.results);
    },
    async [actions.MOVIE_ID]({dispatch}, id) {
      const res = await axios.get(
        `/movie/${id}?api_key=${process.env.VUE_APP_API}&language=en-US`);
        dispatch("MOVIE_CREDITS")
        return res.data
    },
    async [actions.MOVIE_CREDITS](_, id) {
        const res = await axios.get(`/movie/${id}/credits?api_key=${process.env.VUE_APP_API}&language=en-US`)
        return  res.data.cast.slice(0, 16)
    },
    async [actions.MOVIE_SIMILAR](_, id) {
        const res = await axios.get(`/movie/${id}/similar?api_key=${process.env.VUE_APP_API}&language=en-US&page=1`)
        return  res.data.results.slice(0, 5)
    },
    async [actions.MOVIE_REVIEWS](_, id) {
        const res = await axios.get(`/movie/${id}/reviews?api_key=${process.env.VUE_APP_API}&language=en-US&page=1`)
        return  res.data.results.slice(0, 3)
    },
    async [actions.MOVIE_SEARCH](_, key) {
        const res = await axios.get(`search/movie?api_key=${process.env.VUE_APP_API}&language=en-US&query=${key}&page=1&include_adult=false`)
        return res.data.results  
    }
  },
  modules: {},
};

export default tmdb;
