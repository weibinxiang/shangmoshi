// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import store from './store/store'
import axios from './axios/index'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
Vue.config.productionTip = false

import { Icon, Toast } from 'vant'
Vue.use(Icon, Toast)

import headers from './components/utils/utils.js'
Vue.use(Icon, Toast)

Vue.use(headers)

router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  // if (store.state.userInfo === null || store.state.userInfo === '' ) {
  //   if(to.path == '/login'){ 
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // } else {
    next()
  // }
})

Vue.prototype.successLoadImg = function(event) {
  if (event.target.complete == true) {
    event.target.classList.remove("default-image");;
    var imgParentNode = event.target.parentNode;
    if(imgParentNode.classList.contains('show-img')==true){
      imgParentNode.style.background = "#000";
    }
  }
}

Vue.prototype.errorLoadImg = function(event) {
  event.target.classList.add("default-image");
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})
