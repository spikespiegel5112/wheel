webpackJsonp([3],{"62KO":function(e,t,n){"use strict";function o(e){n("ZdaW")}function i(e){n("HsVS")}var s=n("JkZY"),a=(s.a,Boolean,String,String,Number,String,String,Boolean,Object,Boolean,{mixins:[s.a],name:"x-dialog",model:{prop:"show",event:"change"},props:{show:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},maskZIndex:[String,Number],dialogTransition:{type:String,default:"vux-dialog"},dialogClass:{type:String,default:"weui-dialog"},hideOnBlur:Boolean,dialogStyle:Object,scroll:{type:Boolean,default:!0,validator:function(e){return!0}}},computed:{maskStyle:function(){if(void 0!==this.maskZIndex)return{zIndex:this.maskZIndex}}},mounted:function(){"undefined"!=typeof window&&window.VUX_CONFIG&&"VIEW_BOX"===window.VUX_CONFIG.$layout&&(this.layout="VIEW_BOX")},watch:{show:function(e){this.$emit("update:show",e),this.$emit(e?"on-show":"on-hide"),e?this.addModalClassName():this.removeModalClassName()}},methods:{shouldPreventScroll:function(){var e=/iPad|iPhone|iPod/i.test(window.navigator.userAgent),t=this.$el.querySelector("input")||this.$el.querySelector("textarea");if(e&&t)return!0},hide:function(){this.hideOnBlur&&(this.$emit("update:show",!1),this.$emit("change",!1),this.$emit("on-click-mask"))}},data:function(){return{layout:""}}}),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vux-x-dialog",class:{"vux-x-dialog-absolute":"VIEW_BOX"===e.layout}},[n("transition",{attrs:{name:e.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-mask",style:e.maskStyle,on:{click:e.hide}})]),e._v(" "),n("transition",{attrs:{name:e.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],class:e.dialogClass,style:e.dialogStyle},[e._t("default")],2)])],1)},u=[],_={render:r,staticRenderFns:u},l=_,c=n("VU/8"),d=o,h=c(a,l,!1,d,null,null),f=h.exports,m=(Boolean,Boolean,String,String,Boolean,String,String,String,String,Number,String,String,String,Boolean,Object,Boolean,String,Boolean,Boolean,{name:"confirm",components:{XDialog:f},props:{value:{type:Boolean,default:!1},showInput:{type:Boolean,default:!1},placeholder:{type:String,default:""},theme:{type:String,default:"ios"},hideOnBlur:{type:Boolean,default:!1},title:String,confirmText:String,cancelText:String,maskTransition:{type:String,default:"vux-fade"},maskZIndex:[Number,String],dialogTransition:{type:String,default:"vux-dialog"},content:String,closeOnConfirm:{type:Boolean,default:!0},inputAttrs:Object,showContent:{type:Boolean,default:!0},confirmType:{type:String,default:"primary"},showCancelButton:{type:Boolean,default:!0},showConfirmButton:{type:Boolean,default:!0}},created:function(){this.showValue=this.show,this.value&&(this.showValue=this.value)},watch:{value:function(e){this.showValue=e},showValue:function(e){var t=this;this.$emit("input",e),e&&(this.showInput&&(this.msg="",setTimeout(function(){t.$refs.input&&t.setInputFocus()},300)),this.$emit("on-show"))}},data:function(){return{msg:"",showValue:!1}},methods:{getInputAttrs:function(){return this.inputAttrs||{type:"text"}},setInputValue:function(e){this.msg=e},setInputFocus:function(e){e&&e.preventDefault(),this.$refs.input.focus()},_onConfirm:function(){this.showValue&&(this.closeOnConfirm&&(this.showValue=!1),this.$emit("on-confirm",this.msg))},_onCancel:function(){this.showValue&&(this.showValue=!1,this.$emit("on-cancel"))}}}),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vux-confirm"},[n("x-dialog",{attrs:{"dialog-class":"android"===e.theme?"weui-dialog weui-skin_android":"weui-dialog","mask-transition":e.maskTransition,"dialog-transition":"android"===e.theme?"vux-fade":e.dialogTransition,"hide-on-blur":e.hideOnBlur,"mask-z-index":e.maskZIndex},on:{"on-hide":function(t){e.$emit("on-hide")}},model:{value:e.showValue,callback:function(t){e.showValue=t},expression:"showValue"}},[e.title?n("div",{staticClass:"weui-dialog__hd",class:{"with-no-content":!e.showContent}},[n("strong",{staticClass:"weui-dialog__title"},[e._v(e._s(e.title))])]):e._e(),e._v(" "),e.showContent?[e.showInput?n("div",{staticClass:"vux-prompt"},["checkbox"===e.getInputAttrs().type?n("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:e.placeholder,type:"checkbox"},domProps:{checked:Array.isArray(e.msg)?e._i(e.msg,null)>-1:e.msg},on:{touchend:e.setInputFocus,change:function(t){var n=e.msg,o=t.target,i=!!o.checked;if(Array.isArray(n)){var s=e._i(n,null);o.checked?s<0&&(e.msg=n.concat([null])):s>-1&&(e.msg=n.slice(0,s).concat(n.slice(s+1)))}else e.msg=i}}},"input",e.getInputAttrs(),!1)):"radio"===e.getInputAttrs().type?n("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:e.placeholder,type:"radio"},domProps:{checked:e._q(e.msg,null)},on:{touchend:e.setInputFocus,change:function(t){e.msg=null}}},"input",e.getInputAttrs(),!1)):n("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:e.placeholder,type:e.getInputAttrs().type},domProps:{value:e.msg},on:{touchend:e.setInputFocus,input:function(t){t.target.composing||(e.msg=t.target.value)}}},"input",e.getInputAttrs(),!1))]):n("div",{staticClass:"weui-dialog__bd"},[e._t("default",[n("div",{domProps:{innerHTML:e._s(e.content)}})])],2)]:e._e(),e._v(" "),n("div",{staticClass:"weui-dialog__ft"},[e.showCancelButton?n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_default",attrs:{href:"javascript:;"},on:{click:e._onCancel}},[e._v(e._s(e.cancelText||"取消"))]):e._e(),e._v(" "),e.showConfirmButton?n("a",{staticClass:"weui-dialog__btn",class:"weui-dialog__btn_"+e.confirmType,attrs:{href:"javascript:;"},on:{click:e._onConfirm}},[e._v(e._s(e.confirmText||"确定"))]):e._e()])],2)],1)},g=[],w={render:p,staticRenderFns:g},j=w,E=n("VU/8"),v=i,y=E(m,j,!1,v,null,null);t.a=y.exports},"62aS":function(e,t){},"7czI":function(e,t){},Bfwr:function(e,t,n){"use strict";function o(e){n("Y4Lg")}var i=(Boolean,String,String,String,{name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(e){this.$emit("update:show",e)}}}),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading",class:e.text?"":"vux-loading-no-text"},[n("div",{staticClass:"weui-mask_transparent"}),e._v(" "),n("div",{staticClass:"weui-toast",style:{position:e.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),e._v(" "),e.text?n("p",{staticClass:"weui-toast__content"},[e._v(e._s(e.text||"加载中")),e._t("default")],2):e._e()])])])},a=[],r={render:s,staticRenderFns:a},u=r,_=n("VU/8"),l=o,c=_(i,u,!1,l,null,null);t.a=c.exports},HsVS:function(e,t){},Lxn6:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__=__webpack_require__("fZjL"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__),__WEBPACK_IMPORTED_MODULE_1_jquery__=__webpack_require__("7t+N"),__WEBPACK_IMPORTED_MODULE_1_jquery___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__),util={};util.install=function(Vue){var _this2=this;Vue.prototype.$initJSSDK=function(){console.log("initJSSDK",location.href.split("#")[0]),_this2.$http.post(_this2.$baseUrl+"account-service/1.0.0/weChat/getSignature",{url:location.href.split("#")[0]},{headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(e){var t="";for(var n in e)t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n])+"&";return t}]}).then(function(e){console.log(e),wx.config({debug:!1,appId:"wx67c26ff8068af257",timestamp:e.data.timestamp,nonceStr:e.data.nonceStr,signature:e.data.signature,jsApiList:["closeWindow","chooseWXPay","onMenuShareAppMessage","onMenuShareTimeline","hideMenuItems"]}),wx.error(function(e){console.log(e),alert("error")}),wx.ready(function(e){console.log(e),wx.checkJsApi({jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"],success:function(e){}}),wx.onMenuShareTimeline({title:"免费畅享全年NBA直播的机会在这里",link:_this2.$domainUrl+"/?routeto=shareredirect&state="+_this2.stateCode,imgUrl:"http://resource.zan-qian.com/share/red_packet20180727191755.png-style_108x144",success:function(){}}),wx.onMenuShareAppMessage({title:"免费畅享全年NBA直播的机会在这里",desc:"千万不要错过哦",link:_this2.$domainUrl+"/?routeto=shareredirect&state="+_this2.stateCode,imgUrl:"http://resource.zan-qian.com/share/red_packet20180727191755.png-style_108x144",type:"",dataUrl:"",success:function(){}})})})},Vue.prototype.$checkEnvironment=function(){for(var environmentDictionary=[{name:"ios",method:"window.webkit.messageHandlers.token.postMessage('')",checker:"window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.token",getter:"window.webkit.messageHandlers.token",status:!1},{name:"android",method:"window.android.getToken()",checker:"window.android",getter:"window.android.getToken()",status:!1},{name:"wechat",checker:"console",getter:"",status:!1}],environment=void 0,that=_this2,i=0;i<environmentDictionary.length;i++){var item=environmentDictionary[i];if(""!==(environment="ios"===item.name&&void 0!==window.webkit?eval(item.checker)?item.name:"":void 0!==eval(item.checker)?item.name:""))break}return environment},Vue.prototype.$getDevice=function(e){var t=navigator.userAgent;navigator.appVersion;return{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1===t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Adr")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1===t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,qq:" qq"===t.match(/\sQQ/i)}},Vue.prototype.$remResizing=function(e){function t(e){function t(){if(void 0!==e)return n<o?e.portrait():e.landscape();e={portrait:function(){},landscape:function(){}}}var n=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).width(),o=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height();return t(),__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).resize(function(){t()}),n<o?"portrait":"landscape"}e=__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.extend({fontSize:16,baseline:320,threshold:0,basedonnarrow:!1,basedonwide:!1,dropoff:!1,aligncenter:!1,inward:!1},e);var n=__WEBPACK_IMPORTED_MODULE_1_jquery___default()("html"),o=__WEBPACK_IMPORTED_MODULE_1_jquery___default()("body"),i=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).width(),s=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height(),a=function(){e.basedonnarrow?t({portrait:function(){i=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).width(),s=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height()},landscape:function(){i=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height(),s=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).width()}}):(i=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).width(),s=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height());var a=0;0===e.baseline?a=1:i<=e.baseline?a=e.inward?i/e.threshold:i/e.baseline:i>e.baseline&&i<=e.threshold||0===e.threshold?e.threshold>=0&&(a=e.inward?i/e.threshold:i/e.baseline):i>e.threshold&&(a=i/e.threshold,e.aligncenter?o.css({margin:"0 auto",width:e.threshold}):o.css("margin",0)),n.css("font-size",e.fontSize*a),e.dropoff&&i>e.threshold&&n.css("font-size","")};e.baseline<=0&&(e.baseline=1),a(),__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).on("resize",function(){a()})},Vue.prototype.$generateUrlParams=function(e){var t="?";return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(e).forEach(function(n,o){o<__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(e).length-1?t+=n+"="+e[n]+"&":t+=n+"="+e[n]}),t},Vue.prototype.$generateRandomList=function(e){for(var t=[],n=[],o=e,i=0,s=0;s<e;s++)t.push(s);console.log(t);for(var a=0;a<o;a++){i=parseInt(Math.floor(Math.random()*e));for(var r=0;r<a;r++)n[r]===i&&(n.splice(r,1),o++);n.push(i)}return n},Vue.prototype.$autoHeight=function(e){e=__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.extend({reference:"",target:"",content:"body",offset:0,scale:1,minHeight:0,returnValue:!1},e);var t=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height(),n=0,o=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.reference).height(),i=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.content).height(),s=(document.body.scrollHeight,Number(e.offset));if(n=o<e.minHeight||t<e.minHeight?e.minHeight*e.scale:o>t?o*e.scale+s:i>t?i*e.scale+s:t*e.scale+s,e.returnValue)return n;__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.target).height(n)},Vue.prototype.$quickSort=function(e){if(e.length<=1)return e;for(var t=Math.floor(e.length/2),n=e.splice(t,1)[0],o=[],i=[],s=0;s<e.length;s++)e[s]<=n?o.push(e[s]):i.push(e[s]);return Vue.prototype.$quickSort(o).concat([n],Vue.prototype.$quickSort(i))},Vue.prototype.$align=function(e){function t(){if(s.is("img")){!function(){s.each(function(t){var o=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.target),i=o.attr("src");_=a.eq(t).width(),l=a.eq(t).height(),o.height()<=0?(d.src=i,n(o,d.width,d.height)):n(o)})}()}else if(""!=e.container)for(var t=0;t<s.length;t++){var o=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.target);if(l=a.eq(t).height(),_=a.eq(t).width(),console.log(l),o.is(":hidden"))return!0;n(o)}else _=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).width(),l=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height(),s.each(function(t){var o=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.target);if(o.is(":hidden"))return!0;n(o)})}function n(t,n,s){var a=void 0,d=void 0;switch(i({ie:function(){window.clearTimeout(c)},other:function(){clearTimeout(c)}}),null!=arguments[1]&&null!=arguments[2]?(r=n,u=s):(r=t.outerWidth(),u=t.outerHeight()),e.position){case"both":if(a=(l-u)/2,d=(_-r)/2,(e.positive&&a<0||d<0)&&(a=d=0),r<=_)0!==e.offsetX?t.css({margin:a+f-p+"px "+(_-r)/2+h-m+"px"}):t.css({margin:a+f-p+"px auto"});else{var g=(_-r)/2;t.css({margin:a+f-p+"px "+(g+e.offsetX)+"px"})}break;case"top":o(function(e,n){t.css({margin:"0 "+((_-e)/2+h-m)+"px"})});break;case"right":u<=l?(e.offsetY,t.css({margin:a+f-p+"px 0"})):(d=(_-r)/2,t.css({margin:(l-u)/2+f-p+"px 0"}));break;case"bottom":o(function(e,n){E.calculateIgnore(),p<=j&&(t.css({margin:j-n+f-p+"px auto 0"}),console.log(p),console.log(j))});break;case"left":o(function(e,n){t.css({margin:(j-n)/2+"px 0 0 0"})})}}function o(e){return r=s.outerWidth(),u=s.outerHeight(),e(r,u)}function i(e){e=__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.extend({ie:function(){},other:function(){}},e),navigator.appName.indexOf("Explorer")>-1?(console.log("IE"),e.ie()):e.other()}e=__WEBPACK_IMPORTED_MODULE_1_jquery___default.a.extend({position:"both",target:"",container:"",positive:!1,isImage:!1,offsetX:0,offsetY:0,ignoreY:0,ignoreX:0},e);var s=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.target),a=(s.attr("src"),__WEBPACK_IMPORTED_MODULE_1_jquery___default()(e.container)),r=0,u=0,_=0,l=0,c=void 0,d=new Image,h=Number(e.offsetX),f=Number(e.offsetY),m=Number(e.ignoreX),p=Number(e.ignoreY),g="",w="",j=(__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).width(),__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).height()),E={calculateIgnore:function(){if("string"==typeof e.ignoreY||"string"==typeof e.ignoreX){for(var t=e.ignoreX.split(","),n=e.ignoreY.split(","),o=0;o<t.length;o++)m+=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(t[o]).width();for(var i=0;i<n.length;i++)p+=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(n[i]).height();g=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(t.join(",")),w=__WEBPACK_IMPORTED_MODULE_1_jquery___default()(n.join(",")),console.log(p)}else m=e.ignoreX,p=e.ignoreY}};t(),__WEBPACK_IMPORTED_MODULE_1_jquery___default()(window).resize(function(){t()})}},__webpack_exports__.a=util},NHnr:function(e,t,n){"use strict";function o(e){n("62aS"),n("7czI")}Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),s=n("PJh5"),a=n.n(s),r=n("NXWw"),u=(n("n6Wb"),n("Y+qm")),_=(n("gsqX"),{name:"app"}),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("router-view")],1)},c=[],d={render:l,staticRenderFns:c},h=d,f=n("VU/8"),m=o,p=f(_,h,!1,m,null,null),g=p.exports,w=n("/ocq");i.a.use(w.a);var j=[{path:"/share/index.html",alias:"/",name:"index",component:function(){return n.e(0).then(n.bind(null,"fenB"))}},{path:"/testshare/index.html",alias:"/",name:"index",component:function(){return n.e(0).then(n.bind(null,"fenB"))}},{path:"/*",name:"404",component:function(){return n.e(1).then(n.bind(null,"thLP"))}}],E=new w.a({routes:j,mode:"history"}),v=E,y=n("//Fk"),O=n.n(y),b=n("mtWM"),P=n.n(b),M=n("NYxO"),x=n("lbHh"),k=n.n(x),D={state:{sidebar:{opened:!+k.a.get("sidebarStatus"),withoutAnimation:!1},layoutHeight:0,tableHeight:0,device:"desktop",actionType:[{name:"native",code:"native"},{name:"url",code:"url"}],bountyType:[{name:"趣豆 ",code:1},{name:"积分",code:0}],deviceTypeDictionary:[{name:"Android",code:"android"},{name:"iOS",code:"ios"}],noticeTypeDictionary:[{name:"所有类型",code:"all"},{name:"视频",code:1},{name:"视频",code:2},{name:"版本更新",code:3},{name:"菠菜公告",code:4},{name:"排行榜公告",code:5},{name:"未知类型",code:6}],deviceType:[{name:"iOS",code:"ios"},{name:"Android",code:"android"},{name:"全部",code:"all"}]},mutations:{UPDATE_LAYOUT_HEIGHT:function(e,t){e.layoutHeight=t,e.tableHeight=t-115},TOGGLE_SIDEBAR:function(e){e.sidebar.opened?k.a.set("sidebarStatus",1):k.a.set("sidebarStatus",0),e.sidebar.opened=!e.sidebar.opened,e.sidebar.withoutAnimation=!1},CLOSE_SIDEBAR:function(e,t){k.a.set("sidebarStatus",1),e.sidebar.opened=!1,e.sidebar.withoutAnimation=t},TOGGLE_DEVICE:function(e,t){e.device=t}},actions:{ToggleSideBar:function(e){(0,e.commit)("TOGGLE_SIDEBAR")},CloseSideBar:function(e,t){(0,e.commit)("CLOSE_SIDEBAR",t.withoutAnimation)},ToggleDevice:function(e,t){(0,e.commit)("TOGGLE_DEVICE",t)},updateLayoutHeight:function(e,t){(0,e.commit)("UPDATE_LAYOUT_HEIGHT",t)}}},T=D,C={state:{nick_name:"",image:"",avatar:"",roles:[]},mutations:{SET_TOKEN:function(e,t){e.token=t},SET_LOGIN_ID:function(e,t){e.login_id=t},SET_NICK_NAME:function(e,t){e.nick_name=t},SET_IMAGE:function(e,t){e.image=t},SET_AVATAR:function(e,t){e.avatar=t},SET_ROLES:function(e,t){e.roles=t}},actions:{}},I=C,B={sidebar:function(e){return e.app.sidebar},device:function(e){return e.app.device},token:function(e){return e.user.token},login_id:function(e){return e.user.login_id},nick_name:function(e){return e.user.nick_name},image:function(e){return e.user.image},avatar:function(e){return e.user.avatar},roles:function(e){return e.user.roles}},S=B;i.a.use(M.a);var A=new M.a.Store({modules:{app:T,user:I},getters:S}),q=A,U=P.a.create({baseURL:"http://gateway.zan-qian.com/",timeout:5e3,headers:{}});U.interceptors.request.use(function(e){return q.getters.token&&(console.log(q.getters.token),e.headers.Authorization="Bearer "+q.getters.token),e},function(e){console.log(e),O.a.reject(e)}),U.interceptors.response.use(function(e){return e.data},function(e){return console.log(e),e.response.status,console.log("err"+e),O.a.reject(e)});var L=U,R=n("Lxn6");i.a.use(u.a),i.a.use(r.a),i.a.use(R.a),i.a.config.productionTip=!1,i.a.prototype.$moment=a.a,i.a.prototype.$http=L,i.a.prototype.$baseUrl="https://gateway.fnvalley.com/",i.a.prototype.$domainUrl="http://activity.fnvalley.com/share/index.html",i.a.prototype.$prodEnv=!0,new i.a({el:"#app",router:v,template:"<App/>",components:{App:g}})},Y4Lg:function(e,t){},ZdaW:function(e,t){},uslO:function(e,t,n){function o(e){return n(i(e))}function i(e){var t=s[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};o.keys=function(){return Object.keys(s)},o.resolve=i,e.exports=o,o.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.61d63af65e75a157cd7b.js.map