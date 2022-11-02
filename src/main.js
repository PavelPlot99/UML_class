import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VModal from 'vue-js-modal/dist/index.nocss'
import router from './router'
import Notifications from "vue-notification";
Vue.config.productionTip = false
Vue.use(VModal, {dynamicDefaults: {scrollable:true, height:"80%"}})
Vue.use(Notifications);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
