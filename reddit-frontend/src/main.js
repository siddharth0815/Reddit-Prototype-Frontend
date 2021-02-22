// import Vue from 'vue'
// import App from './App.vue'
// Vue.config.productionTip = false
// new Vue({
// 	render: h => h(App),
// }).$mount('#app')

import { createApp } from 'vue'
import App from './App.vue'

import mitt from 'mitt'

const emitter = mitt()

const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.mount('#app')
