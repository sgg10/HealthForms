import Vue from 'vue'

// Plugins
import './plugins/BootstrapVue'
import './plugins/fontAwesome'

// Services
import './backend/services/Init'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
