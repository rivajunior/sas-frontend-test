import mutationsTypes from './mutationsTypes'

export default {
  [mutationsTypes.SET_CATEGORIES](state, { categories }) {
    state.categories = categories
  },
  [mutationsTypes.SET_QUESTIONS](state, { question }) {
    state.question = question
  }
}
