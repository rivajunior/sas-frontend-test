import mutationsTypes from './mutationsTypes'
import api from '../api'

export default {
  requestToken({ commit }) {
    return api.get('api_token.php?command=request').then(response => {
      const { token } = response.data

      commit({
        type: mutationsTypes.SET_API_TOKEN,
        token
      })
    })
  },

  loadCategories({ commit }) {
    commit(mutationsTypes.START_LOADING)

    return api
      .get('api_category.php')
      .then(response => {
        const categories = response.data.trivia_categories

        commit({
          type: mutationsTypes.SET_CATEGORIES,
          categories
        })
      })
      .finally(() => {
        commit(mutationsTypes.STOP_LOADING)
      })
  },

  loadQuestions({ commit, state }, { categoryId, difficult = '', amount = 10, type = 'multiple' }) {
    commit(mutationsTypes.START_LOADING)

    return api
      .get(
        `api.php?amount=${amount}&category=${categoryId}&type=${type}&difficulty=${difficult}&encode=base64&token=${state.token}`
      )
      .then(response => {
        const questions = response.data.results

        commit({
          type: mutationsTypes.SET_QUESTIONS,
          questions
        })
      })
      .finally(() => {
        commit(mutationsTypes.STOP_LOADING)
      })
  }
}
