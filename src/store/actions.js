import mutationsTypes from './mutationsTypes'
import api from '../api'

export default {
  getCategories({ commit }) {
    return api.get('api_category.php').then(response => {
      const categories = response.data.trivia_categories

      commit(mutationsTypes.SET_CATEGORIES, { categories })
    })
  }
}
