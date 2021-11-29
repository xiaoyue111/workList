import api from '../../api/index'

export const state = {}
export const actions = {
  async getOrderList({ commit, state }, params) {
    let data = await api.getOrderList(params)
    return data
  }
}

export default {
  state,
  actions
}