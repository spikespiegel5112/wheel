webpackJsonp([2],{HH9v:function(n,e,o){e=n.exports=o("FZ+f")(!1),e.push([n.i,"",""])},NQGu:function(n,e,o){"use strict";var s=o("//Fk"),t=o.n(s);window.FnvalleySdk=function(){var n="pc",e=navigator.userAgent,o=(navigator.appVersion,e.indexOf("Android")>-1||e.indexOf("Linux")>-1),s=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);o&&(n="android"),s&&(n="ios"),console.log(this),this.agent=function(){return console.log("fnvalleyAgent"),"android"===n?window.android.fnvalleyAgent():window.webkit.messageHandlers.agent.postMessage(""),new t.a(function(n,e){setTimeout(function(){null!=FnvalleySdk.agent?n(FnvalleySdk.agent):e("agent is null!")},500)})},this.userAccessToken=function(){return console.log("userAccessToken"),new t.a(function(e,o){"android"===n?void 0!==window.android.fnvalleyUserAccessToken()?window.android.fnvalleyUserAccessToken():window.FnvalleySdk.accessToken=window.android.getToken():window.webkit.messageHandlers.accessToken.postMessage(""),setTimeout(function(){null!=FnvalleySdk.accessToken?e(FnvalleySdk.accessToken):o("accessToken is null!")},500)})},this.userLoginId=function(){return console.log("userLoginId"),"android"===n?window.android.fnvalleyLoginId():window.webkit.messageHandlers.loginId.postMessage(""),new t.a(function(n,e){setTimeout(function(){null!=FnvalleySdk.loginId?n(FnvalleySdk.loginId):e("loginId is null!")},500)})},this.refreshUserAccessToken=function(e){return console.log("refreshUserAccessToken"),"android"===n?window.android.fnvalleyRefreshUserAccessToken():window.webkit.messageHandlers.refreshAccessToken.postMessage(""),new t.a(function(n,e){setTimeout(function(){null!=FnvalleySdk.refreshAccessToken?n(FnvalleySdk.refreshAccessToken):e("refreshAccessToken is null!")},500)})},this.openView=function(e){"android"===n?window.android.fnvalleyOpenView(e):window.webkit.messageHandlers.openView.postMessage(e)},window.FnvalleySdk.prototype.check=function(){alert("check")},window.FnvalleySdk.accessToken="aaa",window.FnvalleySdk.agent=null,window.FnvalleySdk.loginId=null,window.FnvalleySdk.refreshAccessToken=null,window.FnvalleySdk.getAccessToken=function(n){console.log("getAccessToken"+n.data),window.FnvalleySdk.accessToken=n.data},window.FnvalleySdk.getLoginId=function(n){console.log("getAgent"+n.data),FnvalleySdk.loginId=n.data},window.FnvalleySdk.getAgent=function(n){console.log("getAgent"+n.data),FnvalleySdk.agent=n.data},window.FnvalleySdk.getRefreshAccessToken=function(n){console.log("getRefreshAccessToken"+n.data),FnvalleySdk.refreshAccessToken=n.data}},e.a=window.FnvalleySdk},VUIr:function(n,e,o){"use strict";function s(n){o("mrWo")}Object.defineProperty(e,"__esModule",{value:!0});var t=o("NQGu"),a={name:"smart1111",data:function(){return{getUserInfoByTokenRequest:"uaa/user",FnvalleySdkInstance:{},accessToken:""}},computed:{},watch:{activityId:function(n){}},beforeMount:function(){window.location.href},mounted:function(){console.log(this.FnvalleySdkInstance),this.$remResizing({fontSize:20}),this.$autoHeight({target:".smart1111_main_container"}),window.history.go(-2)},methods:{getAccessToken:function(){var n=this;this.$vux.loading.show({text:"Loading"}),this.fnvalleyJsSdkInstance=new t.a,this.fnvalleyJsSdkInstance.userAccessToken().then(function(e){n.accessToken=e,console.log(e),n.$vux.loading.hide()}).catch(function(n){alert("error"+n)})}}},i=function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",[o("div",{staticClass:"common_main_container"},[o("div",{staticClass:"smart1111_main_container"},[o("div",{staticClass:"advertise"},[o("div",{staticClass:"explain"},[o("label",[n._v("(11月1日-11月16日期间）"+n._s(n.accessToken))]),n._v(" "),n._m(0)]),n._v(" "),n._m(1),n._v(" "),n._m(2)])])])])},l=[function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("p",[n._v("\n            只需使用一次智能校园设备"),o("br"),n._v("\n            即可免费领取实物奖励！\n          ")])},function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{staticClass:"time"},[o("label",[n._v("11月2日、8日、9日、15日、16日")])])},function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{staticClass:"location"},[o("p",[n._v("\n            西安欧亚学院 餐饮大厦门口"),o("br"),n._v("\n            西安美术学院 中心湖北"),o("br"),n._v("\n            西安培华学院长安校区"),o("br"),n._v("综合服务楼门口"),o("br"),n._v("\n            西北大学现代学院 6号公寓楼门口"),o("br"),n._v("\n            西北政法大学 8号楼丁字路口\n          ")])])}],c={render:i,staticRenderFns:l},d=c,r=o("VU/8"),u=s,v=r(a,d,!1,u,"data-v-7443b28b",null);e.default=v.exports},mrWo:function(n,e,o){var s=o("HH9v");"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);o("rjj0")("0673a47c",s,!0,{})}});