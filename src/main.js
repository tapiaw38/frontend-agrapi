// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './filters.js'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGeolocation)
Vue.use(VueFusionCharts, FusionCharts, Charts)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik'
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.admin == false) {
      next({
        name: 'ListProducer',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})