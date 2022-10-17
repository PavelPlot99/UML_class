import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VModal from 'vue-js-modal/dist/index.nocss'
Vue.config.productionTip = false
Vue.use(VModal, {dynamicDefaults: {scrollable:true, height:"80%"}})
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
