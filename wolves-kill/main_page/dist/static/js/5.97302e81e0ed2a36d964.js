webpackJsonp([5],{HrjD:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,"",""])},LGlG:function(e,t,a){var o=a("HrjD");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a("rjj0")("20607362",o,!0,{})},uJaI:function(e,t,a){"use strict";function o(e){a("LGlG")}Object.defineProperty(t,"__esModule",{value:!0});var s=a("NQGu"),r=a("XG+O"),i=(r.a,{name:"wolveskill",components:{Confirm:r.a},data:function(){return{getUserInfoByTokenRequest:"uaa/user",addUserSchoolRequest:"profile-service/1.0.0/user_school/addUserSchool",check_join_activityRequest:"promotion-service/1.0.0/offline_activity/check_join_activity",participate_activityRequest:"promotion-service/1.0.0/offline_activity/participate_activity",getUserActivityInfoRequest:"promotion-service/1.0.0/offline_activity/getUserActivityInfo",updateUserActivityInfoRequest:"promotion-service/1.0.0/offline_activity/updateUserActivityInfo",fnvalleySdkInstance:{},showYearList:!1,activeTabIndex:0,participateSuccessful:!1,activityBeganFlag:!1,confirmState:"default",confirmContentDictionary:{default:{content:"<p></p>"}},schoolList:[[{name:"西安欧亚学院",value:"ouya"},{name:"陕西财经学校",value:"xiancaijin"},{name:"西安美术学院",value:"xianmeishu"},{name:"西北政法大学",value:"xianzhenfa"},{name:"陕西中医药大学",value:"xianzyy"},{name:"西北大学现代学院",value:"xianxiandai"},{name:"陕西职业技术学院",value:"xianzhiye"},{name:"西安培华学院新校区",value:"xianpeihua_new"}]],formData:{userRealName:"",userImage:"",userSchoolName:"",userMajor:"",userEntranceYear:""},rules:{userRealName:function(e){return{valid:""!==e&&null!==e,msg:"此项为必填项"}},userImage:function(e){return{valid:""!==e&&null!==e,msg:"此项为必填项"}},userSchoolName:function(e){return{valid:""!==e&&null!==e,msg:"此项为必填项"}},userMajor:function(e){return{valid:""!==e&&null!==e,msg:"此项为必填项"}},userEntranceYear:function(e){return{valid:""!==e&&null!==e,msg:"此项为必填项"}}},confirmFlag:!1,rejectFlag:!1,redirectingFlag:!0,unauthorizedFlag:!1,successfulFlag:!1,downloadUrl:"",loginId:this.$store.state.loginId,chosenUserSchoolName:[],chosenUserEntranceYear:[]}},computed:{accessToken:function(){return this.$store.state.accessToken},channel:function(){return this.$route.query.channel||""},activityId:function(){return 5},tabBarWidth:function(){return 16*this.tabList[this.activeTabIndex].title.length+"px"},yearsList:function(){for(var e=[],t=2e3;t<=2020;t++)e.push(t);return[e]},state:function(){return this.$route.query.state}},watch:{chosenUserEntranceYear:function(e){this.formData.userEntranceYear=e[0]}},beforeMount:function(){console.log(this.$route),this.$vux.loading.show({text:"Loading"}),"advertise"===this.$route.query.routeto?(this.$vux.loading.hide(),this.$router.push({name:"wolveskillAdvertise",query:{userSchoolName:this.formData.userSchoolName}})):(this.redirectingFlag=!1,this.$vux.loading.hide())},mounted:function(){console.log(new s.a),this.fnvalleySdkInstance=new s.a,console.log(this.redirectingFlag),this.redirectingFlag||(this.$remResizing({fontSize:20}),this.$autoHeight({target:".wolveskill_main_container"}),console.log(window)),"edit"===this.$route.query.state&&this.getFormData()},methods:{getFormData:function(){var e=this;this.$vux.loading.show({text:"Loading"}),this.$http.get(this.$baseUrl+this.getUserActivityInfoRequest+"/"+this.$store.state.activityId+"/"+this.$store.state.loginId,{headers:{Authorization:"Bearer "+this.$store.state.accessToken}}).then(function(t){console.log("getUserActivityInfo",t),t=t.data,e.formData=t,e.chosenUserSchoolName=[e.formData.userSchoolName],e.chosenUserEntranceYear=[e.formData.userEntranceYear],e.$vux.loading.hide()}).catch(function(t){console.log(t),e.$vux.confirm.show({showCancelButton:!1,title:"getUserActivityInfo_error"+t,onConfirm:function(){}})})},submitForm:function(){var e=this,t=!0;if([{refName:"userRealNameRef"},{refName:"userSchoolNameRef"},{refName:"userMajorRef"},{refName:"userEntranceYearRef"},{refName:"userImageRef"}].forEach(function(a){void 0!==e.$refs[a.refName].valid&&!0!==e.$refs[a.refName].valid&&(e.$vux.confirm.show({showCancelButton:!1,title:e.$refs[a.refName].title+"为空",onConfirm:function(){}}),t=!1)}),t){this.$vux.loading.show({text:"提交中"});var a={userRealName:this.formData.userRealName,userImage:this.formData.userImage,userSchoolName:this.formData.userSchoolName,userMajor:this.formData.userMajor,userEntranceYear:this.formData.userEntranceYear};"edit"!==this.$route.query.state?this.$http.post(this.$baseUrl+this.participate_activityRequest+"/"+this.$store.state.activityId,{},{params:a,headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+this.$store.state.accessToken}}).then(function(t){switch(console.log(t),e.$vux.loading.hide(),t.code){case 1e4:e.successfulFlag=!0,e.$router.push({name:"participateSuccessful",query:{userSchoolName:e.formData.userSchoolName}});break;case 10001:var a=e;e.$vux.confirm.show({showCancelButton:!1,title:t.message,onConfirm:function(){a.$router.push({name:"participateSuccessful",query:{userSchoolName:a.formData.userSchoolName}})}});break;case 10006:case 10007:case 10029:e.$vux.confirm.show({showCancelButton:!1,title:t.message,onConfirm:function(){}})}}).catch(function(t){console.log(t),e.$vux.confirm.show({showCancelButton:!1,title:t.data.error,onConfirm:function(){}})}):this.$http.post(this.$baseUrl+this.updateUserActivityInfoRequest+"/"+this.$store.state.activityId,{},{params:a,headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer "+this.$store.state.accessToken}}).then(function(t){switch(console.log(t),e.$vux.loading.hide(),t.code){case 1e4:e.successfulFlag=!0,e.$router.push({name:"participateSuccessful",query:{userSchoolName:e.formData.userSchoolName}});break;case 10001:var a=e;e.$vux.confirm.show({showCancelButton:!1,title:t.message,onConfirm:function(){a.$router.push({name:"participateSuccessful",query:{userSchoolName:a.formData.userSchoolName}})}});break;case 10006:case 10007:case 10029:e.$vux.confirm.show({showCancelButton:!1,title:t.message,onConfirm:function(){}})}}).catch(function(t){console.log(t),e.$vux.confirm.show({showCancelButton:!1,title:t.data.error,onConfirm:function(){}})})}},handleTabClick:function(e){console.log(e),this.activeTabIndex=e},goBack:function(){this.$router.push({name:"homepage"})},uploadAvatar:function(){var e=this;console.log(this.fnvalleySdkInstance),this.fnvalleySdkInstance.uploadImage().then(function(t){e.formData.userImage=t,e.$vux.confirm.show({showCancelButton:!1,title:"图片上传成功",onConfirm:function(){}})}).catch(function(t){e.$vux.confirm.show({showCancelButton:!1,title:"图片上传失败",onConfirm:function(){}})})},chooseUserSchoolName:function(e){console.log(e[0]),console.log(this.chosenUserSchoolName),this.formData.userSchoolName=e[0]}}}),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"common_main_container"},[e.redirectingFlag?a("div",{staticClass:"common_initializing_item"}):a("div",{staticClass:"wolveskill_main_container"},["wechat"===e.$checkEnvironment()?a("div",{staticClass:"common_header_wrapper"},[a("div",{staticClass:"left_wrapper"},[a("div",{staticClass:"previous"},[a("a",{on:{click:e.goBack}},[a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-arrow-left",attrs:{type:"ios-arrow-left",size:"30",xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512"}},[a("path",{attrs:{d:"M352 115.4L331.3 96 160 256l171.3 160 20.7-19.3L201.5 256z"}})])])])]),e._v(" "),a("div",{staticClass:"middle_wrapper"},[e._v("\n        填写信息\n      ")])]):e._e(),e._v(" "),a("div",{staticClass:"wolveskill_participateform_wrapper"},[a("div",{staticClass:"wolveskill_formitem_wrapper"},[a("group",[a("x-input",{ref:"userRealNameRef",attrs:{"label-width":"6rem",title:"姓名",placeholder:"请输入您的姓名","is-type":e.rules.userRealName,required:""},model:{value:e.formData.userRealName,callback:function(t){e.$set(e.formData,"userRealName",t)},expression:"formData.userRealName"}})],1)],1),e._v(" "),a("div",{staticClass:"wolveskill_formitem_wrapper"},[a("group",[a("x-input",{attrs:{"label-width":"6rem",title:"电话",placeholder:"请输入您的电话",readonly:""},model:{value:e.loginId,callback:function(t){e.loginId=t},expression:"loginId"}})],1)],1),e._v(" "),a("div",{staticClass:"wolveskill_formitem_wrapper"},[a("group",[a("popup-picker",{attrs:{title:"学校",placeholder:"请选择您的院校",data:e.schoolList,"show-name":!0,required:""},on:{"on-change":e.chooseUserSchoolName},model:{value:e.chosenUserSchoolName,callback:function(t){e.chosenUserSchoolName=t},expression:"chosenUserSchoolName"}}),e._v(" "),a("x-input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"userSchoolNameRef",attrs:{title:"学校",placeholder:"请输入您的专业",required:""},model:{value:e.formData.userSchoolName,callback:function(t){e.$set(e.formData,"userSchoolName",t)},expression:"formData.userSchoolName"}})],1)],1),e._v(" "),a("div",{staticClass:"wolveskill_formitem_wrapper"},[a("group",[a("x-input",{ref:"userMajorRef",attrs:{"label-width":"6rem",title:"专业",placeholder:"请输入您的专业",required:""},model:{value:e.formData.userMajor,callback:function(t){e.$set(e.formData,"userMajor",t)},expression:"formData.userMajor"}})],1)],1),e._v(" "),a("div",{staticClass:"wolveskill_formitem_wrapper"},[a("group",[a("popup-picker",{attrs:{title:"入学年份",placeholder:"请选择入学年份",data:e.yearsList,required:""},model:{value:e.chosenUserEntranceYear,callback:function(t){e.chosenUserEntranceYear=t},expression:"chosenUserEntranceYear"}}),e._v(" "),a("x-input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"userEntranceYearRef",attrs:{title:"入学年份",required:""},model:{value:e.formData.userEntranceYear,callback:function(t){e.$set(e.formData,"userEntranceYear",t)},expression:"formData.userEntranceYear"}})],1)],1),e._v(" "),a("div",{staticClass:"wolveskill_formitem_wrapper"},[a("group",{attrs:{"label-width":"100px"}},[a("cell-box",{staticClass:"uploader",attrs:{title:"排行头像"}},[a("a",{on:{click:e.uploadAvatar}},[""===e.formData.userImage?a("svg",{staticClass:"vux-x-icon vux-x-icon-ios-plus-empty",attrs:{type:"ios-plus-empty",size:"60",xmlns:"http://www.w3.org/2000/svg",width:"60",height:"60",viewBox:"0 0 512 512"}},[a("path",{attrs:{d:"M384 265H264v119h-17V265H128v-17h119V128h17v120h120v17z"}})]):a("img",{attrs:{src:e.formData.userImage}})]),e._v(" "),a("x-input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"userImageRef",attrs:{"label-width":"6rem",title:"排行头像",required:""},model:{value:e.formData.userImage,callback:function(t){e.$set(e.formData,"userImage",t)},expression:"formData.userImage"}}),e._v(" "),a("p",{staticClass:"hint"},[e._v("\n              个人靓照有助于提升人气\n            ")])],1)],1)],1)]),e._v(" "),a("div",{staticClass:"participatebutton_wrapper"},["edit"!==e.state?a("a",{staticClass:"wolveskill_participatebutton_item",on:{click:e.submitForm}},[e._v("确定报名")]):a("a",{staticClass:"wolveskill_participatebutton_item",on:{click:e.submitForm}},[e._v("确认修改")])])]),e._v(" "),a("toast",{attrs:{type:"text",time:2e3,"is-show-mask":"",text:"数据提交成功",position:"top"},model:{value:e.successfulFlag,callback:function(t){e.successfulFlag=t},expression:"successfulFlag"}})],1)},c=[],l={render:n,staticRenderFns:c},u=l,m=a("VU/8"),h=o,f=m(i,u,!1,h,"data-v-7fe1b81e",null);t.default=f.exports}});