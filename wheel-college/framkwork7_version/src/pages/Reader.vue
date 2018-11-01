<template>
  <div>

    <!-- Status bar overlay for full screen mode (Cordova or PhoneGap) -->
    <f7-statusbar></f7-statusbar>
    <!-- Your main view, should have "main" prop -->
    <f7-view main>
      <!-- Initial Page -->
      <f7-page>
        <!-- Top Navbar-->
        <f7-navbar title="Awesome App"></f7-navbar>
        <!-- Toolbar-->
        <f7-toolbar>
          <f7-link>Link 1</f7-link>
          <f7-link>Link 2</f7-link>
        </f7-toolbar>
        <!-- Page Content -->
        <p>Page content goes here</p>
        <f7-link href="/about/">About App</f7-link>
      </f7-page>
    </f7-view>
  </div>

</template>

<script>
  import Swiper from 'swiper/dist/js/swiper.js';
  import $ from 'jquery';
  import {trim} from 'vux'

  let years = [];
  for (let i = 1; i < 3000; i++) {
    years.push({
      name: '第' + i + '章',
      value: i + ''
    })
  }

  export default {
    name: "Wheel",
    data() {
      return {
        findChapterListRequest: '3rd-content-service/1.0.0/findChapterList',
        queryCommentsListRequest: '3rd-content-service/1.0.0/queryCommentsList',
        queryCommentsDetailsRequest: '3rd-content-service/1.0.0/queryCommentsDetails',
        queryRedBookCommentsDetailsRequest: '3rd-content-service/1.0.0/queryRedBookCommentsDetails',
        loading: false,
        contentTypeDictionary: [{
          name: 'noval',
          code: 7,
          jsonKeyName: 'jsonContentUrl'
        }, {
          name: 'comic',
          code: 8,
          jsonKeyName: 'detailLink'
        }],

        drawerVisibility: false,
        navFlag: false,
        show7: false,
        year1: [],
        years: [years],
        chapterList: [],
        currentChapterString: '',
        currentChapter: ['66'],
        articleData: [],
        bookCoverInfo: {},
        chapterPagination: {
          pageNo: 1,
          totalPages: 1
        },
        remUnit: '',
        chapterNumber: 1,

        currentChapterId: 0,
        currentChapterNumber: 1,
        currentChapterInfo: {},
        mainSwiperInstance: {},
        swiperInstance: {},
        currentChapterIndex: 0,
        loadFlag: true,
        oi: 0
      }
    },
    computed: {
      contentId() {
        return this.$route.query.contentId || this.$route.query.id;
      },
      contentType() {
        return this.$route.query.contentType || this.$route.query.type;
      },
      // chapterNumber() {
      //
      // }
    },
    watch: {
      currentChapter(value) {
        this.currentChapterString = '第' + value + '页'
      },
      remUnit(value) {

      },
      bookCoverInfo(value) {
        console.log(value)
        // if (value !== undefined) {
        //   this.chapterNumber = value.id;
        // }
      },
      currentChapterId(value) {
        this.bookCoverInfo = this.chapterList.filter(item => item.id === value)[0]
      }
    },
    filters: {},
    created() {
      this.chapterNumber = this.$route.query.chapterNumber || 1;
    },

    mounted() {
      this.$nextTick(() => {
        this.$autoHeight({
          target: '.vux-drawer'
        });
        this.$autoHeight({
          target: '.reader_chapterlist_container .content'
        });
        this.$remResizing({
          fontSize: 20,
        });

      });
      this.getChapterListData();

      this.$nextTick(() => {
        this.remUnit = Number(document.getElementsByTagName('html')[0].style.fontSize.replace('px', ''))
      });
    },
    methods: {
      getChapterListData() {
        this.loading = true;
        this.$http.get(this.$baseUrl + this.findChapterListRequest + `/${this.contentId}/${this.contentType}`, {
          params: {
            pageNo: this.chapterPagination.pageNo
          }
        }).then(response => {
          this.loading = false;
          console.log('getChapterListData', response)
          response = response.data;

          let findFlag = false;
          this.chapterList = response.content;
          this.chapterPagination.totalPages = response.totalPages;

          this.getBookInfo();

          this.getChapterContentData();

          // }).catch(error => {
          //   console.log(error)
        })
      },
      getBookInfo() {
        if (this.chapterNumber !== undefined) {
          this.currentChapterInfo = this.chapterList.filter(item => item.chapterNumber === Number(this.chapterNumber)).length > 0 ? this.chapterList.filter(item => item.chapterNumber === Number(this.chapterNumber))[0] : this.chapterList[0];
        } else {
          this.currentChapterInfo = this.chapterList[0];
        }
        this.currentChapterId = this.currentChapterInfo.id;
      },
      getChapterContentData() {

        console.log(this.currentChapterId)
        let originJSONUrl;
        this.chapterList.forEach((item, index) => {
          if (item.id === this.currentChapterId) {
            this.currentChapterIndex = index;
            this.chapterNumber = item.chapterNumber;
            originJSONUrl = item[this.contentTypeChecker().jsonKeyName];
            this.getBookInfo();

          }
        });


        // let JSONUrl = originJSONUrl;
        let JSONUrl = originJSONUrl.substring(originJSONUrl.indexOf('.com') + 5, originJSONUrl.length);

        let result = process.env.NODE_ENV === 'production' ? originJSONUrl : JSONUrl;
        this.loading = true;

        this.$http.get(result).then(response => {
          console.log('getChapterContentData', response)
          this.loading = false;

          let result = [];

          response.forEach(item => {
            // console.log(this.contentTypeChecker().name)
            switch (this.contentTypeChecker().name) {
              case 'noval':
                result.push({
                  text: trim(item.text)
                });
                break;
              case 'comic':
                result.push({
                  imgurl: trim(item.imgurl)
                });
                break;
            }
          });
          console.log(result)

          this.articleData = result;


          this.$nextTick(() => {
            if (!this.loading) {
              this.initSwiper();
            }
          })

          // }).catch(error => {
          //   console.log(error)
        });

      },

      toggleChapterMenu() {
        this.drawerVisibility = !this.drawerVisibility
      },
      previousChapter() {
        if (this.currentChapterIndex - 1 >= 0) {
          this.currentChapterIndex--;
          this.currentChapterId = this.chapterList[this.currentChapterIndex].id;
          this.getChapterContentData();

        } else {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '已是第一章',
            onConfirm() {
            }
          })
        }
      },
      jumpTo() {
        this.show7 = true;
      },
      nextChapter() {
        if (this.currentChapterIndex + 1 < this.chapterList.length) {
          this.currentChapterIndex++;
          this.currentChapterId = this.chapterList[this.currentChapterIndex].id;
          this.getChapterContentData();
        } else {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '已是最后一章',
            onConfirm() {
            }
          })
        }
      },
      previousChapterList() {
        if (this.chapterPagination.pageNo - 1 >= 1) {
          this.chapterPagination.pageNo--;
          this.getChapterListData();
        } else {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '已是第一页',
            onConfirm() {
            }
          })
        }
      },
      nextChapterList() {
        if (this.chapterPagination.pageNo + 1 <= this.chapterPagination.totalPages) {
          this.chapterPagination.pageNo++;
          this.getChapterListData();
        } else {
          this.$vux.confirm.show({
            showCancelButton: false,
            title: '已是最后一页',
            onConfirm() {
            }
          })
        }
      },
      initSwiper() {

        this.loading = true;

        let that = this;
        if (Object.keys(this.swiperInstance).length === 0) {
          this.mainSwiperInstance = new Swiper('.common_main_container', {
            // loop: true,
            direction: 'vertical',
            // effect: 'fade',
            // freeMode: true,
            on: {
              doubleTap() {
                that.navFlag = !that.navFlag;
                console.log(that.navFlag)

              },
            }
          });

          this.swiperInstance = new Swiper('.mainbody', {
            direction: 'vertical',
            slidesPerView: 'auto',
            // effect:'fade',
            freeMode: true,
            // mousewheel: true,
            // lazy: true,
            observer: true,
            freeModeMomentum: true,
            scrollbar: {
              el: '.swiper-scrollbar',
              draggable: true,
              hide: false
            },
            on: {

              reachEnd() {
              },
              fromEdge() {
                // alert('dsds')
              },
              // touchMove(swiper){
              //   var _viewHeight = document.querySelectorAll('.swiper-wrapper')[0].offsetHeight;
              //   var _contentHeight = document.querySelectorAll('.swiper-slide')[0].offsetHeight;
              //
              //
              //   if(that.swiperInstance.translate < 50 && that.swiperInstance.translate > 0) {
              //     $(".init-loading").html('下拉刷新...').show();
              //   }else if(that.swiperInstance.translate > 50 ){
              //     $(".init-loading").html('释放刷新...').show();
              //   }
              // },
              // touchEnd: function(swiper) {
              //   var _viewHeight = document.querySelectorAll('.mainbody .swiper-wrapper')[0].offsetHeight;
              //   var _contentHeight = document.querySelectorAll('.mainbody .swiper-slide')[0].offsetHeight;
              //   // 上拉加载
              //   if(that.swiperInstance.translate <= _viewHeight - _contentHeight - 50 && that.swiperInstance.translate < 0) {
              //     // console.log("已经到达底部！");
              //
              //     if(this.loadFlag){
              //       $(".loadtip").html('正在加载...');
              //     }else{
              //       $(".loadtip").html('没有更多啦！');
              //     }
              //
              //     setTimeout(function() {
              //       for(var i = 0; i <5; i++) {
              //         this.oi++;
              //         $(".list-group").eq(this.swiperInstance.activeIndex).append('<li class="list-group-item">我是加载出来的'+this.oi+'...</li>');
              //       }
              //       $(".loadtip").html('上拉加载更多...');
              //       that.swiperInstance.update(); // 重新计算高度;
              //     }, 800);
              //   }
              //
              //   // 下拉刷新
              //   if(that.swiperInstance.translate >= 50) {
              //     $(".init-loading").html('正在刷新...').show();
              //     $(".loadtip").html('上拉加载更多');
              //     this.loadFlag = true;
              //
              //     setTimeout(function() {
              //       $(".refreshtip").show(0);
              //       $(".init-loading").html('刷新成功！');
              //       setTimeout(function(){
              //         $(".init-loading").html('').hide();
              //       },800);
              //       $(".loadtip").show(0);
              //
              //       //刷新操作
              //       that.swiperInstance.update(); // 重新计算高度;
              //     }, 1000);
              //   }else if(that.swiperInstance.translate >= 0 && that.swiperInstance.translate < 50){
              //     $(".init-loading").html('').hide();
              //   }
              //   return false;
              // }

            }
          });
          setTimeout(() => {
            this.swiperInstance.update();
            this.loading = false;

            this.mainSwiperInstance.slideTo(0, 500);
            this.swiperInstance.slideTo(0, 500);
            this.swiperInstance.updateAutoHeight();

          }, 500);

        } else {
          console.log(this.swiperInstance)
          this.$nextTick(() => {
            // this.swiperInstance.slideReset();

            this.loading = true;
            setTimeout(() => {
              this.swiperInstance.update();
              this.loading = false;

              this.mainSwiperInstance.slideTo(0, 500);
              this.swiperInstance.slideTo(0, 500);

            }, 1500);


            // setTimeout(() => {
            //   this.swiperInstance.updateAutoHeight();
            // }, 1500);

          })
        }

      },
      chooseChapter(data) {
        console.log('chooseChapter', data)
        this.currentChapterId = data.id;
        this.getChapterContentData();
        this.drawerVisibility = !this.drawerVisibility;

        // this.chapterList.forEach((item1, index1) => {
        //   if (item1.id === data.id) {
        //     this.currentChapterIndex = index1;
        //     this.getChapterContentData();
        //   }
        // });
      },
      contentTypeChecker() {
        let filterData = this.contentTypeDictionary.filter(item => item.code === Number(this.contentType));
        // console.log('filterData', filterData)
        return filterData.length > 0 ? filterData[0] : {};
      }
    }
  }


</script>

<style scoped lang="css">
  @import '../assets/js/swiper/css/swiper.min.css';

</style>
