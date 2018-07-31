<template>
  <div>
    <div style="width:1200px;height:1200px;margin:50px auto;zoom: 0.5;position: relative;" class="text-center div">
      <!--转盘层的canvas-->
      <canvas id="canvas"></canvas>
      <!--指针所在的canvas-->
      <canvas id="canvas2"></canvas>
    </div>
    <button @click="go">开始抽奖</button>
  </div>

</template>

<script>
  import CommonLoading from './common/CommonLoading.vue'
  import wx from 'weixin-js-sdk'

  export default {
    name: "Promotion",
    components: {
      CommonLoading
    },
    data: function () {
      return {
        wheelColors: ['#33ACB5', '#DF5C5D', '#B4D966', '#5450B3', '#FFD457', '#3A97EA', '#FAA167', '#63CA97', '#9A50B3'],
        wheelNames: [
          {name: '科比'},
          {name: '韦德'},
          {name: '保罗'},
          {name: '卡特'},
          {name: '詹姆斯'},
          {name: '库里'},
          {name: '哈登'},
          {name: '乔治'},
          {name: '安东尼'},
          {name: '威少'},
          {name: '罗斯'}
        ],
        wheelData: []
      }
    },
    computed: {},
    watch: {},
    created() {
      this.redirectInfo = this.$route.query.routeto;
    },
    beforeMount() {


    },
    mounted() {
      this.initWheel();
      // this.changeUrl();
    },
    methods: {
      initWheel() {
        //定义人名和对应的颜色

        this.wheelData = this.wheelNames.map((item, index) => {
          return {
            name: item.name,
            color: this.wheelColors[index]
          }
        })
        this.paintWheel();

      },
      paintWheel() {
        var len = this.wheelData.length;
        var angle = Math.PI * 2 / len;

        var canvas = document.getElementById('canvas');//转盘所在画布
        var canvas2 = document.getElementById('canvas2'); //指针所在画布
        canvas.width = canvas2.width = 1200;
        canvas.height = canvas2.height = 1200;

        var sector = canvas.getContext("2d"); //每一个区域块
        var hand = canvas2.getContext("2d");  //指针

        var w = canvas.width;
        var h = canvas.height;


        //画指针
        hand.fillStyle = "#fff";
        hand.fillRect(600 - 5, 50, 10, 600);
        hand.arc(w / 2, h / 2, 30, 0, Math.PI * 2);

        for (var i = 0; i < this.wheelData.length; i++) {
          var item = this.wheelData[i];

          sector.beginPath();
          sector.moveTo(w / 2, h / 2);
          sector.lineTo(w - 3, h / 2);
          sector.arc(w / 2, h / 2, h / 2 - 3, 0, angle);
          sector.lineTo(w / 2, h / 2);
          sector.fillStyle = item.color;
          sector.fill();

          sector.translate(600, 600); // 设置原点为画布中心
          sector.rotate(angle);
          sector.translate(-600, -600); // 恢复画布中心到（0，0）

          sector.save();

          //绘制文字
          sector.translate(900, 600);
          sector.font = "100px Georgia";
          sector.fillStyle = "#fff";
          sector.fillText(item.name, -80, -60);
          sector.translate(-1000, -600);
          sector.restore();
        }

        hand.fill();

      },
      go() {
        var time = 3000;
        var a0 = (Math.random() + 5) / 100;
        var clock = 20;
        var interval = setInterval(function () {
          var a = time >= 1500 ? a0 : -a0;
          var v = time >= 1500 ? a * (3000 - time) : a0 * 1500 + a * (1500 - time);
          sector.translate(600, 600);
          sector.rotate(Math.PI / 180 * v);
          sector.translate(-600, -600);
          sector.clearRect(0, 0, 1200, 1200);
          paintName(data);
          time -= clock;

          if (time == 0) {
            window.clearInterval(interval);
          }
        }, clock)
      }
    }
  }
</script>

<style scoped lang="css">
  .text-center {
    text-align: center;
  }

  .title {
    color: blue;
  }

  .div canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  button {
    width: 200px;
    height: 60px;
    color: red;
    font-weight: bold;
    font-size: 30px;
  }

</style>
