import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import tmdb from './tmdb'
import user from './user'

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

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
    tmdb,
    user
  }
})
