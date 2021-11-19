let orderList = () => import('../views/orderList')
let orderDetails = () => import('../views/orderDetails')

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: orderList,
      // component: test
    },
    {
      path: '/orderList',
      component: orderList,
      name: orderList,

    }, {
      path: '/orderDetails',
      component: orderDetails,
      name: orderDetails,
    }


  ],
})

export default router