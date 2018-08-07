<template>
<div class="container">
  <div class="warp">
    <div class="box">
      <div class="tel-wrap">
        <label for="tel">手机号码</label>
        <input type="text" name="tel" id="tel" value="" maxlength="11" />
      </div>
      <p class="prompt">你还不是团长哦!</p>
      <div class="btn-wrap">
        <div class="btn">生成邀请海报</div>
      </div>
    </div>
    <div class="poster_wrap">
      <div class="temp_wrap">
        <div class="realimage_wrapper" v-show='realImageFlag'>
          <img class="posterCode" src="../img/poster_00000.jpg" />

          <!-- <img class="posterCode" src="http://resource.zan-qian.com/share/app_invite_20180807180317.jpg-style_640x1140" /> -->
          <span class="code">EN3J</span>
        </div>
        <div class='canvasimage_wrapper' v-show='canvasFlag'>
          <img class="saveImg" :src="canvasSrc" />
          <p class="saveInfo">长按保存图片</p>
        </div>
      </div>
      <CommonLoading3 :loading='!canvasFlag' />
      <div class='mask'></div>
    </div>

  </div>
</div>
</template>

<script>
import $ from 'jquery';
import html2canvas from 'html2canvas';
import CommonLoading3 from './common/CommonLoading3.vue';

export default {
  name: "Promotion",
  components: {
    CommonLoading3
  },
  data: function() {
    return {
      canvasSrc: '',
      realImageFlag: true,
      canvasFlag: false
    }
  },
  computed: {


  },
  watch: {

  },

  mounted() {
    this.initRemResizing();
    this.initAutoHeight();
    this.init();
  },
  methods: {
    initRemResizing() {
      this.$remResizing({
        fontSize: 20,
      });

    },
    initAutoHeight() {
      this.$autoHeight({
        target: '.container'
      })
      this.$autoHeight({
        target: '.poster_wrap'
      })
    },
    init() {
      let that = this;

      //			$(".realimage_wrapper img").css('height', window.innerHeight);

      var imgW = 0;
      var imgH = 0;

      var canvase = document.createElement("canvas");
      var context = canvase.getContext("2d");
      var devicePixelRatio = window.devicePixelRatio || 1;
      // 浏览器在渲染canvas之前存储画布信息的像素比
      var backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
      // canvas的实际渲染倍率
      var ratio = devicePixelRatio / backingStoreRatio;


      //点击生成海报
      $(".btn").click(function() {
        var phone_number = $("#tel").val();

        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        //console.log(phone_number)
        //console.log(!myreg.test(phone_number))
        if (!myreg.test(phone_number)) {
          $(".prompt").text("请输入正确的手机号");
          $(".prompt").css("visibility", "visible");
          return false;
        } else {
          var req_url = "http://gateway.zan-qian.com/promotion-service/1.0.0/addPromotionCode/" + phone_number;
          $.ajax({
            type: "post",
            url: req_url,
            data: {
              phone_number: phone_number
            },
            ContentType: "application/x-www-form-urlencoded",
            async: true,
            success: function(res) {
              //console.log(res)
              if (res.result) {
                $(".code").text(res.code.toUpperCase());
                $(".prompt").css("visibility", "hidden");
                $(".poster_wrap").show();
                //生成图片
                imgW = $(".temp_wrap").width();
                imgH = $(".temp_wrap").height();
                //console.log(ratio,imgW,imgH)
                canvase.width = imgW * ratio;
                canvase.height = imgH * ratio;
                canvase.style.width = imgW + 'px';
                canvase.style.height = imgH + 'px';
                context.scale(ratio, ratio);
                var opts = {
                  // scale: ratio,
                  canvas: canvase,
                  logging: true,
                  // width: imgW,
                  // height: imgH
                };

                // that.convertImage();
                that.$nextTick(() => {

                  html2canvas(document.querySelector('.realimage_wrapper'), opts).then(canvas => {
                    var imageUrl = canvas.toDataURL("image/png");
                    // console.log(imageUrl)
                    that.canvasSrc = imageUrl;
                    that.canvasFlag = true;

                    console.log($('.canvasimage_wrapper').height())
                    console.log($('html').height())

                    if ($('.canvasimage_wrapper').height() < $('body').height()) {
                      $('.temp_wrap').css({
                        height: '100%'
                      })
                    } else {
                      that.$autoHeight({
                        target: '.poster_wrap'
                      })
                    }
                  }).catch(function(error) {
                    console.log(error)
                  })
                })
              } else {
                $(".prompt").text("你还不是团长哦!");
                $(".prompt").css("visibility", "visible");
                $(".poster_wrap").hide();
              }
            }
          });
        }

      })
    },
    getBase64Image(img) {
      img.setAttribute('crossOrigin', 'anonymous');
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      // var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/jpeg");
      console.log(dataURL)
      return dataURL;
    },
    convertImage() {
      let that = this;
      let imageObj = new Image();
      imageObj.src = $(".realimage_wrapper img").attr('src');
      imageObj.onload = () => {
        let base64 = that.getBase64Image(imageObj);
        $(".realimage_wrapper img").attr('src', base64);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../sass/index.scss';
</style>
