webpackJsonp([3],{"1D9c":function(e,t){},"62KO":function(e,t,n){"use strict";function i(e){n("xJad")}function o(e){n("1D9c")}var a=n("JkZY"),_=(a.a,Boolean,String,String,Number,String,String,Boolean,Object,Boolean,{mixins:[a.a],name:"x-dialog",model:{prop:"show",event:"change"},props:{show:{type:Boolean,default:!1},maskTransition:{type:String,default:"vux-mask"},maskZIndex:[String,Number],dialogTransition:{type:String,default:"vux-dialog"},dialogClass:{type:String,default:"weui-dialog"},hideOnBlur:Boolean,dialogStyle:Object,scroll:{type:Boolean,default:!0,validator:function(e){return!0}}},computed:{maskStyle:function(){if(void 0!==this.maskZIndex)return{zIndex:this.maskZIndex}}},mounted:function(){"undefined"!=typeof window&&window.VUX_CONFIG&&"VIEW_BOX"===window.VUX_CONFIG.$layout&&(this.layout="VIEW_BOX")},watch:{show:function(e){this.$emit("update:show",e),this.$emit(e?"on-show":"on-hide"),e?this.addModalClassName():this.removeModalClassName()}},methods:{shouldPreventScroll:function(){var e=/iPad|iPhone|iPod/i.test(window.navigator.userAgent),t=this.$el.querySelector("input")||this.$el.querySelector("textarea");if(e&&t)return!0},hide:function(){this.hideOnBlur&&(this.$emit("update:show",!1),this.$emit("change",!1),this.$emit("on-click-mask"))}},data:function(){return{layout:""}}}),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vux-x-dialog",class:{"vux-x-dialog-absolute":"VIEW_BOX"===e.layout}},[n("transition",{attrs:{name:e.maskTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-mask",style:e.maskStyle,on:{click:e.hide}})]),e._v(" "),n("transition",{attrs:{name:e.dialogTransition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],class:e.dialogClass,style:e.dialogStyle},[e._t("default")],2)])],1)},s=[],u={render:r,staticRenderFns:s},l=u,c=n("VU/8"),d=i,h=c(_,l,!1,d,null,null),p=h.exports,f=(Boolean,Boolean,String,String,Boolean,String,String,String,String,Number,String,String,String,Boolean,Object,Boolean,String,Boolean,Boolean,{name:"confirm",components:{XDialog:p},props:{value:{type:Boolean,default:!1},showInput:{type:Boolean,default:!1},placeholder:{type:String,default:""},theme:{type:String,default:"ios"},hideOnBlur:{type:Boolean,default:!1},title:String,confirmText:String,cancelText:String,maskTransition:{type:String,default:"vux-fade"},maskZIndex:[Number,String],dialogTransition:{type:String,default:"vux-dialog"},content:String,closeOnConfirm:{type:Boolean,default:!0},inputAttrs:Object,showContent:{type:Boolean,default:!0},confirmType:{type:String,default:"primary"},showCancelButton:{type:Boolean,default:!0},showConfirmButton:{type:Boolean,default:!0}},created:function(){this.showValue=this.show,this.value&&(this.showValue=this.value)},watch:{value:function(e){this.showValue=e},showValue:function(e){var t=this;this.$emit("input",e),e&&(this.showInput&&(this.msg="",setTimeout(function(){t.$refs.input&&t.setInputFocus()},300)),this.$emit("on-show"))}},data:function(){return{msg:"",showValue:!1}},methods:{getInputAttrs:function(){return this.inputAttrs||{type:"text"}},setInputValue:function(e){this.msg=e},setInputFocus:function(e){e&&e.preventDefault(),this.$refs.input.focus()},_onConfirm:function(){this.showValue&&(this.closeOnConfirm&&(this.showValue=!1),this.$emit("on-confirm",this.msg))},_onCancel:function(){this.showValue&&(this.showValue=!1,this.$emit("on-cancel"))}}}),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vux-confirm"},[n("x-dialog",{attrs:{"dialog-class":"android"===e.theme?"weui-dialog weui-skin_android":"weui-dialog","mask-transition":e.maskTransition,"dialog-transition":"android"===e.theme?"vux-fade":e.dialogTransition,"hide-on-blur":e.hideOnBlur,"mask-z-index":e.maskZIndex},on:{"on-hide":function(t){e.$emit("on-hide")}},model:{value:e.showValue,callback:function(t){e.showValue=t},expression:"showValue"}},[e.title?n("div",{staticClass:"weui-dialog__hd",class:{"with-no-content":!e.showContent}},[n("strong",{staticClass:"weui-dialog__title"},[e._v(e._s(e.title))])]):e._e(),e._v(" "),e.showContent?[e.showInput?n("div",{staticClass:"vux-prompt"},["checkbox"===e.getInputAttrs().type?n("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:e.placeholder,type:"checkbox"},domProps:{checked:Array.isArray(e.msg)?e._i(e.msg,null)>-1:e.msg},on:{touchend:e.setInputFocus,change:function(t){var n=e.msg,i=t.target,o=!!i.checked;if(Array.isArray(n)){var a=e._i(n,null);i.checked?a<0&&(e.msg=n.concat([null])):a>-1&&(e.msg=n.slice(0,a).concat(n.slice(a+1)))}else e.msg=o}}},"input",e.getInputAttrs(),!1)):"radio"===e.getInputAttrs().type?n("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:e.placeholder,type:"radio"},domProps:{checked:e._q(e.msg,null)},on:{touchend:e.setInputFocus,change:function(t){e.msg=null}}},"input",e.getInputAttrs(),!1)):n("input",e._b({directives:[{name:"model",rawName:"v-model",value:e.msg,expression:"msg"}],ref:"input",staticClass:"vux-prompt-msgbox",attrs:{placeholder:e.placeholder,type:e.getInputAttrs().type},domProps:{value:e.msg},on:{touchend:e.setInputFocus,input:function(t){t.target.composing||(e.msg=t.target.value)}}},"input",e.getInputAttrs(),!1))]):n("div",{staticClass:"weui-dialog__bd"},[e._t("default",[n("div",{domProps:{innerHTML:e._s(e.content)}})])],2)]:e._e(),e._v(" "),n("div",{staticClass:"weui-dialog__ft"},[e.showCancelButton?n("a",{staticClass:"weui-dialog__btn weui-dialog__btn_default",attrs:{href:"javascript:;"},on:{click:e._onCancel}},[e._v(e._s(e.cancelText||"取消"))]):e._e(),e._v(" "),e.showConfirmButton?n("a",{staticClass:"weui-dialog__btn",class:"weui-dialog__btn_"+e.confirmType,attrs:{href:"javascript:;"},on:{click:e._onConfirm}},[e._v(e._s(e.confirmText||"确定"))]):e._e()])],2)],1)},g=[],w={render:m,staticRenderFns:g},E=w,v=n("VU/8"),O=o,y=v(f,E,!1,O,null,null);t.a=y.exports},"8eiZ":function(e,t,n){"use strict";function i(e){n("ZMno")}var o=(Boolean,Number,{name:"CommonLoading",props:{loading:{type:Boolean,default:!1,required:!0},zIndex:{type:Number,default:1,required:!1}}}),a=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{directives:[{name:"show",rawName:"v-show",value:e.loading,expression:"loading"}],staticClass:"common_loading_wrapper",style:{zIndex:e.zIndex}},[e._m(0)])},_=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-load"},[n("div",{staticClass:"m-load2"},[n("div",{staticClass:"line"},[n("div"),e._v(" "),n("div"),e._v(" "),n("div"),e._v(" "),n("div"),e._v(" "),n("div"),e._v(" "),n("div")]),e._v(" "),n("div",{staticClass:"circlebg"})])])}],r={render:a,staticRenderFns:_},s=r,u=n("VU/8"),l=i,c=u(o,s,!1,l,"data-v-0c54cd67",null);t.a=c.exports},Bfwr:function(e,t,n){"use strict";function i(e){n("a3zG")}var o=(Boolean,String,String,String,{name:"loading",model:{prop:"show",event:"change"},props:{show:Boolean,text:String,position:String,transition:{type:String,default:"vux-mask"}},watch:{show:function(e){this.$emit("update:show",e)}}}),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:e.transition}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"weui-loading_toast vux-loading",class:e.text?"":"vux-loading-no-text"},[n("div",{staticClass:"weui-mask_transparent"}),e._v(" "),n("div",{staticClass:"weui-toast",style:{position:e.position}},[n("i",{staticClass:"weui-loading weui-icon_toast"}),e._v(" "),e.text?n("p",{staticClass:"weui-toast__content"},[e._v(e._s(e.text||"加载中")),e._t("default")],2):e._e()])])])},_=[],r={render:a,staticRenderFns:_},s=r,u=n("VU/8"),l=i,c=u(o,s,!1,l,null,null);t.a=c.exports},Lxn6:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__=__webpack_require__("fZjL"),__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__=__webpack_require__("woOf"),__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__),__WEBPACK_IMPORTED_MODULE_2_jquery__=__webpack_require__("7t+N"),__WEBPACK_IMPORTED_MODULE_2_jquery___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__),__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk__=__webpack_require__("fxnj"),__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk__),util={};util.install=function(Vue){var _this2=this;Vue.prototype.$checkEnvironment=function(){for(var environmentDictionary=[{name:"ios",method:"window.webkit.messageHandlers.token.postMessage('')",checker:"window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.token",getter:"window.webkit.messageHandlers.token",status:!1},{name:"android",method:"window.android.getToken()",checker:"window.android",getter:"window.android.getToken()",status:!1},{name:"wechat",checker:"console",getter:"",status:!1}],environment=void 0,that=_this2,i=0;i<environmentDictionary.length;i++){var item=environmentDictionary[i];if(""!==(environment="ios"===item.name&&void 0!==window.webkit?eval(item.checker)?item.name:"":void 0!==eval(item.checker)?item.name:""))break}return environment},Vue.prototype.$initJSSDK=function(e){e=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({state:""},e),console.log("777",location.href.split("#")[0]);_this2.channel,_this2.activityId;_this2.$http.post(_this2.$baseUrl+_this2.getSignatureRequest,{url:location.href.split("#")[0]},{headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:[function(e){var t="";for(var n in e)t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n])+"&";return t}]}).then(function(t){console.log(t),__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk___default.a.config({debug:!1,appId:"wx67c26ff8068af257",timestamp:t.data.timestamp,nonceStr:t.data.nonceStr,signature:t.data.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"]}),__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk___default.a.error(function(e){console.log(e),alert("wechat error")}),__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk___default.a.ready(function(t){console.log(t),__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk___default.a.checkJsApi({jsApiList:["onMenuShareAppMessage","onMenuShareTimeline"],success:function(e){}});var n=e.state;__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk___default.a.onMenuShareTimeline({title:"边玩边赚，乐享生活",link:_this2.$domainUrl+"?routeto=shareredirect&state="+n,imgUrl:"http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg",success:function(){}}),__WEBPACK_IMPORTED_MODULE_3_weixin_js_sdk___default.a.onMenuShareAppMessage({title:"边玩边赚，乐享生活",desc:"边玩边赚，乐享生活",link:_this2.$domainUrl+"?routeto=shareredirect&state="+n,imgUrl:"http://funyvalley.oss-cn-shanghai.aliyuncs.com/share/logo_wechatshare_square_00000.jpg",type:"",dataUrl:"",success:function(){}})})})},Vue.prototype.$replaceProtocol=function(e){return e.replace("http://","https://").replace("fnvalley.com","fnvalley.com")},Vue.prototype.$generateUUID=function(e){e=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({len:32,radix:16},e);var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),n=[],i=void 0,o=e.len,a=e.radix||t.length;if(o)for(i=0;i<o;i++)n[i]=t[0|Math.random()*a];else{var _=void 0;for(n[8]=n[13]=n[18]=n[23]="-",n[14]="4",i=0;i<36;i++)n[i]||(_=0|16*Math.random(),n[i]=t[19===i?3&_|8:_])}return n.join("")},Vue.prototype.$getDevice=function(e){var t=navigator.userAgent;navigator.appVersion;return{trident:t.indexOf("Trident")>-1,presto:t.indexOf("Presto")>-1,webKit:t.indexOf("AppleWebKit")>-1,gecko:t.indexOf("Gecko")>-1&&-1===t.indexOf("KHTML"),mobile:!!t.match(/AppleWebKit.*Mobile.*/),ios:!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:t.indexOf("Android")>-1||t.indexOf("Adr")>-1,iPhone:t.indexOf("iPhone")>-1,iPad:t.indexOf("iPad")>-1,webApp:-1===t.indexOf("Safari"),weixin:t.indexOf("MicroMessenger")>-1,qq:" qq"===t.match(/\sQQ/i)}},Vue.prototype.$remResizing=function(e){function t(e){function t(){if(void 0!==e)return n<i?e.portrait():e.landscape();e={portrait:function(){},landscape:function(){}}}var n=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).width(),i=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height();return t(),__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).resize(function(){t()}),n<i?"portrait":"landscape"}e=__WEBPACK_IMPORTED_MODULE_2_jquery___default.a.extend({fontSize:16,baseline:320,threshold:0,basedonnarrow:!1,basedonwide:!1,dropoff:!1,aligncenter:!1,inward:!1},e);var n=__WEBPACK_IMPORTED_MODULE_2_jquery___default()("html"),i=__WEBPACK_IMPORTED_MODULE_2_jquery___default()("body"),o=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).width(),a=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height(),_=function(){e.basedonnarrow?t({portrait:function(){o=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).width(),a=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height()},landscape:function(){o=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height(),a=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).width()}}):(o=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).width(),a=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height());var _=0;0===e.baseline?_=1:o<=e.baseline?_=e.inward?o/e.threshold:o/e.baseline:o>e.baseline&&o<=e.threshold||0===e.threshold?e.threshold>=0&&(_=e.inward?o/e.threshold:o/e.baseline):o>e.threshold&&(_=o/e.threshold,e.aligncenter?i.css({margin:"0 auto",width:e.threshold}):i.css("margin",0)),n.css("font-size",e.fontSize*_),e.dropoff&&o>e.threshold&&n.css("font-size","")};e.baseline<=0&&(e.baseline=1),_(),__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).on("resize",function(){_()})},Vue.prototype.$generateUrlParams=function(e){var t="?";return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(e).forEach(function(n,i){i<__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(e).length-1?t+=n+"="+e[n]+"&":t+=n+"="+e[n]}),t},Vue.prototype.$generateRandomList=function(e){for(var t=[],n=[],i=e,o=0,a=0;a<e;a++)t.push(a);console.log(t);for(var _=0;_<i;_++){o=parseInt(Math.floor(Math.random()*e));for(var r=0;r<_;r++)n[r]===o&&(n.splice(r,1),i++);n.push(o)}return n},Vue.prototype.$setMenuData=function(e){var t=__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({showMenu:!0},e);void 0===localStorage.getItem("menuData")&&localStorage.setItem("menuData",t)},Vue.prototype.$autoHeight=function(e){e=__WEBPACK_IMPORTED_MODULE_2_jquery___default.a.extend({reference:"",target:"",content:"body",offset:0,scale:1,minHeight:0,returnValue:!1},e);var t=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height(),n=0,i=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.reference).height(),o=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.content).height(),a=(document.body.scrollHeight,Number(e.offset));if(n=i<e.minHeight||t<e.minHeight?e.minHeight*e.scale:i>t?i*e.scale+a:o>t?o*e.scale+a:t*e.scale+a,e.returnValue)return n;__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.target).height(n)},Vue.prototype.$quickSort=function(e){if(e.length<=1)return e;for(var t=Math.floor(e.length/2),n=e.splice(t,1)[0],i=[],o=[],a=0;a<e.length;a++)e[a]<=n?i.push(e[a]):o.push(e[a]);return Vue.prototype.$quickSort(i).concat([n],Vue.prototype.$quickSort(o))},Vue.prototype.$align=function(e){function t(){if(a.is("img")){!function(){a.each(function(t){var i=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.target),o=i.attr("src");u=_.eq(t).width(),l=_.eq(t).height(),i.height()<=0?(d.src=o,n(i,d.width,d.height)):n(i)})}()}else if(""!=e.container)for(var t=0;t<a.length;t++){var i=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.target);if(l=_.eq(t).height(),u=_.eq(t).width(),console.log(l),i.is(":hidden"))return!0;n(i)}else u=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).width(),l=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height(),a.each(function(t){var i=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.target);if(i.is(":hidden"))return!0;n(i)})}function n(t,n,a){var _=void 0,d=void 0;switch(o({ie:function(){window.clearTimeout(c)},other:function(){clearTimeout(c)}}),null!=arguments[1]&&null!=arguments[2]?(r=n,s=a):(r=t.outerWidth(),s=t.outerHeight()),e.position){case"both":if(_=(l-s)/2,d=(u-r)/2,(e.positive&&_<0||d<0)&&(_=d=0),r<=u)0!==e.offsetX?t.css({margin:_+p-m+"px "+(u-r)/2+h-f+"px"}):t.css({margin:_+p-m+"px auto"});else{var g=(u-r)/2;t.css({margin:_+p-m+"px "+(g+e.offsetX)+"px"})}break;case"top":i(function(e,n){t.css({margin:"0 "+((u-e)/2+h-f)+"px"})});break;case"right":s<=l?(e.offsetY,t.css({margin:_+p-m+"px 0"})):(d=(u-r)/2,t.css({margin:(l-s)/2+p-m+"px 0"}));break;case"bottom":i(function(e,n){v.calculateIgnore(),m<=E&&(t.css({margin:E-n+p-m+"px auto 0"}),console.log(m),console.log(E))});break;case"left":i(function(e,n){t.css({margin:(E-n)/2+"px 0 0 0"})})}}function i(e){return r=a.outerWidth(),s=a.outerHeight(),e(r,s)}function o(e){e=__WEBPACK_IMPORTED_MODULE_2_jquery___default.a.extend({ie:function(){},other:function(){}},e),navigator.appName.indexOf("Explorer")>-1?(console.log("IE"),e.ie()):e.other()}e=__WEBPACK_IMPORTED_MODULE_2_jquery___default.a.extend({position:"both",target:"",container:"",positive:!1,isImage:!1,offsetX:0,offsetY:0,ignoreY:0,ignoreX:0},e);var a=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.target),_=(a.attr("src"),__WEBPACK_IMPORTED_MODULE_2_jquery___default()(e.container)),r=0,s=0,u=0,l=0,c=void 0,d=new Image,h=Number(e.offsetX),p=Number(e.offsetY),f=Number(e.ignoreX),m=Number(e.ignoreY),g="",w="",E=(__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).width(),__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).height()),v={calculateIgnore:function(){if("string"==typeof e.ignoreY||"string"==typeof e.ignoreX){for(var t=e.ignoreX.split(","),n=e.ignoreY.split(","),i=0;i<t.length;i++)f+=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(t[i]).width();for(var o=0;o<n.length;o++)m+=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(n[o]).height();g=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(t.join(",")),w=__WEBPACK_IMPORTED_MODULE_2_jquery___default()(n.join(",")),console.log(m)}else f=e.ignoreX,m=e.ignoreY}};t(),__WEBPACK_IMPORTED_MODULE_2_jquery___default()(window).resize(function(){t()})}},__webpack_exports__.a=util},NHnr:function(e,t,n){"use strict";function i(e){n("pGs+"),n("foBf")}Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),a=n("v5o6"),_=n.n(a),r=n("NXWw"),s=n("n6Wb"),u=n("Y+qm"),l={name:"app"},c=function(){var e=this,t=e.$createElement;return(e._self._c||t)("router-view")},d=[],h={render:c,staticRenderFns:d},p=h,f=n("VU/8"),m=i,g=f(l,p,!1,m,null,null),w=g.exports,E=n("/ocq");o.a.use(E.a);var v=[{path:"/double12/index.html",alias:"/",name:"double11",component:function(){return n.e(0).then(n.bind(null,"ZK9l"))}},{path:"/testdouble12/index.html",alias:"/",name:"double11",component:function(){return n.e(0).then(n.bind(null,"ZK9l"))}},{path:"/*",name:"404",component:function(){return n.e(1).then(n.bind(null,"thLP"))}}],O=new E.a({routes:v,mode:"history"}),y=O,M=n("//Fk"),P=n.n(M),D=n("mtWM"),b=n.n(D),x=n("NYxO");o.a.use(x.a);var B={winningPrizeChanceFlag:!0,deviceTypeDictionary:[{name:"Android",code:"android"},{name:"iOS",code:"ios"}],appDownloadLocation:{ios:"https://itunes.apple.com/cn/app/%E8%B6%A3%E8%B0%B7-%E4%B8%80%E4%B8%AA%E6%87%82%E4%BD%A0%E7%9A%84app/id1397292579?mt=8",android:"http://a.app.qq.com/o/simple.jsp?pkgname=io.cityzone.android"},appDownloadLocationDictionary:[{type:"ios",value:"https://itunes.apple.com/cn/app/%E8%B6%A3%E8%B0%B7-%E4%B8%80%E4%B8%AA%E6%87%82%E4%BD%A0%E7%9A%84app/id1397292579?mt=8"},{type:"android",value:"http://a.app.qq.com/o/simple.jsp?pkgname=io.cityzone.android"}]},C={turnOffWinningPrizeChance:function(e,t){e.winningPrizeChanceFlag=!1}},I=new x.a.Store({state:B,mutations:C}),A=b.a.create({baseURL:"http://gateway.fnvalley.com/",timeout:5e3,headers:{}});A.interceptors.request.use(function(e){return I.getters.token&&(console.log(I.getters.token),e.headers.Authorization="Bearer "+I.getters.token),e},function(e){console.log(e),P.a.reject(e)}),A.interceptors.response.use(function(e){return e.data},function(e){return P.a.reject(e.response)});var k=A,j=n("Lxn6"),T=n("8eiZ");o.a.use(r.a),o.a.use(s.a),o.a.use(u.a),o.a.use(j.a),_.a.attach(document.body),o.a.config.productionTip=!1,o.a.prototype.$http=k,o.a.prototype.$baseUrl="https://gateway.fnvalley.com/",o.a.prototype.$domainUrl="http://activity.fnvalley.com/collegewheel/index.html",o.a.prototype.$redirectBaseUrl="https://redirect.fnvalley.com/",o.a.prototype.$prodEnv=!0,o.a.component("CommonLoading",T.a),new o.a({el:"#app",router:y,store:I,template:"<App/>",components:{App:w}})},ZMno:function(e,t){},a3zG:function(e,t){},foBf:function(e,t){},"pGs+":function(e,t){},xJad:function(e,t){}},["NHnr"]);