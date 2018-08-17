import Vue from 'vue'
import iView from 'iview'
//import 'iview/dist/styles/iview.css'
//import './cunstomTheme/my-theme/dist/iview.css'
import '../../static/css/index.less'
import router from './router'
import store from './store/index'
import axios from 'axios'
import App from './App'

Vue.config.productionTip = false
Vue.use(iView)
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store:store,
  render: h => h(App)
})
