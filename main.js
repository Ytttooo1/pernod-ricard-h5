import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import store from './store/index'
import musicUtil from './util/musicUtil'
musicUtil.init();

Vue.config.productionTip = false
Vue.config.ignoredElements.push("wx-open-subscribe")
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

import uView from "uview-ui";
Vue.use(uView);

import basicContainer from '@/components/basic-container/main.vue'
Vue.component('basicContainer', basicContainer)

import musicMain from '@/components/music-main/main.vue'
Vue.component('musicMain', musicMain)

Vue.prototype.musicUtil = musicUtil

import maskAdaptive from '@/components/mask-adaptive/main.vue'
Vue.component('maskAdaptive', maskAdaptive)


import util from './util/main.js'
Vue.prototype.util = util

import config from '@/api/config.js'
Vue.prototype.staticUrl = config.staticUrl

import record from "./util/record.js"
Vue.prototype.$record = record

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif