webpackJsonp([7],{"/rCb":function(e,t,i){var s=i("d77T");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);i("rjj0")("12dcd4ea",s,!0,{})},aEyk:function(e,t,i){"use strict";function s(e){i("/rCb")}Object.defineProperty(t,"__esModule",{value:!0});var o=i("NQGu"),n=i("XG+O"),a=(n.a,{name:"Ticket",components:{Confirm:n.a},data:function(){return{getUserInfoByTokenRequest:"uaa/user",addUserSchoolRequest:"profile-service/1.0.0/user_school/addUserSchool",check_join_activityRequest:"promotion-service/1.0.0/offline_activity/check_join_activity",participate_activityRequest:"promotion-service/1.0.0/offline_activity/participate_activity",getUserActivityInfoRequest:"promotion-service/1.0.0/offline_activity/getUserActivityInfo",fnvalleySdkInstance:{},showAddress:!1,activeTabIndex:0,participateSuccessful:!1,activityBeganFlag:!1,confirmState:"default",confirmFlag:!1,rejectFlag:!1,userInfoData:{},qrCodeDictionary:[{link:"../image/wolveskill/canvass_default_00000.jpg"}]}},computed:{channel:function(){return this.$route.query.channel||""},loginId:function(){return this.$route.query.loginId||""},tabBarWidth:function(){return 16*this.tabList[this.activeTabIndex].title.length+"px"},userSchoolName:function(){return this.$route.query.userSchoolName}},watch:{},beforeCreate:function(){},beforeMount:function(){console.log(this.$route),this.$vux.loading.show({text:"Loading"}),"advertise"===this.$route.query.routeto?(this.$vux.loading.hide(),this.$router.push({name:"wolveskillAdvertise"})):this.redirectingFlag=!1},mounted:function(){console.log(new o.a),this.fnvalleySdkInstance=new o.a,console.log(this.redirectingFlag),this.redirectingFlag||(this.$remResizing({fontSize:20}),this.$autoHeight({target:".wolveskill_participatesuccessful_wrapper"}),console.log(window),this.getUserActivityInfo())},methods:{getUserActivityInfo:function(){var e=this;this.$http.get(this.$baseUrl+this.getUserActivityInfoRequest+"/"+this.$store.state.activityId+"/"+this.$store.state.loginId,{headers:{Authorization:"Bearer "+this.$store.state.accessToken}}).then(function(t){console.log(t),t=t.data,e.userInfoData=t,e.$vux.loading.hide()}).catch(function(t){console.log(t),e.$vux.confirm.show({showCancelButton:!1,title:"getUserActivityInfo_error"+t,onConfirm:function(){}})})},getAccessToken:function(){var e=this;this.fnvalleySdkInstance.userAccessToken().then(function(t){console.log(t),console.log("this.getAccessToken++++",t),e.accessToken=t,e.$vux.loading.hide()}).catch(function(t){console.log("this.getAccessToken error",t),e.unauthorizedFlag=!0,e.confirmState="unauthorized",e.$vux.loading.hide()})},handleTabClick:function(e){console.log(e),this.activeTabIndex=e},goBack:function(){this.$router.push({name:"homepage"})}}}),c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"common_main_container"},[s("div",{staticClass:"wolveskill_participatesuccessful_wrapper"},["wechat"===e.$checkEnvironment()?s("div",{staticClass:"common_header_wrapper"},[s("div",{staticClass:"left_wrapper"},[s("div",{staticClass:"previous"},[s("a",{on:{click:e.goBack}},[s("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-left",attrs:{type:"ios-arrow-left",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"}},[s("path",{attrs:{d:"M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"}})])])])]),e._v(" "),s("div",{staticClass:"middle_wrapper"},[e._v("\n        报名成功\n      ")])]):e._e(),e._v(" "),s("div",{staticClass:"title"},[e._v("\n      报名成功！\n    ")]),e._v(" "),s("div",{staticClass:"hint"},[e._v("\n      长按下方二维码，马上加入活动群\n    ")]),e._v(" "),s("div",{staticClass:"qrcode"},["ouya"===e.userSchoolName?s("img",{attrs:{src:i("gBWb")}}):e._e(),e._v(" "),"xiancaijin"===e.userSchoolName?s("img",{attrs:{src:i("4SRK")}}):e._e(),e._v(" "),"xianmeishu"===e.userSchoolName?s("img",{attrs:{src:i("X7tn")}}):e._e(),e._v(" "),"xianzhenfa"===e.userSchoolName?s("img",{attrs:{src:i("h9AC")}}):e._e(),e._v(" "),"xianzyy"===e.userSchoolName?s("img",{attrs:{src:i("wPJ0")}}):e._e(),e._v(" "),"xianxiandai"===e.userSchoolName?s("img",{attrs:{src:i("nGNj")}}):e._e(),e._v(" "),"xianzhiye"===e.userSchoolName?s("img",{attrs:{src:i("t4Vu")}}):e._e(),e._v(" "),"xianpeihua_new"===e.userSchoolName?s("img",{attrs:{src:i("ro/F")}}):e._e()])])])},r=[],l={render:c,staticRenderFns:r},u=l,h=i("VU/8"),v=s,d=h(a,u,!1,v,"data-v-00b2b07c",null);t.default=d.exports},d77T:function(e,t,i){t=e.exports=i("FZ+f")(!1),t.push([e.i,"",""])}});