<template>
  <div class="wolveskill_confirm_wrapper" :style="{zIndex: zIndex}">
    <div class="content">
      <div class="header">
        {{title}}
      </div>
      <div class="detail" v-html="content"></div>
      <div class="button">
        <ul>
          <li v-for="item in button">
            <a v-if="item.type==='confirm'" @click="onConfirm">
              {{item.text}}
            </a>
            <a v-if="item.type==='cancel'" @click="onCancel">
              {{item.text}}
            </a>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "confirm",
    props: {
      zIndex: {
        type: Number,
        default: 999
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      button: {
        type: Array,
        default: function () {
          return []
        }
      },

    },
    data() {
      return {

      }
    },
    mounted() {
      this.$autoHeight({
        target: '.wolveskill_confirm_wrapper'
      })
    },
    methods: {
      onConfirm(callback) {
        this.$emit('confirm', (callback)=>{
          return callback;
        })
      },
      onCancel(callback) {
        this.$emit('cancel', callback=>{
          return callback;
        })
      }
    }

  }
</script>

<style scoped>

</style>
