import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import tmdb from './tmdb'

axios.defaults.baseURL = "https://api.themoviedb.org/3/movie/";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tmdb
  }
})
