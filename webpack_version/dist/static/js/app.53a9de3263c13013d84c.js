webpackJsonp([1],{MC0k:function(e,t){},NHnr:function(e,t,i){"use strict";function a(e){i("Pt1A"),i("MC0k")}function n(e){i("iWfE")}function r(e){i("Pkb8")}Object.defineProperty(t,"__esModule",{value:!0});var o=i("MVMM"),s=(i("iDdd"),{name:"app"}),c=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("router-view")],1)},l=[],d={render:c,staticRenderFns:l},u=d,v=i("vSla"),h=a,f=v(s,u,!1,h,null,null),p=(f.exports,i("zO6J")),m={name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},g=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"hello"},[i("h1",[e._v(e._s(e.msg))]),e._v(" "),i("h2",[e._v("Essential Links")]),e._v(" "),e._m(0),e._v(" "),i("h2",[e._v("Ecosystem")]),e._v(" "),e._m(1)])},_=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[i("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[e._v("Core Docs")])]),e._v(" "),i("li",[i("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[e._v("Forum")])]),e._v(" "),i("li",[i("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[e._v("Community Chat")])]),e._v(" "),i("li",[i("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[e._v("Twitter")])]),e._v(" "),i("br"),e._v(" "),i("li",[i("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("Docs for This Template")])])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[i("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[e._v("vue-router")])]),e._v(" "),i("li",[i("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[e._v("vuex")])]),e._v(" "),i("li",[i("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[e._v("vue-loader")])]),e._v(" "),i("li",[i("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[e._v("awesome-vue")])])])}],w={render:g,staticRenderFns:_},y=w,b=i("vSla"),C=n,x=b(m,y,!1,C,"data-v-d14401cc",null),$=(x.exports,i("ZLEe")),k=i.n($),D=i("aA9S"),z=i.n(D),P=i("oefm"),T=(i("e2cI"),{name:"Promotion",data:function(){return{baseUrl:"http://gateway.zan-qian.com/",sendBindWxMsgRequest:"message-service/1.0.0/sms/sendBindWxMsg",verificationCodeRequest:"message-service/1.0.0/sms/verificationCode",acceptShareUserActivityRewardRequest:"promotion-service/1.0.0/share_activity/acceptShareUserActivityReward",findUserActivityRewardTraceRequest:"promotion-service/1.0.0/share_activity/findUserActivityRewardTrace",getAdvertiseRequest:"advertising-service/1.0.0",swiperInstance:{},loginId:null,verifyCode:"",smsTemplate:3,advertiseList:[],activityId:"",prizeStatus:"",receiveRewardFlag:!1,rewardTraceListData:[],acceptPrizeFlag:!1,prizeData:{code:"",data:{description:"",loginId:"",rewardStr:"",rewardType:"",rewardValue:""},message:""},prizeTypeDictionary:[{name:"趣豆",code:"coin"},{name:"积分",code:"point"},{name:"百视通",code:"bes_tv"}],activityStatusDictionary:[{code:1e4,text:"恭喜你,抽中了！",type:"withPicture"},{code:10001,text:"已参加活动",type:"withoutPicture"},{code:10002,text:"今日领取次数已达上限",type:"withoutPicture"},{code:10003,text:"已领取奖励",type:"withoutPicture"},{code:10004,text:"哎呀，晚了一步",type:"withoutPicture"},{code:10005,text:"领取奖励失败",type:"withoutPicture"},{code:10006,text:"活动不在有效期内",type:"withoutPicture"},{code:10007,text:"活动不存在",type:"withoutPicture"}]}},computed:{userActivityId:function(){return this.$route.query.id||"2"},identityCode:function(){return this.$route.query.id||"2"}},created:function(){},watch:{verifyCode:function(e){e.length>=5&&(this.receiveRewardFlag=!0),console.log(this.receiveRewardFlag)}},mounted:function(){this.$autoHeight({target:".common_main_container"}),this.$remResizing({fontSize:20}),this.getAdvertise(),this.getRewardTraceList()},methods:{login:function(){console.log(this.$refs.loginFormData),console.log(this.loginFormData),this.$refs.loginFormData.validate(function(e){console.log(e)})},sendSmsCode:function(){this.$http.get(this.$baseUrl+this.sendBindWxMsgRequest+"/"+this.loginId).then(function(e){console.log(e),!0===e.alreadySent&&alert("短信已发出，请查收"),!1===e.alreadySent&&alert(e.message)}).catch(function(e){alert(error)})},checkVerifyCode:function(e){console.log(this.verifyCode.length)},getRewardTraceList:function(){var e=this;this.$http.get(this.$baseUrl+this.findUserActivityRewardTraceRequest+"/"+this.userActivityId,{headers:{}}).then(function(t){console.log(t),e.rewardTraceListData=t.data,e.rewardTraceListData.forEach(function(t,i){e.$set(e.rewardTraceListData,i,z()(e.rewardTraceListData[i],{availible:!0}))})}).catch(function(e){console.log(e)})},getAdvertise:function(){var e=this,t=this.$getDevice(),i=void 0;t.ios?i="ios":t.android?i="android":k()(t).forEach(function(e,a){!0===t[e]&&(i=e)}),"ios"!==i&&"android"!==i&&(i="ios"),this.$http.get(this.$baseUrl+this.getAdvertiseRequest+"/"+i+"/qu_welfare",{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){console.log(t),e.advertiseList=t,e.$nextTick(function(){e.swiperInstance=new P.a(".swiper-container",{autoplay:!0,loop:!0})})}).catch(function(e){console.log(e)})},acceptPrize:function(){var e=this;this.receiveRewardFlag?this.$http.post(this.$baseUrl+this.acceptShareUserActivityRewardRequest+"/"+this.userActivityId+"/"+this.loginId,{},{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){console.log(t),e.prizeData=t,e.acceptPrizeFlag=!0}).catch(function(e){console.log(e)}):alert("验证码格式不正确")},imageError:function(e){console.log(this.rewardTraceListData),console.log(e),this.$set(this.rewardTraceListData,e,z()(this.rewardTraceListData[e],{availible:!1}))}}}),R=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"common_main_container",attrs:{id:"app"}},[e._m(0),e._v(" "),i("div",{staticClass:"share_main_wrapper"},[i("div",{staticClass:"carousel swiper-container"},[i("ul",{staticClass:"swiper-wrapper"},e._l(e.advertiseList,function(e){return i("li",{staticClass:"swiper-slide"},[i("img",{attrs:{src:e.image+"-style_640x380"}})])})),e._v(" "),i("div",{staticClass:"swiper-pagination"})]),e._v(" "),!1===e.acceptPrizeFlag?i("div",{staticClass:"form"},[e._m(1),e._v(" "),i("div",{staticClass:"main"},[i("ul",[i("li",[i("div",{staticClass:"common_form_item"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.loginId,expression:"loginId"}],staticClass:"common_input_item",attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:e.loginId},on:{input:function(t){t.target.composing||(e.loginId=t.target.value)}}}),e._v(" "),i("button",{staticClass:"common_button_item",attrs:{type:"text"},on:{click:e.sendSmsCode}},[e._v("获取验证码")])])]),e._v(" "),i("li",[i("div",{staticClass:"common_form_item"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.verifyCode,expression:"verifyCode"}],staticClass:"common_input_item",attrs:{type:"text",placeholder:"请输入验证码"},domProps:{value:e.verifyCode},on:{input:[function(t){t.target.composing||(e.verifyCode=t.target.value)},e.checkVerifyCode]}})])]),e._v(" "),i("li",[i("div",{staticClass:"common_form_item"},[i("button",{staticClass:"common_button_item",class:{active:!0===e.receiveRewardFlag},on:{click:e.acceptPrize}},[e._v("领奖\n              ")])])])])])]):e._e(),e._v(" "),""!==e.prizeData.code?i("div",{staticClass:"prize_wrapper"},[i("h1",[e._v(e._s(e.prizeData.description))]),e._v(" "),i("div",{staticClass:"main"},[1e4===e.prizeData.code?i("div",{staticClass:"withpicture"},[e._m(2),e._v(" "),i("div",{staticClass:"detail"},[i("label",[e._v(e._s(e.prizeData.rewardType))]),e._v(" "),i("span",[e._v("奖品已放入您的账户")]),e._v(" "),i("button",[e._v("打开趣谷APP")])])]):i("div",{staticClass:"withoutpicture"},[i("div",{staticClass:"detail"},[i("label",[e._v(e._s(e.activityStatusDictionary.filter(function(t){return t.code===e.prizeData.code})[0].text))]),e._v(" "),i("span",[e._v("告诉你个小秘密，可以自己发起活动哦~")]),e._v(" "),i("button",[e._v("我要发起")])])])])]):e._e(),e._v(" "),i("div",{staticClass:"ranklist"},[e._m(3),e._v(" "),i("ul",e._l(e.rewardTraceListData,function(t,a){return i("li",[i("div",{staticClass:"avatar"},[null!==t.rewardUserImage?i("div",[i("img",{attrs:{src:t.rewardUserImage+"-style_100x100"}})]):e._e(),e._v(" "),i("span",{staticClass:"query"},[e._v("?\n              ")])]),e._v(" "),i("div",{staticClass:"detail"},[i("div",{staticClass:"name"},[i("label",[e._v(e._s(t.rewardUserNickName))]),e._v(" "),i("span",[e._v(e._s(e.$moment(t.createDate).format("MM.DD")))]),e._v(" "),i("span",[e._v(e._s(e.$moment(t.createDate).format("hh:mm")))])]),e._v(" "),i("div",{staticClass:"comment"},[e._v("\n              "+e._s(t.description)+"\n            ")])]),e._v(" "),i("div",{staticClass:"prizename"},[e._v("\n            "+e._s(e.prizeTypeDictionary.filter(function(e){return t.rewardType===e.code})[0].name)+"\n          ")])])})),e._v(" "),i("p",{staticClass:"hint"},[e._v("\n        只差一点点，大红包就是你的啦~\n      ")])]),e._v(" "),e._m(4)])])},q=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"common_header_wrapper"},[i("div",{staticClass:"left_wrapper"},[i("a",{staticClass:"previous iconfont icon-backward2"})]),e._v(" "),i("div",{staticClass:"middle_wrapper"},[e._v("\n      趣福利\n    ")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"title"},[i("h1",[e._v("好礼即将到账")]),e._v(" "),i("h2",[e._v("验证手机号码领取")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"prizeimage"},[i("img")])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"common_blocktitle_item"},[i("span",[i("i")]),e._v(" "),i("p",[e._v("手气榜")]),e._v(" "),i("span",[i("i")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"rules"},[i("div",{staticClass:"common_blocktitle_item"},[i("span",[i("i")]),e._v(" "),i("p",[e._v("活动细则")]),e._v(" "),i("span",[i("i")])]),e._v(" "),i("ul",[i("li",[e._v("1.每个人每天最多抢五个红包")]),e._v(" "),i("li",[e._v("1.每个人每天最多抢五个红包")]),e._v(" "),i("li",[e._v("1.每个人每天最多抢五个红包")])])])}],I={render:R,staticRenderFns:q},A=I,S=i("vSla"),E=r,M=S(T,A,!1,E,"data-v-b83ef202",null),L=M.exports;o.a.use(p.a);var U=[{path:"/",redirect:"/share",name:"index",component:L},{path:"/share",name:"share",component:L}],F=(new p.a({routes:U,mode:"history"}),i("rVsN")),j=i.n(F),O=i("aozt"),H=i.n(O),N=i("wtEF"),W=i.n(N),X=H.a.create({baseURL:"http://gateway.zan-qian.com/",timeout:5e3,headers:{}});X.interceptors.request.use(function(e){return W.a.getters.token&&(console.log(W.a.getters.token),e.headers.Authorization="Bearer "+W.a.getters.token),e},function(e){console.log(e),j.a.reject(e)}),X.interceptors.response.use(function(e){return e.data},function(e){return e.response.status,console.log("err"+e),j.a.reject(e)});var V=i("L7Pj"),Y=i.n(V),B={};B.install=function(e){e.prototype.$getDevice=function(e){var t=navigator.userAgent;navigator.appVersion;return{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1===t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Adr")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1===t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,qq:" qq"===t.match(/\sQQ/i)}},e.prototype.$remResizing=function(e){function t(e){function t(){if(void 0!==e)return i<a?e.portrait():e.landscape();e={portrait:function(){},landscape:function(){}}}var i=Y()(window).width(),a=Y()(window).height();return t(),Y()(window).resize(function(){t()}),i<a?"portrait":"landscape"}e=Y.a.extend({fontSize:16,baseline:320,threshold:0,basedonnarrow:!1,basedonwide:!1,dropoff:!1,aligncenter:!1,inward:!1},e);var i=Y()("html"),a=Y()("body"),n=Y()(window).width(),r=Y()(window).height(),o=function(){e.basedonnarrow?t({portrait:function(){n=Y()(window).width(),r=Y()(window).height()},landscape:function(){n=Y()(window).height(),r=Y()(window).width()}}):(n=Y()(window).width(),r=Y()(window).height());var o=0;0===e.baseline?o=1:n<=e.baseline?o=e.inward?n/e.threshold:n/e.baseline:n>e.baseline&&n<=e.threshold||0===e.threshold?e.threshold>=0&&(o=e.inward?n/e.threshold:n/e.baseline):n>e.threshold&&(o=n/e.threshold,e.aligncenter?a.css({margin:"0 auto",width:e.threshold}):a.css("margin",0)),i.css("font-size",e.fontSize*o),e.dropoff&&n>e.threshold&&i.css("font-size","")};e.baseline<=0&&(e.baseline=1),o(),Y()(window).on("resize",function(){o()})},e.prototype.$generateUrlParams=function(e){var t="?";return k()(e).forEach(function(i,a){a<k()(e).length-1?t+=i+"="+e[i]+"&":t+=i+"="+e[i]}),t},e.prototype.$generateRandomList=function(e){for(var t=[],i=[],a=e,n=0,r=0;r<e;r++)t.push(r);console.log(t);for(var o=0;o<a;o++){n=parseInt(Math.floor(Math.random()*e));for(var s=0;s<o;s++)i[s]===n&&(i.splice(s,1),a++);i.push(n)}return i},e.prototype.$setMenuData=function(e){var t=z()({showMenu:!0},e);void 0===localStorage.getItem("menuData")&&localStorage.setItem("menuData",t)},e.prototype.$autoHeight=function(e){e=Y.a.extend({reference:"",target:"",content:"body",offset:0,scale:1,minHeight:0,returnValue:!1},e);var t=Y()(window).height(),i=0,a=Y()(e.reference).height(),n=Y()(e.content).height(),r=(document.body.scrollHeight,Number(e.offset));if(i=a<e.minHeight||t<e.minHeight?e.minHeight*e.scale:a>t?a*e.scale+r:n>t?n*e.scale+r:t*e.scale+r,e.returnValue)return i;Y()(e.target).height(i)},e.prototype.$quickSort=function(t){if(t.length<=1)return t;for(var i=Math.floor(t.length/2),a=t.splice(i,1)[0],n=[],r=[],o=0;o<t.length;o++)t[o]<=a?n.push(t[o]):r.push(t[o]);return e.prototype.$quickSort(n).concat([a],e.prototype.$quickSort(r))},e.prototype.$align=function(e){function t(){if(r.is("img")){!function(){r.each(function(t){var a=Y()(e.target),n=a.attr("src");l=o.eq(t).width(),d=o.eq(t).height(),a.height()<=0?(v.src=n,i(a,v.width,v.height)):i(a)})}()}else if(""!=e.container)for(var t=0;t<r.length;t++){var a=Y()(e.target);if(d=o.eq(t).height(),l=o.eq(t).width(),console.log(d),a.is(":hidden"))return!0;i(a)}else l=Y()(window).width(),d=Y()(window).height(),r.each(function(t){var a=Y()(e.target);if(a.is(":hidden"))return!0;i(a)})}function i(t,i,r){var o=void 0,v=void 0;switch(n({ie:function(){window.clearTimeout(u)},other:function(){clearTimeout(u)}}),null!=arguments[1]&&null!=arguments[2]?(s=i,c=r):(s=t.outerWidth(),c=t.outerHeight()),e.position){case"both":if(o=(d-c)/2,v=(l-s)/2,(e.positive&&o<0||v<0)&&(o=v=0),s<=l)0!==e.offsetX?t.css({margin:o+f-m+"px "+(l-s)/2+h-p+"px"}):t.css({margin:o+f-m+"px auto"});else{var g=(l-s)/2;t.css({margin:o+f-m+"px "+(g+e.offsetX)+"px"})}break;case"top":a(function(e,i){t.css({margin:"0 "+((l-e)/2+h-p)+"px"})});break;case"right":c<=d?(e.offsetY,t.css({margin:o+f-m+"px 0"})):(v=(l-s)/2,t.css({margin:(d-c)/2+f-m+"px 0"}));break;case"bottom":a(function(e,i){y.calculateIgnore(),m<=w&&(t.css({margin:w-i+f-m+"px auto 0"}),console.log(m),console.log(w))});break;case"left":a(function(e,i){t.css({margin:(w-i)/2+"px 0 0 0"})})}}function a(e){return s=r.outerWidth(),c=r.outerHeight(),e(s,c)}function n(e){e=Y.a.extend({ie:function(){},other:function(){}},e),navigator.appName.indexOf("Explorer")>-1?(console.log("IE"),e.ie()):e.other()}e=Y.a.extend({position:"both",target:"",container:"",positive:!1,isImage:!1,offsetX:0,offsetY:0,ignoreY:0,ignoreX:0},e);var r=Y()(e.target),o=(r.attr("src"),Y()(e.container)),s=0,c=0,l=0,d=0,u=void 0,v=new Image,h=Number(e.offsetX),f=Number(e.offsetY),p=Number(e.ignoreX),m=Number(e.ignoreY),g="",_="",w=(Y()(window).width(),Y()(window).height()),y={calculateIgnore:function(){if("string"==typeof e.ignoreY||"string"==typeof e.ignoreX){for(var t=e.ignoreX.split(","),i=e.ignoreY.split(","),a=0;a<t.length;a++)p+=Y()(t[a]).width();for(var n=0;n<i.length;n++)m+=Y()(i[n]).height();g=Y()(t.join(",")),_=Y()(i.join(",")),console.log(m)}else p=e.ignoreX,m=e.ignoreY}};t(),Y()(window).resize(function(){t()})}};throw new Error('Cannot find module "moment"')},Pkb8:function(e,t){},Pt1A:function(e,t){},e2cI:function(e,t){},iWfE:function(e,t){},wtEF:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.53a9de3263c13013d84c.js.map