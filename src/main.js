import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueProgressBar from 'vue-progressbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import SectionTitle from '@/components/commons/SectionTitle.vue'

Vue.config.productionTip = false

library.add(faTimesCircle, faStar, farStar)

Vue.use(BootstrapVue)
Vue.use(VueProgressBar, {
  color: '#0467db',
  failedColor: '#ff6660',
  height: '2px'
})

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('SectionTitle', SectionTitle)

new Vue({
  router,
  store,
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress

        this.$Progress.parseMeta(meta)
      }

      this.$Progress.start()

      next()
    })

    this.$router.afterEach(() => {
      this.$Progress.finish()
    })
  },
  render: h => h(App)
}).$mount('#app')
