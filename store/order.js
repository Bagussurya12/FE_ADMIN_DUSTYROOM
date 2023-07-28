export const state = () => ({
  order: [],
})
export const mutations = {
  setData(state, order) {
    state.order = order
  },
}
export const actions = {
  fetchOrderById({ commit }, id) {
    return this.$axios
      .$get(`/orders/${id}`)
      .then((response) => {
        commit('setData', response.order)
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  },
}

export const getters = {
  getOrder(state) {
    return state.order
  },
}
