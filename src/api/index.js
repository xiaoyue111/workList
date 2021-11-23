let api = {
  getOrderList (params) {
		return axios.get(`http://rap2api.taobao.org/app/mock/294268/orderList`, params)
	},
}

export default api