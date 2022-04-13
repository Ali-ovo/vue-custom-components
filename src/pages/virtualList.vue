<template>
  <div class="v-scroll" ref="scrollBox" @scroll="doScroll">
    <div class="v-scrollBox" :style="blankStyle" style="height: 100%">
      <div v-for="item in tempSanxins" :key="item.id" class="scroll-item">
        <span>{{ item.msg }}</span>
        <img :src="item.src" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imgLogn from '@/assets/logo.png'
import { throttle } from '@/utils/tools'
import { reactive, computed, onMounted, ref } from 'vue'
const ScrollData = reactive<{
  allSanxins: { msg: string; src: string; id: string }[]
  itemHiehgt: number
  boxHeight: number
  startIndex: number
}>({
  allSanxins: [], // 所有数据
  itemHiehgt: 150, // 列表每一项的宽度
  boxHeight: 0, // 可视区域的高度
  startIndex: 0, // 元素开始索引
})

const scrollBox = ref<Element | null>(null)

const getAllSanxin = function (count: number) {
  // 模拟获取数据
  const length = ScrollData.allSanxins.length
  for (let i = 0; i < count; i++) {
    ScrollData.allSanxins.push({
      id: `didi ${length + i}`,
      msg: `我是didi  ${length + i}号`,
      // 这里随便选一张图片就行
      src: imgLogn,
    })
  }
}

getAllSanxin(200)

onMounted(() => {
  // 模拟请求数据

  // 在mounted时获取可视区域的高度
  getScrollBoxHeight()
  // 监听屏幕变化以及旋转，都要重新获取可视区域的高度
  window.onresize = getScrollBoxHeight
  window.onorientationchange = getScrollBoxHeight
})

const doScroll = throttle(function () {
  // 监听可视区域的滚动事件
  // 公式：~~(滚动的距离 / 列表项 )，就能算出已经滚过了多少个列表项，也就能知道现在的startIndex是多少
  // 例如我滚动条滚过了160px，那么index就是1，因为此时第一个列表项已经被滚上去了，可视区域里的第一项的索引是1
  const index = ~~(scrollBox?.value?.scrollTop! / ScrollData.itemHiehgt)

  console.log(index)

  if (index === ScrollData.startIndex) return

  ScrollData.startIndex = index

  if (ScrollData.startIndex + itemNum.value > ScrollData.allSanxins.length - 1) {
    getAllSanxin(30)
  }
}, 200)

const getScrollBoxHeight = () => {
  // 获取可视区域的高度
  ScrollData.boxHeight = scrollBox.value?.clientHeight as number
}

// 可视区域可展示多少个列表项？ 计算公式：~~(可视化区域高度 / 列表项高度) + 2
const itemNum = computed(() => {
  // ~~是向下取整的运算符，等同于Math.floor()，为什么要 +2 ，是因为可能最上面和最下面的元素都只展示一部分
  return ~~(ScrollData.boxHeight / ScrollData.itemHiehgt) + 2
})

const endIndex = computed(() => {
  // endIndex的计算公式：(开始索引 + 可视区域可展示多少个列表项 * 2)
  // 比如可视区域可展示8个列表项，startIndex是0的话endIndex就是0 + 8 * 2 = 16，startIndex是1的话endIndex就是1 + 8 * 2 = 17，以此类推
  // 为什么要乘2呢，因为这样的话可以预加载出一页的数据，防止滚动过快，出现暂时白屏现象
  let index = ScrollData.startIndex + itemNum.value * 2
  if (!ScrollData.allSanxins[index]) {
    // 到底的情况，比如startIndex是99995，那么endIndex本应该是99995 + 8 * 2 = 10011
    // 但是列表数据总数只有10000条，此时就需要让endIndex = (列表数据长度 - 1)
    index = ScrollData.allSanxins.length - 1
  }
  return index
})

//   可视区域展示的截取数据，使用了数组的slice方法，不改变原数组又能截取
const tempSanxins = computed(() => {
  let startIndex = 0
  if (ScrollData.startIndex <= itemNum.value) {
    startIndex = 0
  } else {
    startIndex = ScrollData.startIndex - itemNum.value
  }

  return ScrollData.allSanxins.slice(startIndex, endIndex.value + 1)
})

// 上下方的空白处使用padding来充当
const blankStyle = computed(() => {
  let startIndex = 0
  if (ScrollData.startIndex <= itemNum.value) {
    startIndex = 0
  } else {
    startIndex = ScrollData.startIndex - itemNum.value
  }
  return {
    // 上方空白的高度计算公式：(开始index * 列表项高度)
    // 比如你滚过了3个列表项，那么上方空白区高度就是3 * 150 = 450，这样才能假装10000个数据的滚动状态
    paddingTop: startIndex * ScrollData.itemHiehgt + 'px',
    // 下方空白的高度计算公式：(总数据的个数 - 结束index - 1) * 列表项高度
    // 例如现在结束index是100，那么下方空白高度就是：(10000 - 100 - 1) * 150 = 1,484,850
    paddingBottom: (ScrollData.allSanxins.length - endIndex.value - 1) * ScrollData.itemHiehgt + 'px',
    // 不要忘了加px哦
  }
})
</script>

<script lang="ts">
export default {
  name: 'virtual',
}
</script>

<style lang="less" scoped>
.v-scroll {
  height: 100vh;
  overflow: scroll;

  .scroll-item {
    height: 148px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    img {
      height: 100%;
    }
  }
}
</style>
