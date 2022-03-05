<template>
  <div class="index">
    <ul class="flex">
      <!-- 字符串 转为对应的 numArr 数组 -->
      <animationNumber
        v-for="(num, idx) of numArr"
        :key="idx"
        as="li"
        :i="num"
        :delay="idx + 1"
        class="num"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, computed } from "vue"
import animationNumber from "../components/animationNumber/ScrollNum.vue"
export default defineComponent({
  name: "animationNumberPage",
  components: {
    animationNumber,
  },
  setup() {
    const num = reactive({ num: 886 })

    const numArr = computed(() => {
      const str = String(num.num)
      return [parseInt(str[0]), parseInt(str[1]), parseInt(str[2])]
    })
    return {
      ...num,
      numArr,
    }
  },
})
</script>

<style lang="less" scoped>
.index {
  width: 300px;
  height: 500px;
  background-color: #f7f7f7;
  margin: 0 auto;
  padding: 20px;

  .flex {
    display: flex;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .num {
    --width: 26px;
    margin-right: 6px;
    border: 1px solid black;
    border-radius: 8px;
  }
}
</style>
