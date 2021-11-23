// import orderListMutations from './mutations/orderList'

// const store = new Vuex.Store({
//   state: {},
//   mutations: {
//     orderList: orderListMutations
//   }
// })

// export default store

const store = new Vuex.Store({
  state: {

  },
  mutations: {
    getOrderData() {
      axios({
        method: "get",
        url: "http://rap2api.taobao.org/app/mock/294268/orderList",
      })
        .then((v) => {
          // console.log(v.data.data.data);
          this.orderDataList = v.data.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
})

export default store
