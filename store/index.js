import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    device: '',
    browser: '',
    windowWidth: '',
    windowHeight: '',
    musicUrl: "",
    musicStatus: true,
    reloadMusic: false // true:下次播放音乐自动播放最新的音乐   false:不用更新音乐
  },
  mutations: {
    setDevice(state, device) {
      state.device = device
    },
    setBrowser(state, browser) {
      state.browser = browser
    },
    setWindowSize(state, { windowWidth, windowHeight }) {
      state.windowWidth = windowWidth
      state.windowHeight = windowHeight
    },
    setMusicStatus(state, boole) {
      state.musicStatus = boole
    },
    setReloadMusic(state, boole) {
      state.reloadMusic = boole
    },
    setMusicUrl(state, musicUrl) {
      state.musicUrl = musicUrl
    }
  },
  actions: {},
});

export default store;
