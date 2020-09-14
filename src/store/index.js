import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import auth from './auth'
import shared from './shared'
import confirmer from './confirmer'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.user
    }
  },
  actions: {
  },
  modules: {
    users, auth, shared, confirmer
  }
})
