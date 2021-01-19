import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'

import { configureFakeBackend } from "./_helpers/fake-backend";
configureFakeBackend();

Vue.use(VueCompositionAPI)

// Vue Router
import router from './router.js'

// Vuex Store
import store from './store'

// axios
import axios from './axios.js'
Vue.prototype.$http = axios

// Styles: SCSS
import './assets/scss/main.scss'

// Plugins
import './plugins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
