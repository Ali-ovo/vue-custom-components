<template>
  <div class="sort">
    <sort-tag
      text="排序"
      :resetValue="resetValue1"
      @click="click"
      :order="order1"
    ></sort-tag>
    <sort-tag
      text="排序2"
      :resetValue="resetValue2"
      @click="click2"
      :order="order2"
    ></sort-tag>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from "vue"
import sortTag from "../components/sortTag/sort-tag.vue"
export default defineComponent({
  name: "sortTagPage",
  components: { sortTag },
  setup() {
    // 随机值 根据这个可以重置当前状态
    const resetValue1 = ref(0)
    const resetValue2 = ref(0)

    // 存储当前的排序状态
    const order1 = ref("")
    const order2 = ref("")

    // 点击事件 返回排序的字段
    const click = (e: any) => {
      order1.value = e
      resetValue2.value = Math.random()
      console.log(e)
    }
    const click2 = (e: any) => {
      order2.value = e
      resetValue1.value = Math.random()
      console.log(e)
    }
    return {
      resetValue1,
      resetValue2,
      click,
      click2,
    }
  },
})
</script>

<style lang="less" scoped>
.sort {
  width: 300px;
  height: 300px;
  background-color: #f2f2f2;
  margin: 0 auto;
  padding: 0 20px;

  /deep/ .arrow {
    width: 30px;
    height: 30px;
  }
}
</style>
