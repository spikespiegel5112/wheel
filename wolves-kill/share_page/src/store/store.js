import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let testState = ()=>{
  if(process.env.NODE_ENV === 'production'){
    return ''
  }else{
    return 'test'
  }
}

const state = {
  title: 'aaa',
  accessToken: '',
  // accessToken: '5e1673fc-8a61-46a0-b7cd-998e6259b6dd',
  loginId: '',
  // loginId: '18260045855',
  activityId: 25,
  winningPrizeChanceFlag: true,
  schoolList: [[{
    name: '西安欧亚学院',
    value: 'ouya'
  }, {
    name: '西安培华学院',
    value: 'peihua'
  }, {
    name: '西北大学现代学院',
    value: 'xibeida'
  }, {
    name: '西北政法大学',
    value: 'xianzhenfa'
  }, {
    name: '西安西京学院',
    value: 'xijing'
  }, {
    name: '西安外事学院',
    value: 'waishi'
  }]],
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
