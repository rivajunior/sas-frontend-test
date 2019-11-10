import mutationsTypes from './mutationsTypes'

export default {
  [mutationsTypes.SET_CATEGORIES](state, { categories }) {
    state.categories = categories
  },

  [mutationsTypes.SET_QUESTIONS](state, { questions }) {
    state.questions = questions
  },

  [mutationsTypes.START_LOADING](state) {
    state.loading = true
  },

  [mutationsTypes.STOP_LOADING](state) {
    state.loading = false
  }
}
