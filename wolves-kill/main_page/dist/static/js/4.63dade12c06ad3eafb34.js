webpackJsonp([4],{"/Fmm":function(t,e,s){e=t.exports=s("UTlt")(!1),e.push([t.i,"",""])},Cu1Q:function(t,e,s){var i=s("/Fmm");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);s("FIqI")("47682ecf",i,!1,{})},ocYf:function(t,e,s){t.exports=s.p+"static/img/exampleavatar.cd65626.png"},vzyY:function(t,e,s){"use strict";function i(t){v||s("Cu1Q")}Object.defineProperty(e,"__esModule",{value:!0});var a=s("NQGu"),n=s("XG+O"),o=(n.a,{name:"wolveskill",components:{Confirm:n.a},data:function(){return{find_votes_rankingRequest:"promotion-service/1.0.0/offline_activity/find_votes_ranking",getUserActivityInfoRequest:"promotion-service/1.0.0/offline_activity/getUserActivityInfo",fnvalleySdkInstance:{},showAddress:!1,activeTabIndex:0,participateSuccessful:!1,activityBeganFlag:!1,confirmState:"default",queryModel:{pageSize:100},confirmFlag:!1,rejectFlag:!1,redirectingFlag:!0,rankListData:[{title:"我本人更可爱"}],mySelfData:[{title:"我本人更可爱"}],userInfoData:{}}},computed:{channel:function(){return this.$route.query.channel||""},loginId:function(){return this.$route.query.loginId||""},isActivity:function(){return new Date("July 21, 2018 00:00:00")>=new Date("July 21, 2018 00:00:00")},tabBarWidth:function(){return 16*this.tabList[this.activeTabIndex].title.length+"px"}},watch:{},beforeMount:function(){console.log(this.$route),this.$vux.loading.show({text:"Loading"}),"advertise"===this.$route.query.routeto?(this.$vux.loading.hide(),this.$router.push({name:"wolveskillAdvertise"})):this.redirectingFlag=!1},mounted:function(){var t=this;console.log(new a.a),this.fnvalleySdkInstance=new a.a,console.log(this.redirectingFlag),this.redirectingFlag||(this.$remResizing({fontSize:20}),this.$autoHeight({target:".wolveskill_main_container"}),console.log(window),this.$getAccessToken().then(function(e){t.getUserActivityInfo()}),this.getUserActivityInfo(),this.getRankList())},methods:{getUserActivityInfo:function(){var t=this;this.$http.get(this.$baseUrl+this.getUserActivityInfoRequest+"/"+this.$store.state.activityId+"/"+this.$store.state.loginId,{headers:{Authorization:"Bearer "+this.$store.state.accessToken}}).then(function(e){console.log(e),e=e.data,t.userInfoData=e}).catch(function(e){console.log(e),t.$vux.confirm.show({showCancelButton:!1,title:"getUserActivityInfo_error"+e,onConfirm:function(){}})})},getRankList:function(){var t=this;this.$http.get(this.$baseUrl+this.find_votes_rankingRequest+"/"+this.$store.state.activityId,{pageSize:100},{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){console.log(e),e=e.data,t.rankListData=e,t.$vux.loading.hide()}).catch(function(t){console.log(t)})},goBack:function(){this.$router.push({name:"homepage"})},checkPerson:function(t,e){this.$router.push({name:"canvass",query:{state:"loginId="+t.loginId+"$userActivityId="+t.userActivityId}})}}}),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"common_main_container"},[t.redirectingFlag?i("div",{staticClass:"common_initializing_item"}):i("div",{staticClass:"wolveskill_main_container"},["wechat"===t.$checkEnvironment()?i("div",{staticClass:"common_header_wrapper"},[i("div",{staticClass:"left_wrapper"},[i("div",{staticClass:"previous"},[i("a",{on:{click:t.goBack}},[i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-left",attrs:{type:"ios-arrow-left",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"}},[i("path",{attrs:{d:"M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"}})])])])]),t._v(" "),i("div",{staticClass:"middle_wrapper"},[t._v("\n        投票排名\n      ")])]):t._e(),t._v(" "),i("div",{staticClass:"wolveskill_ranklist_container"},[null!==t.userInfoData.loginId?i("div",{staticClass:"myself"},[i("ul",[i("li",{staticClass:"wolveskill_rank_item"},[i("span",[t._v(t._s(t.userInfoData.ranking))]),t._v(" "),i("div",{staticClass:"content"},[t._m(0),t._v(" "),i("label",{staticClass:"name"},[t._v(t._s(t.userInfoData.userRealName))]),t._v(" "),i("label",{staticClass:"votes"},[t._v(t._s(t.userInfoData.votes))])])])])]):t._e(),t._v(" "),i("div",{staticClass:"ranklist"},[i("ul",t._l(t.rankListData,function(e,a){return i("li",{staticClass:"wolveskill_rank_item",on:{click:function(s){t.checkPerson(e,a)}}},[0===a?i("span",{staticClass:"gold"}):1===a?i("span",{staticClass:"silver"}):2===a?i("span",{staticClass:"bronze"}):i("span",[t._v(t._s(a+1))]),t._v(" "),i("div",{staticClass:"content",style:{borderBottom:"1px solid #ccc"}},[i("div",{staticClass:"avatar"},[""!==e.userImage&&null!==e.userImage?i("img",{attrs:{src:e.userImage}}):i("img",{attrs:{src:s("ocYf")}})]),t._v(" "),i("label",{staticClass:"name"},[t._v(t._s(e.userRealName))]),t._v(" "),i("label",{staticClass:"votes"},[t._v(t._s(e.votes))])])])}))]),t._v(" "),t._m(1)])])])},c=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"avatar"},[i("img",{attrs:{src:s("ocYf")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ranklistrules"},[s("h2",[t._v("榜单说明：")]),t._v(" "),s("p",[t._v("\n          榜单说明：趣谷西安高校线下狼人杀友谊赛人气选手榜单，榜单前8名将拥有参加高校联赛决赛的比赛资格，并获得由xxx提供的人气选手奖励一份\n        ")])])}];r._withStripped=!0;var l={render:r,staticRenderFns:c},u=l,v=!1,d=s("C7Lr"),h=i,f=d(o,u,!1,h,"data-v-43cc161a",null);f.options.__file="src/components/RankList.vue";e.default=f.exports}});