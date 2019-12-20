// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSession from 'vue-session';
import VueCookies from 'vue-cookies';

import axios from './axios';
import global_ from './components/Global';

Vue.use(ElementUI);
Vue.use(VueSession)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.globalData = global_ //挂载到Vue实例上面
Vue.prototype.a=1


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
