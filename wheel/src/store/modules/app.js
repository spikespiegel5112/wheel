import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    layoutHeight: 0,
    tableHeight: 0,
    device: 'desktop',
    actionType: [{
      name: 'native',
      code: 'native'
    }, {
      name: 'url',
      code: 'url'
    }],
    bountyType: [{
      name: '趣豆 ',
      code: 1
    }, {
      name: '积分',
      code: 0
    }],
    deviceTypeDictionary: [{
      name: 'Android',
      code: 'android'
    }, {
      name: 'iOS',
      code: 'ios'
    }],
    noticeTypeDictionary: [{
      name: '所有类型',
      code: 'all'
    }, {
      name: '视频',
      code: 1
    }, {
      name: '视频',
      code: 2
    }, {
      name: '版本更新',
      code: 3
    }, {
      name: '菠菜公告',
      code: 4
    }, {
      name: '排行榜公告',
      code: 5
    }, {
      name: '未知类型',
      code: 6
    }],
    deviceType: [{
      name: 'iOS',
      code: 'ios'
    }, {
      name: 'Android',
      code: 'android'
    }, {
      name: '全部',
      code: 'all'
    }]
  },
  mutations: {
    UPDATE_LAYOUT_HEIGHT(state, payload) {
      state.layoutHeight = payload;
      state.tableHeight = payload - 115;
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },

  },
  actions: {
    ToggleSideBar: ({commit}) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({commit}, {withoutAnimation}) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({commit}, device) {
      commit('TOGGLE_DEVICE', device)
    },
    updateLayoutHeight({commit}, payload) {
      commit('UPDATE_LAYOUT_HEIGHT', payload)
    }
  },
};

export default app
