webpackJsonp([0],{CVkO:function(t,e,n){var i=n("LxVk");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("6a8c6203",i,!1,{})},KRvj:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,"",""])},LxVk:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},nGw8:function(t,e,n){var i=n("KRvj");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("1f46970c",i,!1,{})},wzzA:function(t,e,n){"use strict";function i(t){I||n("CVkO")}function o(t){U||n("nGw8")}Object.defineProperty(e,"__esModule",{value:!0});var s=n("mvHQ"),a=n.n(s),r=n("woOf"),c=n.n(r),l=n("//Fk"),u=n.n(l),h=n("lbHh"),d=n.n(h),f=n("NQGu"),v=(Number,String,String,Array,{name:"confirm",props:{zIndex:{type:Number,default:999},title:{type:String,default:""},content:{type:String,default:""},button:{type:Array,default:function(){return[]}}},data:function(){return{}},mounted:function(){this.$autoHeight({target:".wolveskill_confirm_wrapper"})},methods:{onConfirm:function(t){this.$emit("confirm",function(t){return t})},onCancel:function(t){this.$emit("cancel",function(t){return t})}}}),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wolveskill_confirm_wrapper",style:{zIndex:t.zIndex}},[n("div",{staticClass:"content"},[n("div",{staticClass:"header"},[t._v("\n      "+t._s(t.title)+"\n    ")]),t._v(" "),n("div",{staticClass:"detail",domProps:{innerHTML:t._s(t.content)}}),t._v(" "),n("div",{staticClass:"button"},[n("ul",t._l(t.button,function(e){return n("li",["confirm"===e.type?n("a",{on:{click:t.onConfirm}},[t._v("\n            "+t._s(e.text)+"\n          ")]):t._e(),t._v(" "),"cancel"===e.type?n("a",{on:{click:t.onCancel}},[t._v("\n            "+t._s(e.text)+"\n          ")]):t._e()])}))])])])},p=[];g._withStripped=!0;var m={render:g,staticRenderFns:p},_=m,I=!1,w=n("VU/8"),y=i,C=w(v,_,!1,y,"data-v-ab368e80",null);C.options.__file="src/components/Confirm.vue";var k=C.exports,$={name:"wolveskill",components:{Confirm:k},data:function(){return{oauthTokenRequest:"uaa/oauth/token",getUserInfoByTokenRequest:"uaa/user",addUserSchoolRequest:"profile-service/1.0.0/user_school/addUserSchool",check_join_activityRequest:"promotion-service/1.0.0/offline_activity/check_join_activity",participate_activityRequest:"promotion-service/1.0.0/offline_activity/participate_activity",getUserActivityInfoRequest:"promotion-service/1.0.0/offline_activity/getUserActivityInfo",voteRequest:"promotion-service/1.0.0/offline_activity/vote",getSignatureRequest:"account-service/1.0.0/weChat/getSignature",fnvalleySdkInstance:{},showAddress:!1,activeTabIndex:0,participateSuccessful:!1,activityBeganFlag:!1,confirmState:"default",confirmFlag:!1,rejectFlag:!1,userInfoData:{},voteSuccessfulFlag:!1,loginId:"",userActivityId:"",environment:"",userSchoolName:"",isVoted:!1}},computed:{tabBarWidth:function(){return 16*this.tabList[this.activeTabIndex].title.length+"px"},wechatAuthCode:function(){return console.log(this.$route),this.$route.query.code},stateCode:function(){return this.$route.query.state}},watch:{userInfoData:function(t){this.$store.state.schoolList[0].filter(function(e){return e.value===t.userSchoolName}).length>0&&(this.userSchoolName=this.$store.state.schoolList[0].filter(function(e){return e.value===t.userSchoolName})[0].name)}},beforeCreate:function(){},beforeMount:function(){console.log(this.$route),this.$vux.loading.show({text:"Loading"}),"shareredirect"===this.$route.query.routeto?(alert("shareredirect"),this.$vux.loading.hide(),this.wechatRedirectingFlag=!0,this.reInitializePage()):this.redirectingFlag=!1,void 0!==this.$route.query.loginId&&this.$store.commit("setLoginId",this.$route.query.loginId),void 0!==this.$route.query.userActivityId&&this.$store.commit("setUserActivityId",this.$route.query.userActivityId)},mounted:function(){var t=this;console.log(new f.a),this.fnvalleySdkInstance=new f.a,console.log(this.redirectingFlag),this.redirectingFlag||(this.$remResizing({fontSize:20}),console.log(window),this.environment=this.$checkEnvironment(),"wechat"!==this.environment?(this.parseStateCode(),this.$getAccessToken().then(function(e){t.getUserActivityInfo()})):(this.parseStateCode(),this.getUserActivityInfo(),this.initJSSDK()))},methods:{reInitializePage:function(){var t=this.stateCode;location.assign("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx67c26ff8068af257&redirect_uri="+this.$shareDomainUrl+"&response_type=code&scope=snsapi_userinfo&state="+t+"#wechat_redirect")},parseStateCode:function(){var t=[];if(void 0!==this.stateCode){decodeURIComponent(this.stateCode).split("$").forEach(function(e){t[e.split("=")[0]]=e.split("=")[1]}),this.stateCodeData=t,this.loginId=t.loginId,this.userActivityId=t.userActivityId}console.log("parseStateCode",t),console.log("loginId",this.loginId),this.checkIsVoted()},getUserActivityInfo:function(){var t=this;this.$http.get(this.$baseUrl+this.getUserActivityInfoRequest+"/"+this.$store.state.activityId+"/"+this.loginId,{headers:{}}).then(function(e){console.log(e),e=e.data,t.userInfoData=e,t.$vux.loading.hide()}).catch(function(e){console.log(e),t.$vux.confirm.show({showCancelButton:!1,title:"getUserActivityInfo_error"+e,onConfirm:function(){}})})},handleTabClick:function(t){console.log(t),this.activeTabIndex=t},goBack:function(){this.$router.push({name:"homepage"})},vote:function(){var t=this;this.isVoted?this.$vux.confirm.show({showCancelButton:!1,title:"已投票请勿复投",onConfirm:function(){}}):this.$http.post(this.$baseUrl+this.voteRequest+"/"+this.userActivityId,{},{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){switch(console.log(e),e.code){case 1e4:t.voteSuccessfulFlag=!0,t.getUserActivityInfo(),t.saveCache(),t.isVoted=!0}})},share:function(){if(console.log(this.$checkEnvironment()),"wechat"!==this.$checkEnvironment()){var t="loginId="+this.loginId+"$userActivityId="+this.userActivityId;this.fnvalleySdkInstance.openAPPShare({title:"投票开始！趣谷狼人杀决赛票选红人进行时！",describe:"榜单前八直接空降决赛，赢取双重丰厚双旦大礼，更有机会成为校园网红，做这条街上最靓的仔！",weburl:this.$shareDomainUrl+"?state="+t})}else this.$vux.confirm.show({showCancelButton:!1,title:"请点击右上角按钮分享",onConfirm:function(){}})},initJSSDK:function(){var t=this;console.log("777",location.href.split("#")[0]);var e=this.$wechat;console.log(e),this.$http.post(this.$baseUrl+this.getSignatureRequest,{url:location.href.split("#")[0]},{headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e}]}).then(function(n){console.log(n),e.config({debug:!1,appId:"wx67c26ff8068af257",timestamp:n.data.timestamp,nonceStr:n.data.nonceStr,signature:n.data.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"]}),e.error(function(t){console.log(t),alert("wechat error")}),e.ready(function(n){console.log(n),e.checkJsApi({jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"],success:function(t){}});var i="loginId="+t.loginId+"$userActivityId="+t.userActivityId;e.onMenuShareTimeline({title:"投票开始！趣谷狼人杀决赛票选红人进行时！",link:t.$shareDomainUrl+"?state="+i,imgUrl:"http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg",success:function(){}}),e.onMenuShareAppMessage({title:"投票开始！趣谷狼人杀决赛票选红人进行时！",desc:"榜单前八直接空降决赛，赢取双重丰厚双旦大礼，更有机会成为校园网红，做这条街上最靓的仔！",link:t.$shareDomainUrl+"?state="+i,imgUrl:"http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg",type:"",dataUrl:"",success:function(){}})})})},getWechatAccessToken:function(){},getWechatToken:function(t){var e=this;return new u.a(function(n,i){t=c()({type:"",params:{}},t),"wechat"===e.$checkEnvironment()?e.$http.post(e.$baseUrl+e.oauthTokenRequest,c()({grant_type:t.type},t.params),{headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Basic YW5kcm9pZDphZG1pbg=="},transformRequest:[function(t){var e="";for(var n in t)e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n])+"&";return e}]}).then(function(t){console.log("oauthTokenRequest",t),e.accessToken=t.access_token,sessionStorage.setItem("wheel-accessToken",t.access_token),n(t)}).catch(function(t){switch(console.log("error",t),t.data.code){case 1:e.dialogFlag=!0,e.loginToGetPrizeFlag=!0,e.openId=t.data.openId,i(t);break;case 2:i(t),e.$vux.confirm.show({showCancelButton:!1,title:t.data.error+"，请关闭页面重新打开2",onConfirm:function(){}});break;case 3:i(t),e.$vux.confirm.show({showCancelButton:!1,title:t.data.error+"，请关闭页面重新打开3",onConfirm:function(){}});break;default:e.$vux.confirm.show({showCancelButton:!1,title:"data.error_description"+t.data.error_description,onConfirm:function(){}}),i(t)}}):alert("当前不是微信环境也不是原生环境")})},getCache:function(){},checkIsVoted:function(){var t=this,e=[];d.a.get("wolvesKill-loginId")?(!JSON.parse(d.a.get("wolvesKill-loginId"))instanceof Array&&(d.a.remove("wolvesKill-loginId"),this.isVoted=!1),e=JSON.parse(d.a.get("wolvesKill-loginId")),this.isVoted=e.filter(function(e){return e===Number(t.loginId)}).length>0):this.isVoted=!1},saveCache:function(){var t=this,e=[];d.a.get("wolvesKill-loginId")?(e=JSON.parse(d.a.get("wolvesKill-loginId")),0===e.filter(function(e){return e===t.loginId}).length&&e.push(Number(this.loginId))):e.push(Number(this.loginId)),d.a.set("wolvesKill-loginId",a()(e))}}},S=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"common_main_container"},[i("div",{staticClass:"wolveskill_canvassdetail_wrapper"},[i("div",{staticClass:"header"},[i("div",{staticClass:"avatar"},[null===t.userInfoData.userImage||""===t.userInfoData.userImage?i("img",{attrs:{src:""}}):i("img",{attrs:{src:t.userInfoData.userImage}})]),t._v(" "),i("div",{staticClass:"desc"},[i("h2",[i("p",[t._v(t._s(t.userInfoData.userRealName))]),t._v(" "),i("span",[t._v("最具人气选手投票")])]),t._v(" "),i("label",[t._v(t._s(t.userSchoolName)+"，"+t._s(t.userInfoData.userMajor))])])]),t._v(" "),i("div",{staticClass:"maincontent"},[i("div",{staticClass:"statistic"},[i("ul",[i("li",[i("span",[t._v(t._s(t.userInfoData.votes))]),t._v(" "),i("label",[t._v("票数")])]),t._v(" "),i("li",[i("span",[t._v(t._s("-1"!==t.userInfoData.ranking?t.userInfoData.ranking:"100+"))]),t._v(" "),i("label",[t._v("排名")])])])]),t._v(" "),i("div",{staticClass:"canvasspicture"},[null===t.userInfoData.userImage||""===t.userInfoData.userImage?i("img",{attrs:{src:n("zGmm")}}):i("img",{attrs:{src:t.userInfoData.userImage}})]),t._v(" "),i("ul",{staticClass:"wolveskill_button_wrapper"},[i("li",[t.isVoted?i("a",{on:{click:t.vote}},[t._v("已投票")]):i("a",{on:{click:t.vote}},[t._v("投票")])]),t._v(" "),i("li",[i("a",{on:{click:t.share}},[t._v("分享")])])]),t._v(" "),i("div",{staticClass:"advertise"})])]),t._v(" "),i("toast",{attrs:{type:"text",time:2e3,"is-show-mask":"",text:"投票成功"},model:{value:t.voteSuccessfulFlag,callback:function(e){t.voteSuccessfulFlag=e},expression:"voteSuccessfulFlag"}})],1)},b=[];S._withStripped=!0;var x={render:S,staticRenderFns:b},A=x,U=!1,R=n("VU/8"),q=o,D=R($,A,!1,q,"data-v-274ae29b",null);D.options.__file="src/components/Canvass.vue";e.default=D.exports},zGmm:function(t,e,n){t.exports=n.p+"static/img/canvass_default_00000.2d8f3cd.jpg"}});