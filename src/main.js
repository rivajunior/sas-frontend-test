import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import SectionTitle from '@/components/commons/SectionTitle.vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.component('SectionTitle', SectionTitle)

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('getCategories')
  },
  render: h => h(App)
}).$mount('#app')
