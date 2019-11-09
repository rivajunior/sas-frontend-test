export default {
  getCategoryById(state) {
    return id => state.categories.find(category => category.id === id)
  }
}
