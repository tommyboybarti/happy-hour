// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import {sync} from 'vuex-router-sync'
import Vuetify from 'vuetify'
import store from '@/store/store'
import * as VueGoogleMaps from 'vue2-google-maps'
import Panel from '@/templates/Panel'
import VueTimepicker from 'vue2-timepicker'

const config = require('./config/config')

Vue.config.productionTip = false

Vue.component('panel', Panel)
Vue.use(VueTimepicker)
Vue.use(Vuetify, {
  theme: {
    primary: '#307794',
    secondary: '#40A8B2',
    accent: '#E04177',
    error: '#E04177',
    warning: '#ffeb3b',
    info: '#DDB6A7',
    success: '#4caf50'
  }

})
Vue.use(VueGoogleMaps, {
  load: {
    key: config.googleApi,
    libraries: 'places'
  }
})

// vue-router-sync syncs the store to the router. duh!
sync(store, router)

// setup for vue to use different modules
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
