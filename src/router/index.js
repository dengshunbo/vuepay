import Vue from 'vue'
import Router from 'vue-router'
import Vpay from '@/lib/vpay/lib/pay'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
   
    { path: '/', name: 'Vpay', component: Vpay }
  ]
})
