import orderListMutations from './mutations/orderList'

const store = new Vuex.Store({
  state: {},
  mutations: {
    orderList: orderListMutations
  }
})

export default store