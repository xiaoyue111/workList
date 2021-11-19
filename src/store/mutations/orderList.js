import api from '../../api/index'

const mutations = {
  orderList(params) {
    let data = api.getOrderList(params)

    return data;
  }
}

export default mutations;