export const state = () => ({
  categories: [],
  categoryId: 0,
})

export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId
  },
  updateCategories(state, categories) {
    state.categories.push(...categories)
  },
}

export const actions = {
  fetchCategories({ commit }) {
    return this.$axios.$get('/categories').then((response) => {
      commit('updateCategories', response.categories)
    })
  },
  updateCategoryId({ commit }, categoryId) {
    commit('updateCategoryId', categoryId)
  },
}
