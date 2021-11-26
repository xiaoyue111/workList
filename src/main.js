import App from './App.vue'
import router from './router/index.js'
import store from './store/'
import "./assets/css/initial.css"
// import "./assets/css/base.less"
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
