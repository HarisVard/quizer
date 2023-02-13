import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
  },
  mutations: {
    setName (state, name) {
      state.name = name
    },
  },
  actions: {
    updateName ({ commit }, name) {
      commit('setName', name)
    },
  },
  getters: {
    fullName (state) {
      return `${state.name} `
    }
  }
})
