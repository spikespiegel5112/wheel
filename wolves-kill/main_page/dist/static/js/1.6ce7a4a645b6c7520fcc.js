webpackJsonp([1],{"6LhQ":function(t,e,i){var s=i("y7XH");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("rjj0")("449ec752",s,!1,{})},nHec:function(t,e,i){"use strict";function s(t){v||i("6LhQ")}Object.defineProperty(e,"__esModule",{value:!0});var a=i("NQGu"),o=i("XG+O"),n=(o.a,{name:"wolveskill",components:{Confirm:o.a},data:function(){return{getUserInfoByTokenRequest:"uaa/user",addUserSchoolRequest:"profile-service/1.0.0/user_school/addUserSchool",check_join_activityRequest:"promotion-service/1.0.0/offline_activity/check_join_activity",participate_activityRequest:"promotion-service/1.0.0/offline_activity/participate_activity",fnvalleySdkInstance:{},showAddress:!1,activeTabIndex:0,participateSuccessful:!1,activityBeganFlag:!1,confirmState:"default",confirmContentDictionary:{default:{content:"<p></p>"}},list:[{key:"gd",value:"广东"},{key:"gx",value:"广西"}],formData:{avatar:""},confirmFlag:!1,rejectFlag:!1,redirectingFlag:!0,unauthorizedFlag:!1,successfulFlag:!1,downloadUrl:"",accessToken:"",rankListData:[{title:"我本人更可爱"},{title:"我本人更可爱"},{title:"我本人更可爱"},{title:"我本人更可爱"},{title:"我本人更可爱"},{title:"我本人更可爱"},{title:"我本人更可爱"},{title:"我本人更可爱"}],mySelfData:[{title:"我本人更可爱"}]}},computed:{channel:function(){return this.$route.query.channel||""},loginId:function(){return this.$route.query.loginId||""},isActivity:function(){return new Date("July 21, 2018 00:00:00")>=new Date("July 21, 2018 00:00:00")},activityId:function(){return 5},tabBarWidth:function(){return 16*this.tabList[this.activeTabIndex].title.length+"px"}},watch:{},beforeCreate:function(){},beforeMount:function(){console.log(this.$route),this.$vux.loading.show({text:"Loading"}),"advertise"===this.$route.query.routeto?(this.$vux.loading.hide(),this.$router.push({name:"wolveskillAdvertise"})):this.redirectingFlag=!1},mounted:function(){console.log(new a.a),this.fnvalleySdkInstance=new a.a,console.log(this.redirectingFlag),this.redirectingFlag||(this.$remResizing({fontSize:20}),this.$autoHeight({target:".wolveskill_canvassdetail_wrapper"}),console.log(window),this.getAccessToken(),this.getDownloadUrl())},methods:{getAccessToken:function(){var t=this;this.fnvalleySdkInstance.userAccessToken().then(function(e){console.log(e),console.log("this.getAccessToken++++",e),t.accessToken=e,t.$vux.loading.hide()}).catch(function(e){console.log("this.getAccessToken error",e),t.unauthorizedFlag=!0,t.confirmState="unauthorized",t.$vux.loading.hide()})},handleReceivePrize:function(){var t=this;this.$vux.loading.show({text:"Loading"}),this.$http.get(this.$baseUrl+this.check_join_activityRequest+"/"+this.activityId,{headers:{Authorization:"Bearer "+this.accessToken}}).then(function(e){switch(console.log(e),t.$vux.loading.hide(),e.code){case 1e4:t.confirmFlag=!0,t.confirmState="confirm";break;case 10001:t.rejectFlag=!0,t.confirmState="alreadyParticipated";break;case 10006:t.rejectFlag=!0,t.confirmState="notYet";break;case 10007:t.rejectFlag=!0,t.confirmState="notExist";break;case 10029:t.rejectFlag=!0,t.confirmState="notConsumed"}})},receivePrize:function(){var t=this;this.$vux.loading.show({text:"Loading"});this.$http.post(this.$baseUrl+this.participate_activityRequest+"/"+this.activityId,{},{headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+this.accessToken}}).then(function(e){switch(console.log(e),e.code){case 1e4:t.successfulFlag=!0,t.confirmState="successful"}t.$vux.loading.hide()}).catch(function(e){t.$vux.loading.hide()})},getDownloadUrl:function(){var t=void 0,e=this.$getDevice();t=e.ios?"https://itunes.apple.com/cn/app/%E8%B6%A3%E8%B0%B7-%E4%B8%80%E4%B8%AA%E6%87%82%E4%BD%A0%E7%9A%84app/id1397292579?mt=8":e.android?"http://a.app.qq.com/o/simple.jsp?pkgname=io.cityzone.android":"http://download.fnvalley.com",this.downloadUrl=t},downloadApp:function(){location.assign(this.downloadUrl)},handleTabClick:function(t){console.log(t),this.activeTabIndex=t},goBack:function(){this.$router.push({name:"homepage"})},partcipate:function(){this.$router.push({name:"participate"})},uploadAvatar:function(){var t=this;console.log(this.fnvalleySdkInstance),this.fnvalleySdkInstance.uploadImage().then(function(e){t.$vux.confirm.show({showCancelButton:!1,title:"success "+e,onConfirm:function(){}}),t.formData.avatar=e}).catch(function(e){t.$vux.confirm.show({showCancelButton:!1,title:"error "+e,onConfirm:function(){}})})},participate:function(){this.$http.post(this.$baseUrl+this.participate_activityRequest,this.formData).then(function(t){console.log(t)}).catch(function(t){})}}}),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"common_main_container"},[i("div",{staticClass:"wolveskill_rules_wrapper"},[i("div",{staticClass:"main"},[t._m(0),t._v(" "),i("div",{staticClass:"wolveskill_block_wrapper"},[i("h3",{staticClass:"wolveskill_rulestitle_item"},[t._v("狼人杀游戏规则与技巧")]),t._v(" "),i("ul",{staticClass:"links"},[i("li",[i("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/27306953"}},[i("label",[t._v("狼人杀游戏术语图文详解")]),t._v(" "),i("span",[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-right",attrs:{type:"ios-arrow-right",size:"10",xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 512 512"}},[i("path",{attrs:{d:"M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"}})])])])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/25377067"}},[i("label",[t._v("狼人杀攻略帮你在桌游聚会中重拾自信")]),t._v(" "),i("span",[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-right",attrs:{type:"ios-arrow-right",size:"10",xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 512 512"}},[i("path",{attrs:{d:"M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"}})])])])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://www.zhihu.com/question/51957919/answer/128437723"}},[i("label",[t._v("新手在狼人杀游戏中如何发言？")]),t._v(" "),i("span",[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-right",attrs:{type:"ios-arrow-right",size:"10",xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 512 512"}},[i("path",{attrs:{d:"M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"}})])])])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://www.zhihu.com/question/51939366/answer/128294747"}},[i("label",[t._v("玩狼人杀如何抿身份？")]),t._v(" "),i("span",[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-right",attrs:{type:"ios-arrow-right",size:"10",xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 512 512"}},[i("path",{attrs:{d:"M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"}})])])])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://www.zhihu.com/question/39124335/answer/178293009"}},[i("label",[t._v("狼人杀如何找狼？")]),t._v(" "),i("span",[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-right",attrs:{type:"ios-arrow-right",size:"10",xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 512 512"}},[i("path",{attrs:{d:"M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"}})])])])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://www.jianshu.com/p/5cb97eebee0d"}},[i("label",[t._v("狼人杀心得")]),t._v(" "),i("span",[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-right",attrs:{type:"ios-arrow-right",size:"10",xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 512 512"}},[i("path",{attrs:{d:"M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"}})])])])])])])])])])},c=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wolveskill_block_wrapper"},[i("h2",[t._v("西安高校狼人杀友谊赛S1")]),t._v(" "),i("h3",{staticClass:"wolveskill_rulestitle_item"},[t._v("活动时间")]),t._v(" "),i("p",[t._v("\n          2018年12月1日至2018年12月23日 "),i("br"),t._v("\n          1.报名时间：12月1日—12月14日"),i("br"),t._v("\n          2.人气选手投票时间：12月7日—12月20日"),i("br"),t._v("\n          3.海选时间：12月16日"),i("br"),t._v("\n          4.联赛时间：12月22日—12月23日"),i("br")]),t._v(" "),i("h3",{staticClass:"wolveskill_rulestitle_item"},[t._v("海选规则与奖品说明")]),t._v(" "),i("p",[t._v("\n          1.规则说明：每所学校报名人数96人，12人为一组共8组进行比赛。通过积分赛最终选出每所学校的前3名晋级高校联合赛。"),i("br"),t._v("\n          2.奖品：所有参加海选赛事的同学都可获得价值4元洗衣免单券一张"),i("br"),t._v("\n          3.时间：12月16日（比赛地址见微信群内通知）"),i("br")]),t._v(" "),i("h3",{staticClass:"wolveskill_rulestitle_item"},[t._v("人气选手规则与奖品说明")]),t._v(" "),i("p",[t._v("\n          1.规则：通过活动页面分享到微信群或朋友圈，邀请好友助力投票，人气榜单排名前6选手直接晋级高校联赛资格"),i("br"),t._v("\n          2.奖品：高校联赛奖品（每人2000积分+飞利浦蓝牙音响，见下方高校联赛说明）"),i("br"),t._v("\n          3.时间：12月7日—12月20日"),i("br")]),t._v(" "),i("h3",{staticClass:"wolveskill_rulestitle_item"},[t._v("高校联赛规则与奖品说明")]),t._v(" "),i("p",[t._v("\n          1.规则：晋级高校联赛人数共24人（18人通过海选晋级，6人是狼人杀人气榜单前6名选手），12人一组共2组进行比赛；"),i("br"),t._v("\n          通过积分赛最终于选出每组前6名晋级总决赛。"),i("br"),t._v("\n          2.奖品：所有参加高校联赛的同学都可获得每人2000积分+飞利浦蓝牙音响。"),i("br"),t._v("\n          3.时间：12月22日（比赛地址见微信群内通知）"),i("br")]),t._v(" "),i("h3",{staticClass:"wolveskill_rulestitle_item"},[t._v("总决赛规则与奖品说明")]),t._v(" "),i("p",[t._v("\n          1.规则：晋级总决赛人数共12人，通过积分赛最终于选出每组前3名分别为冠军、亚军、季军。"),i("br"),t._v("\n          2.奖品：冠军奖品：popoking（京东售价￥2800）+30000积分；亚军奖品：popoking（京东售价￥1080）+20000积分；季军奖品：popoking（京东售价￥980） + 10000积分；其它人奖品：5000积分+飞利浦无线耳机。"),i("br"),t._v("\n          3.时间：12月23日（比赛地址见微信群内通知）"),i("br")]),t._v(" "),i("p",{staticClass:"hint"},[t._v("\n          比赛由趣谷主办，决赛合作斗鱼，进行全程直播\n        ")])])}];r._withStripped=!0;var l={render:r,staticRenderFns:c},h=l,v=!1,u=i("VU/8"),p=s,d=u(n,h,!1,p,"data-v-731fe177",null);d.options.__file="src/components/Rules.vue";e.default=d.exports},y7XH:function(t,e,i){e=t.exports=i("FZ+f")(!1),e.push([t.i,"",""])}});