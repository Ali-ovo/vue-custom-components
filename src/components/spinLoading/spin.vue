
<template>
  <!-- 用法 <spin fix> -->
  <div
    :class="[
      iClass,
      fix ? 'i-spin-fix' : '',
      'i-spin-' + size,
      custom ? 'i-spin-show-text' : '',
      fullscreen ? 'i-spin-fullscreen' : '',
    ]"
  >
    <div class="i-spin-main">
      <div class="i-spin-dot"></div>
      <div class="i-spin-text"><slot></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "spin",
  components: {},
  props: {
    iClass: {
      //自定义类名
      type: String,
      default: "",
    },
    size: {
      //大小 可选 large small
      type: String,
      default: "default",
    },
    fix: {
      // 是否居中 父级需要有定位属性 如果没有就向上级查找
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    custom: {
      // 是否自定义样式 只有文字 如果需要改图片可以改下面的 i-spin-dot 的样式
      type: Boolean,
      default: false,
    },
  },
  // data() {
  //   return {}
  // },
  // created() {},
  // methods: {},
}
</script>

<style scoped>
.i-spin {
  color: #2d8cf0;
  vertical-align: middle;
  text-align: center;
}
.i-spin-dot {
  position: relative;
  display: block;
  border-radius: 50%;
  background-color: #2d8cf0;
  width: 20px;
  height: 20px;
  animation: ani-spin-bounce 1s 0s ease-in-out infinite;
}
.i-spin-large .i-spin-dot {
  width: 32px;
  height: 32px;
}
.i-spin-small .i-spin-dot {
  width: 12px;
  height: 12px;
}
.i-spin-fix {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}
.i-spin-fullscreen {
  z-index: 2010;
}
.i-spin-fullscreen-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.i-spin-fix .i-spin-main {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.i-spin-fix .i-spin-dot {
  display: inline-block;
}
.i-spin-show-text .i-spin-dot,
.i-spin-text {
  display: none;
}
.i-spin-show-text .i-spin-text {
  display: block;
  font-size: 14px;
}
@keyframes ani-spin-bounce {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
