webpackJsonp([1],{AwLx:function(e,t,i){e.exports=i.p+"static/img/banner_popoking.58d704a.png"},KRvj:function(e,t,i){t=e.exports=i("FZ+f")(!1),t.push([e.i,"",""])},nGw8:function(e,t,i){var o=i("KRvj");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);i("rjj0")("1f46970c",o,!1,{})},wzzA:function(e,t,i){"use strict";function o(e){_||i("nGw8")}Object.defineProperty(t,"__esModule",{value:!0});var s=i("mvHQ"),n=i.n(s),a=i("woOf"),r=i.n(a),c=i("//Fk"),l=i.n(c),u=i("lbHh"),h=i.n(u),d=i("NQGu"),f=i("XG+O"),v=(f.a,{name:"wolveskill",components:{Confirm:f.a},data:function(){return{oauthTokenRequest:"uaa/oauth/token",getUserInfoByTokenRequest:"uaa/user",addUserSchoolRequest:"profile-service/1.0.0/user_school/addUserSchool",check_join_activityRequest:"promotion-service/1.0.0/offline_activity/check_join_activity",participate_activityRequest:"promotion-service/1.0.0/offline_activity/participate_activity",getUserActivityInfoRequest:"promotion-service/1.0.0/offline_activity/getUserActivityInfo",voteRequest:"promotion-service/1.0.0/offline_activity/vote",getSignatureRequest:"account-service/1.0.0/weChat/getSignature",fnvalleySdkInstance:{},showAddress:!1,activeTabIndex:0,participateSuccessful:!1,activityBeganFlag:!1,confirmState:"default",confirmFlag:!1,rejectFlag:!1,userInfoData:{},voteSuccessfulFlag:!1,loginId:"",userActivityId:"",environment:"",userSchoolName:"",isVoted:!1}},computed:{tabBarWidth:function(){return 16*this.tabList[this.activeTabIndex].title.length+"px"},wechatAuthCode:function(){return console.log(this.$route),this.$route.query.code},stateCode:function(){return this.$route.query.state}},watch:{userInfoData:function(e){this.$store.state.schoolList[0].filter(function(t){return t.value===e.userSchoolName}).length>0&&(this.userSchoolName=this.$store.state.schoolList[0].filter(function(t){return t.value===e.userSchoolName})[0].name)}},beforeCreate:function(){},beforeMount:function(){console.log(this.$route),this.$vux.loading.show({text:"Loading"}),"shareredirect"===this.$route.query.routeto?(alert("shareredirect"),this.$vux.loading.hide(),this.wechatRedirectingFlag=!0,this.reInitializePage()):this.redirectingFlag=!1,void 0!==this.$route.query.loginId&&this.$store.commit("setLoginId",this.$route.query.loginId),void 0!==this.$route.query.userActivityId&&this.$store.commit("setUserActivityId",this.$route.query.userActivityId)},mounted:function(){var e=this;console.log(new d.a),this.fnvalleySdkInstance=new d.a,console.log(this.redirectingFlag),this.redirectingFlag||(this.$remResizing({fontSize:20}),console.log(window),this.environment=this.$checkEnvironment(),"wechat"!==this.environment?(this.parseStateCode(),this.$getAccessToken().then(function(t){e.getUserActivityInfo()})):(this.parseStateCode(),this.getUserActivityInfo(),this.initJSSDK()))},methods:{reInitializePage:function(){var e=this.stateCode;location.assign("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri="+this.$shareDomainUrl+"&response_type=code&scope=snsapi_userinfo&state="+e+"#wechat_redirect")},parseStateCode:function(){var e=[];if(void 0!==this.stateCode){decodeURIComponent(this.stateCode).split("$").forEach(function(t){e[t.split("=")[0]]=t.split("=")[1]}),this.stateCodeData=e,this.loginId=e.loginId,this.userActivityId=e.userActivityId}console.log("parseStateCode",e),console.log("loginId",this.loginId),this.checkIsVoted()},getUserActivityInfo:function(){var e=this;this.$http.get(this.$baseUrl+this.getUserActivityInfoRequest+"/"+this.$store.state.activityId+"/"+this.loginId,{headers:{}}).then(function(t){console.log(t),t=t.data,e.userInfoData=t,e.$vux.loading.hide()}).catch(function(t){console.log(t),e.$vux.confirm.show({showCancelButton:!1,title:"getUserActivityInfo_error"+t,onConfirm:function(){}})})},handleTabClick:function(e){console.log(e),this.activeTabIndex=e},goBack:function(){this.$router.push({name:"homepage"})},vote:function(){var e=this;this.isVoted?this.$vux.confirm.show({showCancelButton:!1,title:"已投票请勿复投",onConfirm:function(){}}):this.$http.post(this.$baseUrl+this.voteRequest+"/"+this.userActivityId,{},{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){switch(console.log(t),t.code){case 1e4:e.voteSuccessfulFlag=!0,e.getUserActivityInfo(),e.saveCache(),e.isVoted=!0}})},share:function(){if(console.log(this.$checkEnvironment()),"wechat"!==this.$checkEnvironment()){var e="loginId="+this.loginId+"$userActivityId="+this.userActivityId;this.fnvalleySdkInstance.openAPPShare({title:"投票开始！趣谷狼人杀决赛票选红人进行时！",describe:"榜单前八直接空降决赛，赢取双重丰厚双旦大礼，更有机会成为校园网红，做这条街上最靓的仔！",weburl:this.$shareDomainUrl+"?state="+e})}else this.$vux.confirm.show({showCancelButton:!1,title:"请点击右上角按钮分享",onConfirm:function(){}})},initJSSDK:function(){var e=this;console.log("777",location.href.split("#")[0]);var t=this.$wechat;console.log(t),this.$http.post(this.$baseUrl+this.getSignatureRequest,{url:location.href.split("#")[0]},{headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(e){var t="";for(var i in e)t+=encodeURIComponent(i)+"="+encodeURIComponent(e[i])+"&";return t}]}).then(function(i){console.log(i),t.config({debug:!1,appId:"wx67c26ff8068af257",timestamp:i.data.timestamp,nonceStr:i.data.nonceStr,signature:i.data.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"]}),t.error(function(e){console.log(e),alert("wechat error")}),t.ready(function(i){console.log(i),t.checkJsApi({jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"],success:function(e){}});var o="loginId="+e.loginId+"$userActivityId="+e.userActivityId;t.onMenuShareTimeline({title:"投票开始！趣谷狼人杀决赛票选红人进行时！",link:e.$shareDomainUrl+"?state="+o,imgUrl:"http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg",success:function(){}}),t.onMenuShareAppMessage({title:"投票开始！趣谷狼人杀决赛票选红人进行时！",desc:"榜单前八直接空降决赛，赢取双重丰厚双旦大礼，更有机会成为校园网红，做这条街上最靓的仔！",link:e.$shareDomainUrl+"?state="+o,imgUrl:"http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg",type:"",dataUrl:"",success:function(){}})})})},getWechatAccessToken:function(){},getWechatToken:function(e){var t=this;return new l.a(function(i,o){e=r()({type:"",params:{}},e),"wechat"===t.$checkEnvironment()?t.$http.post(t.$baseUrl+t.oauthTokenRequest,r()({grant_type:e.type},e.params),{headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic YW5kcm9pZDphZG1pbg=="},transformRequest:[function(e){var t="";for(var i in e)t+=encodeURIComponent(i)+"="+encodeURIComponent(e[i])+"&";return t}]}).then(function(e){console.log("oauthTokenRequest",e),t.accessToken=e.access_token,sessionStorage.setItem("wheel-accessToken",e.access_token),i(e)}).catch(function(e){switch(console.log("error",e),e.data.code){case 1:t.dialogFlag=!0,t.loginToGetPrizeFlag=!0,t.openId=e.data.openId,o(e);break;case 2:o(e),t.$vux.confirm.show({showCancelButton:!1,title:e.data.error+"，请关闭页面重新打开2",onConfirm:function(){}});break;case 3:o(e),t.$vux.confirm.show({showCancelButton:!1,title:e.data.error+"，请关闭页面重新打开3",onConfirm:function(){}});break;default:t.$vux.confirm.show({showCancelButton:!1,title:"data.error_description"+e.data.error_description,onConfirm:function(){}}),o(e)}}):alert("当前不是微信环境也不是原生环境")})},getCache:function(){},checkIsVoted:function(){var e=this,t=[];h.a.get("wolvesKill-loginId")?(!JSON.parse(h.a.get("wolvesKill-loginId"))instanceof Array&&(h.a.remove("wolvesKill-loginId"),this.isVoted=!1),t=JSON.parse(h.a.get("wolvesKill-loginId")),this.isVoted=t.filter(function(t){return t===Number(e.loginId)}).length>0):this.isVoted=!1},saveCache:function(){var e=this,t=[];h.a.get("wolvesKill-loginId")?(t=JSON.parse(h.a.get("wolvesKill-loginId")),0===t.filter(function(t){return t===e.loginId}).length&&t.push(Number(this.loginId))):t.push(Number(this.loginId)),h.a.set("wolvesKill-loginId",n()(t))}}}),g=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"common_main_container"},[o("div",{staticClass:"wolveskill_canvassdetail_wrapper"},[o("div",{staticClass:"header"},[o("div",{staticClass:"avatar"},[null===e.userInfoData.userImage||""===e.userInfoData.userImage?o("img",{attrs:{src:""}}):o("img",{attrs:{src:e.userInfoData.userImage}})]),e._v(" "),o("div",{staticClass:"desc"},[o("h2",[o("p",[e._v(e._s(e.userInfoData.userRealName))]),e._v(" "),o("span",[e._v("最具人气选手投票")])]),e._v(" "),o("label",[e._v(e._s(e.userSchoolName)+"，"+e._s(e.userInfoData.userMajor))])])]),e._v(" "),o("div",{staticClass:"maincontent"},[o("div",{staticClass:"statistic"},[o("ul",[o("li",[o("span",[e._v(e._s(e.userInfoData.votes))]),e._v(" "),o("label",[e._v("票数")])]),e._v(" "),o("li",[o("span",[e._v(e._s("-1"!==e.userInfoData.ranking?e.userInfoData.ranking:"100+"))]),e._v(" "),o("label",[e._v("排名")])])])]),e._v(" "),o("div",{staticClass:"canvasspicture"},[null===e.userInfoData.userImage||""===e.userInfoData.userImage?o("img",{attrs:{src:i("zGmm")}}):o("img",{attrs:{src:e.userInfoData.userImage}})]),e._v(" "),o("ul",{staticClass:"wolveskill_button_wrapper"},[o("li",[e.isVoted?o("a",{on:{click:e.vote}},[e._v("已投票")]):o("a",{on:{click:e.vote}},[e._v("投票")])]),e._v(" "),o("li",[o("a",{on:{click:e.share}},[e._v("分享")])])]),e._v(" "),e._m(0)])]),e._v(" "),o("toast",{attrs:{type:"text",time:2e3,"is-show-mask":"",text:"投票成功"},model:{value:e.voteSuccessfulFlag,callback:function(t){e.voteSuccessfulFlag=t},expression:"voteSuccessfulFlag"}})],1)},p=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"advertise"},[o("img",{attrs:{src:i("AwLx")}})])}];g._withStripped=!0;var m={render:g,staticRenderFns:p},I=m,_=!1,w=i("VU/8"),y=o,C=w(v,I,!1,y,"data-v-274ae29b",null);C.options.__file="src/components/Canvass.vue";t.default=C.exports},zGmm:function(e,t,i){e.exports=i.p+"static/img/canvass_default_00000.2d8f3cd.jpg"}});