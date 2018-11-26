<template>
  <div class="common_main_container">
    <div v-if="redirectingFlag" class="common_initializing_item"></div>
    <div v-else class="wolveskill_main_container">
      <div v-if="$checkEnvironment()==='wechat'" class="common_header_wrapper">
        <div class="left_wrapper">
          <div class="previous">
            <a @click="goBack">
              <x-icon type="ios-arrow-left" size="30"></x-icon>
            </a>
          </div>
        </div>
        <div class="middle_wrapper">
          填写信息
        </div>
      </div>

      <div class="wolveskill_participateform_wrapper">
        <div class="wolveskill_formitem_wrapper">
          <group>
            <x-input v-model="formData.userRealName" ref="userRealNameRef" label-width="6rem" title="姓名"
                     placeholder="请输入您的姓名"
                     :is-type="rules.userRealName" required></x-input>
          </group>
        </div>
        <div class="wolveskill_formitem_wrapper">
          <!--{{loginId}}-->
          <group>
            <x-input v-model="loginId" label-width="6rem" title="电话" placeholder="请输入您的电话" readonly></x-input>
          </group>
        </div>
        <div class="wolveskill_formitem_wrapper">
          <group>
            <popup-picker v-model="chosenUserSchoolName"
                          title="学校"
                          placeholder="请选择您的院校"
                          :data="schoolList"
                          @on-change="chooseUserSchoolName"
                          :show-name="true"
                          required></popup-picker>
            <x-input v-show="false" v-model="formData.userSchoolName" ref="userSchoolNameRef" title="学校"
                     placeholder="请输入您的专业" required></x-input>
          </group>
        </div>
        <div class="wolveskill_formitem_wrapper">
          <group>
            <x-input v-model="formData.userMajor" ref="userMajorRef" label-width="6rem" title="专业" placeholder="请输入您的专业"
                     required></x-input>
          </group>
        </div>
        <div class="wolveskill_formitem_wrapper">
          <group>
            <popup-picker v-model="chosenUserEntranceYear" title="入学年份"
                          placeholder="请选择入学年份"
                          :data="yearsList"
                          required></popup-picker>

            <x-input v-show="false" v-model="formData.userEntranceYear" ref="userEntranceYearRef" title="入学年份"
                     required></x-input>

          </group>
        </div>
        <div class="wolveskill_formitem_wrapper">
          <group label-width="100px">
            <cell-box title="排行头像" class="uploader">
              <a @click="uploadAvatar">
                <x-icon v-if="formData.userImage===''" type="ios-plus-empty" size="60"></x-icon>
                <img v-else :src="formData.userImage"/>
              </a>
              <x-input v-show="false" v-model="formData.userImage" ref="userImageRef" label-width="6rem" title="排行头像"
                       required></x-input>
              <p class="hint">
                个人靓照有助于提升人气
              </p>
            </cell-box>
          </group>
        </div>
      </div>
      <div class="participatebutton_wrapper">
        <a v-if="state!=='edit'" class="wolveskill_participatebutton_item" @click="submitForm">确定报名</a>
        <a v-else class="wolveskill_participatebutton_item" @click="submitForm">确认修改</a>
      </div>

    </div>
    <toast v-model="successfulFlag" type="text" :time="2000" is-show-mask text="数据提交成功" position="top"></toast>
  </div>
</template>

<script>
  // import Cookies from 'js-cookie'
  import FnvalleySdk from '../js/FnvalleySdk'
  import Confirm from './Confirm.vue'


  // import wx from 'weixin-js-sdk'

  export default {
    name: "wolveskill",
    components: {
      Confirm
    },
    data() {
      return {
        getUserInfoByTokenRequest: 'uaa/user',
        addUserSchoolRequest: 'profile-service/1.0.0/user_school/addUserSchool',
        check_join_activityRequest: 'promotion-service/1.0.0/offline_activity/check_join_activity',
        participate_activityRequest: 'promotion-service/1.0.0/offline_activity/participate_activity',
        getUserActivityInfoRequest: 'promotion-service/1.0.0/offline_activity/getUserActivityInfo',
        updateUserActivityInfoRequest: 'promotion-service/1.0.0/offline_activity/updateUserActivityInfo',
        fnvalleySdkInstance: {},
        showYearList: false,
        activeTabIndex: 0,

        participateSuccessful: false,
        activityBeganFlag: false,
        confirmState: 'default',
        confirmContentDictionary: {
          default: {
            content: "<p></p>"
          },
        },
        schoolList: [[{
          name: '西安欧亚学院',
          value: 'ouya'
        }, {
          name: '陕西财经学校',
          value: 'xiancaijin'
        }, {
          name: '西安美术学院',
          value: 'xianmeishu'
        }, {
          name: '西北政法大学',
          value: 'xianzhenfa'
        }, {
          name: '陕西中医药大学',
          value: 'xianzyy'
        }, {
          name: '西北大学现代学院',
          value: 'xianxiandai'
        }, {
          name: '陕西职业技术学院',
          value: 'xianzhiye'
        }, {
          name: '西安培华学院新校区',
          value: 'xianpeihua_new'
        }]],
        formData: {
          userRealName: '',
          userImage: '',
          userSchoolName: '',
          userMajor: '',
          userEntranceYear: ''
        },
        rules: {
          userRealName: function (value) {
            return {
              valid: value !== '' && value !== null,
              msg: '此项为必填项'
            }
          },
          userImage: function (value) {
            return {
              valid: value !== '' && value !== null,
              msg: '此项为必填项'
            }
          },
          userSchoolName: function (value) {
            return {
              valid: value !== '' && value !== null,
              msg: '此项为必填项'
            }
          },
          userMajor: function (value) {
            return {
              valid: value !== '' && value !== null,
              msg: '此项为必填项'
            }
          },
          userEntranceYear: function (value) {
            return {
              valid: value !== '' && value !== null,
              msg: '此项为必填项'
            }
          },
        },
        confirmFlag: false,
        rejectFlag: false,
        redirectingFlag: true,
        unauthorizedFlag: false,
        successfulFlag: false,
        downloadUrl: '',
        // accessToken: '',
        loginId: this.$store.state.loginId,
        chosenUserSchoolName: [],
        chosenUserEntranceYear: []
      }
    },
    computed: {
      accessToken() {
        // return this.$store.state.accessToken || 'c55d47af-3859-4e6f-9d27-c88af4704db1';
        return this.$store.state.accessToken;
      },
      // loginId() {
      //   return this.$store.state.loginId;
      // },
      channel() {
        return this.$route.query.channel || '';
      },
      activityId() {
        return 5;
      },
      tabBarWidth() {
        return this.tabList[this.activeTabIndex].title.length * 16 + 'px'
      },
      yearsList() {
        let result = [];
        for (let i = 2000; i <= 2020; i++) {
          result.push(i)
        }
        return [result]
      },
      state() {
        return this.$route.query.state;
      }
    },
    watch: {
      // chosenUserSchoolName(value) {
      //   this.formData.userSchoolName = value[0];
      // },
      chosenUserEntranceYear(value) {
        this.formData.userEntranceYear = value[0];
      }
    },
    beforeMount() {
      console.log(this.$route)
      this.$vux.loading.show({
        text: 'Loading'
      });
      if (this.$route.query.routeto === 'advertise') {
        this.$vux.loading.hide();
        this.$router.push({
          name: 'wolveskillAdvertise',
          query: {
            userSchoolName: this.formData.userSchoolName
          }
        });
      } else {
        this.redirectingFlag = false;
        this.$vux.loading.hide();
      }

      // this.$getAccessToken();
      // this.$getUserLoginId();
    },

    mounted() {
      // alert('mounted')
      console.log(new FnvalleySdk())
      this.fnvalleySdkInstance = new FnvalleySdk();
      console.log(this.redirectingFlag)
      // alert(this.$store.state.accessToken)
      if (!this.redirectingFlag) {
        this.$remResizing({
          fontSize: 20,
        });
        this.$autoHeight({
          target: '.wolveskill_main_container'
        });
        console.log(window)
      }
      if (this.$route.query.state === 'edit') {
        this.getFormData();
      }
    },
    methods: {
      getFormData() {
        this.$vux.loading.show({
          text: 'Loading'
        });
        this.$http.get(this.$baseUrl + this.getUserActivityInfoRequest + `/${this.$store.state.activityId}/${this.$store.state.loginId}`, {
          headers: {
            'Authorization': 'Bearer ' + this.$store.state.accessToken
          }
        }).then(response => {
          response = response.data;
          console.log('getUserActivityInfo', response)
          this.formData = response;
          this.chosenUserSchoolName = [this.formData.userSchoolName];
          this.chosenUserEntranceYear = [this.formData.userEntranceYear];
          this.$vux.loading.hide();
        }).catch(error => {
          console.log(error)
          this.$vux.confirm.show({
            showCancelButton: false,
            title: 'getUserActivityInfo_error' + error,
            onConfirm() {
            }
          });
        })
      },
      submitForm() {
        let validFlag = true;


        let refDictionary = [{
          refName: 'userRealNameRef'
        }, {
          refName: 'userSchoolNameRef'
        }, {
          refName: 'userMajorRef'
        }, {
          refName: 'userEntranceYearRef'
        }, {
          refName: 'userImageRef'
        }];
        refDictionary.forEach(item => {
          if (this.$refs[item.refName].valid !== undefined) {
            if (this.$refs[item.refName].valid !== true) {
              this.$vux.confirm.show({
                showCancelButton: false,
                title: this.$refs[item.refName].title + '为空',
                onConfirm() {
                }
              });
              validFlag = false;
            }
          }
        });


        if (validFlag) {
          this.$vux.loading.show({
            text: '提交中'
          });

          let params = {
            userRealName: this.formData.userRealName,
            userImage: this.formData.userImage,
            userSchoolName: this.formData.userSchoolName,
            userMajor: this.formData.userMajor,
            userEntranceYear: this.formData.userEntranceYear
          };

          // params = {
          //   userRealName: 'aaa',
          //   userImage: 'http://resource.zan-qian.com/test/langren_img/1542279082976.jpg',
          //   userSchoolName: 'bbb',
          //   userMajor: 'ccc',
          //   userEntranceYear: 'ddd'
          // };

          if (this.$route.query.state !== 'edit') {
            debugger
            this.$http.post(this.$baseUrl + this.participate_activityRequest + `/${this.$store.state.activityId}`, {}, {
              params: params,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.$store.state.accessToken
              }
            }).then(response => {
              console.log(response)

              // alert(response.code)
              this.$vux.loading.hide();
              switch (response.code) {
                case 10000:
                  this.successfulFlag = true;
                  this.$router.push({
                    name: 'participateSuccessful',
                    query: {
                      userSchoolName: this.formData.userSchoolName
                    }
                  });
                  break;
                case 10001:
                  let that = this;
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                      that.$router.push({
                        name: 'participateSuccessful',
                        query: {
                          userSchoolName: that.formData.userSchoolName
                        }
                      });
                    }
                  });
                  break;
                case 10006:
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                    }
                  });
                  break;
                case 10007:
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                    }
                  });
                  break;
                case 10029:
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                    }
                  });
                  break;
              }

            }).catch(error => {
              console.log(error)
              this.$vux.confirm.show({
                showCancelButton: false,
                title: error.data.error,
                onConfirm() {
                }
              });
            })
          } else {
            debugger
            this.$http.post(this.$baseUrl + this.updateUserActivityInfoRequest + `/${this.$store.state.activityId}`, {}, {
              params: params,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.$store.state.accessToken
              }
            }).then(response => {
              console.log(response)

              // alert(response.code)
              this.$vux.loading.hide();
              switch (response.code) {
                case 10000:
                  this.successfulFlag = true;
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: '信息修改成功！',
                    onConfirm() {
                    }
                  });
                  // this.$router.push({
                  //   name: 'participateSuccessful',
                  //   query: {
                  //     userSchoolName: this.formData.userSchoolName
                  //   }
                  // });
                  break;
                case 10001:
                  let that = this;
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                      // that.$router.push({
                      //   name: 'participateSuccessful',
                      //   query: {
                      //     userSchoolName: that.formData.userSchoolName
                      //   }
                      // });
                    }
                  });
                  break;
                case 10006:
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                    }
                  });
                  break;
                case 10007:
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                    }
                  });
                  break;
                case 10029:
                  this.$vux.confirm.show({
                    showCancelButton: false,
                    title: response.message,
                    onConfirm() {
                    }
                  });
                  break;
              }

            }).catch(error => {
              console.log(error)
              this.$vux.confirm.show({
                showCancelButton: false,
                title: error.data.error,
                onConfirm() {
                }
              });
            })
          }
        }
      },
      handleTabClick(index) {
        console.log(index)
        this.activeTabIndex = index;
      },
      goBack() {
        this.$router.push({
          name: 'homepage',
        })
      },
      uploadAvatar() {
        console.log(this.fnvalleySdkInstance)
        this.fnvalleySdkInstance.uploadImage().then(response => {
          this.formData.userImage = response;
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '图片上传成功',
            onConfirm() {
            }
          });
        }).catch(error => {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '图片上传失败',
            onConfirm() {
            }
          });
        });
      },
      chooseUserSchoolName(data) {
        console.log(data[0])
        // this.schoolList[0].forEach(item=>{
        //   console.log('item', item)
        //   if(item.value===data[0]){
        //     this.chosenUserSchoolName=item.name;
        //   }
        // })
        // this.chosenUserSchoolName = this.schoolList[0].filter(item => item.value === data[0])[0].name;
        console.log(this.chosenUserSchoolName)
        this.formData.userSchoolName = data[0];
      }
    }
  }


</script>

<style scoped lang="scss"></style>
