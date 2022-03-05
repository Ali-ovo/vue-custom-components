<template>
  <div class="about" id="wrap" ref="wrap">
    <div class="wrap" @touchEnd="moveEnd" @touchstart="moveStart">
      <div class="left">
        <div
          class="header"
          :style="{
            transform: `translateY(${pageY}px)`,
            visibility: `${isShowHeader ? 'visible' : 'hidden'}`,
          }"
        >
          <p>title1</p>
        </div>
        <div v-for="value in rowLength" :key="value" class="bodyWrap">
          <p>body1</p>
        </div>
      </div>
      <div class="swip">
        <div class="right">
          <div
            class="header"
            ref="header2"
            :style="{
              transform: `translateY(${pageY}px)`,
              visibility: `${isShowHeader ? 'visible' : 'hidden'}`,
            }"
          >
            <p>title2</p>
            <p>title3</p>
            <p>title4</p>
            <p>title5</p>
            <p>title6</p>
            <p>title7</p>
            <p>title8</p>
          </div>
          <div v-for="value in rowLength" :key="value" class="bodyWrap">
            <p v-for="num in columLength" :key="num">body{{ num }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rowLength: [],
      columLength: [],
      isShowHeader: true,
      pageY: 0,
      scrollTop: 0,
      oldScrollTop: 0,
      isStart: false,
    }
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.rowLength.push(i)
    }
    for (let i = 1; i <= 8; i++) {
      this.columLength.push(i)
    }
    const _this = this
    let timer
    document.getElementById("wrap").addEventListener("scroll", function (e) {
      timer && clearTimeout(timer)
      if (!_this.isStart) {
        _this.isStart = true
        _this.isShowHeader = false
        console.log("滚动开始")
      }
      timer = setTimeout(function () {
        _this.pageY = e.target.scrollTop
      }, 500)
    })
  },
  watch: {
    pageY: function (newTop, oldTop) {
      this.isShowHeader = true
      this.isStart = false
      console.log("滚动结束", newTop, oldTop)
    },
  },
}
</script>

<style lang="less" scoped>
.about {
  width: 360px;
  border: 1px solid #333;
  overflow: auto;
  height: 500px;
}
.wrap {
  display: grid;
  grid-template-columns: 100px 1fr;
}

.swip {
  width: 260px;
  overflow: auto;
}
.swip-body {
  height: 470px;
  overflow-y: auto;
}
.swip-body1 {
  display: flex;
}
.header {
}
.header,
.bodyWrap {
  display: grid;
  grid-template-columns: repeat(8, 100px);
}
p {
  height: 30px;
}
.header p {
  background: red;
}
</style>