<template>
  <div class="dropDown">
    <div class="label" @click="labelClick(flag)">这是一个label {{ flag }}</div>
    <div class="list" ref="eleRef">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'dropDown',
  setup() {
    const eleRef = ref<HTMLDivElement>()
    const flag = ref(false)

    const labelClick = (isFlag: boolean) => {
      flag.value = !isFlag
      console.log('isFlag', isFlag)

      if (isFlag) {
        slideDownFn(eleRef.value as HTMLDivElement)
      } else {
        slideUpFn(eleRef.value as HTMLDivElement)
      }
    }

    const slideUpFn = (element: HTMLDivElement, time = 10) => {
      if (element && element.offsetHeight > 0) {
        let elementHeight = element.offsetHeight
        let currentHeight = elementHeight

        const timer = setInterval(function () {
          currentHeight -= elementHeight / time
          element.style.height = currentHeight + 'px'

          if (currentHeight <= 0) {
            clearInterval(timer)
            element.style.display = 'none'
            element.style.height = elementHeight + 'px'
          }
        }, 12)
      }
    }

    const slideDownFn = (element: HTMLDivElement, time = 10) => {
      if (element && element.offsetHeight === 0) {
        element.style.display = 'block'
        let elementHeight = element.offsetHeight
        element.style.height = '0px'
        let currentHeight = 0

        const timer = setInterval(function () {
          currentHeight += elementHeight / time
          element.style.height = currentHeight + 'px'
          if (currentHeight >= elementHeight) {
            clearInterval(timer)
          }
        }, 12)
      }
    }

    return { eleRef, flag, labelClick }
  },
}
</script>

<style lang="less" scoped>
.dropDown {
  box-sizing: border-box;
  .label {
    width: 130px;
    height: 30px;
    background: #ccc;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .list {
    display: none;
    overflow: hidden;
    width: 130px;
    background: rgba(235, 235, 235, 0.5);
    margin: 0;
    padding: 0;

    span {
      display: block;
      padding: 0 0 0 10px;
      width: 130px;
    }
  }
}
</style>
