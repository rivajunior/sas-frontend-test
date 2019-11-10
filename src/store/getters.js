export default {
  getCategoryById(state) {
    return id => state.categories.find(category => category.id === id)
  },

  getDifficultyIndex(state) {
    return difficulty => state.difficulties.findIndex(_difficulty => _difficulty === difficulty)
  }
}
