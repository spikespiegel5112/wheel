webpackJsonp([3],{"/lE+":function(n,t,a){n.exports=a.p+"static/img/accept_prize_banner_00000.9a0f070.png"},"3dX0":function(n,t,a){t=n.exports=a("UTlt")(!0),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"AcceptPrize.vue",sourceRoot:""}])},YEOM:function(n,t,a){var e=a("3dX0");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);a("FIqI")("3eed651b",e,!0,{})},v7Nc:function(n,t,a){"use strict";function e(n){a("YEOM")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("uAC3"),i=a.n(s),r={name:"Promotion",data:function(){return{getRewardProductRequest:"promotion-service/1.0.0/reward_product/getRewardProduct",loading:!1,prizeData:{}}},computed:{loginId:function(){return i()("wheel-loginId")}},watch:{},mounted:function(){console.log(this.$store),this.initializing=!1,this.$remResizing({fontSize:20}),this.getRewardProduct()},methods:{getRewardProduct:function(){var n=this;this.$http.get(this.$baseUrl+this.getRewardProductRequest+"/"+this.$route.query.rewardStr,{}).then(function(t){console.log(t),n.prizeData=t.data})}}},o=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"wheel_accpetprize_wrapper"},[a("div",{staticClass:"common_header_wrapper"},[a("div",{staticClass:"left_wrapper"},[a("div",{staticClass:"previous"},[a("router-link",{attrs:{to:{path:"/"}}},[a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-left",attrs:{type:"ios-arrow-left",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"}},[a("path",{attrs:{d:"M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"}})])])],1)]),n._v(" "),a("div",{staticClass:"middle_wrapper"},[n._v("\n      我要领奖\n    ")])]),n._v(" "),n._m(0),n._v(" "),a("div",{staticClass:"accpetprize"},[a("h1",[n._v("下载趣谷APP,领取奖品")]),n._v(" "),a("ul",[a("CommonLoading",{attrs:{loading:n.loading}}),n._v(" "),a("li",[a("a",{attrs:{href:n.$store.state.appDownloadLocation.android,target:"_blank"}},[a("span",{staticClass:"android"}),n._v(" "),a("label",[n._v("立即领取")])])]),n._v(" "),a("li",[a("a",{attrs:{href:n.$store.state.appDownloadLocation.ios,target:"_blank"}},[a("span",{staticClass:"ios"}),n._v(" "),a("label",[n._v("立即领取")])])])],1),n._v(" "),a("div",{staticClass:"hint"},[n._v("\n      用领取奖品手机号"),a("span",[n._v(n._s(n.loginId))]),n._v("登录即可领取\n    ")])]),n._v(" "),a("div",{staticClass:"prizedescribe"},[a("h1",{staticClass:"title"},[n._v("奖品描述")]),n._v(" "),a("ul",{staticClass:"main"},[n.prizeData!=={}?a("li",[a("div",{staticClass:"prizetitle"},[a("img",{staticClass:"icon",attrs:{src:n.prizeData.icon+"-style_100x100"}}),n._v(" "),a("div",{staticClass:"title"},[a("label",[n._v("恭喜你，抽中"+n._s(n.prizeData.name))]),n._v(" "),a("div",{staticClass:"prize"},[a("span",[n._v("￥"+n._s(n.prizeData.originalPrice))])])])]),n._v(" "),a("div",{staticClass:"productfeature"},[n._m(1),n._v(" "),a("div",{staticClass:"productbanner"},[a("img",{attrs:{src:n.prizeData.image+"-style_600x300"}})])])]):n._e()])])])},c=[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"banner"},[e("img",{attrs:{src:a("/lE+")}})])},function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"title"},[a("h1",[n._v("产品特点")]),n._v(" "),a("a",{staticClass:"wheel_product_button"},[n._v("立即领取")])])}],l={render:o,staticRenderFns:c},d=l,v=a("vSla"),p=e,_=v(r,d,!1,p,"data-v-ddc134fa",null);t.default=_.exports}});
//# sourceMappingURL=3.ad5d35ee7b23e4635cde.js.map