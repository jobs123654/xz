// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import func from './components/common/func'
import config from './config/config'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);
Vue.config.productionTip = false
window.func=func
window.bus =new Vue();
window.config=config

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
