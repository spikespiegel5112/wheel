import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  title: 'aaa',
  // accessToken: '',
  accessToken: '48cbff38-d5e4-47ae-9eee-dc115e9456da',
  // loginId: '',
  loginId: '18260045855',
  activityId: 25,
  winningPrizeChanceFlag: true,
  deviceTypeDictionary: [{
    name: 'Android',
    code: 'android'
  }, {
    name: 'iOS',
    code: 'ios'
  }],
  appDownloadLocation: {
    ios: 'https://itunes.apple.com/cn/app/%E8%B6%A3%E8%B0%B7-%E4%B8%80%E4%B8%AA%E6%87%82%E4%BD%A0%E7%9A%84app/id1397292579?mt=8',
    android: 'http://a.app.qq.com/o/simple.jsp?pkgname=io.cityzone.android'
  },
  appDownloadLocationDictionary: [{
    type: 'ios',
    value: 'https://itunes.apple.com/cn/app/%E8%B6%A3%E8%B0%B7-%E4%B8%80%E4%B8%AA%E6%87%82%E4%BD%A0%E7%9A%84app/id1397292579?mt=8'
  }, {
    type: 'android',
    value: 'http://a.app.qq.com/o/simple.jsp?pkgname=io.cityzone.android'
  }],
};

const mutations = {
  turnOffWinningPrizeChance(state, payload) {
    state.winningPrizeChanceFlag = false;
  },
  setAccessToken(state, payload) {
    state.accessToken = payload;
  },
  setUserLoginId(state, payload) {
    state.loginId = payload;
  }
};
const actions = {}

export default new Vuex.Store({
  state,
  mutations
});
