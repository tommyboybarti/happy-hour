// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import {sync} from 'vuex-router-sync'
import Vuetify from 'vuetify'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(Vuetify)

// vue-router-sync syncs the store to the router. duh!
sync(store, router)

// setup for vue to use different modules
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
