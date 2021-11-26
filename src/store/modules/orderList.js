import api from '../../api/index'

export const state = {}
export const actions = {
  async getOrderList({ commit, state }, params) {
    let data = await api.getOrderList(params)
    console.log("data")
    console.log(data)
    return data
  }
}

export default {
  state,
  actions
}