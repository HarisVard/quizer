import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    difficulty: '',
    question_num:'',
  },
  mutations: {
    setName (state, name) {
      state.name = name
    },
    setDifficulty (state, difficulty) {
      state.difficulty = difficulty
    },
    setQuestionsNumber (state, number) {
      state.question_num = number
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
